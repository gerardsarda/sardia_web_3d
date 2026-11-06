/* ============================================================
   SardIA — Hero scroll-storytelling (solo página de Inicio)
   La raya del vídeo nada a pantalla completa mientras haces
   scroll (secuencia de fotogramas dibujada en un lienzo 2D,
   estilo Apple). Los bloques de texto ("beats") se apartan al
   lado LIBRE según por dónde va la raya: medimos su posición
   horizontal por fotograma (es luminosa sobre agua oscura) y
   colocamos el texto en el lado opuesto. Sin dependencias.
   Respeta prefers-reduced-motion.
   ============================================================ */
(function () {
  "use strict";

  var host = document.querySelector("[data-hero-scroll]");
  if (!host) return;
  var canvas = host.querySelector(".hero__canvas");
  if (!canvas || !canvas.getContext) return;
  var ctx = canvas.getContext("2d");

  var total = parseInt(host.dataset.total, 10) || 0;
  var base = host.dataset.fotogramas || "";
  if (base && base.charAt(base.length - 1) !== "/") base += "/";
  var posterSrc = host.dataset.poster || "";
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;

  var imgs = new Array(total).fill(null);
  var rayX = new Array(total).fill(null);   /* posición horizontal de la raya 0..1 por fotograma */
  var poster = null;
  var current = 0, painted = -1;

  /* --- beats de texto --- */
  var beats = [].slice.call(host.querySelectorAll(".hero__beat")).map(function (el) {
    return {
      el: el,
      from: parseFloat(el.dataset.from) || 0,
      to: el.dataset.to != null ? parseFloat(el.dataset.to) : 1,
      fallback: el.dataset.side || "right",
      active: false
    };
  });
  var cue = host.querySelector(".hero__cue");

  /* lienzo pequeño para medir dónde está la raya */
  var mc = document.createElement("canvas"); mc.width = 64; mc.height = 36;
  var mctx = mc.getContext("2d", { willReadFrequently: true });

  function pad(n) { n = String(n); while (n.length < 4) n = "0" + n; return n; }
  function frameUrl(i) { return base + pad(i + 1) + ".webp"; }
  function frameFor(p) { return Math.min(total - 1, Math.max(0, Math.round(p * (total - 1)))); }

  /* Centro de brillo horizontal (la raya glow sobre agua oscura).
     Ignoramos la franja superior para que la luz de la superficie no sesgue. */
  function measure(img, i) {
    try {
      mctx.drawImage(img, 0, 0, mc.width, mc.height);
      var d = mctx.getImageData(0, 0, mc.width, mc.height).data;
      var startY = Math.floor(mc.height * 0.22);
      var sw = 0, sx = 0;
      for (var y = startY; y < mc.height; y++) {
        for (var x = 0; x < mc.width; x++) {
          var o = (y * mc.width + x) * 4;
          var lum = 0.2126 * d[o] + 0.7152 * d[o + 1] + 0.0722 * d[o + 2];
          var t = (lum - 70) / 185;
          if (t <= 0) continue;
          var w = t * t;
          sw += w; sx += w * x;
        }
      }
      rayX[i] = sw > 2 ? (sx / sw) / (mc.width - 1) : null;
    } catch (e) { rayX[i] = null; }
  }

  /* Dibuja una imagen cubriendo todo el lienzo (object-fit: cover), centrada. */
  function draw(img) {
    if (!img || !img.width) return;
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var W = Math.round(canvas.clientWidth * dpr);
    var H = Math.round(canvas.clientHeight * dpr);
    if (!W || !H) return;
    if (canvas.width !== W || canvas.height !== H) { canvas.width = W; canvas.height = H; painted = -1; }
    var s = Math.max(W / img.width, H / img.height);
    var w = img.width * s, h = img.height * s;
    ctx.clearRect(0, 0, W, H);
    ctx.drawImage(img, (W - w) / 2, (H - h) / 2, w, h);
  }

  function paint() {
    var k = frameFor(current);
    while (k > 0 && !imgs[k]) k--;            /* si aún no cargó, usa el último disponible */
    var img = imgs[k] || poster;
    if (!img) return;
    if (k !== painted) { painted = k; draw(img); }
  }

  /* Progreso 0..1 dentro del recorrido de scroll del hero alto */
  function progress() {
    var range = host.offsetHeight - window.innerHeight;
    if (range <= 0) return 0;
    var scrolled = -host.getBoundingClientRect().top;
    return Math.min(1, Math.max(0, scrolled / range));
  }

  /* Lado libre para un beat: opuesto a donde esté la raya en su fotograma central */
  function sideForBeat(b) {
    var rep = frameFor((b.from + b.to) / 2);
    var rx = rayX[rep];
    if (rx == null) {
      for (var dd = 1; dd < 24 && rx == null; dd++) {
        if (rep - dd >= 0 && rayX[rep - dd] != null) rx = rayX[rep - dd];
        else if (rep + dd < total && rayX[rep + dd] != null) rx = rayX[rep + dd];
      }
    }
    if (rx == null) return b.fallback;
    if (rx < 0.47) return "right";
    if (rx > 0.53) return "left";
    return b.fallback;
  }

  function applySide(b) {
    var s = sideForBeat(b);
    b.el.classList.remove("hero__beat--left", "hero__beat--right");
    b.el.classList.add("hero__beat--" + s);
  }

  /* Muestra/oculta beats según el scroll, con fundido en los extremos */
  function updateBeats(p) {
    var fade = 0.06;
    for (var i = 0; i < beats.length; i++) {
      var b = beats[i];
      var o = 0;
      if (p >= b.from - 0.001 && p <= b.to + 0.001) {
        var inA = b.from <= 0 ? 1 : Math.min(1, (p - b.from) / fade);
        var outA = b.to >= 1 ? 1 : Math.min(1, (b.to - p) / fade);
        o = Math.max(0, Math.min(inA, outA));
      }
      if (o > 0.01) {
        if (!b.active) { b.active = true; applySide(b); }   /* fija el lado al entrar (estable) */
        b.el.classList.add("is-active");
        b.el.style.opacity = o.toFixed(3);
        var mid = (b.from + b.to) / 2;
        b.el.style.setProperty("--px", ((p - mid) * -70).toFixed(1) + "px");  /* parallax sutil */
      } else if (b.active || b.el.classList.contains("is-active")) {
        b.active = false;
        b.el.classList.remove("is-active");
        b.el.style.opacity = "0";
      }
    }
    if (cue) cue.style.opacity = p > 0.04 ? "0" : "";
  }

  /* Póster inmediato como respaldo hasta que carguen los fotogramas */
  if (posterSrc) {
    poster = new Image();
    poster.onload = function () { if (painted === -1) draw(poster); };
    poster.src = posterSrc;
  }

  function load(i) {
    return new Promise(function (res) {
      var im = new Image();
      im.onload = function () { imgs[i] = im; measure(im, i); res(true); };
      im.onerror = function () { res(false); };
      im.src = frameUrl(i);
    });
  }

  /* ---------- modo reducido: sin scroll-hijack, un fotograma fijo ---------- */
  if (reduce) {
    host.classList.add("hero--static");
    if (beats[0]) {
      beats[0].el.classList.add("is-active", "hero__beat--center");
      beats[0].el.style.opacity = "1";
    }
    var idx = Math.round(0.32 * (Math.max(1, total) - 1));
    var im = new Image();
    im.onload = function () { imgs[idx] = im; current = idx / Math.max(1, total - 1); painted = -1; draw(im); };
    im.src = frameUrl(idx);
    window.addEventListener("resize", function () { painted = -1; if (imgs[idx]) draw(imgs[idx]); else if (poster) draw(poster); });
    return;
  }

  /* Precarga progresiva: primero el fotograma 1, luego en tandas de 6 */
  if (total > 0) {
    load(0);
    var i = 1;
    (function next() {
      if (i >= total) return;
      var batch = [];
      for (var j = 0; j < 6 && i < total; j++, i++) batch.push(load(i));
      Promise.all(batch).then(next);
    })();
  }

  /* Bucle continuo: lee la posición cada frame y suaviza hacia ella. */
  function loop() {
    var p = progress();
    current += (p - current) * 0.16;
    if (Math.abs(p - current) < 0.0004) current = p;
    paint();
    updateBeats(p);
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);

  window.addEventListener("resize", function () { painted = -1; paint(); });
})();

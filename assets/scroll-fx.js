/* ============================================================
   SardIA — Scroll effects (compartido en todas las páginas)
   - Reveal al entrar en viewport vía IntersectionObserver.
   - Marquee de logos: duplica los items para un bucle sin costuras.
   Sin dependencias. Respeta prefers-reduced-motion.
   ============================================================ */
(function () {
  "use strict";

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* --- MARQUEE: duplicar el track para que translateX(-50%) cierre el bucle */
  var tracks = document.querySelectorAll(".logo-wall--marquee .logo-wall__track");
  if (!reduce) {
    tracks.forEach(function (track) {
      if (track.dataset.sfxCloned) return;
      track.dataset.sfxCloned = "1";
      var copy = track.cloneNode(true);
      // la copia es puramente decorativa: fuera del árbol de accesibilidad
      Array.prototype.forEach.call(copy.children, function (node) {
        node.setAttribute("aria-hidden", "true");
      });
      while (copy.firstChild) track.appendChild(copy.firstChild);
    });
  }

  /* --- REVEAL: si hay reduced-motion, no hacemos nada.
     El <head> no habrá añadido .sfx-ready, así que nada está oculto. */
  if (reduce) return;

  var SEL = [
    ".section-head", ".card", ".step", ".funnel__item", ".stack__card", ".svc-row",
    ".svc-block", ".svc-split", ".svc-photo", ".showcase", ".stats",
    ".contrast__col", ".profile", ".media", ".split", ".side-block",
    ".form-panel", ".logo-wall", ".manifesto .wrap", ".hero__content",
    ".page-hero .wrap"
  ].join(",");

  var els = Array.prototype.slice.call(document.querySelectorAll(SEL));

  /* Escalonado suave entre hermanos del mismo contenedor (cards de una rejilla,
     filas de servicios…) para que no entren todos a la vez. */
  var countByParent = new Map();
  els.forEach(function (el) {
    var parent = el.parentNode;
    var i = countByParent.get(parent) || 0;
    if (i > 0) el.style.transitionDelay = Math.min(i * 60, 240) + "ms";
    countByParent.set(parent, i + 1);
  });

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        io.unobserve(entry.target); /* revelar una vez, sin re-disparar al subir */
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });

  els.forEach(function (el) { io.observe(el); });
})();

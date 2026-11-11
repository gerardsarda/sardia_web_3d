/* ============================================================
   SardIA — Quiz "qué servicio te encaja"
   Modal con 5 preguntas. Cada respuesta puntúa los servicios;
   gana el de más puntos (la pregunta 1 pesa más para desempatar).
   Al terminar lleva a contacto.html con el servicio preseleccionado
   (form-contacto.js lo vuelca en el campo de contexto).
   Textos en ES / CA / EN; idioma = el que guarda i18n.js.
   ============================================================ */
(function () {
  "use strict";

  var SERVICES = ["auditoria", "datos", "automatizacion", "crm", "formacion", "ml", "web"];

  /* ---------- copy ---------- */
  var UI = {
    es: { q: "Pregunta", of: "de", back: "← Atrás", close: "Cerrar", dialog: "Quiz: qué servicio te encaja",
          best: "Tu servicio ideal", also: "También te puede encajar:", cta: "Hablar con nosotros", see: "Ver el servicio", again: "Repetir el quiz" },
    ca: { q: "Pregunta", of: "de", back: "← Enrere", close: "Tancar", dialog: "Quiz: quin servei et encaixa",
          best: "El teu servei ideal", also: "També et pot encaixar:", cta: "Parlar amb nosaltres", see: "Veure el servei", again: "Repetir el quiz" },
    en: { q: "Question", of: "of", back: "← Back", close: "Close", dialog: "Quiz: which service fits you",
          best: "Your ideal service", also: "It could also fit:", cta: "Talk to us", see: "See the service", again: "Retake the quiz" }
  };

  var NAME = {
    auditoria:      { es: "Auditoría de procesos",      ca: "Auditoria de processos",        en: "Process audit" },
    datos:          { es: "Datos y cuadros de mando",   ca: "Dades i quadres de comandament", en: "Data and dashboards" },
    automatizacion: { es: "Automatización de flujos",   ca: "Automatització de fluxos",      en: "Workflow automation" },
    crm:            { es: "CRM y ERP automatizados",    ca: "CRM i ERP automatitzats",       en: "Automated CRM and ERP" },
    formacion:      { es: "Formación",                  ca: "Formació",                      en: "Training" },
    ml:             { es: "Predicción de negocio",      ca: "Predicció de negoci",           en: "Business forecasting" },
    web:            { es: "Creación de páginas web",    ca: "Creació de pàgines web",        en: "Web design" }
  };

  var WHY = {
    auditoria: {
      es: "Antes de automatizar nada, conviene saber dónde se pierde el tiempo. Revisamos cómo trabajáis, medimos qué tareas pesan más y te damos un plan claro con prioridades.",
      ca: "Abans d'automatitzar res, convé saber on es perd el temps. Revisem com treballeu, mesurem quines tasques pesen més i et donem un pla clar amb prioritats.",
      en: "Before automating anything, it helps to know where time is lost. We review how you work, measure which tasks weigh most and give you a clear, prioritised plan." },
    datos: {
      es: "Tus datos existen, pero están dispersos. Los ordenamos, los conectamos y los dejamos en cuadros de mando que se actualizan solos, para decidir con cifras fiables.",
      ca: "Les teves dades hi són, però estan disperses. Les ordenem, les connectem i les deixem en quadres de comandament que s'actualitzen sols, per decidir amb xifres fiables.",
      en: "Your data exists but it's scattered. We organise it, connect it and deliver dashboards that refresh themselves, so you decide on reliable numbers." },
    automatizacion: {
      es: "Lo repetitivo se hace a mano y te roba horas. Conectamos las herramientas que ya usas y automatizamos esos flujos para que la información se mueva sola.",
      ca: "El repetitiu es fa a mà i et roba hores. Connectem les eines que ja fas servir i automatitzem aquests fluxos perquè la informació es mogui sola.",
      en: "Repetitive work is done by hand and steals your hours. We connect the tools you already use and automate those flows so information moves on its own." },
    crm: {
      es: "Clientes, pedidos y seguimiento viven en hojas y mensajes sueltos. Montamos un CRM y ERP a medida, automatizado, donde todo el equipo trabaja con lo mismo.",
      ca: "Clients, comandes i seguiment viuen en fulls i missatges solts. Muntem un CRM i ERP a mida, automatitzat, on tot l'equip treballa amb el mateix.",
      en: "Clients, orders and follow-up live in loose sheets and messages. We build a custom, automated CRM and ERP where the whole team works from the same place." },
    formacion: {
      es: "La tecnología ya está al alcance; falta que el equipo sepa sacarle partido. Formamos a tu gente y la acompañamos hasta que la IA sea parte de su día a día.",
      ca: "La tecnologia ja és a l'abast; falta que l'equip sàpiga treure'n profit. Formem la teva gent i l'acompanyem fins que la IA sigui part del seu dia a dia.",
      en: "The technology is within reach; the team just needs to get the most out of it. We train your people and support them until AI is part of their daily work." },
    ml: {
      es: "Ya tienes histórico y orden. El siguiente paso es anticiparte: modelos entrenados con tus propios datos para prever demanda, ventas o riesgos.",
      ca: "Ja tens històric i ordre. El següent pas és anticipar-te: models entrenats amb les teves pròpies dades per preveure demanda, vendes o riscos.",
      en: "You already have history and order. The next step is to get ahead: models trained on your own data to forecast demand, sales or risk." },
    web: {
      es: "Tu web es lo primero que ve un cliente. Creamos una página rápida, cuidada y hecha a medida que transmite tu negocio y convierte visitas en contactos.",
      ca: "El teu web és el primer que veu un client. Creem una pàgina ràpida, cuidada i feta a mida que transmet el teu negoci i converteix visites en contactes.",
      en: "Your website is the first thing a client sees. We build a fast, polished, custom site that conveys your business and turns visits into enquiries." }
  };

  /* helper: opción { t: textos, s: puntos } */
  function O(es, ca, en, s) { return { t: { es: es, ca: ca, en: en }, s: s }; }

  var QUESTIONS = [
    { q: { es: "¿Qué es lo que más te frena hoy?", ca: "Què és el que més et frena avui?", en: "What holds you back most today?" },
      hint: { es: "Elige la que más se parezca a tu caso.", ca: "Tria la que s'assembli més al teu cas.", en: "Pick the one closest to your case." },
      w: 3,
      o: [
        O("Pierdo horas en tareas repetitivas hechas a mano", "Perdo hores en tasques repetitives fetes a mà", "I lose hours on repetitive manual tasks", { automatizacion: 3, auditoria: 1 }),
        O("No sé dónde se me va el tiempo ni por dónde empezar", "No sé on se me'n va el temps ni per on començar", "I don't know where my time goes or where to start", { auditoria: 3, formacion: 1 }),
        O("Mis datos están dispersos y no me fío de las cifras", "Les meves dades estan disperses i no em refio de les xifres", "My data is scattered and I don't trust the numbers", { datos: 3, auditoria: 1 }),
        O("Clientes, pedidos y gestión en hojas y mensajes sueltos", "Clients, comandes i gestió en fulls i missatges solts", "Clients, orders and admin in loose sheets and messages", { crm: 3, automatizacion: 1 }),
        O("Mi equipo no sabe usar la IA con soltura", "El meu equip no sap usar la IA amb soltesa", "My team can't use AI with confidence", { formacion: 3 }),
        O("Quiero anticipar ventas, demanda o riesgos", "Vull anticipar vendes, demanda o riscos", "I want to forecast sales, demand or risk", { ml: 3, datos: 1 }),
        O("Mi web no está a la altura de mi negocio", "El meu web no està a l'altura del meu negoci", "My website isn't up to my business", { web: 3 })
      ] },
    { q: { es: "¿Cómo trabajáis hoy con la información?", ca: "Com treballeu avui amb la informació?", en: "How do you work with information today?" },
      hint: { es: "", ca: "", en: "" }, w: 1,
      o: [
        O("Excel, papel y WhatsApp", "Excel, paper i WhatsApp", "Excel, paper and WhatsApp", { crm: 2, datos: 1, automatizacion: 1 }),
        O("Varias herramientas que no se hablan entre sí", "Diverses eines que no es parlen entre elles", "Several tools that don't talk to each other", { automatizacion: 2, datos: 1, crm: 1 }),
        O("Ya tenemos software, pero no lo aprovechamos", "Ja tenim programari, però no l'aprofitem", "We have software, but we don't make the most of it", { formacion: 2, datos: 2 }),
        O("Todo bastante ordenado y con histórico", "Tot força ordenat i amb històric", "Pretty organised, with history behind it", { ml: 2, web: 1 })
      ] },
    { q: { es: "¿Cuántas personas sois en el equipo?", ca: "Quantes persones sou a l'equip?", en: "How many people are on the team?" },
      hint: { es: "", ca: "", en: "" }, w: 1,
      o: [
        O("Solo yo", "Només jo", "Just me", { web: 1, automatizacion: 1 }),
        O("De 2 a 15 personas", "De 2 a 15 persones", "2 to 15 people", { crm: 1, auditoria: 1 }),
        O("Más de 15 personas", "Més de 15 persones", "More than 15 people", { formacion: 1, datos: 1, crm: 1 })
      ] },
    { q: { es: "¿Qué experiencia tenéis con la IA?", ca: "Quina experiència teniu amb la IA?", en: "What experience do you have with AI?" },
      hint: { es: "", ca: "", en: "" }, w: 1,
      o: [
        O("Ninguna, estamos empezando", "Cap, estem començant", "None, we're just starting", { auditoria: 2, formacion: 1 }),
        O("Hemos probado ChatGPT u otras herramientas", "Hem provat ChatGPT o altres eines", "We've tried ChatGPT or similar tools", { formacion: 2, automatizacion: 1 }),
        O("Ya la usamos y queremos ir más allá", "Ja la fem servir i volem anar més enllà", "We already use it and want to go further", { ml: 2, automatizacion: 1, datos: 1 })
      ] },
    { q: { es: "¿Qué te gustaría conseguir en los próximos 3 meses?", ca: "Què t'agradaria aconseguir en els propers 3 mesos?", en: "What would you like to achieve in the next 3 months?" },
      hint: { es: "", ca: "", en: "" }, w: 1,
      o: [
        O("Ahorrar tiempo y quitarme trabajo manual", "Estalviar temps i treure'm feina manual", "Save time and cut manual work", { automatizacion: 2, auditoria: 1 }),
        O("Decidir con datos fiables", "Decidir amb dades fiables", "Decide on reliable data", { datos: 2, ml: 1 }),
        O("Vender más y cuidar mejor a mis clientes", "Vendre més i cuidar millor els meus clients", "Sell more and look after clients better", { crm: 2, web: 1 }),
        O("Que mi equipo sea autónomo con la IA", "Que el meu equip sigui autònom amb la IA", "Have my team independent with AI", { formacion: 2 })
      ] }
  ];

  /* ---------- estado ---------- */
  var root, panel, body, barFill, countEl, backBtn, closeBtn;
  var step = 0, picks = [], lastFocus = null, advanceT = null;

  function lang() {
    var l;
    try { l = localStorage.getItem("sardia_lang"); } catch (e) {}
    if (!l) l = document.documentElement.getAttribute("lang") || "ca";
    return UI[l] ? l : "ca";
  }

  function el(tag, cls, txt) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (txt != null) e.textContent = txt;
    return e;
  }

  /* ---------- construcción ---------- */
  function build() {
    root = el("div", "quiz");
    root.setAttribute("role", "dialog");
    root.setAttribute("aria-modal", "true");
    panel = el("div", "quiz__panel");
    closeBtn = el("button", "quiz__close");
    closeBtn.type = "button";
    closeBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>';
    var top = el("div", "quiz__top");
    countEl = el("span", "quiz__count");
    var bar = el("div", "quiz__bar");
    barFill = document.createElement("i");
    bar.appendChild(barFill);
    top.appendChild(countEl);
    top.appendChild(bar);
    body = el("div", "quiz__body");
    backBtn = el("button", "quiz__back");
    backBtn.type = "button";
    panel.appendChild(closeBtn);
    panel.appendChild(top);
    panel.appendChild(body);
    panel.appendChild(backBtn);
    root.appendChild(panel);
    document.body.appendChild(root);

    closeBtn.addEventListener("click", close);
    backBtn.addEventListener("click", function () { if (step > 0) { step--; picks.length = step; render(); } });
    root.addEventListener("mousedown", function (e) { if (e.target === root) close(); });
    document.addEventListener("keydown", onKey);
  }

  function onKey(e) {
    if (!root || !root.classList.contains("is-open")) return;
    if (e.key === "Escape") { close(); return; }
    if (e.key !== "Tab") return;
    var f = [].slice.call(panel.querySelectorAll("button:not([hidden]), a[href]"));
    if (!f.length) return;
    var first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }

  /* ---------- render ---------- */
  function render() {
    var L = lang(), U = UI[L];
    root.setAttribute("aria-label", U.dialog);
    closeBtn.setAttribute("aria-label", U.close);
    backBtn.textContent = U.back;
    body.style.animation = "none"; void body.offsetWidth; body.style.animation = "";
    body.textContent = "";

    if (step >= QUESTIONS.length) { renderResult(L, U); return; }

    var Q = QUESTIONS[step];
    countEl.textContent = U.q + " " + (step + 1) + " " + U.of + " " + QUESTIONS.length;
    barFill.style.width = ((step) / QUESTIONS.length * 100) + "%";
    backBtn.hidden = step === 0;

    var h = el("h2", "quiz__q", Q.q[L]);
    h.id = "quiz-q";
    root.setAttribute("aria-labelledby", "quiz-q");
    root.removeAttribute("aria-label");
    body.appendChild(h);
    if (Q.hint[L]) body.appendChild(el("p", "quiz__hint", Q.hint[L]));
    var list = el("div", "quiz__opts");
    Q.o.forEach(function (opt, i) {
      var b = el("button", "quiz__opt", opt.t[L]);
      b.type = "button";
      b.addEventListener("click", function () {
        if (advanceT) return;
        b.classList.add("is-picked");
        picks[step] = i;
        advanceT = setTimeout(function () { advanceT = null; step++; render(); focusFirst(); }, 230);
      });
      list.appendChild(b);
    });
    body.appendChild(list);
  }

  function score() {
    var tot = {};
    SERVICES.forEach(function (s) { tot[s] = 0; });
    QUESTIONS.forEach(function (Q, qi) {
      var o = Q.o[picks[qi]];
      if (!o) return;
      for (var k in o.s) tot[k] += o.s[k] * Q.w;
    });
    /* desempate: orden estable por puntos; en empate gana el servicio que más puntuó en la pregunta 1 */
    var q1 = QUESTIONS[0].o[picks[0]] ? QUESTIONS[0].o[picks[0]].s : {};
    return SERVICES.slice().sort(function (a, b) {
      return (tot[b] - tot[a]) || ((q1[b] || 0) - (q1[a] || 0));
    });
  }

  function renderResult(L, U) {
    var rank = score();
    var best = rank[0], second = rank[1];
    countEl.textContent = "✓";
    barFill.style.width = "100%";
    backBtn.hidden = false;
    root.removeAttribute("aria-labelledby");
    root.setAttribute("aria-label", U.dialog);

    body.appendChild(el("div", "quiz__res-eyebrow", U.best));
    var h = el("h2", "quiz__res-name", NAME[best][L]);
    body.appendChild(h);
    body.appendChild(el("p", "quiz__res-why", WHY[best][L]));
    var alt = el("p", "quiz__res-alt");
    var b = el("b", null, U.also + " ");
    alt.appendChild(b);
    alt.appendChild(document.createTextNode(NAME[second][L]));
    body.appendChild(alt);

    var cta = el("div", "quiz__res-cta");
    var go = el("a", "btn btn--primary", U.cta);
    go.href = "contacto.html?servicio=" + best + "#formulario";
    var see = el("a", "btn btn--ghost", U.see);
    see.href = "servicios.html#" + best;
    cta.appendChild(go);
    cta.appendChild(see);
    body.appendChild(cta);
    setTimeout(function () { go.focus(); }, 60);
  }

  function focusFirst() {
    var f = panel.querySelector(".quiz__opt");
    if (f) f.focus({ preventScroll: true });
  }

  /* ---------- abrir / cerrar ---------- */
  function open() {
    if (!root) build();
    lastFocus = document.activeElement;
    step = 0; picks = []; advanceT = null;
    render();
    root.classList.add("is-open");
    document.documentElement.style.overflow = "hidden";
    setTimeout(focusFirst, 80);
  }

  function close() {
    if (!root) return;
    if (advanceT) { clearTimeout(advanceT); advanceT = null; }
    root.classList.remove("is-open");
    document.documentElement.style.overflow = "";
    if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
  }

  document.addEventListener("click", function (e) {
    var t = e.target.closest ? e.target.closest("[data-quiz-open]") : null;
    if (t) { e.preventDefault(); open(); }
  });
})();

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

  var SERVICES = ["datos", "automatizacion", "agentes", "crm", "formacion", "ml", "web"];
  /* enlace "Ver el servicio": agentes vive dentro de la ficha de automatización */
  var ANCHOR = { agentes: "automatizacion" };
  var MAX_MULTI = 3;

  /* ---------- copy ---------- */
  var UI = {
    es: { cont: "Continuar", q: "Pregunta", of: "de", back: "← Atrás", close: "Cerrar", dialog: "Quiz: qué servicio te encaja",
          best: "Tu servicio ideal", also: "También te puede encajar:", cta: "Hablar con nosotros", see: "Ver el servicio", again: "Repetir el quiz" },
    ca: { cont: "Continuar", q: "Pregunta", of: "de", back: "← Enrere", close: "Tancar", dialog: "Quiz: quin servei t'encaixa",
          best: "El teu servei ideal", also: "També et pot encaixar:", cta: "Parlar amb nosaltres", see: "Veure el servei", again: "Repetir el quiz" },
    en: { cont: "Continue", q: "Question", of: "of", back: "← Back", close: "Close", dialog: "Quiz: which service fits you",
          best: "Your ideal service", also: "It could also fit:", cta: "Talk to us", see: "See the service", again: "Retake the quiz" }
  };

  var NAME = {
    agentes:        { es: "Agentes de IA",              ca: "Agents d'IA",                   en: "AI agents" },
    datos:         { es: "Datos y cuadros de mando",   ca: "Dades i quadres de comandament", en: "Data and dashboards" },
    automatizacion: { es: "Automatización de procesos",   ca: "Automatització de processos",      en: "Process automation" },
    crm:            { es: "CRM y ERP automatizados",    ca: "CRM i ERP automatitzats",       en: "Automated CRM and ERP" },
    formacion:      { es: "Formación",                  ca: "Formació",                      en: "Training" },
    ml:             { es: "Predicción de negocio",      ca: "Predicció de negoci",           en: "Business forecasting" },
    web:            { es: "Creación de páginas web",    ca: "Creació de pàgines web",        en: "Web design" }
  };

  var WHY = {
    agentes: {
      es: "Hay trabajo que no necesita a una persona. Creamos agentes de IA que atienden consultas, clasifican correos o preparan informes, conectados a tus herramientas para resolver tareas de principio a fin.",
      ca: "Hi ha feina que no necessita una persona. Creem agents d'IA que atenen consultes, classifiquen correus o preparen informes, connectats a les teves eines per resoldre tasques de principi a fi.",
      en: "Some work doesn't need a person. We build AI agents that handle enquiries, sort emails or prepare reports, connected to your tools to complete tasks end to end." },
    datos: {
      es: "Tus datos existen, pero están dispersos. Los ordenamos, los conectamos y los dejamos en cuadros de mando que se actualizan solos, para decidir con cifras fiables.",
      ca: "Les teves dades hi són, però estan disperses. Les ordenem, les connectem i les deixem en quadres de comandament que s'actualitzen sols, per decidir amb xifres fiables.",
      en: "Your data exists but it's scattered. We organise it, connect it and deliver dashboards that refresh themselves, so you decide on reliable numbers." },
    automatizacion: {
      es: "Las tareas repetitivas se hacen a mano y te roban horas. Conectamos las herramientas que ya usas y automatizamos esos procesos para que la información se mueva sola.",
      ca: "Les tasques repetitives es fan a mà i et roben hores. Connectem les eines que ja fas servir i automatitzem aquests processos perquè la informació es mogui sola.",
      en: "Repetitive tasks are done by hand and eat up your hours. We connect the tools you already use and automate those flows so information moves on its own." },
    crm: {
      es: "Clientes, pedidos y seguimiento viven en hojas de cálculo y mensajes sueltos. Montamos un CRM y ERP a medida, automatizado, donde todo el equipo trabaja con la misma información.",
      ca: "Clients, comandes i seguiment estan escampats entre fulls de càlcul i missatges. Muntem un CRM i ERP a mida, automatitzat, on tot l'equip treballa amb la mateixa informació.",
      en: "Clients, orders and follow-up live in spreadsheets and scattered messages. We build a custom, automated CRM and ERP where the whole team works from the same information." },
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
      ca: "La teva web és el primer que veu un client. Creem una pàgina ràpida, ben cuidada i feta a mida, que transmet el teu negoci i converteix visites en contactes.",
      en: "Your website is the first thing a client sees. We build a fast, polished, custom site that conveys your business and turns visits into enquiries." }
  };

  /* helper: opción { t: textos, s: puntos } */
  function O(es, ca, en, s) { return { t: { es: es, ca: ca, en: en }, s: s }; }

  var QUESTIONS = [
    { q: { es: "¿Qué es lo que más te frena hoy?", ca: "Què és el que més et frena avui?", en: "What holds you back most today?" },
      hint: { es: "Elige hasta 3.", ca: "Tria'n fins a 3.", en: "Pick up to 3." },
      w: 3, multi: true,
      o: [
        O("Pierdo horas en tareas repetitivas", "Perdo hores en tasques repetitives", "Repetitive manual tasks", { automatizacion: 3, agentes: 1 }),
        O("Datos dispersos, cifras dudosas", "Dades disperses, xifres dubtoses", "Scattered data, shaky numbers", { datos: 3 }),
        O("Gestión en Excel y mensajes", "Gestió en Excel i missatges", "Admin in Excel and messages", { crm: 3, automatizacion: 1 }),
        O("Quiero un asistente de IA", "Vull un assistent d'IA", "I want an AI assistant", { agentes: 3, automatizacion: 1 }),
        O("Mi equipo no sabe usar la IA", "El meu equip no sap usar la IA", "My team can't use AI well", { formacion: 3, agentes: 1 }),
        O("Quiero anticipar ventas", "Vull anticipar vendes", "I want to forecast sales", { ml: 3, datos: 1 }),
        O("Mi web no está a la altura", "La meva web no és prou bona", "My website falls short", { web: 3 })
      ] },
    { q: { es: "¿Cómo trabajáis hoy con la información?", ca: "Com treballeu avui amb la informació?", en: "How do you work with information today?" },
      hint: { es: "", ca: "", en: "" }, w: 1,
      o: [
        O("Excel, papel y WhatsApp", "Excel, paper i WhatsApp", "Excel, paper and WhatsApp", { crm: 2, datos: 1, automatizacion: 1 }),
        O("Varias herramientas que no se hablan entre sí", "Diverses eines que no es parlen entre elles", "Several tools that don't talk to each other", { automatizacion: 2, datos: 1, crm: 1 }),
        O("Ya tenemos herramientas, pero no las aprovechamos", "Ja tenim eines, però no n'aprofitem tot el potencial", "We have software, but we don't make the most of it", { formacion: 2, datos: 2 }),
        O("Bastante ordenado y con histórico", "Força ordenat i amb històric", "Pretty organised, with history behind it", { ml: 2, web: 1 })
      ] },
    { q: { es: "¿Cuántas personas sois en el equipo?", ca: "Quantes persones sou a l'equip?", en: "How many people are on the team?" },
      hint: { es: "", ca: "", en: "" }, w: 1,
      o: [
        O("Solo yo", "Només jo", "Just me", { web: 1, automatizacion: 1 }),
        O("De 2 a 15 personas", "De 2 a 15 persones", "2 to 15 people", { crm: 1, agentes: 1 }),
        O("Más de 15 personas", "Més de 15 persones", "More than 15 people", { formacion: 1, datos: 1, crm: 1 })
      ] },
    { q: { es: "¿Qué experiencia tenéis con la IA?", ca: "Quina experiència teniu amb la IA?", en: "What experience do you have with AI?" },
      hint: { es: "", ca: "", en: "" }, w: 1,
      o: [
        O("Ninguna, estamos empezando", "Cap, estem començant", "None, we're just starting", { formacion: 2, agentes: 1 }),
        O("Hemos probado ChatGPT u otras herramientas", "Hem provat ChatGPT o altres eines", "We've tried ChatGPT or similar tools", { formacion: 2, automatizacion: 1 }),
        O("Ya la usamos y queremos ir más allá", "Ja la fem servir i volem anar més enllà", "We already use it and want to go further", { ml: 2, automatizacion: 1, datos: 1 })
      ] },
    { q: { es: "¿Qué te gustaría conseguir en los próximos 3 meses?", ca: "Què t'agradaria aconseguir en els propers 3 mesos?", en: "What would you like to achieve in the next 3 months?" },
      hint: { es: "", ca: "", en: "" }, w: 1,
      o: [
        O("Ahorrar tiempo y dejar de hacer trabajo manual", "Estalviar temps i deixar de fer feina manual", "Save time and stop doing manual work", { automatizacion: 2, agentes: 1 }),
        O("Decidir con datos fiables", "Decidir amb dades fiables", "Decide on reliable data", { datos: 2, ml: 1 }),
        O("Vender más y cuidar mejor a los clientes", "Vendre més i cuidar millor els clients", "Sell more and look after clients better", { crm: 2, web: 1 }),
        O("Que mi equipo sea autónomo con la IA", "Que el meu equip sigui autònom amb la IA", "Make my team independent with AI", { formacion: 2 })
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
    backBtn.addEventListener("click", function () { if (step > 0) { step--; picks.length = step + 1; render(); } });
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
    if (Q.multi) { renderMulti(Q, L, U, list); body.appendChild(list); return; }
    Q.o.forEach(function (opt, i) {
      var b = el("button", "quiz__opt", opt.t[L]);
      b.type = "button";
      if (picks[step] === i) b.classList.add("is-picked");
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

  /* pregunta de selección múltiple (máx. MAX_MULTI) con botón Continuar */
  function renderMulti(Q, L, U, list) {
    var sel = Array.isArray(picks[step]) ? picks[step].slice() : [];
    var btns = [];
    var next = el("button", "btn btn--primary quiz__next", U.cont);
    next.type = "button";
    function sync() {
      btns.forEach(function (b, i) {
        var on = sel.indexOf(i) > -1;
        b.classList.toggle("is-picked", on);
        b.setAttribute("aria-pressed", on ? "true" : "false");
        b.disabled = !on && sel.length >= MAX_MULTI;
      });
      next.disabled = sel.length === 0;
      picks[step] = sel.slice();
    }
    Q.o.forEach(function (opt, i) {
      var b = el("button", "quiz__opt", opt.t[L]);
      b.type = "button";
      b.addEventListener("click", function () {
        var k = sel.indexOf(i);
        if (k > -1) sel.splice(k, 1);
        else if (sel.length < MAX_MULTI) sel.push(i);
        sync();
      });
      btns.push(b);
      list.appendChild(b);
    });
    next.addEventListener("click", function () {
      if (!sel.length) return;
      picks[step] = sel.slice();
      step++; render(); focusFirst();
    });
    list.appendChild(next);
    sync();
  }

  function score() {
    var tot = {};
    SERVICES.forEach(function (s) { tot[s] = 0; });
    QUESTIONS.forEach(function (Q, qi) {
      var chosen = [].concat(picks[qi] == null ? [] : picks[qi]);
      chosen.forEach(function (idx) {
        var o = Q.o[idx];
        if (!o) return;
        for (var k in o.s) tot[k] += o.s[k] * Q.w / chosen.length;
      });
    });
    /* desempate: en empate gana el servicio que más puntuó en la pregunta 1 */
    var q1 = {};
    [].concat(picks[0] == null ? [] : picks[0]).forEach(function (idx) {
      var o = QUESTIONS[0].o[idx];
      if (o) for (var k in o.s) q1[k] = (q1[k] || 0) + o.s[k];
    });
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
    see.href = "servicios.html#" + (ANCHOR[best] || best);
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

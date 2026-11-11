/* ============================================================
   SardIA — Selector de idioma (ES · CAT · EN)
   ------------------------------------------------------------
   El castellano es el idioma base (queda en el HTML tal cual,
   por SEO y para usuarios sin JavaScript). Este script:
     1. Inyecta el conmutador ES/CAT/EN en la cabecera.
     2. Traduce el texto visible + atributos/meta/title al vuelo.
     3. Recuerda la elección en localStorage.
   No hay recarga: al pulsar, se retraduce el DOM en el sitio.
   Todo el copy traducido vive en el objeto T de más abajo.
   ============================================================ */
(function () {
  "use strict";

  var STORAGE = "sardia_lang";
  var DEFAULT = "ca";
  var LANGS = ["es", "ca", "en"];
  var LABEL = { es: "ES", ca: "CAT", en: "EN" };
  var HTMLLANG = { es: "es", ca: "ca", en: "en" };
  var OGLOCALE = { es: "es_ES", ca: "ca_ES", en: "en_GB" };

  /* ---------- diccionario: clave = castellano normalizado ---------- */
  var T = {
    /* ===== compartido: cabecera, navegación y pie ===== */
    "SardIA — inicio": { ca: "SardIA — inici", en: "SardIA — home" },
    "Principal": { ca: "Principal", en: "Main" },
    "Inicio": { ca: "Inici", en: "Home" },
    "Servicios": { ca: "Serveis", en: "Services" },
    "Nosotros": { ca: "Nosaltres", en: "About" },
    "Contacto": { ca: "Contacte", en: "Contact" },
    "Reserva una llamada": { ca: "Reserva una trucada", en: "Book a call" },
    "Abrir menú": { ca: "Obrir menú", en: "Open menu" },
    "Cerrar menú": { ca: "Tancar menú", en: "Close menu" },
    "Consultoría de datos e inteligencia artificial. Domina las nuevas corrientes: Impulsa tu negocio hacia la modernidad": { ca: "Consultoria de dades i intel·ligència artificial. Domina els nous corrents: impulsa el teu negoci cap a la modernitat", en: "Data and artificial intelligence consultancy. Master the new currents: move your business into the modern era" },
    "Auditoría de procesos": { ca: "Auditoria de processos", en: "Process audit" },
    "Automatización de flujos": { ca: "Automatització de fluxos", en: "Workflow automation" },
    "Datos y cuadros de mando": { ca: "Dades i quadres de comandament", en: "Data and dashboards" },
    "CRM y ERP automatizados": { ca: "CRM i ERP automatitzats", en: "Automated CRM and ERP" },
    "Formación": { ca: "Formació", en: "Training" },
    "Predicción de negocio": { ca: "Predicció de negoci", en: "Business forecasting" },
    "Creación de páginas web": { ca: "Creació de pàgines web", en: "Web design" },
    "© 2026 SardIA. Todos los derechos reservados.": { ca: "© 2026 SardIA. Tots els drets reservats.", en: "© 2026 SardIA. All rights reserved." },
    "Datos, automatización e inteligencia artificial": { ca: "Dades, automatització i intel·ligència artificial", en: "Data, automation and artificial intelligence" },

    /* ===== inicio: meta / title / og ===== */
    "SardIA — Consultoría de datos e inteligencia artificial": { ca: "SardIA — Consultoria de dades i intel·ligència artificial", en: "SardIA — Data and AI consultancy" },
    "Ordenamos tus datos, conectamos lo que ya usas y automatizamos lo que hoy se hace a mano. Consultoría de datos e IA para empresas de cualquier tamaño.": { ca: "Ordenem les teves dades, connectem el que ja fas servir i automatitzem el que avui es fa a mà. Consultoria de dades i IA per a empreses de qualsevol mida.", en: "We organise your data, connect the tools you already use and automate what's done by hand today. Data and AI consultancy for companies of any size." },
    "SardIA — Domina las nuevas corrientes": { ca: "SardIA — Domina els nous corrents", en: "SardIA — Master the new currents" },
    "Impulsa tu negocio hacia la modernidad. Consultoría de datos e inteligencia artificial.": { ca: "Impulsa el teu negoci cap a la modernitat. Consultoria de dades i intel·ligència artificial.", en: "Move your business into the modern era. Data and artificial intelligence consultancy." },

    /* ===== inicio: hero ===== */
    "Consultoría de datos e inteligencia artificial": { ca: "Consultoria de dades i intel·ligència artificial", en: "Data and artificial intelligence consultancy" },
    "Domina las nuevas corrientes": { ca: "Domina els nous corrents", en: "Master the new currents" },
    "Impulsa tu negocio hacia la modernidad": { ca: "Impulsa el teu negoci cap a la modernitat", en: "Move your business into the modern era" },
    "Ordenamos tus datos, conectamos las herramientas que ya usas con nueva tecnología y automatizamos lo que hoy se hace a mano.": { ca: "Ordenem les teves dades, connectem les eines que ja fas servir amb tecnologia nova i automatitzem el que avui es fa a mà.", en: "We organise your data, connect the tools you already use with new technology and automate what's done by hand today." },
    "Solicitar auditoría": { ca: "Sol·licitar auditoria", en: "Request an audit" },
    "Ver servicios": { ca: "Veure serveis", en: "See services" },
    "Valls · Consultoría de datos e IA": { ca: "Valls · Consultoria de dades i IA", en: "Valls · Data and AI consultancy" },
    "Consultoría de datos e inteligencia artificial en Valls. Ordenamos tus datos y automatizamos lo que hoy se hace a mano.": { ca: "Consultoria de dades i intel·ligència artificial a Valls. Ordenem les teves dades i automatitzem el que avui es fa a mà.", en: "Data and artificial intelligence consultancy in Valls. We organise your data and automate what's done by hand today." },
    "Descubre qué servicio te encaja": { ca: "Descobreix quin servei t'encaixa", en: "Find out which service fits you" },
    "Hablar con nosotros": { ca: "Parlar amb nosaltres", en: "Talk to us" },

    /* ===== inicio: por qué ===== */
    "Por qué SardIA": { ca: "Per què SardIA", en: "Why SardIA" },
    "No implementamos IA por tendencia.": { ca: "No implementem IA per tendència.", en: "We don't add AI because it's trending." },
    "La tecnología es solo el medio. Automatizamos lo rutinario para que te centres en lo que importa.": { ca: "La tecnologia només és el mitjà. Automatitzem el rutinari perquè et centris en el que importa.", en: "Technology is just the means. We automate the routine so you can focus on what matters." },
    "Una semana cualquiera": { ca: "Una setmana qualsevol", en: "Any given week" },
    "Alguien pasa las facturas del PDF al programa de contabilidad, una a una.": { ca: "Algú passa les factures del PDF al programa de comptabilitat, una a una.", en: "Someone copies invoices from PDF into the accounting software, one by one." },
    "El informe del mes se monta a mano y llega cuando el mes ya ha pasado.": { ca: "L'informe del mes es munta a mà i arriba quan el mes ja ha passat.", en: "The monthly report is built by hand and lands once the month is already over." },
    "La misma cifra aparece de tres maneras distintas en tres sitios distintos.": { ca: "La mateixa xifra apareix de tres maneres diferents en tres llocs diferents.", en: "The same figure shows up three different ways in three different places." },
    "La semana siguiente": { ca: "La setmana següent", en: "The following week" },
    "La factura": { ca: "La factura", en: "The invoice" },
    "entra sola y llega revisada": { ca: "entra sola i arriba revisada", en: "comes in on its own, already checked" },
    ". Solo miras lo que no cuadra.": { ca: ". Només mires el que no quadra.", en: ". You only look at what doesn't add up." },
    "El informe": { ca: "L'informe", en: "The report" },
    "ya está hecho": { ca: "ja està fet", en: "is already done" },
    "cuando abres el correo el lunes.": { ca: "quan obres el correu el dilluns.", en: "when you open your email on Monday." },
    "Hay": { ca: "Hi ha", en: "There's" },
    "un número": { ca: "un número", en: "one number" },
    ", y es el mismo para todo el mundo.": { ca: ", i és el mateix per a tothom.", en: ", and it's the same for everyone." },

    /* ===== inicio: manifiesto ===== */
    "Antes de automatizar": { ca: "Abans d'automatitzar", en: "Before automating" },
    "Automatizar sobre datos sucios solo sirve para equivocarse más rápido.": { ca: "Automatitzar sobre dades brutes només serveix per equivocar-se més ràpid.", en: "Automating on dirty data only helps you get it wrong faster." },
    "Por eso nunca empezamos por el algoritmo. Primero aseguramos la trazabilidad del dato, saneamos su origen y definimos una única fuente de verdad.": { ca: "Per això mai no comencem per l'algorisme. Primer assegurem la traçabilitat de la dada, sanegem el seu origen i definim una única font de veritat.", en: "That's why we never start with the algorithm. First we secure data traceability, clean up its source and define a single source of truth." },
    "Qué hacemos con los datos": { ca: "Què fem amb les dades", en: "What we do with data" },

    /* ===== inicio: servicios ===== */
    "Seis formas de recuperar tiempo": { ca: "Sis maneres de recuperar temps", en: "Six ways to win back time" },
    "Cuál te toca a ti sale de la auditoría. Estas son las seis salidas posibles.": { ca: "Quina et toca a tu surt de l'auditoria. Aquestes són les sis sortides possibles.", en: "Which one is yours comes out of the audit. These are the six possible routes." },
    "Webs animadas hechas a medida, con SEO y AEO para que te encuentren tanto las personas como las IA.": { ca: "Webs animades fetes a mida, amb SEO i AEO perquè et trobin tant les persones com les IA.", en: "Custom animated websites, with SEO and AEO so both people and AIs can find you." },
    "Factura → contabilidad. Pedido → hoja. Lead → CRM. Lo que hoy se hace copiando y pegando.": { ca: "Factura → comptabilitat. Comanda → full. Lead → CRM. El que avui es fa copiant i enganxant.", en: "Invoice → accounting. Order → sheet. Lead → CRM. Whatever's done today by copy-paste." },
    "Una pantalla con los indicadores que de verdad miras, alimentada sola desde tus fuentes.": { ca: "Una pantalla amb els indicadors que de veritat mires, alimentada sola des de les teves fonts.", en: "One screen with the indicators you actually watch, fed on its own from your sources." },
    "El CRM gestiona tus ventas y clientes; el ERP centraliza tus operaciones y finanzas. Los conectamos para que la información fluya sola sin duplicar tareas.": { ca: "El CRM gestiona les teves vendes i clients; l'ERP centralitza les teves operacions i finances. Els connectem perquè la informació flueixi sola sense duplicar tasques.", en: "The CRM handles your sales and customers; the ERP centralises your operations and finances. We connect them so information flows on its own without duplicating work." },
    "Talleres prácticos sobre vuestros propios documentos. Al día siguiente ya se usa.": { ca: "Tallers pràctics sobre els vostres propis documents. L'endemà ja s'utilitza.", en: "Hands-on workshops on your own documents. It's in use the next day." },
    "Ventas, demanda o facturación previstas a partir de tu histórico, con el margen de error traducido a euros.": { ca: "Vendes, demanda o facturació previstes a partir del teu històric, amb el marge d'error traduït a euros.", en: "Sales, demand or revenue forecast from your own history, with the margin of error translated into euros." },
    "Ver el catálogo completo": { ca: "Veure el catàleg complet", en: "See the full catalogue" },

    /* ===== inicio: cómo trabajamos ===== */
    "Cómo trabajamos": { ca: "Com treballem", en: "How we work" },
    "Cuatro pasos, ninguno grande": { ca: "Quatre passos, cap de gran", en: "Four steps, none of them big" },
    "Escuchamos": { ca: "Escoltem", en: "We listen" },
    "Preguntamos por tus procesos, no por tu tecnología.": { ca: "Preguntem pels teus processos, no per la teva tecnologia.", en: "We ask about your processes, not your technology." },
    "Traducimos": { ca: "Traduïm", en: "We translate" },
    "Te devolvemos la respuesta en horas y en euros.": { ca: "Et tornem la resposta en hores i en euros.", en: "We give you the answer back in hours and in euros." },
    "Probamos en pequeño": { ca: "Provem en petit", en: "We test small" },
    "Elaboramos una muestra express para decidir.": { ca: "Elaborem una mostra exprés per decidir.", en: "We build a quick sample so you can decide." },
    "Seguimos contigo": { ca: "Continuem amb tu", en: "We stay with you" },
    "Nos quedamos para ayudar al cliente en el proceso de transformación.": { ca: "Ens quedem per ajudar el client en el procés de transformació.", en: "We stick around to help you through the transformation." },

    /* ===== inicio: FAQ ===== */
    "Preguntas frecuentes": { ca: "Preguntes freqüents", en: "FAQ" },
    "Las dudas razonables": { ca: "Els dubtes raonables", en: "The reasonable doubts" },
    "Las que salen en casi todas las primeras reuniones. Mejor responderlas antes.": { ca: "Les que surten en gairebé totes les primeres reunions. Millor respondre-les abans.", en: "The ones that come up in almost every first meeting. Better to answer them upfront." },
    "¿Esto no es muy caro para una empresa como la mía?": { ca: "Això no és massa car per a una empresa com la meva?", en: "Isn't this too expensive for a company like mine?" },
    "No hay cuota fija ni contrato largo. Acotamos un proceso, te damos un precio cerrado por escrito y decides tú si hay un segundo paso. Si el número no encaja, ajustamos el alcance, no la calidad.": { ca: "No hi ha quota fixa ni contracte llarg. Acotem un procés, et donem un preu tancat per escrit i decideixes tu si hi ha un segon pas. Si el número no encaixa, ajustem l'abast, no la qualitat.", en: "There's no fixed fee or long contract. We scope one process, give you a fixed price in writing and you decide whether there's a second step. If the number doesn't fit, we adjust the scope, not the quality." },
    "Si automatizo, ¿qué pasa con mi equipo?": { ca: "Si automatitzo, què passa amb el meu equip?", en: "If I automate, what happens to my team?" },
    "Nada, salvo las tareas mecánicas. En los equipos con los que trabajamos casi nunca sobra gente: sobran horas metidas en trabajo repetitivo. Esas horas son las que liberamos.": { ca: "Res, tret de les tasques mecàniques. En els equips amb què treballem gairebé mai sobra gent: sobren hores ficades en feina repetitiva. Aquestes hores són les que alliberem.", en: "Nothing, except the mechanical tasks. On the teams we work with there's almost never a surplus of people: there's a surplus of hours sunk into repetitive work. Those are the hours we free up." },
    "No tengo conocimientos técnicos, ¿es un problema?": { ca: "No tinc coneixements tècnics, és un problema?", en: "I have no technical background, is that a problem?" },
    "No. Si lo deseas, te explicamos el proceso paso a paso —qué entra, qué sale y qué pasa si algo falla— sin tecnicismos. Lo dejamos documentado para que tu equipo lo mantenga sin depender de nosotros, y ofrecemos formación tanto para equipos como individual.": { ca: "No. Si ho vols, t'expliquem el procés pas a pas —què entra, què surt i què passa si alguna cosa falla— sense tecnicismes. Ho deixem documentat perquè el teu equip ho mantingui sense dependre de nosaltres, i oferim formació tant per a equips com individual.", en: "No. If you like, we'll walk you through the process step by step —what goes in, what comes out and what happens if something breaks— without jargon. We leave it documented so your team can maintain it without depending on us, and we offer training for teams as well as one-to-one." },
    "¿Y si ya lo llevamos con hojas de cálculo?": { ca: "I si ja ho portem amb fulls de càlcul?", en: "What if we already manage it with spreadsheets?" },
    "Muchas veces las hojas de cálculo son una gran herramienta, y si te funcionan te lo decimos sin rodeos. Pero también se pueden automatizar: conectarlas con tus otras herramientas para que se actualicen solas, sin copiar y pegar. Así, la persona que hoy pica datos a mano puede dedicarse a algo más productivo: revisar y decidir, que es donde más valor aporta. Lo que solemos plantear juntos es qué pasa cuando crece el volumen o cuando la persona que las mantiene coge vacaciones.": { ca: "Moltes vegades els fulls de càlcul són una gran eina, i si et funcionen t'ho diem sense embuts. Però també es poden automatitzar: connectar-los amb les teves altres eines perquè s'actualitzin sols, sense copiar i enganxar. Així, la persona que avui pica dades a mà pot dedicar-se a alguna cosa més productiva: revisar i decidir, que és on més valor aporta. El que solem plantejar junts és què passa quan creix el volum o quan la persona que els manté se'n va de vacances.", en: "Spreadsheets are often a great tool, and if they work for you we'll say so straight. But they can also be automated: connected to your other tools so they update themselves, with no copy-pasting. That way, the person who types data in by hand today can move on to something more productive: reviewing and deciding, which is where they add the most value. What we usually ask together is what happens when the volume grows or when the person who maintains them goes on holiday." },
    "¿Dónde acaban mis datos?": { ca: "On acaben les meves dades?", en: "Where do my data end up?" },
    "En la infraestructura que acordemos contigo, y en ningún otro sitio: no se usan para entrenar modelos externos. Antes de mover un solo dato te enseñamos el recorrido completo.": { ca: "A la infraestructura que acordem amb tu, i enlloc més: no s'utilitzen per entrenar models externs. Abans de moure una sola dada et mostrem el recorregut complet.", en: "On the infrastructure we agree with you, and nowhere else: they're not used to train external models. Before we move a single record we show you the whole path." },
    "¿Y si al final no funciona?": { ca: "I si al final no funciona?", en: "And what if it doesn't work out?" },
    "Paras ahí, sin coste añadido. Por eso el primer paso es pequeño: nada de infraestructura enorme ni compromiso a años. Es la forma que hemos encontrado de que probar salga barato.": { ca: "Pares aquí, sense cost afegit. Per això el primer pas és petit: res d'infraestructura enorme ni compromís a anys. És la manera que hem trobat perquè provar surti barat.", en: "You stop there, at no extra cost. That's why the first step is small: no huge infrastructure, no multi-year commitment. It's the way we've found to make trying cheap." },

    /* ===== inicio: CTA ===== */
    "¿Qué tarea repetitiva le está robando más horas a tu empresa?": { ca: "Quina tasca repetitiva li està robant més hores a la teva empresa?", en: "Which repetitive task is stealing the most hours from your business?" },
    "Media hora, sin preparar nada. Si al escucharte no vemos nada que pueda ayudarte, te lo decimos y no habrás perdido más que media hora.": { ca: "Mitja hora, sense preparar res. Si en escoltar-te no veiem res que et pugui ajudar, t'ho diem i no hauràs perdut més que mitja hora.", en: "Half an hour, nothing to prepare. If, once we've heard you out, we see nothing we can help with, we'll tell you and you'll have lost no more than half an hour." },

    /* ===== servicios: meta / title / og ===== */
    "Servicios — SardIA": { ca: "Serveis — SardIA", en: "Services — SardIA" },
    "Auditoría de procesos, automatización de flujos, cuadros de mando, CRM y ERP a medida, formación, modelos de predicción y creación de páginas web con SEO y AEO.": { ca: "Auditoria de processos, automatització de fluxos, quadres de comandament, CRM i ERP a mida, formació, models de predicció i creació de pàgines web amb SEO i AEO.", en: "Process audits, workflow automation, dashboards, custom CRM and ERP, training, forecasting models and web design with SEO and AEO." },
    "Del diagnóstico inicial a la arquitectura completa, paso a paso y sin saltos.": { ca: "Del diagnòstic inicial a l'arquitectura completa, pas a pas i sense salts.", en: "From the initial diagnosis to the full architecture, step by step and with no leaps." },

    /* ===== servicios: page-hero ===== */
    "Del diagnóstico": { ca: "Del diagnòstic", en: "From diagnosis" },
    "a la arquitectura": { ca: "a l'arquitectura", en: "to architecture" },
    "Cuatro escalones y un catálogo. Nadie sube al siguiente escalón hasta que el anterior ha dado un resultado que se puede ver.": { ca: "Quatre esglaons i un catàleg. Ningú puja a l'esglaó següent fins que l'anterior ha donat un resultat que es pot veure.", en: "Four steps and a catalogue. No one moves up to the next step until the previous one has produced a result you can see." },
    "Ver el catálogo": { ca: "Veure el catàleg", en: "See the catalogue" },

    /* ===== servicios: el recorrido ===== */
    "El recorrido": { ca: "El recorregut", en: "The journey" },
    "Cuatro escalones, y solo subes si el anterior ha funcionado": { ca: "Quatre esglaons, i només puges si l'anterior ha funcionat", en: "Four steps, and you only move up if the last one worked" },
    "PASO 01": { ca: "PAS 01", en: "STEP 01" },
    "PASO 02": { ca: "PAS 02", en: "STEP 02" },
    "PASO 03": { ca: "PAS 03", en: "STEP 03" },
    "PASO 04": { ca: "PAS 04", en: "STEP 04" },
    "Auditoría": { ca: "Auditoria", en: "Audit" },
    "Miramos cómo se trabaja realmente en cada área. Salimos con los circuitos sobre papel y un plan priorizado. Aunque pares aquí, te llevas un mapa de tu negocio que antes no existía.": { ca: "Mirem com es treballa realment a cada àrea. Sortim amb els circuits sobre paper i un pla prioritzat. Encara que paris aquí, t'endús un mapa del teu negoci que abans no existia.", en: "We look at how each area actually works. We come out with the workflows on paper and a prioritised plan. Even if you stop here, you take away a map of your business that didn't exist before." },
    "Punto de partida": { ca: "Punt de partida", en: "Starting point" },
    "Implementación Express": { ca: "Implementació Exprés", en: "Express implementation" },
    "Se elige un proceso de los que salieron en la auditoría, se monta y se deja funcionando. Es la forma barata de comprobar si te encaja trabajar con nosotros.": { ca: "Es tria un procés dels que van sortir a l'auditoria, es munta i es deixa funcionant. És la manera barata de comprovar si t'encaixa treballar amb nosaltres.", en: "We pick one of the processes the audit surfaced, build it and leave it running. It's the cheap way to check whether working with us fits you." },
    "Primer resultado visible": { ca: "Primer resultat visible", en: "First visible result" },
    "Arquitectura y MVP": { ca: "Arquitectura i MVP", en: "Architecture and MVP" },
    "Dónde vive el dato, cómo se conectan los sistemas y qué sigue siendo decisión de una persona. Se entrega por versiones y cada una se prueba con tu equipo.": { ca: "On viu la dada, com es connecten els sistemes i què continua sent decisió d'una persona. Es lliura per versions i cada una es prova amb el teu equip.", en: "Where the data lives, how the systems connect and what remains a person's decision. Delivered in versions, each one tested with your team." },
    "Desarrollo a medida": { ca: "Desenvolupament a mida", en: "Custom development" },
    "Acompañamiento": { ca: "Acompanyament", en: "Ongoing support" },
    "Un proyecto no termina cuando se entrega. Reuniones periódicas. Si algo no se usa como esperábamos, se cambia.": { ca: "Un projecte no acaba quan es lliura. Reunions periòdiques. Si alguna cosa no s'utilitza com esperàvem, es canvia.", en: "A project doesn't end when it's delivered. Regular meetings. If something isn't used the way we expected, we change it." },
    "Contacto continuo": { ca: "Contacte continu", en: "Continuous contact" },
    "Todas las áreas": { ca: "Totes les àrees", en: "Every area" },
    "Marketing, ventas, operaciones y administración.": { ca: "Màrqueting, vendes, operacions i administració.", en: "Marketing, sales, operations and admin." },
    "Con quien hace el trabajo": { ca: "Amb qui fa la feina", en: "With whoever does the work" },
    "Hablamos con quienes realizan el trabajo diario.": { ca: "Parlem amb qui fa la feina del dia a dia.", en: "We talk to the people doing the day-to-day work." },
    "Flujos documentados": { ca: "Fluxos documentats", en: "Documented workflows" },
    "Cómo se trabaja hoy, paso a paso, antes de proponer cambiar nada.": { ca: "Com es treballa avui, pas a pas, abans de proposar canviar res.", en: "How things work today, step by step, before we propose changing anything." },
    "Plan priorizado": { ca: "Pla prioritzat", en: "Prioritised plan" },
    "Qué aporta más con menos esfuerzo, qué espera y qué no compensa tocar.": { ca: "Què aporta més amb menys esforç, què pot esperar i què no compensa tocar.", en: "What delivers most for least effort, what can wait and what's not worth touching." },

    /* ===== servicios: catálogo ===== */
    "Catálogo": { ca: "Catàleg", en: "Catalogue" },
    "Qué podemos hacer por dentro": { ca: "Què podem fer per dins", en: "What we can do under the hood" },
    "Todo se puede contratar suelto. El alcance y el precio se cierran por escrito antes de tocar nada.": { ca: "Tot es pot contractar per separat. L'abast i el preu es tanquen per escrit abans de tocar res.", en: "Everything can be hired separately. Scope and price are fixed in writing before we touch anything." },
    "La base de todo": { ca: "La base de tot", en: "The foundation of everything" },
    "Limpieza y estructuración de datos": { ca: "Neteja i estructuració de dades", en: "Data cleaning and structuring" },
    "Dejar la información en un estado sobre el que se pueda construir: sin duplicados, con criterios coherentes y con una única versión de cada cifra.": { ca: "Deixar la informació en un estat sobre el qual es pugui construir: sense duplicats, amb criteris coherents i amb una única versió de cada xifra.", en: "Leaving your information in a state you can build on: no duplicates, consistent criteria and a single version of each figure." },
    "Cuadros de mando a medida": { ca: "Quadres de comandament a mida", en: "Custom dashboards" },
    "Los indicadores que de verdad miras, en una pantalla que se refresca sola desde tus fuentes. Se acabó pedirle a alguien el Excel del mes.": { ca: "Els indicadors que de veritat mires, en una pantalla que es refresca sola des de les teves fonts. S'ha acabat demanar-li a algú l'Excel del mes.", en: "The indicators you actually watch, on a screen that refreshes itself from your sources. No more asking someone for the monthly Excel." },
    "Informes automáticos": { ca: "Informes automàtics", en: "Automated reports" },
    "El mismo resumen, con la periodicidad que te sirva, llegando solo por correo o por WhatsApp.": { ca: "El mateix resum, amb la periodicitat que et convingui, arribant sol per correu o per WhatsApp.", en: "The same summary, at whatever frequency suits you, arriving on its own by email or WhatsApp." },
    "Arquitectura de datos conectando fuentes, métricas y analítica en tiempo real": { ca: "Arquitectura de dades connectant fonts, mètriques i analítica en temps real", en: "Data architecture connecting sources, metrics and real-time analytics" },
    "Automatización y RPA": { ca: "Automatització i RPA", en: "Automation and RPA" },
    "Lo que hoy se hace a mano": { ca: "El que avui es fa a mà", en: "What's done by hand today" },
    "Automatización de un flujo concreto": { ca: "Automatització d'un flux concret", en: "Automating one specific workflow" },
    "Factura → contabilidad. Pedido → hoja de cálculo. Lead → CRM. Un circuito, con su alcance cerrado y su fecha de entrega.": { ca: "Factura → comptabilitat. Comanda → full de càlcul. Lead → CRM. Un circuit, amb el seu abast tancat i la seva data de lliurament.", en: "Invoice → accounting. Order → spreadsheet. Lead → CRM. One workflow, with a fixed scope and a delivery date." },
    "Agentes y bots conversacionales": { ca: "Agents i bots conversacionals", en: "Conversational agents and bots" },
    "Recordatorios de cita y atención básica por WhatsApp o correo. Contestan lo repetitivo y te pasan a ti lo que necesita a una persona.": { ca: "Recordatoris de cita i atenció bàsica per WhatsApp o correu. Contesten el repetitiu i et passen a tu el que necessita una persona.", en: "Appointment reminders and basic support over WhatsApp or email. They handle the repetitive part and pass to you whatever needs a person." },
    "Sobre el coste de la IA.": { ca: "Sobre el cost de la IA.", en: "About the cost of AI." },
    "Cuando un flujo usa un modelo de lenguaje, la API va aparte y se factura a coste, sin margen. Ves el gasto real desde el primer día.": { ca: "Quan un flux fa servir un model de llenguatge, l'API va a part i es factura a cost, sense marge. Veus la despesa real des del primer dia.", en: "When a workflow uses a language model, the API is billed separately at cost, with no markup. You see the real spend from day one." },
    "El cliente escribe, el sistema responde": { ca: "El client escriu, el sistema respon", en: "The customer writes, the system answers" },
    "ERP y CRM a medida": { ca: "ERP i CRM a mida", en: "Custom ERP and CRM" },
    "Diseñado para empresas que necesitan más potencia y orden que una hoja de Excel, pero sin la complejidad ni los costes desorbitados de un software tradicional.": { ca: "Dissenyat per a empreses que necessiten més potència i ordre que un full d'Excel, però sense la complexitat ni els costos desorbitats d'un programari tradicional.", en: "Built for companies that need more power and order than an Excel sheet, but without the complexity or the runaway costs of traditional software." },
    "Tu operativa y tus ventas conectadas en un solo lugar. El punto de encuentro entre captar clientes y gestionar tu negocio.": { ca: "La teva operativa i les teves vendes connectades en un sol lloc. El punt de trobada entre captar clients i gestionar el teu negoci.", en: "Your operations and your sales connected in one place. Where winning customers meets running your business." },
    "Facturación y cobros conectados:": { ca: "Facturació i cobraments connectats:", en: "Connected invoicing and payments:" },
    "Generación automática de presupuestos, facturas recurrentes y sincronización directa con tu pasarela de pago o gestoría.": { ca: "Generació automàtica de pressupostos, factures recurrents i sincronització directa amb la teva passarel·la de pagament o gestoria.", en: "Automatic generation of quotes, recurring invoices and direct sync with your payment gateway or accountant." },
    "Control de stock y alertas de rotura:": { ca: "Control d'estoc i alertes de ruptura:", en: "Stock control and out-of-stock alerts:" },
    "Si vendes producto o material, el inventario se descuenta automáticamente con cada venta y te avisa cuando un artículo baja del mínimo fijado.": { ca: "Si vens producte o material, l'inventari es descompta automàticament amb cada venda i t'avisa quan un article baixa del mínim fixat.", en: "If you sell product or materials, inventory is deducted automatically with each sale and you're alerted when an item drops below the set minimum." },
    "Entrada multicanal": { ca: "Entrada multicanal", en: "Multichannel intake" },
    ": correo, WhatsApp, redes y formulario web al mismo sitio.": { ca: ": correu, WhatsApp, xarxes i formulari web al mateix lloc.", en: ": email, WhatsApp, social and web form into one place." },
    "Calificación y seguimiento comercial:": { ca: "Qualificació i seguiment comercial:", en: "Lead scoring and sales follow-up:" },
    "para atender antes a quien está más cerca de comprar.": { ca: "per atendre abans qui està més a prop de comprar.", en: "so you reach whoever's closest to buying first." },
    "Generación y firma de propuestas en 1 click:": { ca: "Generació i signatura de propostes amb 1 clic:", en: "Generate and sign proposals in 1 click:" },
    "Crea presupuestos a partir de plantillas con los datos del cliente ya volcados.": { ca: "Crea pressupostos a partir de plantilles amb les dades del client ja introduïdes.", en: "Create quotes from templates with the customer's details already filled in." },
    "Reactivación automática de clientes inactivos:": { ca: "Reactivació automàtica de clients inactius:", en: "Automatic reactivation of inactive customers:" },
    "El sistema detecta cuentas sin compras o interacción en más de 60 días y dispara un mensaje personalizado.": { ca: "El sistema detecta comptes sense compres ni interacció en més de 60 dies i dispara un missatge personalitzat.", en: "The system spots accounts with no purchase or interaction in over 60 days and fires off a personalised message." },
    "¿Por dónde arrancar?": { ca: "Per on començar?", en: "Where to start?" },
    "Tú marcas la prioridad según lo que te quite el sueño hoy.": { ca: "Tu marques la prioritat segons el que et tregui la son avui.", en: "You set the priority based on whatever's keeping you up today." },
    "Que no dependa de nosotros": { ca: "Que no depengui de nosaltres", en: "So it doesn't depend on us" },
    "Talleres de IA para perfiles administrativos": { ca: "Tallers d'IA per a perfils administratius", en: "AI workshops for admin roles" },
    "Redacción, organización del trabajo y gestión documental con asistentes de IA. Se trabaja sobre los documentos reales del equipo, no sobre ejemplos de manual.": { ca: "Redacció, organització de la feina i gestió documental amb assistents d'IA. Es treballa sobre els documents reals de l'equip, no sobre exemples de manual.", en: "Writing, work organisation and document management with AI assistants. You work on the team's real documents, not textbook examples." },
    "Formación a particulares y centros educativos": { ca: "Formació a particulars i centres educatius", en: "Training for individuals and schools" },
    "Para quien quiere mejorar sus competencias por su cuenta, y para escuelas que quieren llevar estas herramientas al aula.": { ca: "Per a qui vol millorar les seves competències pel seu compte, i per a escoles que volen portar aquestes eines a l'aula.", en: "For anyone looking to build their own skills, and for schools that want to bring these tools into the classroom." },
    "Dos personas construyendo juntas una automatización delante de la pantalla": { ca: "Dues persones construint juntes una automatització davant de la pantalla", en: "Two people building an automation together in front of the screen" },
    "Se aprende con vuestros propios documentos delante.": { ca: "S'aprèn amb els vostres propis documents al davant.", en: "You learn with your own documents in front of you." },
    "Nada de diapositivas ni de ejemplos de manual: se trabaja sobre los correos, las plantillas y los informes que tu equipo tiene que sacar el lunes.": { ca: "Res de diapositives ni d'exemples de manual: es treballa sobre els correus, les plantilles i els informes que el teu equip ha de treure el dilluns.", en: "No slides, no textbook examples: you work on the emails, templates and reports your team has to get out on Monday." },
    "Modelos de previsión a medida": { ca: "Models de previsió a mida", en: "Custom forecasting models" },
    "Previsión de ventas, de demanda o de facturación construida sobre tu propio histórico. Las métricas de validación te las traducimos a términos de negocio: cuánto se equivoca el modelo y qué significa eso en tu cuenta de resultados.": { ca: "Previsió de vendes, de demanda o de facturació construïda sobre el teu propi històric. Les mètriques de validació te les traduïm a termes de negoci: quant s'equivoca el model i què significa això en el teu compte de resultats.", en: "Sales, demand or revenue forecasting built on your own history. We translate the validation metrics into business terms: how far off the model is and what that means for your bottom line." },
    "Necesita un histórico de datos razonablemente limpio y con suficiente recorrido. Si no lo hay, lo honesto es empezar por ordenar los datos y volver a hablar más adelante.": { ca: "Necessita un històric de dades raonablement net i amb prou recorregut. Si no n'hi ha, l'honest és començar per ordenar les dades i tornar a parlar-ne més endavant.", en: "It needs a reasonably clean data history with enough depth. If there isn't one, the honest move is to start by organising the data and talk again later." },
    "Que te encuentren, humanos y máquinas": { ca: "Que et trobin, humans i màquines", en: "So both humans and machines find you" },
    "Portátil mostrando una web animada de alta gama": { ca: "Portàtil mostrant una web animada d'alta gamma", en: "Laptop showing a high-end animated website" },
    "Webs animadas, no plantillas con tu logotipo encima.": { ca: "Webs animades, no plantilles amb el teu logotip a sobre.", en: "Animated websites, not templates with your logo slapped on top." },
    "Cada pieza —el movimiento, las imágenes, el ritmo del scroll— se produce para tu marca. Se codifica a mano, así que pesa poco y carga rápido.": { ca: "Cada peça —el moviment, les imatges, el ritme del scroll— es produeix per a la teva marca. Es codifica a mà, així que pesa poc i carrega ràpid.", en: "Every piece —the motion, the imagery, the scroll pace— is made for your brand. It's hand-coded, so it's light and loads fast." },
    "Diseño y producción a medida": { ca: "Disseny i producció a mida", en: "Custom design and production" },
    "Primero se fija la marca: cómo suena, qué transmite, a quién le habla. Después se generan las imágenes y las animaciones, y solo entonces se monta. Es más lento que abrir una plantilla, y se nota en el resultado.": { ca: "Primer es fixa la marca: com sona, què transmet, a qui parla. Després es generen les imatges i les animacions, i només llavors es munta. És més lent que obrir una plantilla, i es nota en el resultat.", en: "First we pin down the brand: how it sounds, what it conveys, who it speaks to. Then we generate the imagery and animations, and only then do we build. It's slower than opening a template, and it shows in the result." },
    "SEO y AEO": { ca: "SEO i AEO", en: "SEO and AEO" },
    "El SEO clásico para Google, y el AEO para lo que viene detrás: cada vez más gente le pregunta a una IA en lugar de buscar, y quien entra en las webs son sus rastreadores. Preparamos la tuya para que te recomienden a ti cuando alguien pregunte por tu sector.": { ca: "El SEO clàssic per a Google, i l'AEO per al que ve darrere: cada cop més gent pregunta a una IA en lloc de cercar, i qui entra a les webs són els seus rastrejadors. Preparem la teva perquè et recomanin a tu quan algú pregunti pel teu sector.", en: "Classic SEO for Google, and AEO for what comes next: more and more people ask an AI instead of searching, and it's their crawlers that visit the sites. We get yours ready so you're the one recommended when someone asks about your sector." },
    "Formularios conectados": { ca: "Formularis connectats", en: "Connected forms" },
    "El formulario no acaba en una bandeja de entrada: entra directo en el flujo, crea la ficha y dispara la respuesta. La web deja de ser un folleto y pasa a ser la puerta del sistema.": { ca: "El formulari no acaba en una safata d'entrada: entra directament al flux, crea la fitxa i dispara la resposta. La web deixa de ser un fullet i passa a ser la porta del sistema.", en: "The form doesn't end in an inbox: it goes straight into the workflow, creates the record and triggers the response. The website stops being a brochure and becomes the door into the system." },
    "¿Cuál de estos te toca a ti?": { ca: "Quin d'aquests et toca a tu?", en: "Which of these is yours?" },
    "Esa es exactamente la pregunta que responde la auditoría. Y hasta hacerla, cualquier respuesta nuestra sería adivinar.": { ca: "Aquesta és exactament la pregunta que respon l'auditoria. I fins a fer-la, qualsevol resposta nostra seria endevinar.", en: "That's exactly the question the audit answers. And until we run it, any answer from us would be guesswork." },
    "Conocer a SardIA": { ca: "Conèixer SardIA", en: "Meet SardIA" },

    /* ===== nosotros: meta / title / og ===== */
    "Nosotros — SardIA": { ca: "Nosaltres — SardIA", en: "About — SardIA" },

    /* ===== nosotros: contenido ===== */
    "Desde Valls, en el Camp de Tarragona, ayudamos a autónomos y negocios pequeños a modernizarse y a optimizar sus procesos, con trato directo y sin jerga.": { ca: "Des de Valls, al Camp de Tarragona, ajudem autònoms i negocis petits a modernitzar-se i a optimitzar els seus processos, amb tracte directe i sense tecnicismes.", en: "From Valls, in the Camp de Tarragona, we help freelancers and small businesses modernise and optimise their processes, with a direct approach and no jargon." },
    "Menos tareas a mano.": { ca: "Menys tasques a mà.", en: "Fewer manual tasks." },
    "Más tiempo para tu negocio.": { ca: "Més temps per al teu negoci.", en: "More time for your business." },
    "Una empresa cercana": { ca: "Una empresa propera", en: "A close-by company" },
    "Con base en Valls, en el Camp de Tarragona, ayudamos a negocios de la zona. Sin intermediarios y sin jerga.": { ca: "Amb seu a Valls, al Camp de Tarragona, ajudem negocis de la zona. Sense intermediaris i sense tecnicismes.", en: "Based in Valls, in the Camp de Tarragona, we help local businesses. No middlemen and no jargon." },
    "Ayudamos a autónomos y negocios pequeños a ordenar sus datos y a automatizar lo repetitivo, para que dediquen el tiempo a lo que de verdad importa.": { ca: "Ajudem autònoms i negocis petits a ordenar les seves dades i a automatitzar el repetitiu, perquè dediquin el temps al que de debò importa.", en: "We help freelancers and small businesses organise their data and automate the repetitive work, so they can spend their time on what really matters." },
    "A autónomos y negocios pequeños": { ca: "A autònoms i negocis petits", en: "Freelancers and small businesses" },
    "que quieren modernizarse.": { ca: "que volen modernitzar-se.", en: "who want to modernise." },
    "Con ganas de modernizarse": { ca: "Amb ganes de modernitzar-se", en: "Keen to modernise" },
    "No hace falta saber de tecnología. Basta con querer dejar de hacer a mano lo que se puede automatizar.": { ca: "No cal saber de tecnologia. N'hi ha prou amb voler deixar de fer a mà el que es pot automatitzar.", en: "You don't need to know about technology. You just need to want to stop doing by hand what can be automated." },
    "Sin equipo técnico": { ca: "Sense equip tècnic", en: "No technical team" },
    "No tienes informático ni tiempo para aprender herramientas nuevas. Lo montamos nosotros y te lo dejamos funcionando.": { ca: "No tens informàtic ni temps per aprendre eines noves. Ho muntem nosaltres i t'ho deixem funcionant.", en: "You have no IT person and no time to learn new tools. We set it up and leave it working." },
    "Quiénes somos": { ca: "Qui som", en: "Who we are" },
    "Optimizamos procesos con herramientas estándar y cambios que se notan desde las primeras semanas, sin proyectos eternos.": { ca: "Optimitzem processos amb eines estàndard i canvis que es noten des de les primeres setmanes, sense projectes eterns.", en: "We optimise processes with standard tools and changes you notice within the first weeks, without endless projects." },
    "Hablemos de tu negocio": { ca: "Parlem del teu negoci", en: "Let's talk about your business" },
    "Media hora y salimos de ahí con una idea concreta o con un «no hace falta».": { ca: "Mitja hora i en sortim amb una idea concreta o amb un «no cal».", en: "Half an hour and we come out with a concrete idea or a “no need”." },
    "Icono de SardIA: una raya manta dibujada con una sola línea continua": { ca: "Icona de SardIA: una manta dibuixada amb una sola línia contínua", en: "SardIA icon: a manta ray drawn in a single continuous line" },
    "A quién ayudamos": { ca: "A qui ajudem", en: "Who we help" },
    "Autónomos y negocios pequeños": { ca: "Autònoms i negocis petits", en: "Freelancers and small businesses" },
    "El problema es que no hay tiempo para organizarse. Lo que falta es un plan, no más horas.": { ca: "El problema és que no hi ha temps per organitzar-se. El que falta és un pla, no més hores.", en: "The problem is there's no time to get organised. What's missing is a plan, not more hours." },
    "Con qué trabajamos": { ca: "Amb què treballem", en: "What we work with" },
    "Herramientas estándar, sin dependencias raras": { ca: "Eines estàndard, sense dependències estranyes", en: "Standard tools, no odd dependencies" },

    /* ===== contacto: meta / title / og ===== */
    "Contacto — SardIA": { ca: "Contacte — SardIA", en: "Contact — SardIA" },
    "Media hora de conversación, sin tecnicismos y sin compromiso. Cuéntanos cómo funciona tu negocio y nosotros ponemos las preguntas.": { ca: "Mitja hora de conversa, sense tecnicismes i sense compromís. Explica'ns com funciona el teu negoci i nosaltres posem les preguntes.", en: "Half an hour of conversation, no jargon and no commitment. Tell us how your business works and we'll bring the questions." },
    "El primer paso es una conversación. Sin preparar nada y sin compromiso.": { ca: "El primer pas és una conversa. Sense preparar res i sense compromís.", en: "The first step is a conversation. Nothing to prepare and no commitment." },

    /* ===== contacto: contenido ===== */
    "El primer paso": { ca: "El primer pas", en: "The first step" },
    "es una conversación": { ca: "és una conversa", en: "is a conversation" },
    "No traigas nada preparado. Tú cuentas cómo funciona tu negocio y nosotros ponemos las preguntas.": { ca: "No portis res preparat. Tu expliques com funciona el teu negoci i nosaltres posem les preguntes.", en: "Bring nothing prepared. You explain how your business works and we bring the questions." },
    "Te devolvemos una propuesta de fecha. Media hora, sin compromiso.": { ca: "Et tornem una proposta de data. Mitja hora, sense compromís.", en: "We'll get back to you with a proposed time. Half an hour, no commitment." },
    "Nombre y apellidos": { ca: "Nom i cognoms", en: "Full name" },
    "Empresa": { ca: "Empresa", en: "Company" },
    "Nombre del negocio": { ca: "Nom del negoci", en: "Business name" },
    "Teléfono": { ca: "Telèfon", en: "Phone" },
    "Sector": { ca: "Sector", en: "Sector" },
    "Clínica dental, taller, asesoría, comercio…": { ca: "Clínica dental, taller, gestoria, comerç…", en: "Dental clinic, workshop, agency, shop…" },
    "Tamaño del equipo": { ca: "Mida de l'equip", en: "Team size" },
    "Selecciona una opción": { ca: "Selecciona una opció", en: "Select an option" },
    "Solo yo": { ca: "Només jo", en: "Just me" },
    "2 – 5 personas": { ca: "2 – 5 persones", en: "2 – 5 people" },
    "6 – 15 personas": { ca: "6 – 15 persones", en: "6 – 15 people" },
    "16 – 50 personas": { ca: "16 – 50 persones", en: "16 – 50 people" },
    "Más de 50 personas": { ca: "Més de 50 persones", en: "More than 50 people" },
    "¿Qué parte del día a día os lleva más tiempo?": { ca: "Quina part del dia a dia us pren més temps?", en: "Which part of your day-to-day takes the most time?" },
    "Por ejemplo: pasar las facturas al programa de contabilidad, confirmar citas una a una, montar el informe del mes a mano, cuadrar datos que no coinciden entre sistemas…": { ca: "Per exemple: passar les factures al programa de comptabilitat, confirmar cites una a una, muntar l'informe del mes a mà, quadrar dades que no coincideixen entre sistemes…", en: "For example: entering invoices into the accounting software, confirming appointments one by one, building the monthly report by hand, reconciling data that doesn't match across systems…" },
    "He leído y acepto que SardIA trate mis datos para responder a esta solicitud. No se comparten con terceros ni se usan para entrenar nada externo.": { ca: "He llegit i accepto que SardIA tracti les meves dades per respondre aquesta sol·licitud. No es comparteixen amb tercers ni s'utilitzen per entrenar res extern.", en: "I have read and accept that SardIA processes my data to respond to this request. It is not shared with third parties or used to train anything external." },
    "Enviar solicitud": { ca: "Enviar sol·licitud", en: "Send request" },
    "Respondemos en menos de 48 horas laborables. Si prefieres escribir directamente, tienes el correo aquí al lado.": { ca: "Responem en menys de 48 hores laborables. Si prefereixes escriure directament, tens el correu aquí al costat.", en: "We reply within 48 working hours. If you'd rather write directly, the email is right here." },
    "Escríbenos": { ca: "Escriu-nos", en: "Write to us" },
    "Dónde estamos": { ca: "On som", en: "Where we are" },
    "La base está en el Camp de Tarragona, y de ahí sale el radio habitual de trabajo: Tarragona, las Terres de l'Ebre y el resto de Cataluña.": { ca: "La base és al Camp de Tarragona, i d'allà surt el radi habitual de treball: Tarragona, les Terres de l'Ebre i la resta de Catalunya.", en: "Our base is in the Camp de Tarragona, and that sets the usual working radius: Tarragona, the Terres de l'Ebre and the rest of Catalonia." },
    "Hay partes que se hacen mejor en persona —la auditoría, sin ir más lejos, empieza sentados en tu oficina— y para eso nos desplazamos. Si estás lejos, lo hablamos: el proceso funciona igual de bien en remoto.": { ca: "Hi ha parts que es fan millor en persona —l'auditoria, sense anar més lluny, comença asseguts a la teva oficina— i per això ens desplacem. Si ets lluny, ho parlem: el procés funciona igual de bé en remot.", en: "Some parts are better done in person —the audit, for one, starts sitting in your office— and we travel for that. If you're far away, let's talk: the process works just as well remotely." },
    "Qué no vamos a hacer": { ca: "Què no farem", en: "What we won't do" },
    "Ni llamarte cuatro veces, ni meterte en una lista de correo, ni mandarte un presupuesto de veinte páginas que no has pedido. Escribes, hablamos una vez y decides tú.": { ca: "Ni trucar-te quatre vegades, ni ficar-te en una llista de correu, ni enviar-te un pressupost de vint pàgines que no has demanat. Escrius, parlem una vegada i decideixes tu.", en: "No calling you four times, no adding you to a mailing list, no sending you a twenty-page quote you didn't ask for. You write, we talk once and you decide." },
    "Qué pasa después": { ca: "Què passa després", en: "What happens next" },
    "Nadie te va a pedir que firmes un proyecto": { ca: "Ningú et demanarà que signis un projecte", en: "No one's going to ask you to sign off on a project" },
    "Nada de propuestas de cuarenta páginas. Esto es lo que pasa después de darle a enviar.": { ca: "Res de propostes de quaranta pàgines. Això és el que passa després de prémer enviar.", en: "No forty-page proposals. This is what happens after you hit send." },
    "Hablamos": { ca: "Parlem", en: "We talk" },
    "Nos cuentas dónde se atasca tu día a día. Preguntamos bastante y no vendemos nada.": { ca: "Ens expliques on s'encalla el teu dia a dia. Preguntem força i no venem res.", en: "You tell us where your day-to-day gets stuck. We ask plenty and sell nothing." },
    "Te respondemos en horas y euros": { ca: "Et responem en hores i euros", en: "We answer in hours and euros" },
    "Cuánto llevaría y cuánto costaría. Y si no vemos nada que compense, esa también es una respuesta.": { ca: "Quant costaria de temps i de diners. I si no veiem res que compensi, això també és una resposta.", en: "How long it would take and how much it would cost. And if we see nothing worthwhile, that's an answer too." },
    "Una prueba pequeña": { ca: "Una prova petita", en: "A small test" },
    "Un proceso funcionando de verdad. Si convence, hay segundo paso; si no, ahí se queda.": { ca: "Un procés funcionant de veritat. Si convenç, hi ha segon pas; si no, aquí es queda.", en: "One process actually running. If it convinces you, there's a second step; if not, it stops there." },
    "¿Prefieres mirar antes de escribir?": { ca: "Prefereixes mirar abans d'escriure?", en: "Rather look before you write?" },
    "El catálogo entero está a un clic, con lo que incluye cada servicio y en qué escalón encaja.": { ca: "El catàleg sencer és a un clic, amb el que inclou cada servei i en quin esglaó encaixa.", en: "The whole catalogue is one click away, with what each service includes and which step it fits." },

    /* ===== añadidos: mascota, catálogo por pestañas ===== */
    "Hoy implementar IA lo hace cualquiera. Lo que cambia el resultado es saber": { ca: "Avui implementar IA ho fa qualsevol. El que canvia el resultat és saber", en: "Anyone can deploy AI today. What changes the outcome is knowing" },
    "en qué parte del negocio aplicarla, en qué orden y qué proceso conviene ordenar antes": { ca: "en quina part del negoci aplicar-la, en quin ordre i quin procés convé ordenar abans", en: "which part of the business to apply it to, in what order and which process is worth tidying up first" },
    "Optimizar el sistema primero. La herramienta, después.": { ca: "Optimitzar el sistema primer. L'eina, després.", en: "Fix the system first. The tool comes after." },
    "Mascota de SardIA, una manta raya": { ca: "Mascota de SardIA, una manta ratlla", en: "SardIA's mascot, a manta ray" },
    "Catálogo de servicios": { ca: "Catàleg de serveis", en: "Service catalogue" },
    "Datos y BI": { ca: "Dades i BI", en: "Data & BI" },
    "Automatización e IA": { ca: "Automatització i IA", en: "Automation & AI" },
    "CRM y ERP": { ca: "CRM i ERP", en: "CRM & ERP" },
    "Predicción": { ca: "Predicció", en: "Forecasting" },
    "Webs": { ca: "Webs", en: "Websites" },
    "Sin un dato fiable debajo, cualquier automatización solo sirve para equivocarse más rápido. Por eso empezamos aquí.": { ca: "Sense una dada fiable a sota, qualsevol automatització només serveix per equivocar-se més ràpid. Per això comencem aquí.", en: "With unreliable data underneath, any automation only helps you get it wrong faster. That's why we start here." },
    "Si cada semana se repite el mismo circuito, se define una vez y deja de ocupar a nadie.": { ca: "Si cada setmana es repeteix el mateix circuit, es defineix un cop i deixa d'ocupar ningú.", en: "If the same circuit repeats every week, you define it once and it stops taking anyone's time." },
    "Se aprende con vuestros propios documentos delante. Nada de diapositivas ni de ejemplos de manual.": { ca: "S'aprèn amb els vostres propis documents al davant. Res de diapositives ni d'exemples de manual.", en: "You learn with your own documents in front of you. No slides, no textbook examples." },
    "Lo que va a pasar, estimado sobre tu propio histórico y con el margen de error traducido a euros.": { ca: "El que passarà, estimat sobre el teu propi històric i amb el marge d'error traduït a euros.", en: "What's coming, estimated from your own history, with the margin of error translated into euros." },
    "Webs animadas, no plantillas con tu logotipo encima. Se codifica a mano, así que pesa poco y carga rápido.": { ca: "Webs animades, no plantilles amb el teu logotip a sobre. Es codifica a mà, així que pesa poc i carrega ràpid.", en: "Animated sites, not templates with your logo on top. Hand-coded, so they're light and load fast." },
    "Automatizaciones y Agentes IA": { ca: "Automatitzacions i Agents IA", en: "Automations and AI agents" },
    "Automatización y agentes": { ca: "Automatització i agents", en: "Automation and agents" },
    "Agentes IA": { ca: "Agents IA", en: "AI agents" },
    "Bots conversacionales": { ca: "Bots conversacionals", en: "Conversational bots" },
    "Si cada semana haces lo mismo —pasar datos de un sitio a otro, enviar el mismo aviso, generar el mismo documento— eso se puede hacer solo. Defines el circuito una vez: qué lo arranca, qué pasos sigue y dónde termina. A partir de ahí no vuelves a tocarlo.": { ca: "Si cada setmana fas el mateix —passar dades d'un lloc a un altre, enviar el mateix avís, generar el mateix document— això es pot fer sol. Defineixes el circuit un cop: què l'engega, quins passos segueix i on acaba. A partir d'aquí no hi tornes a tocar.", en: "If every week you do the same thing —moving data from one place to another, sending the same alert, generating the same document— that can run on its own. You define the circuit once: what triggers it, what steps it follows and where it ends. After that, you don't touch it again." },
    "Ofrecemos diferentes tipos de agentes a medida según lo que necesite tu negocio: de correos, de seguimiento de clientes, de informes automáticos... entre otros.": { ca: "Oferim diferents tipus d'agents a mida segons el que necessiti el teu negoci: de correus, de seguiment de clients, d'informes automàtics... entre d'altres.", en: "We offer different types of custom agents depending on what your business needs: for email, customer follow-up, automated reports... among others." },
    "Un asistente que responde las preguntas más habituales de tus clientes por WhatsApp o correo, a cualquier hora del día. Sabe lo que tú le enseñas sobre tu negocio, y cuando aparece algo que no puede resolver, avisa a una persona para que tome el relevo.": { ca: "Un assistent que respon les preguntes més habituals dels teus clients per WhatsApp o correu, a qualsevol hora del dia. Sap el que tu li ensenyes sobre el teu negoci, i quan apareix quelcom que no pot resoldre, avisa una persona perquè agafi el relleu.", en: "An assistant that answers your customers' most common questions on WhatsApp or email, any time of day. It knows what you teach it about your business, and when something comes up it can't handle, it flags a person to take over." },
    "Qué podemos hacer por ti": { ca: "Què podem fer per tu", en: "What we can do for you" },
    "¿Por dónde empezar en tu caso?": { ca: "Per on començar en el teu cas?", en: "Where should you start?" },
    "Puedes contratar un servicio suelto, pero lo que de verdad transforma un negocio es aplicarlos como un proceso completo. En la auditoría vemos por dónde conviene arrancar y cómo se conectan los siguientes pasos.": { ca: "Pots contractar un servei sol, però el que de veritat transforma un negoci és aplicar-los com un procés complet. A l'auditoria veiem per on convé arrencar i com es connecten els següents passos.", en: "You can hire a single service, but what really transforms a business is applying them as a complete process. In the audit we see where it makes sense to start and how the next steps connect." },
    "Entrada multicanal:": { ca: "Entrada multicanal:", en: "Multi-channel intake:" },
    "correo, WhatsApp, redes y formulario web al mismo sitio.": { ca: "correu, WhatsApp, xarxes i formulari web al mateix lloc.", en: "email, WhatsApp, social and the web form all in one place." },
    "Cuadro de mando con los indicadores del negocio actualizándose solo desde las fuentes de datos": { ca: "Quadre de comandament amb els indicadors del negoci actualitzant-se sol des de les fonts de dades", en: "A dashboard with the business indicators refreshing itself from the data sources" },
    "Flujo automatizado moviendo información entre sistemas sin intervención manual": { ca: "Flux automatitzat movent informació entre sistemes sense intervenció manual", en: "An automated flow moving information between systems with no manual step" },
    "Demostración del CRM y ERP a medida funcionando": { ca: "Demostració del CRM i ERP a mida funcionant", en: "The custom CRM and ERP in action" },
    "Modelo de predicción entrenado sobre el histórico de la empresa, con la tendencia prevista": { ca: "Model de predicció entrenat sobre l'històric de l'empresa, amb la tendència prevista", en: "A forecasting model trained on the company's own history, showing the predicted trend" },
    "Portátil mostrando una web animada hecha a medida": { ca: "Portàtil mostrant una web animada feta a mida", en: "A laptop showing a custom animated website" },

    /* ===== hero: formación y acompañamiento (nuevo beat) ===== */
    "Formación y acompañamiento": { ca: "Formació i acompanyament", en: "Training and support" },
    "Formamos a tu equipo y acompañamos en cada paso de la implementación.": { ca: "Formem el teu equip i acompanyem en cada pas de la implementació.", en: "We train your team and support you at every step of the implementation." },
    "No dejamos la IA instalada y nos vamos. Tu equipo aprende a usarla, a mantenerla y a sacarle partido.": { ca: "No deixem la IA instal·lada i marxem. El teu equip aprèn a usar-la, a mantenir-la i a treure'n profit.", en: "We don't install the AI and leave. Your team learns to use it, maintain it and get the most out of it." },

    /* ===== inicio: tarjeta enlace a FAQ ===== */
    "Las dudas que salen en casi todas las primeras reuniones, respondidas antes de que te las tengas que preguntar.": { ca: "Els dubtes que surten en gairebé totes les primeres reunions, resposts abans que els hagis de demanar.", en: "The questions that come up in almost every first meeting, answered before you have to ask." },

    /* ===== FAQ: meta / title ===== */
    "Preguntas frecuentes — SardIA": { ca: "Preguntes freqüents — SardIA", en: "FAQ — SardIA" },
    "Las dudas que salen en casi todas las primeras reuniones sobre datos, IA y automatización. Respondidas antes de que te las tengas que preguntar.": { ca: "Els dubtes que surten en gairebé totes les primeres reunions sobre dades, IA i automatització. Resposts abans que els hagis de preguntar.", en: "The questions that come up in almost every first meeting about data, AI and automation. Answered before you have to ask." },

    /* ===== FAQ: page-hero ===== */
    "Las que salen en casi todas las primeras reuniones. Mejor responderlas antes de que tengas que pedirlas.": { ca: "Les que surten en gairebé totes les primeres reunions. Millor respondre-les abans que les hagis de demanar.", en: "The ones that come up in almost every first meeting. Better to answer them before you have to ask." },

    /* ===== FAQ: preguntas nuevas ===== */
    "¿Formáis al equipo o solo instaláis la solución?": { ca: "Formeu l'equip o només instal·leu la solució?", en: "Do you train the team or just install the solution?" },
    "Ambas cosas son un servicio y se pueden contratar por separado. A veces una implementación no basta: el equipo necesita formación para saber usarla y sacarle partido. Por eso ofrecemos formación, para equipos o individual, y dejamos documentación clara para que todo siga funcionando cuando no estemos.": { ca: "Totes dues coses són un servei i es poden contractar per separat. De vegades una implementació no n'hi ha prou: l'equip necessita formació per saber usar-la i treure'n profit. Per això oferim formació, per a equips o individual, i deixem documentació clara perquè tot continuï funcionant quan no hi siguem.", en: "Both are a service and can be hired separately. Sometimes an implementation isn't enough: the team needs training to know how to use it and get the most out of it. That's why we offer training, for teams or one-to-one, and leave clear documentation so everything keeps working when we're not there." },
    "¿Con qué herramientas trabajáis?": { ca: "Amb quines eines treballeu?", en: "What tools do you work with?" },
    "Modelos seguros de Anthropic o Google, automatizaciones con agentes IA, n8n y Claude. Power BI para los datos. Las bases de datos se guardan de forma segura y todo corre en un servidor VPS. Siempre elegimos lo que ya encaja en vuestra forma de trabajar, no lo que nos resulta más cómodo a nosotros.": { ca: "Models segurs d'Anthropic o Google, automatitzacions amb agents IA, n8n i Claude. Power BI per a les dades. Les bases de dades es guarden de forma segura i tot funciona en un servidor VPS. Sempre triem el que ja encaixa en la vostra manera de treballar, no el que ens resulta més còmode a nosaltres.", en: "Secure models from Anthropic or Google, automation with AI agents, n8n and Claude. Power BI for data. Databases are stored securely and everything runs on a VPS server. We always choose what already fits how you work, not what's most convenient for us." },

    /* ===== FAQ: CTA ===== */
    "¿Queda alguna duda?": { ca: "Queda algun dubte?", en: "Any questions left?" },
    "Cuéntanos tu caso en una llamada de 20 minutos. Sin compromiso y sin presentaciones de 40 diapositivas.": { ca: "Explica'ns el teu cas en una trucada de 20 minuts. Sense compromís i sense presentacions de 40 diapositives.", en: "Tell us your case in a 20-minute call. No commitment and no 40-slide presentations." },
  };

  /* ---------- utilidades ---------- */
  function norm(s) { return s.replace(/\s+/g, " ").trim(); }

  function tr(core, lang) {
    if (lang === "es") return null;
    var e = T[core];
    return (e && e[lang] != null) ? e[lang] : null;
  }

  /* ---------- recogida de nodos (una sola vez, desde el ES original) ---------- */
  var textTargets = [];
  var attrTargets = [];
  var titleOriginal = document.title;
  var switchWrap = null;

  function collect() {
    var roots = [].slice.call(document.querySelectorAll("header.header, main, footer.footer, .mobile-nav"));
    roots.forEach(function (root) {
      var tw = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
        acceptNode: function (n) {
          var p = n.parentNode;
          if (!p) return NodeFilter.FILTER_REJECT;
          var tag = p.nodeName;
          if (tag === "SCRIPT" || tag === "STYLE") return NodeFilter.FILTER_REJECT;
          if (!n.nodeValue || !n.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
          return NodeFilter.FILTER_ACCEPT;
        }
      });
      var n;
      while ((n = tw.nextNode())) {
        var raw = n.nodeValue;
        var m = raw.match(/^(\s*)([\s\S]*?)(\s*)$/);
        textTargets.push({ node: n, lead: m[1], core: norm(m[2]), trail: m[3], orig: raw });
      }
      var els = root.querySelectorAll("[placeholder],[aria-label],[alt]");
      [].forEach.call(els, function (el) {
        ["placeholder", "aria-label", "alt"].forEach(function (a) {
          if (el.hasAttribute(a)) {
            var v = el.getAttribute(a);
            if (v && v.trim()) attrTargets.push({ el: el, attr: a, core: norm(v), orig: v });
          }
        });
      });
    });
    var metas = document.querySelectorAll('meta[name="description"],meta[property="og:title"],meta[property="og:description"],meta[name="twitter:title"],meta[name="twitter:description"]');
    [].forEach.call(metas, function (el) {
      var v = el.getAttribute("content");
      if (v && v.trim()) attrTargets.push({ el: el, attr: "content", core: norm(v), orig: v });
    });
  }

  /* ---------- aplicar un idioma ---------- */
  function apply(lang) {
    textTargets.forEach(function (t) {
      if (lang === "es") { t.node.nodeValue = t.orig; return; }
      var x = tr(t.core, lang);
      t.node.nodeValue = (x == null) ? t.orig : (t.lead + x + t.trail);
    });
    attrTargets.forEach(function (t) {
      if (lang === "es") { t.el.setAttribute(t.attr, t.orig); return; }
      var x = tr(t.core, lang);
      t.el.setAttribute(t.attr, (x == null) ? t.orig : x);
    });
    if (lang === "es") {
      document.title = titleOriginal;
    } else {
      var tt = tr(norm(titleOriginal), lang);
      document.title = (tt == null) ? titleOriginal : tt;
    }
    document.documentElement.setAttribute("lang", HTMLLANG[lang] || "es");
    var ogl = document.querySelector('meta[property="og:locale"]');
    if (ogl) ogl.setAttribute("content", OGLOCALE[lang] || "es_ES");
    updateSwitch(lang);
    try { localStorage.setItem(STORAGE, lang); } catch (e) {}
  }

  /* ---------- conmutador de idioma ---------- */
  function injectCSS() {
    var css =
      ".lang-switch{display:inline-flex;align-items:center;gap:1px;background:var(--surface-2);" +
      "border:1px solid var(--line);border-radius:var(--pill);padding:3px;flex-shrink:0}" +
      ".lang-switch button{appearance:none;-webkit-appearance:none;background:transparent;border:0;" +
      "cursor:pointer;font-family:'JetBrains Mono',ui-monospace,monospace;font-size:.6875rem;" +
      "font-weight:500;letter-spacing:.06em;color:var(--text-dim);padding:6px 9px;border-radius:var(--pill);" +
      "line-height:1;transition:color .2s var(--ease),background .2s var(--ease)}" +
      ".lang-switch button:hover{color:var(--text)}" +
      ".lang-switch button[aria-pressed='true']{background:var(--volt);color:#04212C}" +
      "@media (max-width:400px){.lang-switch button{padding:6px 7px;letter-spacing:.03em}}";
    var st = document.createElement("style");
    st.setAttribute("data-i18n-style", "1");
    st.textContent = css;
    document.head.appendChild(st);
  }

  function buildSwitch() {
    var host = document.querySelector(".header__cta");
    if (!host) return;
    var wrap = document.createElement("div");
    wrap.className = "lang-switch";
    wrap.setAttribute("role", "group");
    wrap.setAttribute("aria-label", "Idioma / Language");
    LANGS.forEach(function (l) {
      var b = document.createElement("button");
      b.type = "button";
      b.textContent = LABEL[l];
      b.setAttribute("data-lang", l);
      b.setAttribute("aria-label", LABEL[l]);
      b.addEventListener("click", function () { apply(l); });
      wrap.appendChild(b);
    });
    host.insertBefore(wrap, host.firstChild);
    switchWrap = wrap;
  }

  function updateSwitch(lang) {
    if (!switchWrap) return;
    [].forEach.call(switchWrap.querySelectorAll("button"), function (b) {
      b.setAttribute("aria-pressed", b.getAttribute("data-lang") === lang ? "true" : "false");
    });
  }

  /* ---------- init ---------- */
  function init() {
    var saved;
    try { saved = localStorage.getItem(STORAGE); } catch (e) {}
    if (LANGS.indexOf(saved) < 0) saved = DEFAULT;
    injectCSS();
    collect();
    buildSwitch();
    apply(saved);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();

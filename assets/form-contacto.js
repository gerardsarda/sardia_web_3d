(function () {
  var SUPABASE_URL = 'https://bpjfadbagjhyofsxmico.supabase.co';
  var SUPABASE_KEY = 'sb_publishable_5NXhZna9gB_YUa1YhWdN4w_wqzflZ_G';

  var form = document.getElementById('form-contacto');

  /* Viene del quiz de la home: ?servicio=crm → precarga el contexto */
  (function prefillFromQuiz() {
    if (!form) return;
    var key = new URLSearchParams(location.search).get('servicio');
    var ta = form.querySelector('#contexto');
    var names = {
      agentes: { es: 'Agentes de IA', ca: 'Agents d\'IA', en: 'AI agents' },
      datos: { es: 'Datos y cuadros de mando', ca: 'Dades i quadres de comandament', en: 'Data and dashboards' },
      automatizacion: { es: 'Automatización de procesos', ca: 'Automatització de processos', en: 'Process automation' },
      crm: { es: 'CRM y ERP automatizados', ca: 'CRM i ERP automatitzats', en: 'Automated CRM and ERP' },
      formacion: { es: 'Formación', ca: 'Formació', en: 'Training' },
      ml: { es: 'Predicción de negocio', ca: 'Predicció de negoci', en: 'Business forecasting' },
      web: { es: 'Creación de páginas web', ca: 'Creació de pàgines web', en: 'Web design' }
    };
    var tpl = {
      es: 'Me interesa: {s} (resultado del quiz). ',
      ca: 'M\'interessa: {s} (resultat del quiz). ',
      en: 'I\'m interested in: {s} (quiz result). '
    };
    if (!key || !names[key] || !ta || ta.value) return;
    var l;
    try { l = localStorage.getItem('sardia_lang'); } catch (e) {}
    if (!tpl[l]) l = 'ca';
    ta.value = tpl[l].replace('{s}', names[key][l]);
  })();

  if (!form || !window.supabase) return;

  var client = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
  var btn = form.querySelector('[data-submit-btn]');
  var note = form.querySelector('[data-form-note]');
  var status = form.querySelector('[data-form-status]');
  var btnLabel = btn.textContent;

  /* Avisos en el idioma activo de la página (lo fija i18n.js en <html lang>) */
  var MSG = {
    es: {
      required: 'Rellena este campo.',
      select: 'Selecciona una opción.',
      email: 'Escribe un email válido, por ejemplo nombre@empresa.com.',
      consent: 'Marca esta casilla para poder enviar la solicitud.',
      sending: 'Enviando…',
      captcha: 'Completa la verificación anti-spam antes de enviar.',
      ok: 'Gracias, hemos recibido tu solicitud. Te respondemos en menos de 48 horas laborables.',
      error: 'No hemos podido enviar el formulario. Escríbenos directamente a gerard@sardia.es o al +34 678 149 225.'
    },
    ca: {
      required: 'Omple aquest camp.',
      select: 'Selecciona una opció.',
      email: 'Escriu un email vàlid, per exemple nom@empresa.com.',
      consent: 'Marca aquesta casella per poder enviar la sol·licitud.',
      sending: 'Enviant…',
      captcha: 'Completa la verificació anti-spam abans d\'enviar.',
      ok: 'Gràcies, hem rebut la teva sol·licitud. Et responem en menys de 48 hores laborables.',
      error: 'No hem pogut enviar el formulari. Escriu-nos directament a gerard@sardia.es o al +34 678 149 225.'
    },
    en: {
      required: 'Please fill in this field.',
      select: 'Please select an option.',
      email: 'Enter a valid email, for example name@company.com.',
      consent: 'Tick this box to send your request.',
      sending: 'Sending…',
      captcha: 'Please complete the anti-spam check before sending.',
      ok: 'Thanks, we have received your request. We will reply within 48 working hours.',
      error: 'We could not send the form. Write to us directly at gerard@sardia.es or call +34 678 149 225.'
    }
  };

  function t(key) {
    var l = (document.documentElement.getAttribute('lang') || 'es').slice(0, 2).toLowerCase();
    return (MSG[l] || MSG.es)[key];
  }

  function setValidityMessages() {
    [].forEach.call(form.elements, function (el) {
      if (!el.setCustomValidity) return;
      el.setCustomValidity('');
      var v = el.validity;
      if (v.valid) return;
      if (v.valueMissing) {
        el.setCustomValidity(el.type === 'checkbox' ? t('consent') : el.tagName === 'SELECT' ? t('select') : t('required'));
      } else if (v.typeMismatch && el.type === 'email') {
        el.setCustomValidity(t('email'));
      }
    });
  }

  /* El aviso personalizado se borra en cuanto el usuario corrige el campo */
  ['input', 'change'].forEach(function (ev) {
    form.addEventListener(ev, function (e) {
      if (e.target.setCustomValidity) e.target.setCustomValidity('');
    });
  });

  function showStatus(state, message) {
    status.hidden = false;
    status.dataset.state = state;
    status.textContent = message;
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    setValidityMessages();
    if (!form.reportValidity()) return;

    btnLabel = btn.textContent;
    btn.disabled = true;
    btn.textContent = t('sending');
    status.hidden = true;

    var data = new FormData(form);

    var captchaToken = data.get('cf-turnstile-response') || '';
    if (!captchaToken) {
      showStatus('error', t('captcha'));
      btn.disabled = false;
      btn.textContent = btnLabel;
      return;
    }

    client.rpc('crear_lead_web', {
      p_nombre_contacto: (data.get('nombre') || '').trim(),
      p_empresa: (data.get('empresa') || '').trim() || null,
      p_email: (data.get('email') || '').trim(),
      p_telefono: (data.get('telefono') || '').trim() || null,
      p_sector: (data.get('sector') || '').trim() || null,
      p_tamano_equipo: data.get('tamano') || null,
      p_contexto: (data.get('contexto') || '').trim() || null,
      p_consentimiento: form.consentimiento.checked,
      p_captcha_token: captchaToken
    }).then(function (result) {
      if (result.error) throw result.error;

      form.reset();
      note.hidden = true;
      showStatus('ok', t('ok'));
    }).catch(function (err) {
      console.error('Error al enviar el lead a Supabase:', err);
      if (window.turnstile) window.turnstile.reset();
      showStatus('error', t('error'));
    }).finally(function () {
      btn.disabled = false;
      btn.textContent = btnLabel;
    });
  });
})();

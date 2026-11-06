(function () {
  var SUPABASE_URL = 'https://bpjfadbagjhyofsxmico.supabase.co';
  var SUPABASE_KEY = 'sb_publishable_5NXhZna9gB_YUa1YhWdN4w_wqzflZ_G';

  var form = document.getElementById('form-contacto');
  if (!form || !window.supabase) return;

  var client = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
  var btn = form.querySelector('[data-submit-btn]');
  var note = form.querySelector('[data-form-note]');
  var status = form.querySelector('[data-form-status]');
  var btnLabel = btn.textContent;

  function showStatus(state, message) {
    status.hidden = false;
    status.dataset.state = state;
    status.textContent = message;
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    if (!form.reportValidity()) return;

    btn.disabled = true;
    btn.textContent = 'Enviando…';
    status.hidden = true;

    var data = new FormData(form);

    var captchaToken = data.get('cf-turnstile-response') || '';
    if (!captchaToken) {
      showStatus('error', 'Completa la verificación anti-spam antes de enviar.');
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
      showStatus('ok', 'Gracias, hemos recibido tu solicitud. Te respondemos en menos de 48 horas laborables.');
    }).catch(function (err) {
      console.error('Error al enviar el lead a Supabase:', err);
      if (window.turnstile) window.turnstile.reset();
      showStatus('error', 'No hemos podido enviar el formulario. Escríbenos directamente a hola@sardia.es o al +34 678 149 225.');
    }).finally(function () {
      btn.disabled = false;
      btn.textContent = btnLabel;
    });
  });
})();

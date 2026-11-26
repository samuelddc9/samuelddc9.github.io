(() => {
  const form = document.querySelector('#contact-form');
  if (!form || !window.fetch || !window.FormData) return;
  const fields = form.querySelector('fieldset');
  const submit = form.querySelector('[type="submit"]');
  const status = document.querySelector('#contact-status');
  const names = ['name', 'email', 'message'];
  let sending = false;

  function clearErrors() {
    for (const name of names) {
      form.elements.namedItem(name).removeAttribute('aria-invalid');
      document.querySelector(`#contact-${name}-error`).textContent = '';
    }
  }
  function announce(message, state) {
    status.textContent = message;
    status.dataset.state = state;
    status.focus();
  }
  form.addEventListener('input', event => {
    const name = event.target.name;
    if (names.includes(name)) {
      event.target.removeAttribute('aria-invalid');
      document.querySelector(`#contact-${name}-error`).textContent = '';
    }
  });
  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (sending || !form.reportValidity()) return;
    clearErrors();
    const data = new FormData(form);
    sending = true;
    fields.disabled = true;
    submit.textContent = 'Sending…';
    form.setAttribute('aria-busy', 'true');
    status.textContent = 'Sending your message…';
    status.dataset.state = 'sending';
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20000);
    try {
      const response = await fetch(form.action, {
        method: 'POST', body: data, headers: { Accept: 'application/json' }, signal: controller.signal
      });
      if (response.ok) {
        form.reset();
        announce('Thanks! Your message has been sent. We’ll reply using the email address you provided.', 'success');
      } else {
        const result = await response.json().catch(() => ({}));
        let fieldError = false;
        for (const error of Array.isArray(result.errors) ? result.errors : []) {
          if (names.includes(error.field) && typeof error.message === 'string') {
            form.elements.namedItem(error.field).setAttribute('aria-invalid', 'true');
            document.querySelector(`#contact-${error.field}-error`).textContent = error.message;
            fieldError = true;
          }
        }
        const message = fieldError ? 'Please check the highlighted fields and send your message again.'
          : response.status === 429 ? 'The form has received too many requests. Please try again later or email hello@teamtap.games.'
          : 'Your message could not be sent. Please try again or email hello@teamtap.games.';
        announce(message, 'error');
      }
    } catch {
      announce('We couldn’t confirm delivery. Your message is still here. Check your connection and try again, or email hello@teamtap.games.', 'error');
    } finally {
      clearTimeout(timeout);
      fields.disabled = false;
      sending = false;
      submit.textContent = 'Send message';
      form.removeAttribute('aria-busy');
    }
  });
})();

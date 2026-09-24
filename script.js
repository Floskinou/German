const GOOGLE_ADS_CONVERSIONS = Object.freeze({
  contactFormButtonClick: 'AW-18469753508/kflHCMuJt4IdEKSliOdE',
  whatsapp: 'AW-18469753508/hmXvCM6Jt4IdEKSliOdE'
});

function sendGoogleAdsConversion(sendTo) {
  if (!window.GermanConsent?.canMeasureAds() || typeof window.gtag !== 'function') return;
  window.gtag('event', 'conversion', {
    send_to: sendTo,
    value: 1.0,
    currency: 'ARS'
  });
}

const toggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('#menu');

toggle?.addEventListener('click', () => {
  const open = toggle.getAttribute('aria-expanded') === 'true';
  toggle.setAttribute('aria-expanded', String(!open));
  menu.classList.toggle('open', !open);
});

menu?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menu.classList.remove('open');
    toggle?.setAttribute('aria-expanded', 'false');
  });
});

document.querySelectorAll('details').forEach((item) => {
  item.addEventListener('toggle', () => {
    if (!item.open) return;
    document.querySelectorAll('details[open]').forEach((other) => {
      if (other !== item) other.open = false;
    });
  });
});

document.querySelectorAll('a[data-wa][href^="https://wa.me/"]').forEach((link) => {
  link.addEventListener('click', () => {
    if (!window.GermanConsent?.canMeasureAds()) return;
    window.GermanConsent.record({
      event: 'whatsapp_contact_click',
      cta_position: link.dataset.wa
    });
    sendGoogleAdsConversion(GOOGLE_ADS_CONVERSIONS.whatsapp);
  });
});

const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();

const contactForm = document.querySelector('#contactForm');
if (contactForm) {
  const contactSubmitButton = contactForm.querySelector('button[type="submit"]');
  contactSubmitButton?.addEventListener('click', () => {
    if (!contactForm.checkValidity() || !window.GermanConsent?.canMeasureAds()) return;
    window.GermanConsent.record({
      event: 'contact_form_button_click',
      form_name: 'contact'
    });
    sendGoogleAdsConversion(GOOGLE_ADS_CONVERSIONS.contactFormButtonClick);
  });

  contactForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const nombre = document.querySelector('#cf_nombre').value.trim();
    const email = document.querySelector('#cf_email').value.trim();
    const status = document.querySelector('#contactFormStatus');
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const formName = contactForm.getAttribute('name');
    const netlifyProcessed = !contactForm.hasAttribute('data-netlify')
      && contactForm.querySelector('input[name="form-name"]')?.value === formName;

    if (!netlifyProcessed) {
      const subject = 'Solicitud de primera entrevista desde la web';
      const body = [`Nombre: ${nombre}`, `Email: ${email}`].join('\n');
      const mailto = `mailto:lic.guarino.psicologo@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.open(mailto, '_blank');
      if (status) {
        status.textContent = 'Se preparó un borrador en tu aplicación de correo. Pulsá «Enviar» para completar el envío; este sitio no puede confirmar su recepción. ';
        const link = document.createElement('a');
        link.href = mailto;
        link.textContent = 'Abrir el correo';
        status.append(link);
      }
      return;
    }

    if (submitButton) submitButton.disabled = true;
    if (status) status.textContent = 'Enviando…';

    try {
      const response = await fetch(contactForm.getAttribute('action') || '/', {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: new URLSearchParams(new FormData(contactForm)).toString()
      });
      if (!response.ok) throw new Error('Form submission failed');

      if (status) {
        status.textContent = 'Tu solicitud fue recibida en el sitio. Para coordinar una primera entrevista, también podés escribir a ';
        const link = document.createElement('a');
        link.href = 'mailto:lic.guarino.psicologo@gmail.com';
        link.textContent = 'lic.guarino.psicologo@gmail.com';
        status.append(link, '.');
      }
      if (window.GermanConsent?.canMeasureAds()) {
        window.GermanConsent.record({
          event: 'contact_form_submit',
          form_name: 'contact'
        });
      }
      contactForm.reset();
    } catch (error) {
      if (status) {
        status.textContent = 'No se pudo enviar el formulario. Intentá de nuevo o escribí directamente a ';
        const link = document.createElement('a');
        link.href = 'mailto:lic.guarino.psicologo@gmail.com';
        link.textContent = 'lic.guarino.psicologo@gmail.com';
        status.append(link, '.');
      }
    } finally {
      if (submitButton) submitButton.disabled = false;
    }
  });
}

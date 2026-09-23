const GOOGLE_ADS_CONVERSIONS = Object.freeze({
  contactForm: 'AW-18469753508/kflHCMuJt4IdEKSliOdE',
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
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const nombre = document.querySelector('#cf_nombre').value.trim();
    const apellido = document.querySelector('#cf_apellido').value.trim();
    const telefono = document.querySelector('#cf_telefono').value.trim();
    const email = document.querySelector('#cf_email').value.trim();
    const motivo = document.querySelector('#cf_motivo').value;
    const mensaje = document.querySelector('#cf_mensaje').value.trim();
    const subject = `Consulta desde la web - ${nombre} ${apellido}`;
    const body = [
      `Nombre: ${nombre} ${apellido}`,
      `Teléfono: ${telefono}`,
      `Email: ${email}`,
      `Motivo: ${motivo}`,
      `Mensaje: ${mensaje}`
    ].join('\n');
    const mailto = `mailto:lic.guarino.psicologo@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    // The email content stays in the user's mail client; it is never sent to Google Ads.
    window.open(mailto, '_blank');

    if (window.GermanConsent?.canMeasureAds()) {
      window.GermanConsent.record({
        event: 'contact_form_submit',
        form_name: 'contact'
      });
      sendGoogleAdsConversion(GOOGLE_ADS_CONVERSIONS.contactForm);
    }

    const status = document.querySelector('#contactFormStatus');
    if (status) {
      status.textContent = 'Tu aplicación de correo debería abrirse con el mensaje preparado. Enviá el email desde allí para completar la consulta.';
    }
    contactForm.reset();
  });
}

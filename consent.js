(() => {
  'use strict';

  const STORAGE_KEY = 'german_privacy_choices_v1';
  const CHOICE_TTL_MS = 90 * 24 * 60 * 60 * 1000;
  const GOOGLE_ADS_ID = 'AW-18469753508';
  const DENIED_CONSENT = {
    ad_storage: 'denied',
    analytics_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied'
  };
  const isAdsMeasurementPage = Boolean(
    document.querySelector('meta[name="ads-measurement"][content="enabled"]')
  );

  let choice = readChoice();
  let tagLoaded = false;
  let settingsOpener = null;

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function gtag() {
    window.dataLayer.push(arguments);
  };
  window.gtag('consent', 'default', DENIED_CONSENT);

  function readChoice() {
    try {
      const saved = JSON.parse(window.localStorage.getItem(STORAGE_KEY));
      if (
        !saved ||
        saved.version !== 1 ||
        typeof saved.adsMeasurement !== 'boolean' ||
        !Number.isFinite(saved.expiresAt) ||
        saved.expiresAt <= Date.now()
      ) {
        window.localStorage.removeItem(STORAGE_KEY);
        return null;
      }
      return saved;
    } catch (_error) {
      return null;
    }
  }

  function canMeasureAds() {
    return Boolean(choice && choice.adsMeasurement === true && choice.expiresAt > Date.now());
  }

  function updateConsent(adsAllowed) {
    window.gtag('consent', 'update', {
      ad_storage: adsAllowed ? 'granted' : 'denied',
      analytics_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied'
    });
  }

  function loadAdsTag() {
    if (!isAdsMeasurementPage || !canMeasureAds() || tagLoaded) return;
    tagLoaded = true;

    updateConsent(true);
    window.gtag('set', 'ads_data_redaction', true);
    window.gtag('js', new Date());
    window.gtag('config', GOOGLE_ADS_ID, { allow_ad_personalization_signals: false });

    const script = document.createElement('script');
    script.id = 'google-ads-measurement-tag';
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`;
    document.head.appendChild(script);
  }

  function clearGoogleAdsCookies() {
    try {
      const names = document.cookie
        .split(';')
        .map((item) => item.split('=')[0].trim())
        .filter((name) => /^_(gcl_|gac_)/.test(name));
      names.forEach((name) => {
        document.cookie = `${name}=; Max-Age=0; path=/; SameSite=Lax; Secure`;
      });
    } catch (_error) {
      // Consent withdrawal must still work if cookie access is restricted.
    }
  }

  function renderBanner() {
    const markup = `
      <section class="consent-banner" id="consent-banner" role="dialog" aria-modal="false"
        aria-labelledby="consent-title" aria-describedby="consent-description" hidden>
        <div class="consent-card">
          <p class="consent-kicker">Privacidad y cookies</p>
          <h2 id="consent-title">Elegí cómo medimos</h2>
          <p id="consent-description" class="consent-copy">
            Google Ads mide clics en WhatsApp y clics válidos en «Enviar consulta». La etiqueta solo se carga si aceptás la medición. El clic cuenta como un intento de contacto; no confirma que el formulario se haya enviado ni que se haya recibido o respondido una notificación. No recibe los campos del formulario. No usamos personalización ni remarketing.
          </p>
          <p class="consent-more">Podés seguir sin aceptar. Esta opción solo controla Google Ads; las fuentes de Google Fonts se solicitan aparte. <a href="privacidad.html">Aviso de privacidad y cookies</a>.</p>
          <div class="consent-settings" id="consent-settings" hidden>
            <h3>Preferencias</h3>
            <div class="consent-option">
              <div><strong>Guardar tu elección</strong><p>Necesario para recordar y respetar esta preferencia durante 90 días.</p></div>
              <span class="consent-always">Siempre activo</span>
            </div>
            <label class="consent-option consent-option-toggle" for="consent-ads-measurement">
              <span><strong>Medición de conversiones de Google Ads</strong><small>Permite cargar la etiqueta publicitaria y usar almacenamiento de medición. No habilita personalización.</small></span>
              <input id="consent-ads-measurement" type="checkbox" value="yes">
            </label>
            <p class="consent-note">Analítica independiente, datos del formulario y personalización publicitaria permanecen desactivados.</p>
            <button class="consent-button consent-save" id="consent-save" type="button">Guardar mi selección</button>
          </div>
          <div class="consent-actions">
            <button class="consent-button" id="consent-reject" type="button">Rechazar medición</button>
            <button class="consent-button" id="consent-accept" type="button">Aceptar medición</button>
            <button class="consent-button" id="consent-settings-toggle" type="button" aria-controls="consent-settings" aria-expanded="false">Configurar</button>
          </div>
        </div>
      </section>`;

    document.body.insertAdjacentHTML('beforeend', markup);

    const banner = document.querySelector('#consent-banner');
    const settings = document.querySelector('#consent-settings');
    const settingsToggle = document.querySelector('#consent-settings-toggle');
    const adsCheckbox = document.querySelector('#consent-ads-measurement');

    function showSettings(opener, focusCheckbox) {
      settingsOpener = opener || settingsOpener;
      banner.hidden = false;
      settings.hidden = false;
      adsCheckbox.checked = canMeasureAds();
      settingsToggle.setAttribute('aria-expanded', 'true');
      if (focusCheckbox) adsCheckbox.focus();
    }

    function closeBanner() {
      banner.hidden = true;
      settings.hidden = true;
      settingsToggle.setAttribute('aria-expanded', 'false');
      const focusTarget = settingsOpener || document.querySelector('#preferencias-privacidad');
      settingsOpener = null;
      if (focusTarget && typeof focusTarget.focus === 'function') {
        focusTarget.focus({ preventScroll: true });
      }
    }

    function saveChoice(adsMeasurement) {
      const wasAllowed = canMeasureAds();
      const nextChoice = {
        version: 1,
        adsMeasurement: Boolean(adsMeasurement),
        expiresAt: Date.now() + CHOICE_TTL_MS
      };
      choice = nextChoice;

      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextChoice));
      } catch (_error) {
        // Honor the current-page choice in memory if storage is unavailable.
      }

      if (nextChoice.adsMeasurement) {
        loadAdsTag();
      } else {
        updateConsent(false);
        clearGoogleAdsCookies();
      }

      closeBanner();
      if (wasAllowed && !nextChoice.adsMeasurement) {
        window.setTimeout(() => window.location.reload(), 80);
      }
    }

    document.querySelector('#consent-reject').addEventListener('click', () => saveChoice(false));
    document.querySelector('#consent-accept').addEventListener('click', () => saveChoice(true));
    document.querySelector('#consent-save').addEventListener('click', () => saveChoice(adsCheckbox.checked));

    settingsToggle.addEventListener('click', () => {
      const isOpen = settingsToggle.getAttribute('aria-expanded') === 'true';
      if (isOpen) {
        settings.hidden = true;
        settingsToggle.setAttribute('aria-expanded', 'false');
      } else {
        showSettings(settingsToggle, true);
      }
    });

    document.querySelectorAll('[data-open-consent]').forEach((button) => {
      button.addEventListener('click', (event) => {
        event.preventDefault();
        showSettings(button, true);
      });
    });

    document.querySelectorAll('[data-revoke-consent]').forEach((button) => {
      button.addEventListener('click', () => {
        settingsOpener = button;
        saveChoice(false);
      });
    });

    if (window.location.hash === '#preferencias-privacidad') {
      showSettings(document.querySelector('#preferencias-privacidad'), false);
    } else if (!choice) {
      banner.hidden = false;
    }
  }

  window.GermanConsent = Object.freeze({
    canMeasureAds,
    record(eventData) {
      if (!canMeasureAds() || !eventData || typeof eventData !== 'object') return false;
      window.dataLayer.push(eventData);
      return true;
    }
  });

  window.addEventListener('storage', (event) => {
    if (event.key !== STORAGE_KEY) return;
    const wasAllowed = canMeasureAds();
    choice = readChoice();
    const isAllowed = canMeasureAds();
    if (wasAllowed && !isAllowed) {
      updateConsent(false);
      clearGoogleAdsCookies();
      window.location.reload();
    } else if (!wasAllowed && isAllowed) {
      loadAdsTag();
    }
  });

  loadAdsTag();
  renderBanner();
})();

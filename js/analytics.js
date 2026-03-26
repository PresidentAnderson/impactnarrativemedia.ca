/* ============================================
   IMPACT NARRATIVE MEDIA - Analytics

   Privacy-respecting analytics with support for:
   1. Vercel Web Analytics (built-in, privacy-first)
   2. Google Analytics 4 (optional, if GA_ID is set)

   Setup:
   - Vercel Analytics: Enable in Vercel dashboard → Analytics
   - Google Analytics: Replace GA_ID below with your GA4 Measurement ID
   ============================================ */

const GA_ID = null; // Replace with 'G-XXXXXXXXXX' to enable Google Analytics 4

/* ------------------------------------------
   Vercel Web Analytics
   Automatically enabled when deployed on Vercel.
   Privacy-first, no cookies, GDPR-compliant.
   ------------------------------------------ */
function initVercelAnalytics() {
  if (typeof window !== 'undefined' && window.location.hostname === 'impactnarrativemedia.ca') {
    const script = document.createElement('script');
    script.defer = true;
    script.src = '/_vercel/insights/script.js';
    document.head.appendChild(script);
  }
}

/* ------------------------------------------
   Google Analytics 4 (optional)
   Only loads if GA_ID is configured.
   ------------------------------------------ */
function initGoogleAnalytics() {
  if (!GA_ID) return;

  const gtagScript = document.createElement('script');
  gtagScript.async = true;
  gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(gtagScript);

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', GA_ID, {
    anonymize_ip: true,
    cookie_flags: 'SameSite=None;Secure'
  });
}

/* ------------------------------------------
   Custom Event Tracking
   Track key user interactions across the site.
   ------------------------------------------ */
function trackEvent(eventName, params) {
  // Vercel Analytics custom events
  if (window.va) {
    window.va('event', { name: eventName, ...params });
  }

  // Google Analytics events
  if (window.gtag) {
    window.gtag('event', eventName, params);
  }
}

/* ------------------------------------------
   Auto-track key interactions
   ------------------------------------------ */
document.addEventListener('DOMContentLoaded', () => {
  initVercelAnalytics();
  initGoogleAnalytics();

  // Track newsletter signups
  document.querySelectorAll('form[data-form="newsletter"]').forEach(form => {
    form.addEventListener('submit', () => {
      trackEvent('newsletter_signup', { location: window.location.pathname });
    });
  });

  // Track subscription page visits
  if (window.location.pathname.includes('subscribe')) {
    trackEvent('view_subscription_plans');
  }

  // Track form submissions by type
  document.querySelectorAll('form[data-form]').forEach(form => {
    form.addEventListener('submit', () => {
      trackEvent('form_submit', {
        form_type: form.dataset.form,
        page: window.location.pathname
      });
    });
  });

  // Track outbound link clicks
  document.querySelectorAll('a[href^="http"]').forEach(link => {
    if (!link.href.includes('impactnarrativemedia.ca')) {
      link.addEventListener('click', () => {
        trackEvent('outbound_click', {
          url: link.href,
          text: link.textContent.trim().substring(0, 50)
        });
      });
    }
  });

  // Track search usage
  if (window.location.pathname.includes('search')) {
    const params = new URLSearchParams(window.location.search);
    const query = params.get('q');
    if (query) {
      trackEvent('search', { query: query });
    }
  }
});

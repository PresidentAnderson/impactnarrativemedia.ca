/* ============================================
   IMPACT NARRATIVE MEDIA - HubSpot CRM Integration

   Connects all site forms to HubSpot for contact
   management, newsletter subscribers, and lead tracking.

   Setup:
   1. Create a HubSpot account at https://app.hubspot.com
   2. Get your Portal ID from Settings → Account Setup
   3. Create forms in HubSpot and get their Form GUIDs
   4. Replace the config values below
   ============================================ */

const HUBSPOT_CONFIG = {
  // Replace with your HubSpot Portal ID (found in Settings → Account Setup → Account Defaults)
  portalId: null, // e.g. '12345678'

  // Replace with HubSpot Form GUIDs (create forms at Forms → Create Form)
  formGuids: {
    newsletter: null, // Newsletter signup form GUID
    story:      null, // Story submission form GUID
    writer:     null, // Writer pitch form GUID
    letter:     null, // Letter to editor form GUID
    recipe:     null, // Recipe submission form GUID
    event:      null, // Event submission form GUID
    jobalert:   null, // Job alert form GUID
    classified: null, // Classified ad form GUID
    contact:    null, // Contact/advertising form GUID
    obituary:   null, // Obituary submission form GUID
  }
};

/* ------------------------------------------
   HubSpot Tracking Code
   Loads the HubSpot analytics script for
   visitor tracking, page views, and identity.
   ------------------------------------------ */
function initHubSpotTracking() {
  if (!HUBSPOT_CONFIG.portalId) return;

  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.id = 'hs-script-loader';
  script.async = true;
  script.defer = true;
  script.src = `//js.hs-scripts.com/${HUBSPOT_CONFIG.portalId}.js`;
  document.head.appendChild(script);
}

/* ------------------------------------------
   HubSpot Form Submission
   Submits form data to HubSpot's Forms API
   for contact creation and CRM pipeline.
   ------------------------------------------ */
function submitToHubSpot(formType, formData) {
  const portalId = HUBSPOT_CONFIG.portalId;
  const formGuid = HUBSPOT_CONFIG.formGuids[formType];

  if (!portalId || !formGuid) return Promise.resolve(null);

  // Map form fields to HubSpot fields
  const fields = [];
  for (const [key, value] of formData.entries()) {
    if (value && value.toString().trim()) {
      fields.push({ name: mapFieldName(key), value: value.toString() });
    }
  }

  const payload = {
    fields: fields,
    context: {
      pageUri: window.location.href,
      pageName: document.title,
    }
  };

  // Add HubSpot cookie for identity tracking
  const hutk = getCookie('hubspotutk');
  if (hutk) {
    payload.context.hutk = hutk;
  }

  return fetch(
    `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formGuid}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    }
  )
  .then(response => {
    if (response.ok) return response.json();
    throw new Error('HubSpot submission failed');
  });
}

/* ------------------------------------------
   Field Name Mapping
   Maps site form field names to HubSpot
   standard contact property names.
   ------------------------------------------ */
function mapFieldName(fieldName) {
  const mapping = {
    'name':       'firstname',
    'full_name':  'firstname',
    'email':      'email',
    'phone':      'phone',
    'message':    'message',
    'story':      'message',
    'pitch':      'message',
    'letter':     'message',
    'tribute':    'message',
    'recipe':     'message',
    'description':'message',
    'location':   'city',
    'company':    'company',
    'website':    'website',
    'portfolio':  'website',
  };
  return mapping[fieldName] || fieldName;
}

/* ------------------------------------------
   Cookie Helper
   ------------------------------------------ */
function getCookie(name) {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? match[2] : null;
}

/* ------------------------------------------
   Initialize on DOM ready
   ------------------------------------------ */
document.addEventListener('DOMContentLoaded', () => {
  initHubSpotTracking();

  // Enhance existing form submissions with HubSpot CRM sync
  // This works alongside forms.js — it sends data to HubSpot
  // in addition to Formspree/mailto
  document.querySelectorAll('form[data-form]').forEach(form => {
    form.addEventListener('submit', () => {
      const formType = form.dataset.form;
      const formData = new FormData(form);

      // Fire-and-forget to HubSpot (don't block the primary form handler)
      submitToHubSpot(formType, formData).catch(() => {
        // Silent fail — primary form handler (forms.js) manages user feedback
      });
    });
  });
});

/* ------------------------------------------
   HubSpot CRM Flow Summary

   Newsletter signup → Creates contact, enrolls in "Newsletter" list
   Story submission  → Creates contact + deal in "Editorial" pipeline
   Writer pitch      → Creates contact + deal in "Contributors" pipeline
   Advertiser inquiry→ Creates contact + deal in "Advertising" pipeline
   Job alert signup  → Creates contact, enrolls in "Job Alerts" list
   Letter to editor  → Creates contact, tags as "Letters"
   Event submission  → Creates contact, tags as "Community Events"
   Classified ad     → Creates contact + deal in "Classifieds" pipeline

   Configure these workflows in HubSpot:
   Settings → Automation → Workflows
   ------------------------------------------ */

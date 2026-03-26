/* ============================================
   IMPACT NARRATIVE MEDIA - Form Handler

   Two modes:
   1. If a Formspree ID is configured → submits via AJAX
   2. If not configured → falls back to mailto: so forms
      always work, even before Formspree is set up

   To enable Formspree:
   Create forms at https://formspree.io/ and replace
   the null values below with your form IDs.
   ============================================ */

const FORMSPREE_IDS = {
  // Replace null with your Formspree form ID string, e.g. 'xyzabcde'
  newsletter: null,
  story:      null,
  writer:     null,
  letter:     null,
  recipe:     null,
  event:      null,
  jobalert:   null,
  classified: null,
  contact:    null,
};

// Fallback email addresses when Formspree isn't configured
const MAILTO_FALLBACK = {
  newsletter: 'hello@impactnarrativemedia.ca',
  story:      'stories@impactnarrativemedia.ca',
  writer:     'stories@impactnarrativemedia.ca',
  letter:     'letters@impactnarrativemedia.ca',
  recipe:     'culture@impactnarrativemedia.ca',
  event:      'calendar@impactnarrativemedia.ca',
  jobalert:   'jobs@impactnarrativemedia.ca',
  classified: 'classifieds@impactnarrativemedia.ca',
  contact:    'ads@impactnarrativemedia.ca',
};

document.addEventListener('DOMContentLoaded', () => {

  document.querySelectorAll('form[data-form]').forEach(form => {
    const formType = form.dataset.form;
    const formspreeId = FORMSPREE_IDS[formType];
    const mailtoAddr = MAILTO_FALLBACK[formType] || 'hello@impactnarrativemedia.ca';

    // If Formspree is configured, set the action
    if (formspreeId) {
      form.action = `https://formspree.io/f/${formspreeId}`;
      form.method = 'POST';
    }

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn ? submitBtn.textContent : '';

      // Gather form data as readable text
      const formData = new FormData(form);
      const entries = [];
      for (const [key, value] of formData.entries()) {
        if (value && value.toString().trim()) {
          const label = key.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
          entries.push(`${label}: ${value}`);
        }
      }

      // MODE 1: Formspree is configured → AJAX submit
      if (formspreeId) {
        if (submitBtn) {
          submitBtn.textContent = 'Sending...';
          submitBtn.disabled = true;
        }

        fetch(`https://formspree.io/f/${formspreeId}`, {
          method: 'POST',
          body: formData,
          headers: { 'Accept': 'application/json' }
        })
        .then(response => {
          if (response.ok) {
            showFormMessage(form, 'success', 'Thank you! Your submission has been received. We\'ll be in touch soon.');
            form.reset();
          } else {
            showFormMessage(form, 'error', 'Something went wrong. Please try again or email us at ' + mailtoAddr);
          }
        })
        .catch(() => {
          showFormMessage(form, 'error', 'Network error. Please try again or email us directly at ' + mailtoAddr);
        })
        .finally(() => {
          if (submitBtn) {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
          }
        });
        return;
      }

      // MODE 2: No Formspree → compose mailto with form data
      const subject = getSubjectLine(formType);
      const body = entries.join('\n\n');
      const mailtoUrl = `mailto:${mailtoAddr}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

      // Try to open mail client
      window.location.href = mailtoUrl;

      // Show confirmation with email fallback
      showFormMessage(form, 'success',
        'Your email client should open with your submission. If it didn\'t, you can email us directly at ' +
        mailtoAddr + ' — just copy and paste the form contents.');
    });
  });

  function getSubjectLine(formType) {
    const subjects = {
      newsletter: 'Newsletter Signup - Impact Narrative Media',
      story:      'Story Submission - Impact Narrative Media',
      writer:     'Writer Pitch - Impact Narrative Media',
      letter:     'Letter to the Editor - Impact Narrative Media',
      recipe:     'Recipe Submission - Impact Narrative Media',
      event:      'Event Submission - Impact Narrative Media',
      jobalert:   'Job Alert Signup - Impact Narrative Media',
      classified: 'Classified Ad Submission - Impact Narrative Media',
      contact:    'Advertising Inquiry - Impact Narrative Media',
    };
    return subjects[formType] || 'Submission - Impact Narrative Media';
  }

  function showFormMessage(form, type, message) {
    const existing = form.querySelector('.form-message');
    if (existing) existing.remove();

    const msg = document.createElement('div');
    msg.className = 'form-message';
    msg.style.cssText = `
      padding: 1rem 1.25rem;
      border-radius: 6px;
      margin-top: 1rem;
      font-size: 0.92rem;
      line-height: 1.5;
    `;

    if (type === 'success') {
      msg.style.background = '#e8f5e9';
      msg.style.color = '#2e7d32';
      msg.style.border = '1px solid #a5d6a7';
    } else if (type === 'error') {
      msg.style.background = '#ffebee';
      msg.style.color = '#c62828';
      msg.style.border = '1px solid #ef9a9a';
    }

    msg.textContent = message;
    form.appendChild(msg);
    msg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    setTimeout(() => { if (msg.parentNode) msg.remove(); }, 10000);
  }
});

/* ============================================
   IMPACT NARRATIVE MEDIA - Dark Mode
   Toggle between light (paper) and dark (ink) themes.
   Persists preference in localStorage.
   ============================================ */

(function() {
  const STORAGE_KEY = 'in-dark-mode';

  // Check saved preference or system preference
  function getPreference() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved !== null) return saved === 'true';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  function applyDarkMode(dark) {
    document.documentElement.classList.toggle('dark-mode', dark);
    localStorage.setItem(STORAGE_KEY, dark);

    // Update toggle button if it exists
    const btn = document.getElementById('dark-mode-toggle');
    if (btn) {
      btn.innerHTML = dark ? '&#9788;' : '&#9790;';
      btn.title = dark ? 'Switch to light mode' : 'Switch to dark mode';
      btn.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
    }
  }

  // Apply immediately (before DOM ready) to prevent flash
  if (getPreference()) {
    document.documentElement.classList.add('dark-mode');
  }

  document.addEventListener('DOMContentLoaded', () => {
    const dark = getPreference();
    applyDarkMode(dark);

    // Create toggle button and inject into nav
    const navMain = document.querySelector('.nav-main');
    const navLinks = document.querySelector('.nav-links');
    if (navMain && navLinks) {
      const li = document.createElement('li');
      const btn = document.createElement('button');
      btn.id = 'dark-mode-toggle';
      btn.innerHTML = dark ? '&#9788;' : '&#9790;';
      btn.title = dark ? 'Switch to light mode' : 'Switch to dark mode';
      btn.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
      btn.style.cssText = `
        background: none;
        border: none;
        cursor: pointer;
        font-size: 1.2rem;
        padding: 0 var(--space-sm);
        line-height: var(--nav-height);
        color: var(--slate);
        transition: color 0.2s;
      `;
      btn.addEventListener('mouseenter', () => btn.style.color = 'var(--red)');
      btn.addEventListener('mouseleave', () => btn.style.color = 'var(--slate)');
      btn.addEventListener('click', () => {
        const nowDark = !document.documentElement.classList.contains('dark-mode');
        applyDarkMode(nowDark);
      });
      li.appendChild(btn);
      navLinks.appendChild(li);
    }
  });
})();

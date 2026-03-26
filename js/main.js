/* ============================================
   IMPACT NARRATIVE MEDIA - Core JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // --- Mobile Nav Toggle ---
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', navLinks.classList.contains('open'));
    });
  }

  // --- Breaking News Ticker: duplicate content for seamless loop ---
  const tickerContent = document.querySelector('.ticker-content');
  if (tickerContent) {
    tickerContent.innerHTML += tickerContent.innerHTML;
  }

  // --- Classified Category Filter ---
  const catBtns = document.querySelectorAll('.classified-cat-btn');
  const bulletinCards = document.querySelectorAll('.bulletin-card[data-category]');
  catBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      catBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.category;
      bulletinCards.forEach(card => {
        if (cat === 'all' || card.dataset.category === cat) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // --- Immersive Property Viewer ---
  const immersiveView = document.getElementById('immersive-view');
  if (immersiveView) {
    const gallery = immersiveView.querySelector('.immersive-gallery img');
    const infoContainer = immersiveView.querySelector('.immersive-info');
    const closeBtn = immersiveView.querySelector('.immersive-close');
    const prevBtn = immersiveView.querySelector('.immersive-nav.prev');
    const nextBtn = immersiveView.querySelector('.immersive-nav.next');
    let currentImages = [];
    let currentIndex = 0;

    function openImmersive(listingEl) {
      const images = JSON.parse(listingEl.dataset.images || '[]');
      const info = JSON.parse(listingEl.dataset.info || '{}');
      currentImages = images;
      currentIndex = 0;

      if (images.length > 0) {
        gallery.src = images[0];
        gallery.alt = info.address || 'Property photo';
      }

      // Build info panels
      infoContainer.innerHTML = `
        <div>
          <h3>Property Details</h3>
          <p style="font-size:1.5rem;font-weight:800;margin-bottom:0.5rem;">${info.price || ''}</p>
          <p style="margin-bottom:0.5rem;">${info.address || ''}</p>
          <p style="color:var(--silver);font-size:0.9rem;">${info.specs || ''}</p>
        </div>
        <div>
          <h3>Description</h3>
          <p style="font-size:0.9rem;line-height:1.6;color:var(--silver);">${info.description || ''}</p>
        </div>
        <div>
          <h3>Neighbourhood</h3>
          <p style="font-size:0.9rem;line-height:1.6;color:var(--silver);">${info.neighbourhood || ''}</p>
          ${info.features ? `<div style="margin-top:0.75rem;">${info.features.map(f => `<span class="listing-tag" style="margin:2px;display:inline-block;">${f}</span>`).join('')}</div>` : ''}
        </div>
      `;

      immersiveView.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function closeImmersive() {
      immersiveView.classList.remove('active');
      document.body.style.overflow = '';
    }

    function showImage(index) {
      if (currentImages.length === 0) return;
      currentIndex = (index + currentImages.length) % currentImages.length;
      gallery.src = currentImages[currentIndex];
    }

    if (closeBtn) closeBtn.addEventListener('click', closeImmersive);
    if (prevBtn) prevBtn.addEventListener('click', () => showImage(currentIndex - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => showImage(currentIndex + 1));

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (!immersiveView.classList.contains('active')) return;
      if (e.key === 'Escape') closeImmersive();
      if (e.key === 'ArrowLeft') showImage(currentIndex - 1);
      if (e.key === 'ArrowRight') showImage(currentIndex + 1);
    });

    // Attach to virtual tour buttons
    document.querySelectorAll('.virtual-tour-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const listing = btn.closest('.listing-card');
        if (listing) openImmersive(listing);
      });
    });
  }

  // --- Smooth scroll for anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // --- Content Warning expand/collapse ---
  document.querySelectorAll('.content-warning').forEach(cw => {
    const body = cw.querySelector('.cw-body');
    const toggle = cw.querySelector('.cw-toggle');
    if (body && toggle) {
      body.style.display = 'none';
      toggle.addEventListener('click', () => {
        const hidden = body.style.display === 'none';
        body.style.display = hidden ? '' : 'none';
        toggle.textContent = hidden ? 'Hide details' : 'Read more about this topic';
      });
    }
  });

  // --- Lazy random rotation for bulletin cards ---
  document.querySelectorAll('.bulletin-card').forEach(card => {
    const rotation = (Math.random() - 0.5) * 4;
    card.style.setProperty('--rotate', rotation + 'deg');
  });

});

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

  // --- Reading Progress Bar ---
  const progressBar = document.createElement('div');
  progressBar.id = 'reading-progress';
  progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 3px;
    background: linear-gradient(90deg, #c41e3a, #e8455e);
    width: 0%;
    z-index: 10000;
    transition: width 0.1s linear;
    pointer-events: none;
  `;
  document.body.appendChild(progressBar);

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = progress + '%';
  });

  // --- Back to Top Button ---
  const backToTop = document.createElement('button');
  backToTop.innerHTML = '&#8593;';
  backToTop.setAttribute('aria-label', 'Back to top');
  backToTop.style.cssText = `
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background: var(--red, #c41e3a);
    color: white;
    border: none;
    font-size: 1.3rem;
    cursor: pointer;
    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.3s, transform 0.3s, background 0.2s;
    z-index: 9000;
    pointer-events: none;
  `;
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  backToTop.addEventListener('mouseenter', () => {
    backToTop.style.background = 'var(--red-dark, #8b1528)';
  });
  backToTop.addEventListener('mouseleave', () => {
    backToTop.style.background = 'var(--red, #c41e3a)';
  });
  document.body.appendChild(backToTop);

  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      backToTop.style.opacity = '1';
      backToTop.style.transform = 'translateY(0)';
      backToTop.style.pointerEvents = 'auto';
    } else {
      backToTop.style.opacity = '0';
      backToTop.style.transform = 'translateY(20px)';
      backToTop.style.pointerEvents = 'none';
    }
  });

  // --- Animate elements on scroll ---
  const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        fadeObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.card, .listing-card, .plan-card, .rights-card, .recipe-card, .cal-event, .job-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    fadeObserver.observe(el);
  });

  // --- Easter Egg: Konami Code ---
  const konamiCode = [38,38,40,40,37,39,37,39,66,65];
  let konamiIndex = 0;
  document.addEventListener('keydown', (e) => {
    if (e.keyCode === konamiCode[konamiIndex]) {
      konamiIndex++;
      if (konamiIndex === konamiCode.length) {
        konamiIndex = 0;
        activateEasterEgg();
      }
    } else {
      konamiIndex = 0;
    }
  });

  function activateEasterEgg() {
    const msg = document.createElement('div');
    msg.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: #0a0a0a;
      color: #00ff41;
      font-family: 'VT323', 'Courier New', monospace;
      font-size: 1.2rem;
      padding: 3rem;
      border-radius: 12px;
      z-index: 99999;
      text-align: center;
      box-shadow: 0 0 60px rgba(0,255,65,0.15);
      border: 1px solid #00ff41;
      max-width: 500px;
      line-height: 1.8;
    `;
    msg.innerHTML = `
      <div style="font-size:0.6rem;line-height:1.1;margin-bottom:1rem;white-space:pre;color:#00e5ff;">
 _  __                          _
| |/ /___  _ __   __ _ _ __ ___(_)
| ' // _ \\| '_ \\ / _\` | '_ \` _ \\ |
| . \\ (_) | | | | (_| | | | | | | |
|_|\\_\\___/|_| |_|\\__,_|_| |_| |_|_|
      </div>
      <span style="color:#ffb000;">&#9733; ACHIEVEMENT UNLOCKED &#9733;</span><br><br>
      You found the Konami Code easter egg.<br>
      You are clearly a person of culture.<br><br>
      <span style="color:#00e5ff;">Impact Narrative Media was built with</span><br>
      <span style="color:#00e5ff;">love, code, and a belief that journalism</span><br>
      <span style="color:#00e5ff;">should serve the people, not the powerful.</span><br><br>
      <span style="color:#666;">Press any key to close</span>
    `;
    document.body.appendChild(msg);
    const close = () => { msg.remove(); document.removeEventListener('keydown', close); };
    setTimeout(() => document.addEventListener('keydown', close), 100);
    msg.addEventListener('click', close);
  }

});

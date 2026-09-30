// The Sphere of Light · A Temple Library
(() => {
  'use strict';

  const doc = document.documentElement;
  doc.classList.add('js');
  const config = window.SOL_CONFIG || {};
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── Toast: the honest "Coming soon." ─────────────────────── */
  const toast = document.querySelector('.toast');
  let toastTimer;
  function say(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.hidden = false;
    requestAnimationFrame(() => toast.classList.add('is-on'));
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('is-on');
      setTimeout(() => { toast.hidden = true; }, 400);
    }, 2600);
  }

  /* ── Buy buttons: live only when a checkout URL exists ───── */
  document.querySelectorAll('[data-checkout]').forEach((link) => {
    if (config.CHECKOUT_URL) {
      link.href = config.CHECKOUT_URL;
      link.rel = 'noopener';
    } else {
      link.addEventListener('click', (event) => { event.preventDefault(); say('Coming soon.'); });
    }
  });

  /* ── Pages not yet built ─────────────────────────────────── */
  document.querySelectorAll('[data-soon]').forEach((link) => {
    link.addEventListener('click', (event) => { event.preventDefault(); say('Coming soon.'); });
  });

  /* ── Menu overlay ────────────────────────────────────────── */
  const menu = document.getElementById('menu');
  const openBtn = document.querySelector('.menu-btn');
  const closeBtn = menu && menu.querySelector('.menu__close');

  function focusables() {
    return Array.from(menu.querySelectorAll('a[href], button:not([disabled])'));
  }
  function openMenu() {
    menu.hidden = false;
    document.body.classList.add('menu-open');
    openBtn.setAttribute('aria-expanded', 'true');
    requestAnimationFrame(() => menu.classList.add('is-open'));
    const first = menu.querySelector('.menu__list a');
    if (first) first.focus();
  }
  function closeMenu(returnFocus = true) {
    menu.classList.remove('is-open');
    document.body.classList.remove('menu-open');
    openBtn.setAttribute('aria-expanded', 'false');
    setTimeout(() => { menu.hidden = true; }, reduceMotion ? 0 : 450);
    if (returnFocus) openBtn.focus();
  }
  if (menu && openBtn) {
    openBtn.addEventListener('click', openMenu);
    closeBtn.addEventListener('click', () => closeMenu());
    menu.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') { closeMenu(); return; }
      if (event.key !== 'Tab') return;
      const items = focusables();
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    });
    menu.querySelectorAll('.menu__list a').forEach((link) => {
      link.addEventListener('click', () => {
        if (link.target !== '_blank') closeMenu(false);
      });
    });
  }

  /* ── Reveal on scroll ────────────────────────────────────── */
  const reveals = document.querySelectorAll('.reveal');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    reveals.forEach((el) => el.classList.add('is-in'));
  } else {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    reveals.forEach((el, i) => {
      // a gentle stagger for siblings that enter together
      el.style.transitionDelay = `${Math.min((i % 6) * 70, 350)}ms`;
      io.observe(el);
    });
  }

  /* ── Starfield (drawn once; the SVG layer carries the twinkle) ─ */
  const canvas = document.querySelector('.hero__stars');
  function drawStars() {
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(rect.width * dpr);
    canvas.height = Math.round(rect.height * dpr);
    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);
    // deterministic scatter so the sky is the same on every visit
    let seed = 1440;
    const rand = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
    const count = Math.min(Math.round((rect.width * rect.height) / 2600), 520);
    for (let i = 0; i < count; i++) {
      const x = rand() * rect.width;
      const y = rand() * rect.height * 0.82;
      const r = rand() < 0.92 ? rand() * 0.8 + 0.2 : rand() * 1.2 + 0.8;
      const warm = rand() < 0.35;
      ctx.globalAlpha = 0.25 + rand() * 0.6;
      ctx.fillStyle = warm ? '#E8D29A' : '#F3EAD3';
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }
    // a faint band of gathered light across the sky
    const band = ctx.createLinearGradient(0, rect.height * 0.1, rect.width, rect.height * 0.55);
    band.addColorStop(0, 'rgba(197,165,90,0)');
    band.addColorStop(0.5, 'rgba(197,165,90,0.05)');
    band.addColorStop(1, 'rgba(197,165,90,0)');
    ctx.globalAlpha = 1;
    ctx.fillStyle = band;
    ctx.fillRect(0, 0, rect.width, rect.height);
  }
  drawStars();
  let resizeTimer;
  let lastWidth = window.innerWidth;
  window.addEventListener('resize', () => {
    if (window.innerWidth === lastWidth) return; // ignore mobile toolbar height changes
    lastWidth = window.innerWidth;
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(drawStars, 200);
  });

  /* ── Free scroll form ────────────────────────────────────── */
  const form = document.querySelector('.free__form');
  if (form) {
    const input = form.querySelector('input[type="email"]');
    const status = form.querySelector('.free__status');
    const button = form.querySelector('button[type="submit"]');
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      const email = input.value.trim();
      if (!input.checkValidity() || !email) {
        status.textContent = 'Please enter a valid email address.';
        input.setAttribute('aria-invalid', 'true');
        input.focus();
        return;
      }
      input.removeAttribute('aria-invalid');
      if (!config.GHL_FORM_ENDPOINT) {
        status.textContent = 'Coming soon.';
        return;
      }
      button.disabled = true;
      status.textContent = 'Sending…';
      try {
        const response = await fetch(config.GHL_FORM_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams({ email }),
        });
        if (!response.ok) throw new Error(String(response.status));
        status.textContent = 'The scroll is on its way. Check your inbox.';
        form.reset();
      } catch {
        status.textContent = 'Something went wrong. Please try again in a moment.';
      } finally {
        button.disabled = false;
      }
    });
  }
})();

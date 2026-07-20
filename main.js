/* ═══════════════════════════════════════════════
   ELECTRIC PREMIUM CARS — main.js
   Animations · Navigation · FAQ · Form
   ═══════════════════════════════════════════════ */

'use strict';

/* ─── NAV ─── */
(function initNav() {
  const nav = document.getElementById('nav');
  const burger = document.getElementById('burger');
  const mobileMenu = document.getElementById('mobileMenu');

  if (!nav) return;

  // Scrolled state
  function onScroll() {
    if (window.scrollY > 48) {
      nav.classList.add('nav--scrolled');
    } else {
      nav.classList.remove('nav--scrolled');
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Burger
  if (burger && mobileMenu) {
    burger.addEventListener('click', function () {
      const isOpen = mobileMenu.classList.toggle('open');
      burger.classList.toggle('open', isOpen);
      burger.setAttribute('aria-expanded', isOpen);
      mobileMenu.setAttribute('aria-hidden', !isOpen);
    });

    // Close on link click
    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileMenu.classList.remove('open');
        burger.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
        mobileMenu.setAttribute('aria-hidden', 'true');
      });
    });
  }
})();


/* ─── SMOOTH SCROLL (anchor links) ─── */
document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 72;
    const top = target.getBoundingClientRect().top + window.scrollY - navH - 16;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});


/* ─── REVEAL ANIMATIONS ─── */
(function initReveal() {
  const elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  elements.forEach(function (el) {
    observer.observe(el);
  });
})();


/* ─── HERO PARALLAX (subtle) ─── */
(function initParallax() {
  const bg = document.getElementById('heroBg');
  if (!bg) return;

  function onScroll() {
    const scrollY = window.scrollY;
    if (scrollY < window.innerHeight) {
      bg.style.transform = 'translateY(' + (scrollY * 0.28) + 'px)';
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
})();


/* ─── SCROLL HINT FADE ─── */
(function initScrollHint() {
  const hint = document.getElementById('heroScroll');
  if (!hint) return;

  window.addEventListener('scroll', function () {
    const opacity = Math.max(0, 1 - window.scrollY / 200);
    hint.style.opacity = opacity;
  }, { passive: true });
})();


/* ─── FAQ ACCORDION ─── */
(function initFaq() {
  const items = document.querySelectorAll('.faq__item');
  if (!items.length) return;

  items.forEach(function (item) {
    const button = item.querySelector('.faq__question');
    if (!button) return;

    button.addEventListener('click', function () {
      const isOpen = item.classList.contains('open');

      // Close all
      items.forEach(function (i) {
        i.classList.remove('open');
        const btn = i.querySelector('.faq__question');
        if (btn) btn.setAttribute('aria-expanded', 'false');
      });

      // Toggle clicked
      if (!isOpen) {
        item.classList.add('open');
        button.setAttribute('aria-expanded', 'true');
      }
    });
  });
})();


/* ─── FORM SUBMIT ─── */
(function initForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const btn = document.getElementById('form-submit-btn');
    const name = document.getElementById('f-name').value.trim();
    const email = document.getElementById('f-email').value.trim();

    if (!name || !email) {
      // Simple inline validation
      if (!name) document.getElementById('f-name').focus();
      else document.getElementById('f-email').focus();
      return;
    }

    // Feedback
    if (btn) {
      btn.textContent = 'Message envoyé ✓';
      btn.disabled = true;
      btn.style.opacity = '0.6';
    }

    // Reset after 4s (demo)
    setTimeout(function () {
      form.reset();
      if (btn) {
        btn.textContent = 'Démarrer ma recherche';
        btn.disabled = false;
        btn.style.opacity = '1';
      }
    }, 4000);
  });
})();


/* ─── ACTIVE NAV LINK (scroll-spy) ─── */
(function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__links a');
  if (!sections.length || !navLinks.length) return;

  function onScroll() {
    let current = '';
    sections.forEach(function (section) {
      const top = section.offsetTop - 120;
      if (window.scrollY >= top) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(function (link) {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      if (href === ('#' + current) || (current === '' && href === 'index.html')) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
})();

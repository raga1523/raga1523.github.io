/* =============================================
   PORTFOLIO — RAGA SWAROOPA MANDADHI
   script.js
   ============================================= */

'use strict';

// =============================================
// 1. MOBILE NAVIGATION TOGGLE
// =============================================
const navToggle = document.getElementById('navToggle');
const navLinks  = document.querySelector('.nav-links');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const isOpen = navLinks.classList.contains('open');
    navToggle.setAttribute('aria-expanded', isOpen);
  });

  // Close menu when a nav link is clicked
  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}


// =============================================
// 2. ACTIVE NAV LINK ON SCROLL
// =============================================
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-link');

function setActiveNavLink() {
  let scrollY = window.scrollY;

  sections.forEach(section => {
    const sectionTop    = section.offsetTop - 80;
    const sectionBottom = sectionTop + section.offsetHeight;
    const sectionId     = section.getAttribute('id');

    if (scrollY >= sectionTop && scrollY < sectionBottom) {
      navItems.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

window.addEventListener('scroll', setActiveNavLink, { passive: true });


// =============================================
// 3. SCROLL FADE-IN ANIMATIONS (IntersectionObserver)
// =============================================
function initFadeAnimations() {
  // Add fade-in class to animatable elements
  const animatables = document.querySelectorAll(
    '.hero-badge, .hero-heading, .hero-subtext, .hero-cta, ' +
    '.academic-card, .about-heading, .about-text, .about-image-wrap, ' +
    '.skills-card, .skills-card-right, ' +
    '.project-card, .timeline-item, .exploration-item, ' +
    '.contact-heading, .contact-subtext, .contact-links, ' +
    '.section-label, .section-heading, .projects-heading'
  );

  animatables.forEach(el => {
    el.classList.add('fade-in');
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger animation for sibling elements
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, i * 50);
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  animatables.forEach(el => observer.observe(el));
}

// Initialize after DOM ready
document.addEventListener('DOMContentLoaded', () => {
  initFadeAnimations();
});


// =============================================
// 4. SMOOTH SCROLL FOR ALL ANCHOR LINKS
// (Fallback for browsers without CSS scroll-behavior support)
// =============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const navH = document.querySelector('.navbar')?.offsetHeight || 54;
      const top  = target.getBoundingClientRect().top + window.scrollY - navH;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});


// =============================================
// 5. NAVBAR BACKGROUND INTENSITY ON SCROLL
// =============================================
const navbar = document.getElementById('navbar');

function updateNavbar() {
  if (window.scrollY > 20) {
    navbar.style.borderBottomColor = 'rgba(255,255,255,0.09)';
  } else {
    navbar.style.borderBottomColor = 'rgba(255,255,255,0.07)';
  }
}

window.addEventListener('scroll', updateNavbar, { passive: true });

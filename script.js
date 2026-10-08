const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('.site-nav');

document.documentElement.classList.add('js-ready');

menuToggle?.addEventListener('click', () => {
  const isOpen = siteNav.classList.toggle('is-open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

siteNav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    siteNav.classList.remove('is-open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  });
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

const chapterObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    entry.target.classList.toggle('chapter-active', entry.isIntersecting);
  });
}, { threshold: 0.2 });

document.querySelectorAll('.chapter-section').forEach((section) => chapterObserver.observe(section));

if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.documentElement.classList.add('reduced-motion');
}

document.addEventListener('DOMContentLoaded', () => {
  const scrollBox = document.querySelector('.hero-scroll-box');
  const scrollText = document.querySelector('.hero-scroll-text');

  if (!scrollBox || !scrollText) return;

  function handleScroll() {
    const scrollY = window.scrollY;
    
    // Adjust maxScroll (150px) to control how quickly/distance until it fully hides
    const maxScroll = 600; 
    
    // Progress ratio from 0 (at top) to 1 (scrolled down 150px or more)
    const progress = Math.min(Math.max(scrollY / maxScroll, 0), 1);

    // Moves text up by up to -120% so it completely disappears past the top border
    const shiftPercent = -progress * 120;

    scrollText.style.setProperty('--scroll-shift', `${shiftPercent}%`);
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Run once on load
});
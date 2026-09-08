// Progressive scroll-reveal. Content is always visible without JavaScript or with reduced motion.
const REVEAL_SELECTOR = [
  '.section-heading',
  '.service-card',
  '.split-section > *',
  '.testimonial-grid figure',
  '.image-card',
  '.booking-card',
  '.booking-notice',
  '.returning-strip',
  '.faq-section > div',
  '.cta-section .container',
  '.contact-grid > *',
  '.technique-grid > div',
  '.prose > *',
  '.story-note',
  '.wide-image',
  '.video-component',
  '.gallery-disclosure',
  '.partnership-strip .container',
].join(',');
const root = document.documentElement;
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!reduced && 'IntersectionObserver' in window) {
  const items = [...document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR)].filter(
    (el) => !el.closest('.hero') && !el.closest('.page-hero'),
  );
  // Stagger siblings that share a parent so grids cascade instead of popping in together.
  const siblingIndex = new Map<Element, number>();
  for (const el of items) {
    const parent = el.parentElement ?? root;
    const index = siblingIndex.get(parent) ?? 0;
    siblingIndex.set(parent, index + 1);
    el.style.setProperty('--reveal-delay', `${Math.min(index, 5) * 70}ms`);
    el.dataset.reveal = '';
  }
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
  );
  root.classList.add('reveal-ready');
  items.forEach((el) => observer.observe(el));
  // Never trap content off-screen (e.g. hidden tabs, print, unusual scroll containers).
  setTimeout(() => items.forEach((el) => el.classList.add('is-visible')), 1500);
}
// Header elevation once the page scrolls.
const header = document.querySelector<HTMLElement>('.site-header');
if (header) {
  const update = () => header.classList.toggle('is-scrolled', scrollY > 8);
  update();
  addEventListener('scroll', update, { passive: true });
}

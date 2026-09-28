/**
 * Blocks rise into place the first time they reach the viewport.
 *
 * Only a page with scripting hides anything (`html[data-js]` in CSS), and
 * only until this runs; reduced motion and an engine without
 * IntersectionObserver show everything at once.
 */
export function initReveal() {
  const blocks = [...document.querySelectorAll<HTMLElement>('[data-reveal]')];
  const show = (block: HTMLElement) => (block.dataset.revealed = '');
  if (
    document.documentElement.dataset.motion === 'reduced' ||
    !('IntersectionObserver' in window)
  ) {
    blocks.forEach(show);
    return;
  }
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        show(entry.target as HTMLElement);
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: '0px 0px -8% 0px' },
  );
  blocks.forEach((block) => observer.observe(block));
}

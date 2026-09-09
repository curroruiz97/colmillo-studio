export function initStickyHeader(): () => void {
  const header = document.querySelector<HTMLElement>('[data-sticky-header]');
  const hero = document.querySelector<HTMLElement>('[data-hero]');

  if (!header) return () => undefined;
  if (!hero) {
    header.dataset.visible = 'true';
    header.inert = false;
    return () => undefined;
  }

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry) {
        const visible = !entry.isIntersecting;
        header.dataset.visible = String(visible);
        header.inert = !visible;
      }
    },
    { rootMargin: '-12% 0px 0px', threshold: 0 },
  );
  observer.observe(hero);

  return () => observer.disconnect();
}

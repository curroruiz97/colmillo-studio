/**
 * The product gallery's counter. On a phone the gallery is a native
 * scroll-snap strip; this only says which picture is in view ("02 / 03").
 * On a wide screen the pictures are stacked and the counter is not shown.
 */
export function initGallery() {
  const gallery = document.querySelector<HTMLElement>('[data-gallery]');
  const counter = gallery?.querySelector<HTMLElement>('[data-gallery-counter]');
  const slides = [
    ...(gallery?.querySelectorAll<HTMLElement>('.gallery__slide') ?? []),
  ];
  const track = gallery?.querySelector<HTMLElement>('[data-gallery-track]');
  if (!counter || !track || slides.length === 0) return;
  const total = String(slides.length).padStart(2, '0');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const index = slides.indexOf(entry.target as HTMLElement) + 1;
        counter.textContent = `${String(index).padStart(2, '0')} / ${total}`;
      });
    },
    { root: track, threshold: 0.6 },
  );
  slides.forEach((slide) => observer.observe(slide));
}

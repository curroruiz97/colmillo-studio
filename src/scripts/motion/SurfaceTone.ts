export function initSurfaceTone(): () => void {
  const surfaces = [
    ...document.querySelectorAll<HTMLElement>('[data-surface-tone]'),
  ];
  if (surfaces.length === 0) return () => undefined;

  const visible = new Map<Element, number>();
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting)
          visible.set(entry.target, entry.intersectionRatio);
        else visible.delete(entry.target);
      }
      const active = [...visible.entries()].sort((a, b) => b[1] - a[1])[0]?.[0];
      if (active instanceof HTMLElement && active.dataset.surfaceTone) {
        document.documentElement.dataset.surfaceTone =
          active.dataset.surfaceTone;
      }
    },
    { rootMargin: '-38% 0px -38% 0px', threshold: [0, 0.25, 0.6, 1] },
  );

  surfaces.forEach((surface) => observer.observe(surface));
  document.documentElement.dataset.surfaceTone =
    surfaces[0]?.dataset.surfaceTone ?? 'light';

  return () => {
    observer.disconnect();
    delete document.documentElement.dataset.surfaceTone;
  };
}

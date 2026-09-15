export function initSurfaceTone(): () => void {
  const surfaces = [
    ...document.querySelectorAll<HTMLElement>('[data-surface-tone]'),
  ];
  if (surfaces.length === 0) return () => undefined;

  /*
   * The surface that owns the middle band is the last one in the document
   * that crosses it: it is painted above the one before (a stack layer rising
   * over a covered sticky layer, which keeps intersecting) or nested inside
   * it. Ratios cannot decide this: `intersectionRatio` is relative to the
   * target, so a full-screen section never passes about 0.24 of the band and
   * only reports the ratio it had when it entered.
   */
  const visible = new Set<Element>();
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) visible.add(entry.target);
        else visible.delete(entry.target);
      }
      const active = [...visible].reduce<Element | undefined>(
        (last, surface) =>
          !last ||
          last.compareDocumentPosition(surface) &
            Node.DOCUMENT_POSITION_FOLLOWING
            ? surface
            : last,
        undefined,
      );
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

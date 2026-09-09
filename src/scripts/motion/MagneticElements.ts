import gsap from 'gsap';

export function initMagneticElements(): () => void {
  const capable = window.matchMedia(
    '(hover: hover) and (pointer: fine)',
  ).matches;
  if (!capable || document.documentElement.dataset.motion === 'reduced') {
    return () => undefined;
  }

  const cleanups = [
    ...document.querySelectorAll<HTMLElement>('[data-magnetic]'),
  ].map((element) => {
    let bounds: DOMRect | null = null;
    const measure = () => {
      bounds = element.getBoundingClientRect();
    };
    const move = (event: PointerEvent) => {
      if (!bounds) return;
      const x = (event.clientX - bounds.left - bounds.width / 2) * 0.14;
      const y = (event.clientY - bounds.top - bounds.height / 2) * 0.14;
      gsap.to(element, { x, y, duration: 0.32, ease: 'power3.out' });
    };
    const reset = () => {
      bounds = null;
      gsap.to(element, {
        x: 0,
        y: 0,
        duration: 0.55,
        ease: 'elastic.out(1, .45)',
      });
    };
    element.addEventListener('pointerenter', measure);
    element.addEventListener('pointermove', move);
    element.addEventListener('pointerleave', reset);
    return () => {
      element.removeEventListener('pointerenter', measure);
      element.removeEventListener('pointermove', move);
      element.removeEventListener('pointerleave', reset);
    };
  });

  return () => cleanups.forEach((cleanup) => cleanup());
}

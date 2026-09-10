import gsap from 'gsap';

export function initCustomCursor(): () => void {
  const cursor = document.querySelector<HTMLElement>('[data-custom-cursor]');
  const shape = cursor?.querySelector<HTMLElement>('.custom-cursor__shape');
  const label = cursor?.querySelector<HTMLElement>('[data-cursor-text]');
  const capable = window.matchMedia(
    '(hover: hover) and (pointer: fine)',
  ).matches;

  if (
    !cursor ||
    !shape ||
    !label ||
    !capable ||
    document.documentElement.dataset.motion === 'reduced'
  ) {
    document.documentElement.removeAttribute('data-cursor-ready');
    return () => undefined;
  }

  const moveX = gsap.quickTo(cursor, 'x', {
    duration: 0.22,
    ease: 'power3.out',
  });
  const moveY = gsap.quickTo(cursor, 'y', {
    duration: 0.22,
    ease: 'power3.out',
  });
  let previousX = 0;
  let previousY = 0;
  let previousTime = performance.now();

  const move = (event: PointerEvent) => {
    moveX(event.clientX);
    moveY(event.clientY);
    const deltaX = event.clientX - previousX;
    const deltaY = event.clientY - previousY;
    const elapsed = Math.max(8, event.timeStamp - previousTime);
    const speed = Math.hypot(deltaX, deltaY) / elapsed;
    const velocity = Math.min(speed / 3.4, 0.24);
    shape.style.setProperty('--cursor-stretch', velocity.toFixed(3));
    document.documentElement.style.setProperty(
      '--pointer-shift-x',
      `${((event.clientX / window.innerWidth - 0.5) * 22).toFixed(2)}px`,
    );
    document.documentElement.style.setProperty(
      '--pointer-shift-y',
      `${((event.clientY / window.innerHeight - 0.5) * 18).toFixed(2)}px`,
    );
    document.documentElement.style.setProperty(
      '--pointer-shift-x-reverse',
      `${((event.clientX / window.innerWidth - 0.5) * -14).toFixed(2)}px`,
    );
    document.documentElement.style.setProperty(
      '--pointer-shift-y-reverse',
      `${((event.clientY / window.innerHeight - 0.5) * -12).toFixed(2)}px`,
    );
    document.documentElement.style.setProperty(
      '--pointer-speed',
      velocity.toFixed(3),
    );
    if (deltaX || deltaY)
      shape.style.setProperty(
        '--cursor-angle',
        `${(Math.atan2(deltaY, deltaX) * 180) / Math.PI}deg`,
      );
    previousX = event.clientX;
    previousY = event.clientY;
    previousTime = event.timeStamp;
    cursor.dataset.visible = 'true';
  };
  const leave = () => {
    cursor.dataset.visible = 'false';
  };
  const describeTarget = (target: Element | null) => {
    const interactive = target?.closest<HTMLElement>(
      '[data-cursor-label], a, button, summary',
    );
    const text = interactive?.dataset.cursorLabel?.trim() ?? '';
    cursor.dataset.active = String(Boolean(interactive));
    cursor.dataset.labelled = String(Boolean(text));
    label.textContent = text;
  };
  const setActive = (event: Event) => {
    describeTarget(event.target instanceof Element ? event.target : null);
  };
  const unsetActive = (event: PointerEvent) => {
    const related =
      event.relatedTarget instanceof Element ? event.relatedTarget : null;
    describeTarget(related);
  };
  const press = () => {
    cursor.dataset.pressed = 'true';
  };
  const release = () => {
    cursor.dataset.pressed = 'false';
  };

  document.documentElement.dataset.cursorReady = 'true';
  window.addEventListener('pointermove', move, { passive: true });
  document.documentElement.addEventListener('pointerover', setActive);
  document.documentElement.addEventListener('pointerout', unsetActive);
  document.documentElement.addEventListener('mouseleave', leave);
  document.documentElement.addEventListener('pointerdown', press);
  document.documentElement.addEventListener('pointerup', release);
  window.addEventListener('blur', leave);

  return () => {
    window.removeEventListener('pointermove', move);
    document.documentElement.removeEventListener('pointerover', setActive);
    document.documentElement.removeEventListener('pointerout', unsetActive);
    document.documentElement.removeEventListener('mouseleave', leave);
    document.documentElement.removeEventListener('pointerdown', press);
    document.documentElement.removeEventListener('pointerup', release);
    window.removeEventListener('blur', leave);
    document.documentElement.removeAttribute('data-cursor-ready');
    document.documentElement.style.removeProperty('--pointer-shift-x');
    document.documentElement.style.removeProperty('--pointer-shift-y');
    document.documentElement.style.removeProperty('--pointer-shift-x-reverse');
    document.documentElement.style.removeProperty('--pointer-shift-y-reverse');
    document.documentElement.style.removeProperty('--pointer-speed');
  };
}

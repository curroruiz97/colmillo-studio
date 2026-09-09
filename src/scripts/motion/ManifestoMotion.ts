import gsap from 'gsap';

/**
 * Home manifesto: a sequence of posters driven by ordinary vertical scroll.
 *
 * The CSS composition is the timeline's end state, so every offset below is
 * relative to the finished poster and resolves back to `transform: none`.
 * Offsets are expressed as fractions of the canvas and re-evaluated on refresh,
 * so the choreography holds from 1024px to 1920px and across resize.
 */
export function initManifestoMotion(): () => void {
  const track = document.querySelector<HTMLElement>('[data-manifesto-track]');
  const canvas = document.querySelector<HTMLElement>('[data-manifesto-canvas]');
  if (!track || !canvas) return () => undefined;
  if (document.documentElement.dataset.motion === 'reduced') {
    return () => undefined;
  }

  const word = (name: string) => `[data-manifesto-word='${name}']`;
  const width = () => canvas.getBoundingClientRect().width;
  const height = () => canvas.getBoundingClientRect().height;
  const w = (fraction: number) => () => width() * fraction;
  const h = (fraction: number) => () => height() * fraction;

  const media = gsap.matchMedia();

  media.add(
    '(min-width: 64.01rem) and (min-height: 40rem) and (prefers-reduced-motion: no-preference)',
    () => {
      const timeline = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: track,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });

      // 00-20 — Scene 01. MORDER. alone, oversized, held.
      timeline
        .fromTo(
          word('morder'),
          { x: w(-0.012), y: h(0.1), scale: 1.72, opacity: 1 },
          { x: w(-0.012), y: h(0.1), scale: 1.72, duration: 20 },
          0,
        )
        .fromTo(
          '[data-manifesto-rule]',
          { scaleX: 0 },
          { scaleX: 1, duration: 8, ease: 'power2.out' },
          2,
        )
        .fromTo(
          '[data-manifesto-shape]',
          { x: w(0.02), y: h(0.14), scale: 0.66 },
          { x: w(0.02), y: h(0.14), scale: 0.66, duration: 20 },
          0,
        )
        .fromTo(
          '[data-manifesto-skin]',
          { rotate: -9, borderRadius: '50% 47% 52% 48%' },
          { rotate: -9, borderRadius: '50% 47% 52% 48%', duration: 20 },
          0,
        )
        .fromTo(
          '[data-manifesto-tag]',
          { opacity: 0 },
          { opacity: 0, duration: 20 },
          0,
        )
        .fromTo(
          word('presionar'),
          { x: w(-0.1), y: h(0.28), scale: 1.25, opacity: 0 },
          {
            x: w(-0.1),
            y: h(0.28),
            scale: 1.25,
            opacity: 0,
            duration: 20,
          },
          0,
        )
        .fromTo(
          word('marca'),
          { y: h(0.14), scaleX: 1.1, scaleY: 0.66, opacity: 0 },
          {
            y: h(0.14),
            scaleX: 1.1,
            scaleY: 0.66,
            opacity: 0,
            duration: 20,
          },
          0,
        )
        .fromTo(
          '[data-manifesto-bite]',
          { scale: 0, transformOrigin: '50% 50%' },
          { scale: 0, duration: 20 },
          0,
        );

      // 20-34 — Scene 02. MORDER. retreats, PRESIONAR. arrives, shape compresses.
      timeline
        .to(
          word('morder'),
          {
            x: w(0.5),
            y: h(-0.08),
            scale: 0.42,
            opacity: 0.72,
            duration: 14,
            ease: 'power2.inOut',
          },
          20,
        )
        .to(
          word('presionar'),
          {
            x: w(-0.16),
            y: h(0.06),
            opacity: 1,
            duration: 12,
            ease: 'power3.out',
          },
          24,
        )
        .to(
          '[data-manifesto-shape]',
          { x: w(0.01), y: h(0.06), duration: 12, ease: 'power2.inOut' },
          22,
        )
        .to(
          '[data-manifesto-skin]',
          {
            scaleX: 0.72,
            scaleY: 1.06,
            rotate: -4,
            borderRadius: '46% 44% 50% 42%',
            duration: 12,
            ease: 'power2.inOut',
          },
          22,
        )
        .to(
          '[data-manifesto-tag]',
          { opacity: 1, duration: 8, ease: 'power2.out' },
          28,
        );

      // 34-48 — visual pause. Nothing moves; the composition can be read.

      // 48-62 — Scene 03. "Dejar marca." lands with pressure, shape stretches.
      timeline
        .to(
          word('marca'),
          {
            y: h(0.02),
            scaleX: 1.3,
            scaleY: 1.3,
            opacity: 1,
            duration: 14,
            ease: 'back.out(1.35)',
          },
          48,
        )
        .to(
          '[data-manifesto-skin]',
          {
            scaleX: 1.12,
            scaleY: 0.9,
            borderRadius: '44% 52% 40% 54%',
            duration: 12,
            ease: 'power2.inOut',
          },
          50,
        );

      // 62-74 — visual pause.

      // 74-94 — the poster assembles. Staggered, never all at once.
      timeline
        .to(
          word('morder'),
          {
            x: 0,
            y: 0,
            scale: 1,
            opacity: 1,
            duration: 12,
            ease: 'power2.inOut',
          },
          74,
        )
        .to(
          word('presionar'),
          { x: 0, y: 0, scale: 1, duration: 12, ease: 'power2.inOut' },
          78,
        )
        .to(
          word('marca'),
          { x: 0, y: 0, scale: 1, duration: 12, ease: 'power2.inOut' },
          82,
        )
        .to(
          '[data-manifesto-shape]',
          { x: 0, y: 0, scale: 1, duration: 14, ease: 'power2.inOut' },
          76,
        )
        .to(
          '[data-manifesto-skin]',
          {
            scaleX: 1,
            scaleY: 1,
            rotate: 0,
            borderRadius: '48% 42% 46% 40%',
            duration: 14,
            ease: 'power2.inOut',
          },
          76,
        )
        .to(
          '[data-manifesto-bite]',
          { scale: 1, duration: 8, ease: 'back.out(1.6)' },
          84,
        );

      // 92-100 — release. The CTA is the last thing to exist.
      timeline
        .fromTo(
          '[data-manifesto-cta]',
          { opacity: 0, y: h(0.035) },
          { opacity: 0, y: h(0.035), duration: 92 },
          0,
        )
        .to(
          '[data-manifesto-cta]',
          { opacity: 1, y: 0, duration: 8, ease: 'power3.out' },
          92,
        );
    },
  );

  // Coarse pointers and short viewports read the same poster as a linear
  // editorial stack: reveals only, no pin and no sequence.
  media.add('(max-width: 64rem), (max-height: 39.99rem)', () => {
    const targets = gsap.utils.toArray<HTMLElement>([
      '[data-manifesto-rule]',
      word('morder'),
      word('presionar'),
      '.manifesto-home__shape',
      word('marca'),
      '[data-manifesto-cta]',
    ]);

    targets.forEach((target, index) => {
      gsap.from(target, {
        y: 26,
        opacity: 0,
        duration: 0.7,
        delay: Math.min(index * 0.04, 0.16),
        ease: 'power3.out',
        scrollTrigger: { trigger: target, start: 'top 88%', once: true },
      });
    });

    gsap.fromTo(
      '[data-manifesto-skin]',
      { scaleX: 0.9, scaleY: 1.06, rotate: -3 },
      {
        scaleX: 1,
        scaleY: 1,
        rotate: 5,
        ease: 'none',
        scrollTrigger: {
          trigger: '.manifesto-home__shape',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.7,
        },
      },
    );
  });

  return () => media.revert();
}

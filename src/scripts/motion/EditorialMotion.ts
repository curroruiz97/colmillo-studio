import gsap from 'gsap';

export function initEditorialMotion(): () => void {
  if (document.documentElement.dataset.motion === 'reduced') {
    return () => undefined;
  }

  const context = gsap.context(() => {
    gsap.utils.toArray<HTMLElement>('[data-editorial-mark]').forEach((mark) => {
      gsap.fromTo(
        mark,
        { rotate: -10, scale: 0.82, borderRadius: '58% 36% 56% 38%' },
        {
          rotate: 6,
          scale: 1,
          borderRadius: '42% 54% 39% 57%',
          ease: 'none',
          scrollTrigger: {
            trigger: mark,
            start: 'top 88%',
            end: 'bottom 32%',
            scrub: 0.6,
          },
        },
      );
    });

    gsap.utils
      .toArray<HTMLElement>('[data-reveal-block]')
      .forEach((block, index) => {
        gsap.from(block, {
          y: 34,
          scale: 0.985,
          opacity: 0,
          clipPath: 'inset(8% 0 0 round 1.5rem)',
          duration: 0.78,
          delay: Math.min(index * 0.035, 0.14),
          ease: 'power3.out',
          scrollTrigger: {
            trigger: block,
            start: 'top 88%',
            once: true,
          },
        });
      });

    const signal = document.querySelector<HTMLElement>('[data-contact-signal]');
    if (signal) {
      gsap.to(signal, {
        rotate: 14,
        scale: 0.92,
        borderRadius: '41% 55% 38% 58%',
        ease: 'none',
        scrollTrigger: {
          trigger: signal.closest('header'),
          start: 'top top',
          end: 'bottom top',
          scrub: 0.7,
        },
      });
    }
  });

  return () => context.revert();
}

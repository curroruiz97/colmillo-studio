import gsap from 'gsap';

export function initHeroMotion(): () => void {
  const hero = document.querySelector<HTMLElement>('[data-hero]');
  const stage = hero?.querySelector<HTMLElement>('[data-hero-stage]');
  const videos = [
    ...document.querySelectorAll<HTMLVideoElement>('[data-motion-video]'),
  ];
  if (!hero || document.documentElement.dataset.motion === 'reduced') {
    videos.forEach((video) => video.pause());
    return () => undefined;
  }

  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      const visible = entry.isIntersecting;
      if (entry.target === hero && stage) {
        stage.dataset.playing = String(visible);
      }
      if (entry.target instanceof HTMLVideoElement) {
        if (visible) void entry.target.play().catch(() => undefined);
        else entry.target.pause();
      }
    }
  });
  observer.observe(hero);
  videos.forEach((video) => observer.observe(video));

  const context = gsap.context(() => {
    gsap
      .timeline({
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.7,
        },
      })
      .to(
        stage ?? hero.querySelector('.hero__media-frame'),
        {
          scale: 0.93,
          yPercent: 7,
          borderRadius: '0 0 4.5rem 4.5rem',
          transformOrigin: '50% 100%',
          ease: 'none',
        },
        0,
      )
      .to(
        hero.querySelector('.hero__content'),
        { yPercent: -4, opacity: 0.72, ease: 'none' },
        0,
      );
  }, hero);

  return () => {
    observer.disconnect();
    context.revert();
  };
}

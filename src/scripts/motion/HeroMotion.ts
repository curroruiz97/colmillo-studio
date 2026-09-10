import gsap from 'gsap';

/**
 * Hero behaviour.
 *
 * The loop is a progressive enhancement in every direction: the poster sits
 * underneath it, reduced motion pauses and hides the video, and the section is
 * complete without JavaScript. This module only decides *when* the loop is
 * allowed to run and adds the exit compression as the hero leaves.
 */
export function initHeroMotion(): () => void {
  const hero = document.querySelector<HTMLElement>('[data-hero]');
  const videos = [
    ...document.querySelectorAll<HTMLVideoElement>('[data-motion-video]'),
  ];
  if (!hero || document.documentElement.dataset.motion === 'reduced') {
    videos.forEach((video) => video.pause());
    return () => undefined;
  }

  const onScreen = new Set<HTMLVideoElement>();
  const sync = () => {
    for (const video of videos) {
      if (onScreen.has(video) && !document.hidden) {
        void video.play().catch(() => undefined);
      } else {
        video.pause();
      }
    }
  };

  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!(entry.target instanceof HTMLVideoElement)) continue;
      if (entry.isIntersecting) {
        onScreen.add(entry.target);
        void entry.target.play().catch(() => undefined);
      } else {
        onScreen.delete(entry.target);
        entry.target.pause();
      }
    }
  });
  videos.forEach((video) => observer.observe(video));

  // A backgrounded tab must not keep decoding frames.
  document.addEventListener('visibilitychange', sync);

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
        hero.querySelector('.hero__media-frame'),
        { scale: 0.94, yPercent: -6, opacity: 0.55, ease: 'none' },
        0,
      )
      .to(
        [hero.querySelector('.hero__cta'), hero.querySelector('.hero__scroll')],
        { yPercent: -18, opacity: 0.4, ease: 'none' },
        0,
      )
      .to(
        hero.querySelector('.hero__decor'),
        { yPercent: -10, ease: 'none' },
        0,
      );
  }, hero);

  return () => {
    document.removeEventListener('visibilitychange', sync);
    observer.disconnect();
    context.revert();
  };
}

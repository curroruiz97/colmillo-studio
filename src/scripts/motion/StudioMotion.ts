import gsap from 'gsap';

/**
 * Home Studio section: a quiet pause after the project rail.
 *
 * Two jobs only. The loop plays while it is near the viewport and pauses
 * otherwise (and in a backgrounded tab), so nothing is fetched or decoded
 * while the section is far away: the video carries `preload="none"` and no
 * `autoplay` attribute, which would override it. The copy and the loop then
 * settle in once, on entry. There is no pin and no scrub.
 *
 * Reduced motion and no JavaScript both leave the complete composition in
 * place with the loop parked on its poster, which is its first frame.
 */
export function initStudioMotion(): () => void {
  const section = document.querySelector<HTMLElement>('[data-studio]');
  if (!section) return () => undefined;
  const video = section.querySelector<HTMLVideoElement>('[data-studio-video]');

  if (document.documentElement.dataset.motion === 'reduced') {
    video?.pause();
    return () => undefined;
  }

  // The file rises out of the paper over its first frames. The first pass
  // starts on the poster frame instead, so the still hands over to motion
  // without flashing blank paper; every later pass plays the rise.
  const start = Number(video?.dataset.studioStart ?? 0);
  let started = false;
  let nearViewport = false;
  const sync = () => {
    if (!video) return;
    if (nearViewport && !document.hidden) {
      if (!started) {
        started = true;
        if (video.currentTime < start) video.currentTime = start;
      }
      void video.play().catch(() => undefined);
    } else {
      video.pause();
    }
  };
  // A small margin starts the fetch just before the loop scrolls into view.
  const observer = new IntersectionObserver(
    ([entry]) => {
      nearViewport = Boolean(entry?.isIntersecting);
      sync();
    },
    { rootMargin: '20% 0px' },
  );
  if (video) observer.observe(video);
  document.addEventListener('visibilitychange', sync);

  const context = gsap.context(() => {
    const timeline = gsap.timeline({
      defaults: { ease: 'power3.out' },
      scrollTrigger: { trigger: section, start: 'top 62%', once: true },
    });
    timeline
      // Each line rises out of its own clip, so the text never travels.
      .from('[data-studio-line]', {
        yPercent: 108,
        duration: 0.9,
        stagger: 0.1,
      })
      .from(
        '[data-studio-reveal]',
        { y: 16, opacity: 0, duration: 0.7, stagger: 0.1 },
        0.36,
      )
      .from(
        '[data-studio-media]',
        { y: 26, opacity: 0, duration: 1.1, ease: 'power2.out' },
        0.14,
      );
  }, section);

  return () => {
    document.removeEventListener('visibilitychange', sync);
    observer.disconnect();
    video?.pause();
    context.revert();
  };
}

import gsap from 'gsap';

export function initHorizontalProjects(): () => void {
  const section = document.querySelector<HTMLElement>(
    '[data-horizontal-projects]',
  );
  const track = section?.querySelector<HTMLElement>('[data-project-track]');
  const viewport = section?.querySelector<HTMLElement>(
    '[data-project-viewport]',
  );
  const cards = track
    ? [...track.querySelectorAll<HTMLElement>('[data-project-card]')]
    : [];
  const progress = section?.querySelector<HTMLElement>(
    '[data-project-progress]',
  );
  const meter = section?.querySelector<HTMLElement>('[data-project-meter]');
  const previous = section?.querySelector<HTMLButtonElement>(
    '[data-project-previous]',
  );
  const next = section?.querySelector<HTMLButtonElement>('[data-project-next]');

  if (!section || !track || !viewport || cards.length < 2)
    return () => undefined;

  let currentIndex = 0;
  let progressInitialized = false;
  let scrollFrame = 0;
  let pinnedScroll:
    | { start: number; end: number; scroll: (position: number) => void }
    | undefined;
  const updateProgress = (index: number, ratio?: number) => {
    const safeIndex = Math.max(0, Math.min(cards.length - 1, index));
    section.style.setProperty(
      '--project-flow',
      String(ratio ?? safeIndex / (cards.length - 1)),
    );
    meter?.style.setProperty(
      '--project-progress',
      String(ratio ?? safeIndex / (cards.length - 1)),
    );
    if (progressInitialized && safeIndex === currentIndex) return;
    progressInitialized = true;
    currentIndex = safeIndex;
    if (progress)
      progress.textContent = `${currentIndex + 1} / ${cards.length}`;
    meter?.setAttribute('aria-valuenow', String(currentIndex + 1));
    cards.forEach((card, cardIndex) => {
      card.dataset.active = String(cardIndex === currentIndex);
      const distance = Math.max(-2, Math.min(2, cardIndex - currentIndex));
      card.style.setProperty('--card-distance', String(distance));
      card.style.setProperty('--card-lift', `${Math.abs(distance) * 0.75}rem`);
      card.style.setProperty('--card-rotate', `${distance * -0.6}deg`);
    });
    if (previous) previous.disabled = currentIndex === 0;
    if (next) next.disabled = currentIndex === cards.length - 1;
  };
  const scrollCardIntoView = (index: number) => {
    const safeIndex = Math.max(0, Math.min(cards.length - 1, index));
    if (pinnedScroll) {
      const progress = safeIndex / (cards.length - 1);
      pinnedScroll.scroll(
        pinnedScroll.start + (pinnedScroll.end - pinnedScroll.start) * progress,
      );
      updateProgress(safeIndex);
      return;
    }
    cards[safeIndex]?.scrollIntoView({
      behavior:
        document.documentElement.dataset.motion === 'reduced'
          ? 'auto'
          : 'smooth',
      block: 'nearest',
      inline: 'center',
    });
    updateProgress(safeIndex);
  };
  const showPrevious = () => scrollCardIntoView(currentIndex - 1);
  const showNext = () => scrollCardIntoView(currentIndex + 1);
  const syncFocusedCard = (event: FocusEvent) => {
    const card = (event.target as Element | null)?.closest<HTMLElement>(
      '[data-project-card]',
    );
    if (!card) return;
    const index = cards.indexOf(card);
    if (index >= 0) scrollCardIntoView(index);
  };
  const syncNativeScroll = () => {
    if (pinnedScroll) return;
    cancelAnimationFrame(scrollFrame);
    scrollFrame = requestAnimationFrame(() => {
      const maximum = Math.max(1, viewport.scrollWidth - viewport.clientWidth);
      const ratio = Math.max(0, Math.min(1, viewport.scrollLeft / maximum));
      updateProgress(Math.round(ratio * (cards.length - 1)), ratio);
    });
  };

  section.dataset.projectsReady = 'true';
  updateProgress(0, 0);
  previous?.addEventListener('click', showPrevious);
  next?.addEventListener('click', showNext);
  track.addEventListener('focusin', syncFocusedCard);
  viewport.addEventListener('scroll', syncNativeScroll, { passive: true });

  const matchMedia = gsap.matchMedia();
  matchMedia.add(
    '(min-width: 769px) and (prefers-reduced-motion: no-preference)',
    () => {
      section.dataset.horizontalEnhanced = 'true';
      const distance = () =>
        Math.max(0, track.scrollWidth - viewport.clientWidth);
      const tween = gsap.to(track, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.65,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            updateProgress(
              Math.round(self.progress * (cards.length - 1)),
              self.progress,
            );
          },
        },
      });
      pinnedScroll = tween.scrollTrigger;
      return () => {
        pinnedScroll = undefined;
        delete section.dataset.horizontalEnhanced;
        tween.scrollTrigger?.kill();
      };
    },
  );

  return () => {
    matchMedia.revert();
    previous?.removeEventListener('click', showPrevious);
    next?.removeEventListener('click', showNext);
    track.removeEventListener('focusin', syncFocusedCard);
    viewport.removeEventListener('scroll', syncNativeScroll);
    cancelAnimationFrame(scrollFrame);
    delete section.dataset.projectsReady;
    delete section.dataset.horizontalEnhanced;
    section.style.removeProperty('--project-flow');
    cards.forEach((card) => {
      card.style.removeProperty('--card-distance');
      card.style.removeProperty('--card-lift');
      card.style.removeProperty('--card-rotate');
    });
  };
}

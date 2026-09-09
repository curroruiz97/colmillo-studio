import gsap from 'gsap';

export function initSectionStack(): () => void {
  const sections = gsap.utils.toArray<HTMLElement>('[data-stack-section]');
  if (sections.length < 2) return () => undefined;
  sections.forEach((section, index) => {
    section.style.setProperty('--stack-index', String(index + 1));
    section.dataset.stackReady = 'true';
  });
  if (document.documentElement.dataset.motion === 'reduced') {
    return () => {
      sections.forEach((section) => delete section.dataset.stackReady);
    };
  }

  const context = gsap.context(() => {
    sections.forEach((section, index) => {
      gsap.fromTo(
        section,
        {
          clipPath: 'inset(7% 2.5% 0 round 5rem 5rem 0 0)',
          borderRadius: '5rem 5rem 0 0',
        },
        {
          clipPath: 'inset(0% 0% 0 round 0rem)',
          borderRadius: '0rem',
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top 92%',
            end: 'top 38%',
            scrub: 0.6,
          },
        },
      );

      const nextSection = sections[index + 1];
      const content = section.querySelector<HTMLElement>('.content-shell');
      if (nextSection && content) {
        gsap.to(content, {
          yPercent: -1.8,
          scale: 0.972,
          opacity: 0.84,
          transformOrigin: '50% 0%',
          ease: 'none',
          scrollTrigger: {
            trigger: nextSection,
            start: 'top 96%',
            end: 'top 8%',
            scrub: 0.6,
          },
        });
      }
    });

    const goodbyeWord = document.querySelector<HTMLElement>(
      '[data-goodbye-word]',
    );
    if (goodbyeWord) {
      gsap.fromTo(
        goodbyeWord,
        { scaleX: 1.16, scaleY: 0.72, yPercent: 18 },
        {
          scaleX: 0.92,
          scaleY: 1.08,
          yPercent: -8,
          ease: 'none',
          scrollTrigger: {
            trigger: goodbyeWord.closest('section'),
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.7,
          },
        },
      );
    }
  });

  return () => {
    context.revert();
    sections.forEach((section) => delete section.dataset.stackReady);
  };
}

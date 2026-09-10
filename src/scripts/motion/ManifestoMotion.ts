import gsap from 'gsap';

/**
 * Home manifesto: one continuous timeline driven by ordinary vertical scroll.
 *
 * The composition is built, not cross-faded. Each concept arrives as the
 * protagonist, then travels to the place it keeps:
 *
 *   000-015  "Morder." alone, oversized, held.
 *   015-030  "Morder." travels up into the header band and settles at rest size.
 *   034-046  "Presionar." rises into the centre behind a mask.
 *   050-066  "Presionar." travels up and lands beside "Morder.".
 *   070-082  "Romper." rises into the centre behind a mask.
 *   086-102  "Romper." travels up and lands beside "Presionar.".
 *   106-120  "Dejar marca." lifts in from below as the orange protagonist.
 *   124-136  the illustration seats itself and the CTA finally exists.
 *
 * "Romper." repeats the "Presionar." phase unit for unit, and the track grew
 * by the same proportion, so every move costs the same scroll distance it did
 * before the fourth concept existed.
 *
 * The CSS composition is the timeline's end state, so every offset below is
 * relative to the finished poster and resolves back to `transform: none`.
 * Offsets are fractions of the canvas, re-evaluated on refresh, so the
 * choreography holds from 1024px to 1920px and across resize.
 *
 * TYPE IS NEVER SCALED THROUGH `transform`. Scaling a word with `transform`
 * stretches one cached texture and the glyphs go soft; GSAP's default
 * `force3D: 'auto'` makes it worse by promoting the element to its own layer
 * for the whole scrub. So the words animate `--word-scale`, which feeds
 * `font-size`, `force3D` is off, and the only transform they ever receive is a
 * translation that lands on exactly zero.
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
      const band = canvas.querySelector<HTMLElement>('[data-manifesto-band]');

      /* While a later concept is the protagonist it has to reach the same left
         edge as "Morder.". Its resting place is decided by the flex band, so
         the distance is measured rather than guessed — that way it survives a
         change of display face. It is the natural width of every concept
         before it in the band, plus one gap each. Width scales linearly with
         `--word-scale` (the letter-spacing is in em), so dividing by the scale
         in play gives the natural width whatever the timeline is doing at
         refresh time. */
      const leadOffset = (name: string, fallback: number) => () => {
        const target = band?.querySelector<HTMLElement>(word(name));
        if (!band || !target) return -width() * fallback;
        const gap = Number.parseFloat(getComputedStyle(band).columnGap) || 0;
        let offset = 0;
        for (
          let sibling = target.previousElementSibling;
          sibling;
          sibling = sibling.previousElementSibling
        ) {
          const scale =
            Number.parseFloat(
              getComputedStyle(sibling).getPropertyValue('--word-scale'),
            ) || 1;
          offset += sibling.getBoundingClientRect().width / scale + gap;
        }
        return -offset;
      };

      /* Re-shaping a 170px word costs a layout and a glyph-cache miss, and the
         scrub asks for a new size on every frame. Quantising the scale to 1/50
         keeps consecutive frames on the same size most of the time — about two
         device pixels at the sizes in play, which is invisible while a word is
         travelling — and every rest value (1, 1.6, 1.88) is an exact multiple,
         so the poses themselves are unaffected. */
      const stepped = {
        '--word-scale': (value: string) =>
          Math.round(Number.parseFloat(value) * 50) / 50,
      };

      /* The band's rest size is nine tenths of what it was when it held two
         words, so the protagonist scales are the old 1.7 and 1.44 divided by
         0.9: the oversized poses keep the size they always had. */
      const leadScale = 1.88;
      const riseScale = 1.6;

      /* A concept waiting below the band for its turn: shifted to the left
         margin, oversized, invisible and fully masked. */
      const waiting = (name: string, fallback: number) => ({
        x: leadOffset(name, fallback),
        y: h(0.235),
        '--word-scale': riseScale,
        opacity: 0,
        clipPath: 'inset(-30% 0% 104% 0%)',
      });

      const timeline = gsap.timeline({
        defaults: { ease: 'none', force3D: false },
        scrollTrigger: {
          trigger: track,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      /* Every element states its opening pose as a hold, so the composition is
         identical whether the visitor scrolls in from the hero or lands with
         the section already halfway up the window. */
      timeline
        .fromTo(
          word('morder'),
          { y: h(0.14), '--word-scale': leadScale },
          { y: h(0.14), '--word-scale': leadScale, duration: 15 },
          0,
        )
        .fromTo(
          word('presionar'),
          waiting('presionar', 0.32),
          { ...waiting('presionar', 0.32), duration: 34 },
          0,
        )
        .fromTo(
          word('romper'),
          waiting('romper', 0.62),
          { ...waiting('romper', 0.62), duration: 70 },
          0,
        )
        .fromTo(
          word('marca'),
          { y: h(0.16), opacity: 0 },
          { y: h(0.16), opacity: 0, duration: 106 },
          0,
        )
        .fromTo(
          '[data-manifesto-figure]',
          { x: w(0.03), y: h(0.055), scale: 0.9 },
          { x: w(0.03), y: h(0.055), scale: 0.9, duration: 15 },
          0,
        )
        .fromTo(
          '[data-manifesto-figure]',
          { opacity: 0 },
          { opacity: 0, duration: 4 },
          0,
        )
        .fromTo(
          '[data-manifesto-cta]',
          { opacity: 0, y: h(0.035) },
          { opacity: 0, y: h(0.035), duration: 124 },
          0,
        )
        .set('[data-manifesto-cta]', { pointerEvents: 'none' }, 0)
        // The illustration is secondary at first: it arrives just after the
        // word it belongs to, never with it.
        .to('[data-manifesto-figure]', { opacity: 1, duration: 8 }, 4);

      // 15-30 — "Morder." travels up into the band and shrinks to rest size.
      timeline
        .to(
          word('morder'),
          {
            y: 0,
            '--word-scale': 1,
            duration: 15,
            ease: 'power2.inOut',
            modifiers: stepped,
          },
          15,
        )
        .to(
          '[data-manifesto-figure]',
          {
            x: w(0.02),
            y: h(0.04),
            scale: 0.93,
            duration: 15,
            ease: 'power2.inOut',
          },
          15,
        );

      // 30-34 — rest. The header exists; nothing competes with it.

      // 34-46 — "Presionar." rises into the centre behind its own mask.
      timeline
        .to(
          word('presionar'),
          {
            y: h(0.18),
            clipPath: 'inset(-30% 0% -30% 0%)',
            duration: 12,
            ease: 'power3.out',
          },
          34,
        )
        .to(word('presionar'), { opacity: 1, duration: 4 }, 34);

      // 46-50 — rest.

      // 50-66 — "Presionar." travels up and lands beside "Morder.".
      timeline
        .to(
          word('presionar'),
          {
            x: 0,
            y: 0,
            '--word-scale': 1,
            duration: 16,
            ease: 'power2.inOut',
            modifiers: stepped,
          },
          50,
        )
        .to(
          '[data-manifesto-figure]',
          {
            x: w(0.012),
            y: h(0.022),
            scale: 0.965,
            duration: 16,
            ease: 'power2.inOut',
          },
          50,
        );

      // 66-70 — rest. The pair can be read as one header.

      // 70-82 — "Romper." rises into the centre behind its own mask, exactly
      // as "Presionar." did.
      timeline
        .to(
          word('romper'),
          {
            y: h(0.18),
            clipPath: 'inset(-30% 0% -30% 0%)',
            duration: 12,
            ease: 'power3.out',
          },
          70,
        )
        .to(word('romper'), { opacity: 1, duration: 4 }, 70);

      // 82-86 — rest.

      // 86-102 — "Romper." travels up and lands beside "Presionar.".
      timeline.to(
        word('romper'),
        {
          x: 0,
          y: 0,
          '--word-scale': 1,
          duration: 16,
          ease: 'power2.inOut',
          modifiers: stepped,
        },
        86,
      );

      // 102-106 — rest. The three black concepts read as one header.

      // 106-120 — "Dejar marca." lifts in from below. Translation and opacity
      // only: no blur, no bounce, no zoom.
      timeline
        .to(word('marca'), { y: 0, duration: 14, ease: 'power3.out' }, 106)
        .to(
          word('marca'),
          { opacity: 1, duration: 7, ease: 'power1.out' },
          106,
        );

      // 120-124 — rest.

      // 124-136 — the illustration seats itself and the CTA is the last thing
      // to exist.
      timeline
        .to(
          '[data-manifesto-figure]',
          { x: 0, y: 0, scale: 1, duration: 12, ease: 'power2.inOut' },
          124,
        )
        .to(
          '[data-manifesto-cta]',
          { opacity: 1, y: 0, duration: 10, ease: 'power3.out' },
          124,
        )
        .set('[data-manifesto-cta]', { pointerEvents: 'auto' }, 128);
    },
  );

  // Coarse pointers and short viewports read the same poster as a linear
  // editorial stack: reveals only, no pin and no sequence.
  media.add('(max-width: 64rem), (max-height: 39.99rem)', () => {
    const targets = gsap.utils.toArray<HTMLElement>([
      word('morder'),
      word('presionar'),
      word('romper'),
      word('marca'),
      '[data-manifesto-figure]',
      '[data-manifesto-cta]',
    ]);

    targets.forEach((target, index) => {
      gsap.from(target, {
        y: 26,
        opacity: 0,
        duration: 0.7,
        delay: Math.min(index * 0.04, 0.16),
        ease: 'power3.out',
        force3D: false,
        scrollTrigger: { trigger: target, start: 'top 88%', once: true },
      });
    });
  });

  return () => media.revert();
}

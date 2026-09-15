import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * COLMILLO INSTAGRAM
 *
 * Folds the global Instagram control from its hero pose into its compact pose,
 * without ever leaving the top-right corner. It is one continuous,
 * scroll-linked change of a single element:
 *
 *   hero     larger, `INSTAGRAM ↗`
 *   compact  a round control carrying the Instagram glyph
 *
 * The scale is one GSAP write on the link around its top-right corner, which
 * is its anchor, so the badge shrinks into the corner instead of travelling.
 * The pill and the labels read a single progress value, `--ig-p`, from the
 * stylesheet. Only `transform`, `opacity` and a label clip change.
 *
 * Every route starts in the hero pose and folds over the same range of scroll,
 * whatever its first section is. Reduced motion swaps the continuous fold for
 * a single state change halfway through the same range.
 */

/** Share of the viewport height the page scrolls while the badge folds. */
const FOLD_DISTANCE = 0.3;
/** How much larger the badge is on the hero, by viewport width. */
const HERO_SCALE_WIDE = 1.3;
const HERO_SCALE_MEDIUM = 1.15;
const WIDE_VIEWPORT = 1024;
const MEDIUM_VIEWPORT = 768;

export function initInstagramBadge(): () => void {
  const badge = document.querySelector<HTMLElement>('[data-instagram]');
  if (!badge) return () => undefined;

  const heroMode = badge.dataset.mode === 'hero';
  const reduced = document.documentElement.dataset.motion === 'reduced';

  // `quickSetter` skips the tween parser, so the `scale` shorthand is not
  // expanded there: both axes are set explicitly.
  const setScaleX = gsap.quickSetter(badge, 'scaleX');
  const setScaleY = gsap.quickSetter(badge, 'scaleY');
  const setScale = (value: number) => {
    setScaleX(value);
    setScaleY(value);
  };
  const ease = gsap.parseEase('power2.inOut');

  const pose = { scale: 1, range: 1 };
  let lastProgress = -1;

  const measure = () => {
    // The compact control is a circle as tall as the badge: the middle of the
    // pill folds away completely and the two caps meet. Measured, because the
    // licensed face will change the width of the full label.
    const width = badge.offsetWidth;
    const height = badge.offsetHeight;
    const cut = Math.max(0, width - height);
    badge.style.setProperty('--ig-cut', `${cut}px`);
    badge.style.setProperty(
      '--ig-cut-n',
      (cut / Math.max(1, width - height)).toFixed(4),
    );

    // A short route (an empty archive, a legal page) may not scroll that far:
    // the fold then finishes at the bottom of the page instead of halfway.
    const scrollable =
      document.documentElement.scrollHeight - window.innerHeight;
    pose.range = Math.max(
      1,
      Math.min(
        window.innerHeight * FOLD_DISTANCE,
        scrollable > 0 ? scrollable : Infinity,
      ),
    );
    const viewport = document.documentElement.clientWidth;
    pose.scale = !heroMode
      ? 1
      : viewport >= WIDE_VIEWPORT
        ? HERO_SCALE_WIDE
        : viewport >= MEDIUM_VIEWPORT
          ? HERO_SCALE_MEDIUM
          : 1;
  };

  const render = (scroll: number) => {
    const raw = Math.min(1, Math.max(0, scroll / pose.range));
    const progress = reduced ? (raw >= 0.5 ? 1 : 0) : ease(raw);
    setScale(1 + (pose.scale - 1) * (1 - progress));

    if (progress !== lastProgress) {
      lastProgress = progress;
      badge.style.setProperty('--ig-p', progress.toFixed(4));
    }
    const nextPose = progress < 0.5 ? 'hero' : 'compact';
    if (badge.dataset.pose !== nextPose) badge.dataset.pose = nextPose;
  };

  const settle = () => {
    measure();
    render(heroMode ? window.scrollY : pose.range);
  };

  settle();
  badge.dataset.ready = 'true';

  // Widths change once the real text face has loaded.
  let active = true;
  void document.fonts?.ready.then(() => {
    if (active) settle();
  });

  const trigger = heroMode
    ? ScrollTrigger.create({
        start: 0,
        // Measured here too: the page's height, and so the range, may have
        // changed since the last refresh.
        end: () => {
          measure();
          return pose.range;
        },
        onUpdate: (self) => render(self.scroll()),
        onRefresh: (self) => {
          measure();
          render(self.scroll());
        },
      })
    : null;

  const onResize = () => {
    if (!heroMode) settle();
  };
  window.addEventListener('resize', onResize, { passive: true });

  return () => {
    active = false;
    trigger?.kill();
    window.removeEventListener('resize', onResize);
    gsap.set(badge, { clearProps: 'transform' });
    for (const property of ['--ig-p', '--ig-cut', '--ig-cut-n']) {
      badge.style.removeProperty(property);
    }
    badge.dataset.pose = badge.dataset.mode ?? 'compact';
    delete badge.dataset.ready;
  };
}

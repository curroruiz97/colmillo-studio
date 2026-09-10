import gsap from 'gsap';

/**
 * COLMILLO EDGE MENU
 *
 * Owns the navigation's state machine and everything that must be true while
 * the panel is open: focus containment, `inert` outside, a scroll lock that
 * does not shift the layout, and the reported home scene.
 *
 * The native `<details>` disclosure remains the control, so with scripting
 * disabled the menu still opens, closes and navigates. This module upgrades it:
 * it moves the panel out of the disclosure so the panel can animate in both
 * directions rather than being removed from rendering the moment it closes.
 *
 * One state, never a set of flags:
 *
 *   closed          a small orange tab rests at mid-height on the edge
 *   tracking        a fine pointer is near the edge; the tab follows it on Y
 *   open            the panel is in and the full close control is showing
 *   open-collapsed  the close control has retracted to a sliver
 *
 *   closed ⇄ tracking → open ⇄ open-collapsed → closed
 *
 * It is published as `data-state` (closed | tracking | open) plus, while open,
 * `data-close` (expanded | collapsed), so the stylesheet never combines flags
 * to decide what to draw.
 */

/** Distance from the right edge, in pixels, that arms tracking. */
const HOT_ZONE = 64;
/**
 * Distance at which tracking releases. Wider than the grown tab so reaching
 * for it never cancels it.
 */
const EXIT_ZONE = 104;
/** How long the full close control stays after the panel opens. */
const CLOSE_HOLD = 2600;
/** How long it waits once the pointer or focus has left before retracting. */
const CLOSE_RELEASE = 1400;
/** Air kept between the carrier and the top and bottom of the viewport. */
const EDGE_MARGIN = 20;
/** Air kept under the Instagram control's band, which the tab never enters. */
const EXCLUSION_GAP = 16;

type EdgeState = 'closed' | 'tracking' | 'open' | 'open-collapsed';

const isOpen = (state: EdgeState) =>
  state === 'open' || state === 'open-collapsed';

const FOCUSABLE =
  'a[href], button:not([disabled]), summary, [tabindex]:not([tabindex="-1"])';

export function initEdgeMenu(): () => void {
  const menu = document.querySelector<HTMLElement>('[data-edge-menu]');
  if (!menu) return () => undefined;

  const disclosure = menu.querySelector<HTMLDetailsElement>(
    '[data-edge-disclosure]',
  );
  const trigger = menu.querySelector<HTMLElement>('[data-edge-trigger]');
  const panel = menu.querySelector<HTMLElement>('[data-edge-panel]');
  const carrier = menu.querySelector<HTMLElement>('[data-edge-carrier]');
  const tab = menu.querySelector<HTMLElement>('[data-edge-tab]');
  const closer = menu.querySelector<HTMLElement>('[data-edge-closer]');
  if (!disclosure || !trigger || !panel || !carrier || !tab || !closer) {
    return () => undefined;
  }

  // Upgrade: the panel leaves the disclosure - and the moving carrier - so it
  // keeps rendering while it retracts and is laid out against the viewport.
  // Restored on cleanup.
  const panelHome = panel.parentElement;
  carrier.before(panel);
  menu.dataset.enhanced = 'true';

  const instagram = document.querySelector<HTMLElement>('[data-instagram]');
  const outside = [
    document.querySelector<HTMLElement>('main'),
    document.querySelector<HTMLElement>('body > footer'),
    instagram,
  ].filter((element): element is HTMLElement => element !== null);
  const previousInert = new Map<HTMLElement, boolean>();

  let state: EdgeState = 'closed';
  /**
   * Guards the open transition so mounting never clears `inert` that another
   * feature may own.
   */
  let lastOpen = false;

  const setState = (next: EdgeState) => {
    if (next === state) return;
    state = next;
    if (isOpen(next)) {
      menu.dataset.state = 'open';
      menu.dataset.close = next === 'open' ? 'expanded' : 'collapsed';
    } else {
      menu.dataset.state = next;
      delete menu.dataset.close;
    }
  };

  /* ------------------------------------------------------------ scroll -- */

  /**
   * Compensates a classic scrollbar so locking the page cannot move content
   * horizontally. The stylesheet hides the indicator, so the gap is normally
   * zero and nothing is written; this stays as the guard for any engine that
   * still reserves scrollbar space. Fixed layers are unaffected either way,
   * because they resolve against the viewport rather than the body box.
   */
  const lockScroll = () => {
    const gap = window.innerWidth - document.documentElement.clientWidth;
    if (gap > 0) {
      document.body.style.setProperty('--scroll-lock-gutter', `${gap}px`);
    }
    document.body.dataset.menuOpen = 'true';
  };
  const releaseScroll = () => {
    delete document.body.dataset.menuOpen;
    document.body.style.removeProperty('--scroll-lock-gutter');
  };

  /* ---------------------------------------------------- vertical travel -- */

  // Queried once. Re-evaluating a media query on every pointer move would put
  // an allocation on the shared pointer path that `CustomCursor` also uses.
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  const motionReduced = () =>
    document.documentElement.dataset.motion === 'reduced';
  const canTrack = () => finePointer.matches && !motionReduced();

  /**
   * Layout facts read once and on resize, never on the pointer path: half the
   * viewport, the lowest point of the Instagram control's band and the half
   * heights of the two visible pieces the carrier holds.
   */
  const metrics = { half: 0, safeTop: EDGE_MARGIN, tabHalf: 0, closeHalf: 0 };
  const measure = () => {
    metrics.half = window.innerHeight / 2;
    metrics.tabHalf = tab.offsetHeight / 2;
    metrics.closeHalf = closer.offsetHeight / 2;
    // Exclusion zone: the tab stops below the Instagram control's compact band
    // instead of passing over it.
    metrics.safeTop = instagram
      ? parseFloat(getComputedStyle(instagram).top) +
        instagram.offsetHeight +
        EXCLUSION_GAP
      : EDGE_MARGIN;
  };

  /** Clamps an offset from mid-height so a piece of `halfHeight` stays clear. */
  const limit = (offset: number, top: number, halfHeight: number) => {
    const min = top + halfHeight - metrics.half;
    const max = metrics.half - EDGE_MARGIN - halfHeight;
    return Math.max(Math.min(offset, max), Math.min(min, max));
  };

  /**
   * One eased setter on the shared GSAP ticker - no frame loop of its own. Only
   * `transform` moves, and only on the carrier.
   */
  const followY = gsap.quickTo(carrier, 'y', {
    duration: 0.36,
    ease: 'power2.out',
  });
  let offset = 0;

  /* -------------------------------------------------------- tab tone -- */

  /**
   * The tab is brand orange, so on an orange surface it would disappear. The
   * colour actually painted under its resting point is sampled - the first
   * opaque background among the hit-testable elements there, the menu itself
   * excluded - and the menu is marked `data-tab-tone="accent"` when that is the
   * brand orange, which the stylesheet turns ink. At most one sample per frame,
   * only after a scroll, a resize or a vertical move, never while open.
   */
  const ORANGE = [205, 87, 48];
  const ORANGE_TOLERANCE = 28;
  const backgroundUnder = (x: number, y: number) => {
    for (const element of document.elementsFromPoint(x, y)) {
      if (menu.contains(element)) continue;
      const channels = getComputedStyle(element)
        .backgroundColor.match(/[\d.]+/g)
        ?.map(Number);
      if (!channels || channels.length < 3 || (channels[3] ?? 1) < 0.5) {
        continue;
      }
      // A faded layer (a decorative mark at 28% opacity) does not hide what
      // is painted beneath it, so it does not decide the tone either.
      let opacity = 1;
      for (
        let node: Element | null = element;
        node && opacity >= 0.5;
        node = node.parentElement
      ) {
        opacity *= Number(getComputedStyle(node).opacity);
      }
      if (opacity < 0.5) continue;
      return channels;
    }
    return null;
  };
  let toneFrame = 0;
  const sampleTone = () => {
    toneFrame = 0;
    if (isOpen(state)) return;
    const color = backgroundUnder(window.innerWidth - 8, metrics.half + offset);
    const accent =
      color !== null &&
      ORANGE.every(
        (channel, index) =>
          Math.abs((color[index] ?? 0) - channel) <= ORANGE_TOLERANCE,
      );
    if (accent) menu.dataset.tabTone = 'accent';
    else delete menu.dataset.tabTone;
  };
  const queueTone = () => {
    if (!toneFrame) toneFrame = requestAnimationFrame(sampleTone);
  };
  /*
   * Scroll-driven layers (the stack reveal, scrubbed timelines) finish moving a
   * few frames after the scroll event, so one more sample follows once the
   * page has settled.
   */
  let settleTimer = 0;
  const onScroll = () => {
    queueTone();
    window.clearTimeout(settleTimer);
    settleTimer = window.setTimeout(queueTone, 180);
  };

  const placeY = (next: number) => {
    offset = next;
    if (motionReduced()) gsap.set(carrier, { y: next });
    else followY(next);
    queueTone();
  };

  /* ------------------------------------------------------ close control -- */

  /** Last known distance from the right edge. Infinite until a pointer moves. */
  let lastDistance = Number.POSITIVE_INFINITY;
  /** Whether the pointer is inside the hot zone while the panel is open. */
  let pointerNear = false;
  let collapseTimer = 0;

  const cancelCollapse = () => {
    window.clearTimeout(collapseTimer);
    collapseTimer = 0;
  };

  /**
   * Arms the retraction unless it is already armed, so a later, shorter delay
   * never cuts the hold that follows opening. Touch keeps the full control,
   * because nothing could bring it back.
   */
  const armCollapse = (delay: number) => {
    if (collapseTimer || !finePointer.matches) return;
    collapseTimer = window.setTimeout(() => {
      collapseTimer = 0;
      if (
        state === 'open' &&
        !pointerNear &&
        document.activeElement !== trigger
      ) {
        setState('open-collapsed');
      }
    }, delay);
  };

  const expandCloser = () => {
    cancelCollapse();
    if (state === 'open-collapsed') setState('open');
  };

  /* ------------------------------------------------------- open / close -- */

  const applyOpenState = (open: boolean) => {
    if (open === lastOpen) return;
    lastOpen = open;
    trigger.setAttribute('aria-expanded', String(open));

    for (const element of outside) {
      if (open) {
        previousInert.set(element, element.inert);
        element.inert = true;
      } else {
        element.inert = previousInert.get(element) ?? false;
      }
    }

    if (!open) {
      previousInert.clear();
      releaseScroll();
      cancelCollapse();
      pointerNear = false;
      setState('closed');
      if (lastDistance > HOT_ZONE || !canTrack()) placeY(0);
      return;
    }

    lockScroll();
    // The tab that was pressed becomes the close control where it is. It only
    // moves if the taller control would leave the viewport there.
    placeY(limit(offset, EDGE_MARGIN, metrics.closeHalf));
    pointerNear = finePointer.matches && lastDistance <= HOT_ZONE;
    setState('open');
    cancelCollapse();
    armCollapse(CLOSE_HOLD);
    requestAnimationFrame(() => {
      const initial = panel.querySelector<HTMLElement>(
        '[data-edge-initial-focus]',
      );
      (initial ?? panel.querySelector<HTMLElement>(FOCUSABLE))?.focus({
        preventScroll: true,
      });
    });
  };

  const onToggle = () => applyOpenState(disclosure.open);

  const close = (restoreFocus: boolean) => {
    if (!disclosure.open) return;
    disclosure.open = false;
    applyOpenState(false);
    if (restoreFocus) trigger.focus();
  };

  /* ------------------------------------------------------------ pointer -- */

  const onPointerMove = (event: PointerEvent) => {
    if (event.pointerType === 'touch' || !finePointer.matches) return;
    lastDistance = window.innerWidth - event.clientX;

    if (isOpen(state)) {
      const near = lastDistance <= HOT_ZONE;
      if (near === pointerNear) return;
      pointerNear = near;
      if (near) expandCloser();
      else armCollapse(CLOSE_RELEASE);
      return;
    }

    if (!canTrack()) return;
    if (state === 'tracking' && lastDistance > EXIT_ZONE) {
      setState('closed');
      placeY(0);
    } else if (state === 'tracking' || lastDistance <= HOT_ZONE) {
      setState('tracking');
      placeY(
        limit(event.clientY - metrics.half, metrics.safeTop, metrics.tabHalf),
      );
    }
  };

  const onPointerLeave = () => {
    lastDistance = Number.POSITIVE_INFINITY;
    if (state === 'tracking') {
      setState('closed');
      placeY(0);
    } else if (isOpen(state) && pointerNear) {
      pointerNear = false;
      armCollapse(CLOSE_RELEASE);
    }
  };

  /* ------------------------------------------------------------ keyboard -- */

  const onTriggerFocus = () => {
    if (isOpen(state)) expandCloser();
  };
  const onTriggerBlur = () => {
    if (isOpen(state)) armCollapse(CLOSE_RELEASE);
  };

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && disclosure.open) {
      close(true);
      return;
    }
    if (event.key !== 'Tab' || !disclosure.open) return;

    const focusable = [...menu.querySelectorAll<HTMLElement>(FOCUSABLE)].filter(
      (element) =>
        !element.hasAttribute('disabled') &&
        element.tabIndex !== -1 &&
        element.getClientRects().length > 0,
    );
    const first = focusable[0];
    const last = focusable.at(-1);
    if (!first || !last) return;
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  const onMenuClick = (event: Event) => {
    const target = event.target as Element | null;
    if (target?.closest('[data-edge-trigger]')) return;
    if (target?.closest('a') || target?.closest('[data-edge-close]')) {
      close(false);
    }
  };

  const onResize = () => {
    measure();
    if (isOpen(state)) placeY(limit(offset, EDGE_MARGIN, metrics.closeHalf));
    else if (state === 'closed') placeY(0);
    queueTone();
  };

  /* ------------------------------------------------- reported home scene -- */

  const links = [
    ...menu.querySelectorAll<HTMLAnchorElement>('[data-section-link]'),
  ];
  const readouts = [
    ...menu.querySelectorAll<HTMLElement>('[data-edge-position]'),
  ];
  const sections = links
    .map((link) => document.getElementById(link.dataset.sectionLink ?? ''))
    .filter((section): section is HTMLElement => section !== null);

  const setCurrent = (id: string) => {
    const index = links.findIndex((link) => link.dataset.sectionLink === id);
    if (index < 0) return;
    const label = String(index + 1).padStart(2, '0');
    for (const readout of readouts) readout.textContent = label;
    for (const link of links) {
      if (link.dataset.sectionLink === id) {
        link.setAttribute('aria-current', 'location');
      } else if (link.getAttribute('aria-current') === 'location') {
        link.removeAttribute('aria-current');
      }
    }
  };

  /*
   * The reported scene is the one crossing the middle of the viewport, not the
   * one showing the largest fraction of itself: a short section fully in view
   * has a ratio of 1 while the tall section actually filling the screen has a
   * much lower one. Narrowing the root to a band around the centre makes the
   * comparison reflect what the reader is looking at, and normally leaves a
   * single candidate. `SurfaceTone` narrows its root the same way.
   */
  const ratios = new Map<Element, number>();
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          ratios.set(entry.target, entry.intersectionRatio);
        } else {
          ratios.delete(entry.target);
        }
      }
      // Stacked sections are sticky, so an earlier one can sit fully under
      // the band behind a later one with the very same ratio. On a tie the
      // later section wins: it is the one painted on top.
      const active = [...ratios.entries()].sort(
        (a, b) =>
          b[1] - a[1] ||
          sections.indexOf(b[0] as HTMLElement) -
            sections.indexOf(a[0] as HTMLElement),
      )[0]?.[0];
      if (active instanceof HTMLElement) setCurrent(active.id);
    },
    { rootMargin: '-45% 0px -45% 0px', threshold: [0, 1] },
  );

  sections.forEach((section) => observer.observe(section));
  if (sections[0]) setCurrent(sections[0].id);

  /* ------------------------------------------------------------- wiring -- */

  measure();
  queueTone();
  window.addEventListener('scroll', onScroll, { passive: true });
  // The page enters with an opacity reveal on `main`; sample again once any
  // entry animation has finished, so the first tone is the settled one.
  document.addEventListener('animationend', queueTone);
  disclosure.addEventListener('toggle', onToggle);
  menu.addEventListener('click', onMenuClick);
  trigger.addEventListener('focus', onTriggerFocus);
  trigger.addEventListener('blur', onTriggerBlur);
  document.addEventListener('keydown', onKeyDown);
  window.addEventListener('pointermove', onPointerMove, { passive: true });
  window.addEventListener('resize', onResize, { passive: true });
  document.documentElement.addEventListener('pointerleave', onPointerLeave);
  window.addEventListener('blur', onPointerLeave);

  if (disclosure.open) applyOpenState(true);
  else trigger.setAttribute('aria-expanded', 'false');

  return () => {
    if (disclosure.open) {
      disclosure.open = false;
      applyOpenState(false);
    }
    cancelCollapse();
    cancelAnimationFrame(toneFrame);
    window.clearTimeout(settleTimer);
    window.removeEventListener('scroll', onScroll);
    document.removeEventListener('animationend', queueTone);
    delete menu.dataset.tabTone;
    observer.disconnect();
    ratios.clear();
    disclosure.removeEventListener('toggle', onToggle);
    menu.removeEventListener('click', onMenuClick);
    trigger.removeEventListener('focus', onTriggerFocus);
    trigger.removeEventListener('blur', onTriggerBlur);
    document.removeEventListener('keydown', onKeyDown);
    window.removeEventListener('pointermove', onPointerMove);
    window.removeEventListener('resize', onResize);
    document.documentElement.removeEventListener(
      'pointerleave',
      onPointerLeave,
    );
    window.removeEventListener('blur', onPointerLeave);
    releaseScroll();
    gsap.killTweensOf(carrier);
    gsap.set(carrier, { clearProps: 'transform' });
    delete menu.dataset.enhanced;
    delete menu.dataset.close;
    menu.dataset.state = 'closed';
    panelHome?.append(panel);
  };
}

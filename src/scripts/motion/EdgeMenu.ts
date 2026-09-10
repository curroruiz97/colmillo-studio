/**
 * COLMILLO EDGE MENU
 *
 * Owns the three navigation states and everything that must be true while the
 * panel is open: focus containment, `inert` outside, a scroll lock that does
 * not shift the layout, and the reported home scene.
 *
 * The native `<details>` disclosure remains the control, so with scripting
 * disabled the menu still opens, closes and navigates. This module upgrades it:
 * it moves the panel out of the disclosure so the panel can animate in both
 * directions rather than being removed from rendering the moment it closes.
 */

/** Distance from the right edge, in pixels, that arms the peek. */
const HOT_ZONE = 72;
/**
 * Distance at which an armed peek retracts. Larger than the revealed handle so
 * moving the cursor onto the handle itself never cancels it.
 */
const EXIT_ZONE = 152;

type EdgeState = 'closed' | 'peek' | 'open';

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
  if (!disclosure || !trigger || !panel) return () => undefined;

  // Upgrade: the panel becomes a sibling of the disclosure so it keeps
  // rendering while it retracts. Restored on cleanup.
  const panelHome = panel.parentElement;
  disclosure.after(panel);
  menu.dataset.enhanced = 'true';

  const outside = [
    document.querySelector<HTMLElement>('[data-sticky-header]'),
    document.querySelector<HTMLElement>('main'),
    document.querySelector<HTMLElement>('body > footer'),
  ].filter((element): element is HTMLElement => element !== null);
  const previousInert = new Map<HTMLElement, boolean>();

  let state: EdgeState = 'closed';
  /**
   * Guards the open transition so mounting never clears `inert` that another
   * feature owns. `StickyHeader` marks the contact header inert on the home
   * hero and initialises before this module.
   */
  let lastOpen = false;

  const setState = (next: EdgeState) => {
    if (next === state) return;
    state = next;
    menu.dataset.state = next;
    trigger.dataset.cursorLabel = next === 'open' ? 'Cerrar' : 'Abrir';
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
      setState('closed');
      return;
    }

    lockScroll();
    setState('open');
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

  /* ------------------------------------------------------------- peek --- */

  // Queried once. Re-evaluating a media query on every pointer move would put
  // an allocation on the shared pointer path that `CustomCursor` also uses.
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  const canPeek = () =>
    finePointer.matches &&
    document.documentElement.dataset.motion !== 'reduced';

  const onPointerMove = (event: PointerEvent) => {
    if (state === 'open' || event.pointerType === 'touch' || !canPeek()) return;
    const distance = window.innerWidth - event.clientX;
    if (state === 'peek') {
      if (distance > EXIT_ZONE) setState('closed');
    } else if (distance <= HOT_ZONE) {
      setState('peek');
    }
  };

  const onPointerLeave = () => {
    if (state === 'peek') setState('closed');
  };

  /* ------------------------------------------------------------ keyboard -- */

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

  /* ------------------------------------------------- reported home scene -- */

  const links = [
    ...menu.querySelectorAll<HTMLAnchorElement>('[data-section-link]'),
  ];
  const readouts = [
    ...menu.querySelectorAll<HTMLElement>(
      '[data-edge-current], [data-edge-position]',
    ),
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
      const active = [...ratios.entries()].sort((a, b) => b[1] - a[1])[0]?.[0];
      if (active instanceof HTMLElement) setCurrent(active.id);
    },
    { rootMargin: '-45% 0px -45% 0px', threshold: [0, 1] },
  );

  sections.forEach((section) => observer.observe(section));
  if (sections[0]) setCurrent(sections[0].id);

  /* ------------------------------------------------------------- wiring -- */

  disclosure.addEventListener('toggle', onToggle);
  menu.addEventListener('click', onMenuClick);
  document.addEventListener('keydown', onKeyDown);
  window.addEventListener('pointermove', onPointerMove, { passive: true });
  document.documentElement.addEventListener('pointerleave', onPointerLeave);
  window.addEventListener('blur', onPointerLeave);

  if (disclosure.open) applyOpenState(true);
  else trigger.setAttribute('aria-expanded', 'false');

  return () => {
    if (disclosure.open) {
      disclosure.open = false;
      applyOpenState(false);
    }
    observer.disconnect();
    ratios.clear();
    disclosure.removeEventListener('toggle', onToggle);
    menu.removeEventListener('click', onMenuClick);
    document.removeEventListener('keydown', onKeyDown);
    window.removeEventListener('pointermove', onPointerMove);
    document.documentElement.removeEventListener(
      'pointerleave',
      onPointerLeave,
    );
    window.removeEventListener('blur', onPointerLeave);
    releaseScroll();
    delete menu.dataset.enhanced;
    menu.dataset.state = 'closed';
    panelHome?.append(panel);
  };
}

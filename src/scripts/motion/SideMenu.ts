export function initSideMenu(): () => void {
  const menu = document.querySelector<HTMLDetailsElement>('[data-side-menu]');
  if (!menu) return () => undefined;

  const trigger = menu.querySelector<HTMLElement>('[data-menu-trigger]');
  const panel = menu.querySelector<HTMLElement>('[data-menu-panel]');
  const outside = [
    document.querySelector<HTMLElement>('[data-sticky-header]'),
    document.querySelector<HTMLElement>('main'),
    document.querySelector<HTMLElement>('body > footer'),
  ].filter((element): element is HTMLElement => element !== null);
  const previousInert = new Map<HTMLElement, boolean>();
  let lastOpenState = menu.open;
  const focusableSelector =
    'a[href], button:not([disabled]), summary, [tabindex]:not([tabindex="-1"])';

  const syncOpenState = () => {
    const open = menu.open;
    if (open === lastOpenState) return;
    lastOpenState = open;
    document.body.dataset.menuOpen = String(open);
    trigger?.setAttribute('aria-expanded', String(open));

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
      return;
    }

    requestAnimationFrame(() => {
      const initialFocus = panel?.querySelector<HTMLElement>(
        '[data-menu-initial-focus]',
      );
      (
        initialFocus ?? panel?.querySelector<HTMLElement>(focusableSelector)
      )?.focus({
        preventScroll: true,
      });
    });
  };

  const closeOnEscape = (event: KeyboardEvent) => {
    if (event.key !== 'Escape' || !menu.open) return;
    menu.open = false;
    syncOpenState();
    trigger?.focus();
  };
  const closeOnNavigate = (event: Event) => {
    if (!(event.target as Element | null)?.closest('a')) return;
    menu.open = false;
    syncOpenState();
  };
  const trapFocus = (event: KeyboardEvent) => {
    if (event.key !== 'Tab' || !menu.open || !panel) return;
    const focusable = [
      ...menu.querySelectorAll<HTMLElement>(focusableSelector),
    ].filter(
      (element) =>
        !element.hasAttribute('disabled') &&
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

  const links = [
    ...menu.querySelectorAll<HTMLAnchorElement>('[data-section-link]'),
  ];
  const sections = links
    .map((link) => document.getElementById(link.dataset.sectionLink ?? ''))
    .filter((section): section is HTMLElement => section !== null);
  const current = menu.querySelector<HTMLElement>('[data-side-menu-current]');
  const setCurrent = (id: string) => {
    const index = links.findIndex((link) => link.dataset.sectionLink === id);
    if (index < 0) return;
    menu.style.setProperty(
      '--side-progress',
      String(links.length > 1 ? index / (links.length - 1) : 0),
    );
    if (current) current.textContent = String(index + 1).padStart(2, '0');
    for (const link of links) {
      if (link.dataset.sectionLink === id) {
        link.setAttribute('aria-current', 'location');
      } else {
        link.removeAttribute('aria-current');
      }
    }
  };
  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      setCurrent(visible.target.id);
    },
    { threshold: [0.25, 0.55] },
  );

  sections.forEach((section) => observer.observe(section));
  if (sections[0]) setCurrent(sections[0].id);
  document.addEventListener('keydown', closeOnEscape);
  document.addEventListener('keydown', trapFocus);
  menu.addEventListener('click', closeOnNavigate);
  menu.addEventListener('toggle', syncOpenState);
  trigger?.setAttribute('aria-expanded', String(menu.open));

  return () => {
    if (menu.open) {
      menu.open = false;
      syncOpenState();
    }
    observer.disconnect();
    document.removeEventListener('keydown', closeOnEscape);
    document.removeEventListener('keydown', trapFocus);
    menu.removeEventListener('click', closeOnNavigate);
    menu.removeEventListener('toggle', syncOpenState);
    delete document.body.dataset.menuOpen;
  };
}

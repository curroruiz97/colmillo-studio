/**
 * The catalogue's category filter.
 *
 * Published by this module (the group is `hidden` in the HTML), so a page
 * without JavaScript shows the whole catalogue and no dead control. The
 * category can also arrive in the address (`?categoria=Papel`), which is what
 * the bar's links carry; on the home those links filter in place instead of
 * reloading.
 *
 * Filtering hides the cards that leave, lets the grid repack, then carries
 * every card that stays from where it was to where it is now (FLIP, on the
 * compositor only) while the ones that arrive rise in. Reduced motion simply
 * swaps.
 */

const PARAM = 'categoria';

export function initFilter() {
  const group = document.querySelector<HTMLElement>('[data-filter]');
  const grid = document.querySelector<HTMLElement>('[data-grid]');
  if (!group || !grid) return;
  const pills = [
    ...group.querySelectorAll<HTMLButtonElement>('[data-filter-value]'),
  ];
  const cards = [...grid.querySelectorAll<HTMLElement>('[data-card]')];
  const count = document.querySelector<HTMLElement>('[data-catalog-count]');
  const reduced = () => document.documentElement.dataset.motion === 'reduced';
  const known = new Set(pills.map((pill) => pill.dataset.filterValue ?? ''));
  group.hidden = false;

  const apply = (value: string, animate: boolean) => {
    const category = known.has(value) ? value : '';
    pills.forEach((pill) =>
      pill.setAttribute(
        'aria-pressed',
        String(pill.dataset.filterValue === category),
      ),
    );

    const before = new Map(
      cards
        .filter((card) => !card.hidden)
        .map((card) => [card, card.getBoundingClientRect()]),
    );
    cards.forEach((card) => {
      card.hidden = category !== '' && card.dataset.category !== category;
    });
    const shown = cards.filter((card) => !card.hidden);
    if (count) count.textContent = String(shown.length);

    const url = new URL(window.location.href);
    if (category) url.searchParams.set(PARAM, category);
    else url.searchParams.delete(PARAM);
    window.history.replaceState(null, '', url);

    if (!animate || reduced() || typeof grid.animate !== 'function') return;
    shown.forEach((card, index) => {
      const from = before.get(card);
      const to = card.getBoundingClientRect();
      if (from) {
        const dx = from.left - to.left;
        const dy = from.top - to.top;
        if (Math.abs(dx) < 1 && Math.abs(dy) < 1) return;
        card.animate(
          [{ transform: `translate(${dx}px, ${dy}px)` }, { transform: 'none' }],
          { duration: 560, easing: 'cubic-bezier(0.2, 0.8, 0.2, 1)' },
        );
      } else {
        card.animate(
          [
            { transform: 'translateY(2.5rem) scale(0.96)', opacity: 0 },
            { transform: 'none', opacity: 1 },
          ],
          {
            duration: 520,
            delay: Math.min(index, 6) * 40,
            easing: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
            fill: 'backwards',
          },
        );
      }
    });
  };

  group.addEventListener('click', (event) => {
    const pill = (event.target as Element).closest<HTMLButtonElement>(
      '[data-filter-value]',
    );
    if (pill) apply(pill.dataset.filterValue ?? '', true);
  });

  // The bar's category links: in place on this page, no reload.
  document.addEventListener('click', (event) => {
    const link = (event.target as Element).closest<HTMLAnchorElement>(
      'a[href]',
    );
    if (!link) return;
    const url = new URL(link.href, window.location.href);
    if (url.pathname !== window.location.pathname || url.hash !== '#catalogo')
      return;
    event.preventDefault();
    apply(url.searchParams.get(PARAM) ?? '', true);
    document.getElementById('catalogo')?.scrollIntoView({
      behavior: reduced() ? 'auto' : 'smooth',
    });
  });

  apply(new URL(window.location.href).searchParams.get(PARAM) ?? '', false);
}

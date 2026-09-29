/**
 * The catalogue's category filter.
 *
 * Since 2026-09-29 (client direction) the only filter is the bar's category
 * links ("Todo", "Papel", "Textil", …); the sticky pill row under the
 * catalogue's title is gone. The links carry the category in the address
 * (`?categoria=Papel#catalogo`), so without JavaScript they still load the
 * page, which shows the whole catalogue. With it, on the home, they filter
 * in place instead of reloading, and the current one is marked
 * `aria-current`.
 *
 * Filtering hides the cards that leave, lets the grid repack, then carries
 * every card that stays from where it was to where it is now (FLIP, on the
 * compositor only) while the ones that arrive rise in. Reduced motion simply
 * swaps.
 */

const PARAM = 'categoria';

export function initFilter() {
  const grid = document.querySelector<HTMLElement>('[data-grid]');
  if (!grid) return;
  const cards = [...grid.querySelectorAll<HTMLElement>('[data-card]')];
  const count = document.querySelector<HTMLElement>('[data-catalog-count]');
  const reduced = () => document.documentElement.dataset.motion === 'reduced';
  const known = new Set(cards.map((card) => card.dataset.category ?? ''));
  const links = [
    ...document.querySelectorAll<HTMLAnchorElement>('[data-category-link]'),
  ];

  const apply = (value: string, animate: boolean) => {
    const category = known.has(value) ? value : '';
    links.forEach((link) => {
      if (link.dataset.categoryLink === category) {
        link.setAttribute('aria-current', 'true');
      } else {
        link.removeAttribute('aria-current');
      }
    });

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

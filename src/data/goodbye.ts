import { demoMode } from './projects';

export interface GoodbyeSlide {
  /** The large editorial line; the button hangs off its last line. */
  title: string;
  /** One optional supporting sentence under the title. */
  body: string | null;
}

export interface GoodbyeContent {
  /** Accessible name of the section. It is announced, never shown. */
  label: string;
  /** In reading order. Two or more turn on the arrow button. */
  slides: GoodbyeSlide[];
  /** True while the copy is a development placeholder. */
  placeholder: boolean;
}

/**
 * Approved goodbye copy. None has been supplied yet: see
 * `docs/CONTENT_NEEDED.md`. Filling this in is the whole content change.
 */
const approvedGoodbye: GoodbyeContent | null = null;

/**
 * Structural placeholders — NOT COPY, NEVER PUBLISH.
 *
 * They exist only to exercise the slide mechanism: three slides so wrapping
 * from the last back to the first is visible, and titles of different lengths
 * (the second one also carries a body) so a test can prove the block never
 * changes height between them. The record is flagged, so the section carries
 * `data-dev-placeholder` and `check:production` keeps it out of `dist/`.
 */
const demoGoodbye: GoodbyeContent = {
  label: 'Despedida',
  slides: [
    { title: 'Titular 01', body: null },
    {
      title: 'Titular 02, más largo, para medir dos líneas',
      body: 'Texto de apoyo 02.',
    },
    { title: 'Titular 03', body: null },
  ],
  placeholder: true,
};

/** Null outside development and demo mode: the standard build omits it. */
export const homeGoodbye: GoodbyeContent | null =
  approvedGoodbye ?? (demoMode ? demoGoodbye : null);

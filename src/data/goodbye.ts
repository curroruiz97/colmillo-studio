import { demoMode } from './projects';

export interface GoodbyeStop {
  /** The large editorial line; its arrow button sits beside it. */
  title: string;
  /** One optional supporting sentence under the title. */
  body: string | null;
  /** Optional route out of the stage. Undecided: null everywhere for now. */
  cta: { label: string; href: string } | null;
}

export interface GoodbyeContent {
  /** Accessible name of the section. It is announced, never shown. */
  label: string;
  /** Copy over the left side of the panorama, where the stage opens. */
  start: GoodbyeStop;
  /** Copy over the right side, reached with the arrow. */
  end: GoodbyeStop;
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
 * They exist only to exercise the pan: one block per side of the scene, of
 * different lengths (the second also carries a body) so a test can prove the
 * stage never changes height between them. The record is flagged, so the
 * section carries `data-dev-placeholder` and `check:production` keeps it out
 * of `dist/`.
 */
const demoGoodbye: GoodbyeContent = {
  label: 'Despedida',
  start: { title: 'Titular A', body: null, cta: null },
  end: {
    title: 'Titular B, más largo, para medir dos líneas',
    body: 'Texto de apoyo B.',
    cta: null,
  },
  placeholder: true,
};

/** Null outside development and demo mode: the standard build omits it. */
export const homeGoodbye: GoodbyeContent | null =
  approvedGoodbye ?? (demoMode ? demoGoodbye : null);

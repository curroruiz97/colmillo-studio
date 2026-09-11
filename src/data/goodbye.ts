import { primaryNavigation } from '@/config/navigation';
import { demoMode } from './projects';

export interface GoodbyeStart {
  /** The large editorial line; its arrow button sits beside it. */
  title: string;
  /** One optional supporting sentence under the title. */
  body: string | null;
}

export interface GoodbyePanel {
  /** Small line over the CTA. Optional. */
  kicker: string | null;
  /**
   * The large headline, which is itself the link out of the stage. The arrow
   * is drawn into its last word; `destination` completes the accessible name.
   */
  cta: { label: string; href: string; destination: string };
  /** One discreet line under the headline. Optional. */
  note: string | null;
}

export interface GoodbyeContent {
  /** Accessible name of the section. It is announced, never shown. */
  label: string;
  /** Copy over the left side of the panorama, where the stage opens. */
  start: GoodbyeStart;
  /** The CTA that arrives over the scene's right side. */
  end: GoodbyePanel;
  /** True while any of the copy is a development placeholder. */
  placeholder: boolean;
}

/**
 * Approved goodbye copy. None has been supplied yet: see
 * `docs/CONTENT_NEEDED.md`. Filling this in is the whole content change.
 */
const approvedGoodbye: GoodbyeContent | null = null;

const contact = primaryNavigation.find((item) => item.label === 'Contacto');

/**
 * Demo record — still flagged, so it stays out of `dist/`.
 *
 * The two headlines and the note were supplied by the user on 2026-09-11; the
 * CTA leads to the real contact route. The kicker is still provisional and the
 * photograph is on trial, so the record keeps `placeholder`: the section
 * carries `data-dev-placeholder` and `check:production` keeps it out of
 * `dist/` until the whole stage is approved.
 */
const demoGoodbye: GoodbyeContent = {
  label: 'Despedida',
  start: { title: 'Las buenas ideas necesitan presión.', body: null },
  end: {
    kicker: '¿Hablamos?',
    cta: {
      label: 'Nosotros sabemos dónde apretar.',
      href: contact?.href ?? '/contacto/',
      destination: 'ir a Contacto',
    },
    note: 'Estrategia · Identidad · Digital · Contenido',
  },
  placeholder: true,
};

/** Null outside development and demo mode: the standard build omits it. */
export const homeGoodbye: GoodbyeContent | null =
  approvedGoodbye ?? (demoMode ? demoGoodbye : null);

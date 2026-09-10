import { demoMode } from './projects';

export interface StudioTitleLine {
  text: string;
  /** Closing words of the line, set in the accessible orange. */
  accent?: string;
}

export interface StudioIntro {
  /** The headline as at most two editorial lines; the break is designed. */
  title: StudioTitleLine[];
  /** One short supporting sentence, or null when there is none. */
  lede: string | null;
  /** True while the copy is a development placeholder. */
  placeholder: boolean;
}

/**
 * Approved Studio copy. None has been supplied yet: see
 * `docs/CONTENT_NEEDED.md`. Filling this in is the whole content change.
 */
const approvedStudio: StudioIntro | null = null;

/**
 * Provisional demonstration copy — NOT APPROVED, NEVER PUBLISH.
 *
 * It exists only so the composition can be designed and QA'd at its real
 * scale. It follows the isolation contract of `demoServices`: the record is
 * flagged, the section then carries `data-dev-placeholder`, and
 * `check:production` keeps that marker out of `dist/`. The words come from the
 * brand's own vocabulary (the manifesto's tension/bite and the retired seal's
 * "presión, materia, movimiento"); they state no service, client or claim.
 */
const demoStudio: StudioIntro = {
  title: [
    { text: 'Tensamos cada idea' },
    { text: 'hasta que', accent: 'muerde.' },
  ],
  lede: 'Presión, materia y movimiento, puestos al servicio de cada marca.',
  placeholder: true,
};

/**
 * If the section is ever enabled before approved copy exists, it falls back to
 * the structural title it has always had, with no supporting line.
 */
const structuralStudio: StudioIntro = {
  title: [{ text: 'Colmillo', accent: 'Studio' }],
  lede: null,
  placeholder: false,
};

export const homeStudio: StudioIntro =
  approvedStudio ?? (demoMode ? demoStudio : structuralStudio);

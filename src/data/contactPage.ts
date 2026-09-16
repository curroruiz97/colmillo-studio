import { contactChannels, type ContactChannel } from '@/config/contact';

/*
 * `/contacto/` content, in one place.
 *
 * Every word the route renders is declared here so it can be replaced without
 * touching a component. The wording below was written by the user on
 * 2026-09-16 as the page's provisional copy — it is the studio's own voice,
 * not a client fact, an invented claim or a demonstration text — so it ships
 * in both builds, exactly like the `/servicios/` hero and close. Final
 * approval is still open and is logged in `docs/CONTENT_NEEDED.md`.
 *
 * The channels are NOT declared here: they come from `src/config/contact.ts`,
 * which holds the only approved address and profile.
 */

export interface ContactHeroCopy {
  /** Sentence case. A closing full stop is drawn as the orange disc. */
  title: string;
  lede: string;
}

export interface ContactLedeCopy {
  title: string;
  lede: string;
}

/** One selectable service. `value` is what a submitted brief carries. */
export interface ContactServiceOption {
  value: string;
  label: string;
}

export type ContactFieldName = 'name' | 'email' | 'company' | 'message';

export interface ContactField {
  name: ContactFieldName;
  control: 'input' | 'textarea';
  /** `type` for an input; ignored by the textarea. */
  type: 'text' | 'email';
  label: string;
  /** Discreet, never a joke and never a second label. */
  placeholder: string;
  /** A real autocomplete token, so the browser can fill the field. */
  autocomplete: string;
  required: boolean;
  /** Shown under the field when a required field is left empty. */
  missing: string | null;
  /** Shown when there is a value but it cannot be a real address. */
  invalid: string | null;
}

export const contactHero: ContactHeroCopy = {
  title: 'Cuéntanos qué tienes entre manos.',
  lede: 'Una idea, una marca, un problema o algo que todavía no sabes cómo llamar. Empecemos por ahí.',
};

export const contactBrief: ContactLedeCopy = {
  title: 'Hablemos.',
  lede: 'Cuéntanos lo necesario. Lo demás lo descubrimos juntos.',
};

/**
 * The five fields, in order. Budget and deadline were considered and left out
 * on purpose: at a first contact they ask the visitor to commit to numbers
 * they rarely have yet, and every answer they would give fits in the message.
 * Adding either one is a matter of appending an entry here.
 */
export const contactFields: ContactField[] = [
  {
    name: 'name',
    control: 'input',
    type: 'text',
    label: 'Nombre',
    placeholder: 'Tu nombre',
    autocomplete: 'name',
    required: true,
    missing: 'Necesitamos tu nombre para saber con quién hablamos.',
    invalid: null,
  },
  {
    name: 'email',
    control: 'input',
    type: 'email',
    label: 'Correo',
    placeholder: 'nombre@empresa.com',
    autocomplete: 'email',
    required: true,
    missing: 'Necesitamos tu correo para responderte.',
    invalid: 'Ese correo no parece completo. Revísalo, por favor.',
  },
  {
    name: 'company',
    control: 'input',
    type: 'text',
    label: 'Empresa / proyecto',
    placeholder: 'Cómo se llama, si ya tiene nombre',
    autocomplete: 'organization',
    required: false,
    missing: null,
    invalid: null,
  },
  {
    name: 'message',
    control: 'textarea',
    type: 'text',
    label: 'Cuéntanos un poco',
    placeholder: 'Dónde estás ahora y qué te gustaría que pasara.',
    autocomplete: 'off',
    required: true,
    missing: 'Escríbenos algo, aunque sea una línea.',
    invalid: null,
  },
];

/**
 * The service selector. The first four are the studio's four services, in the
 * order `/servicios/` publishes them; the last one exists so nobody has to
 * decide before the conversation starts. Nothing is preselected.
 */
export const contactServices = {
  legend: 'Servicio',
  hint: 'Elige lo que más se parezca. Puedes cambiarlo por el camino.',
  options: [
    { value: 'estrategia', label: 'Estrategia' },
    { value: 'identidad', label: 'Identidad' },
    { value: 'digital', label: 'Digital' },
    { value: 'contenido', label: 'Contenido' },
    { value: 'sin-definir', label: 'No lo sé todavía' },
  ] satisfies ContactServiceOption[],
} as const;

export const contactSubmit = {
  label: 'Enviar mensaje',
  /** While the browser is handing the brief over. */
  busy: 'Preparando…',
} as const;

/**
 * Status copy.
 *
 * `handoff` and `fallback` are what the page says today, and they describe
 * exactly what happened: the visitor's own mail client was handed a finished
 * draft. Nothing claims the site sent anything.
 *
 * `sent` and `failed` belong to the other branch and are only ever shown when
 * `contactFormEndpoint` holds a real endpoint that answered. While it is null
 * that branch never runs, so "Recibido" can never appear.
 */
export const contactStatus = {
  invalid: 'Revisa los campos marcados y volvemos a intentarlo.',
  handoff:
    'Hemos preparado el mensaje en tu programa de correo. Revísalo y envíalo desde ahí.',
  fallback: 'Si no se ha abierto, escríbenos a',
  sent: 'Recibido. Te contestamos en breve.',
  failed: 'No hemos podido enviarlo. Inténtalo de nuevo o escríbenos a',
} as const;

/**
 * The privacy line beside the submit button.
 *
 * There is deliberately NO consent checkbox. Consent is not the legal basis
 * here: answering a brief the visitor sent is a pre-contractual measure taken
 * at their own request (art. 6.1.b RGPD), or the studio's legitimate interest
 * in replying (art. 6.1.f). A checkbox would ask for a permission that is not
 * needed and would imply the site transmits the brief, which it does not —
 * `contactFormEndpoint` is null and the browser composes a draft in the
 * visitor's own mail client. What the visitor does need is to be told, at the
 * moment of sending, what the data is for and where to read more.
 */
export const contactPrivacy = {
  before:
    'Usaremos tus datos solo para responder a tu solicitud. Más información en nuestra ',
  linkLabel: 'Política de privacidad',
  href: '/privacidad/',
  after: '.',
} as const;

export const contactSubject = 'Nuevo brief desde colmillostudio.com';

/** A channel that is actually published, so its destination is a real string. */
export type PublishedChannel = ContactChannel & { href: string };

/*
 * `contactChannels` is a record, so every lookup is `| undefined` under the
 * project's strictest settings. These two narrow it once, here, and the route
 * never touches the record again: an unpublished channel is simply absent.
 */
const published = (
  channel: ContactChannel | undefined,
): PublishedChannel | null =>
  channel && channel.href ? { ...channel, href: channel.href } : null;

/** The approved address, or null while the config has none. */
export const contactEmail = published(contactChannels.email);

/** The approved profile, or null while the config has none. */
export const contactInstagram = published(contactChannels.instagram);

/** The channels the left block publishes, in order. */
export const contactDirect: { title: string; channels: PublishedChannel[] } = {
  title: 'Directo',
  channels: [contactEmail, contactInstagram].filter(
    (channel): channel is PublishedChannel => channel !== null,
  ),
};

/**
 * Where a submitted brief would go.
 *
 * `null` is the current, verified state of this repository: the site is
 * `output: 'static'` with no adapter, no API route, no server action and no
 * mail provider anywhere in `src/`, `scripts/` or `package.json`. Nothing was
 * added: adding one needs the client's authorisation (`CLAUDE.md`,
 * `docs/CONTENT_NEEDED.md`).
 *
 * While it is null the form validates in the browser and then hands the
 * finished brief to the visitor's own mail client as a prepared draft
 * addressed to the studio. The site itself sends nothing and no state says
 * otherwise. Setting this to a real POST endpoint is the only change the
 * client-side code needs to start submitting for real.
 */
export const contactFormEndpoint: string | null = null;

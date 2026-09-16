import { contactChannels } from '@/config/contact';

/*
 * The three legal documents, in one place.
 *
 * Every word the legal routes render is declared here, so a lawyer or the
 * client can correct a clause without touching a component, and so the whole
 * legal surface can be audited by reading one file.
 *
 * WRITTEN AGAINST THE REAL SITE, NOT A TEMPLATE
 * ---------------------------------------------
 * The wording below describes what this repository actually does, verified on
 * 2026-09-16 by reading the source and by probing the deployed artifact:
 *
 * - no analytics, tag manager, pixel, heatmap or marketing script exists in
 *   `src/`, `public/` or `package.json`, and the served HTML of
 *   `https://colmillo-studio.vercel.app/` contains no third-party `<script>`,
 *   no `_vercel/insights` or `_vercel/speed-insights` injection and no
 *   `<iframe>`;
 * - the response carries no `Set-Cookie` header, and `document.cookie` is
 *   never read or written anywhere in the codebase;
 * - the only browser storage the site writes is one sessionStorage key,
 *   `colmilloIntroPlayed` (`src/config/intro.ts`). `MotionPreference.ts`
 *   *removes* a retired localStorage key and never writes one;
 * - typefaces are the system stack (`src/styles/fonts.css`), so no font is
 *   fetched from an external host; video is self-hosted under `public/`;
 * - Instagram is a plain outbound `<a>` (`InstagramBadge.astro`), not an
 *   embed, so Meta sets nothing while a visitor stays on this site;
 * - the contact form has no backend. `contactFormEndpoint` is `null`
 *   (`src/data/contactPage.ts`), the project is `output: 'static'` with no
 *   adapter or API route, and the form composes a draft in the visitor's own
 *   mail client. The site itself transmits and stores nothing.
 *
 * Consequently there is no consent banner: there is nothing to consent to.
 * That conclusion is recorded in `docs/DECISIONS.md` and must be revisited the
 * moment any analytics, embed or form endpoint is added.
 *
 * NEVER INVENT A LEGAL FACT
 * -------------------------
 * The identity of the holder is not in this repository. Every such value is a
 * `pending(...)` marker that renders as an unmistakable `[PENDIENTE: …]` chip,
 * and `scripts/release-check.mjs` refuses a release while any of them survive.
 * Do not replace one with a guess, a placeholder company or a sample NIF.
 * `LEGAL_TODO.md` is the list to send the client.
 */

/** A run of text, an inline link, or an unmistakable missing-data marker. */
export type LegalInline =
  string | { text: string; href: string } | { pending: string };

export type LegalRich = LegalInline[];

export type LegalBlock =
  | { kind: 'p'; rich: LegalRich }
  | { kind: 'h3'; text: string }
  | { kind: 'list'; items: LegalRich[] }
  | { kind: 'note'; rich: LegalRich }
  | { kind: 'table'; caption: string; columns: string[]; rows: LegalRich[][] };

export interface LegalSection {
  /** Stable fragment id. Also the anchor the in-page index links to. */
  id: string;
  heading: string;
  blocks: LegalBlock[];
}

export interface LegalDocument {
  /** The H1. A closing full stop is drawn as the orange disc. */
  title: string;
  /** Short label for the in-page index and the document switcher. */
  navLabel: string;
  href: string;
  /** `<title>` and meta description. */
  metaTitle: string;
  description: string;
  lede: string;
  updated: { iso: string; label: string };
  sections: LegalSection[];
}

/* Small builders, so the documents below read as prose rather than as JSON. */
const p = (...rich: LegalRich): LegalBlock => ({ kind: 'p', rich });
const h3 = (text: string): LegalBlock => ({ kind: 'h3', text });
const list = (...items: LegalRich[]): LegalBlock => ({ kind: 'list', items });
const note = (...rich: LegalRich): LegalBlock => ({ kind: 'note', rich });
const link = (text: string, href: string): LegalInline => ({ text, href });

/** Missing client data. Renders as `[PENDIENTE: LABEL]` and blocks release. */
const pending = (label: string): LegalInline => ({ pending: label });

/*
 * The one approved contact point, from the single source of truth. It is never
 * typed out in this file: if the client corrects the address, every legal page
 * follows `src/config/contact.ts` automatically.
 */
const channel = contactChannels.email;
const approvedEmail =
  channel?.href && channel.value
    ? { value: channel.value, href: channel.href }
    : null;

const mail: LegalInline = approvedEmail
  ? link(approvedEmail.value, approvedEmail.href)
  : pending('CORREO DE CONTACTO');

/** Shared by the three documents: the date they were last rewritten. */
const updated = { iso: '2026-09-16', label: '16 de septiembre de 2026' };

const AEPD = 'https://www.aepd.es';

/* ========================================================= aviso legal === */

export const legalNotice: LegalDocument = {
  title: 'Aviso legal.',
  navLabel: 'Aviso legal',
  href: '/aviso-legal/',
  metaTitle: 'Aviso legal',
  description:
    'Titularidad, condiciones de uso y propiedad intelectual del sitio web de Colmillo Studio.',
  lede: 'Quién es responsable de este sitio, en qué condiciones puede usarse y a quién pertenece lo que se muestra en él.',
  updated,
  sections: [
    {
      id: 'titular',
      heading: 'Titular del sitio',
      blocks: [
        p(
          'En cumplimiento del deber de información recogido en el artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE), se facilitan los siguientes datos del titular de este sitio web:',
        ),
        list(
          [
            'Nombre o razón social: ',
            pending('RAZÓN SOCIAL O NOMBRE DEL TITULAR'),
          ],
          ['NIF / CIF: ', pending('NIF / CIF')],
          ['Domicilio: ', pending('DOMICILIO LEGAL')],
          ['Correo electrónico de contacto: ', mail],
          ['Nombre comercial: Colmillo Studio.'],
        ),
        note(
          'Los campos marcados como pendientes todavía no han sido facilitados por el titular. Hasta que se completen, este aviso legal no cumple íntegramente el artículo 10 de la LSSI-CE y el sitio no debe publicarse como versión definitiva.',
        ),
        p(
          'No se publican datos de inscripción registral, número de colegiado, autorización administrativa ni código de conducta porque no consta cuál es la forma jurídica del titular ni si alguno de esos datos le resulta aplicable. Si el titular fuera una sociedad mercantil inscrita, sus datos registrales se añadirán en este mismo apartado.',
        ),
      ],
    },
    {
      id: 'objeto',
      heading: 'Objeto del sitio',
      blocks: [
        p(
          'Colmillo Studio es un estudio creativo. Este sitio web tiene una finalidad informativa y de presentación profesional: mostrar el trabajo del estudio, describir sus servicios y ofrecer una vía de contacto.',
        ),
        p(
          'El sitio no comercializa productos ni servicios en línea, no realiza cobros, no dispone de área privada, registro de usuarios ni alta de cuentas, y no ofrece descargas de contenido protegido.',
        ),
      ],
    },
    {
      id: 'condiciones',
      heading: 'Condiciones de acceso y uso',
      blocks: [
        p(
          'El acceso a este sitio es libre y gratuito. La navegación atribuye la condición de usuario e implica la aceptación de este aviso legal en la versión publicada en el momento del acceso.',
        ),
        p('El usuario se compromete a:'),
        list(
          [
            'hacer un uso conforme a la ley, a la buena fe y a este aviso legal;',
          ],
          [
            'no emplear el sitio con fines ilícitos o lesivos para el titular o para terceros;',
          ],
          [
            'no introducir ni difundir código malicioso ni realizar acciones que puedan dañar, sobrecargar o impedir el normal funcionamiento del sitio;',
          ],
          [
            'no intentar acceder a áreas, sistemas o datos restringidos, ni emplear medios automatizados de extracción masiva de contenido.',
          ],
        ),
        p(
          'El titular podrá interrumpir el acceso al sitio, sin aviso previo, frente a usos que incumplan lo anterior.',
        ),
      ],
    },
    {
      id: 'propiedad',
      heading: 'Propiedad intelectual e industrial',
      blocks: [
        p(
          'Este sitio muestra trabajo creativo: proyectos, identidades visuales, diseños, ilustraciones, fotografías, piezas audiovisuales y animaciones. Los derechos sobre ese material no pertenecen todos a la misma persona, y conviene distinguirlos.',
        ),
        h3('Contenidos del estudio'),
        p(
          'El diseño de este sitio, su estructura, su código, sus textos y las piezas gráficas y de movimiento creadas por Colmillo Studio están protegidos por la normativa de propiedad intelectual e industrial y corresponden al titular del sitio o a quienes le hayan cedido los derechos necesarios para su publicación aquí.',
        ),
        h3('Trabajos realizados para clientes'),
        p(
          'Los proyectos mostrados en este sitio se han realizado, en su caso, para clientes. Los derechos de explotación sobre las piezas finales, así como las marcas, nombres comerciales, logotipos y demás signos distintivos que aparezcan en ellas, pertenecen a sus respectivos titulares.',
        ),
        p(
          'Colmillo Studio no reclama la titularidad de esas marcas ni de los materiales cuya propiedad corresponda a sus clientes o a terceros. Su reproducción en este sitio se realiza únicamente con finalidad de portfolio, para acreditar la autoría del trabajo creativo prestado, y en el marco de la autorización obtenida de sus titulares.',
        ),
        h3('Materiales de terceros'),
        p(
          'Cuando el sitio incorpore fotografías, tipografías, música u otros materiales de terceros, se utilizarán al amparo de la licencia o autorización correspondiente y bajo sus condiciones.',
        ),
        h3('Usos no autorizados'),
        p(
          'Queda prohibida la reproducción, distribución, comunicación pública, transformación o cualquier otra forma de explotación, total o parcial, de los contenidos de este sitio sin la autorización expresa de sus respectivos titulares. Se permite la visualización en pantalla, la impresión y el almacenamiento para uso personal y privado.',
        ),
        p(
          'Si alguna persona o entidad considera que un contenido publicado aquí vulnera sus derechos, puede comunicarlo escribiendo a ',
          mail,
          ', indicando el contenido concreto y el derecho afectado, y se procederá a su revisión y, si procede, a su retirada.',
        ),
      ],
    },
    {
      id: 'enlaces',
      heading: 'Enlaces a sitios de terceros',
      blocks: [
        p(
          'Este sitio contiene enlaces a sitios ajenos, entre ellos el perfil público del estudio en Instagram. Se trata de enlaces de salida: se abren en el destino correspondiente y el titular no controla ni asume responsabilidad sobre sus contenidos, sus condiciones de uso ni sus políticas de privacidad y cookies.',
        ),
        p(
          'La existencia de un enlace no implica relación, recomendación ni supervisión del sitio enlazado. Al seguirlo, el usuario queda sujeto a las condiciones de ese tercero.',
        ),
      ],
    },
    {
      id: 'responsabilidad',
      heading: 'Responsabilidad',
      blocks: [
        p(
          'El titular procura que la información publicada sea correcta y esté actualizada, pero no puede garantizar la ausencia de errores ni que el contenido esté permanentemente al día.',
        ),
        p(
          'El titular no responde de los daños derivados de un uso indebido del sitio, ni de las interrupciones, fallos o defectos de disponibilidad que tengan su origen en la red, en el equipo del usuario o en causas ajenas a su control.',
        ),
        p(
          'Nada de lo anterior limita la responsabilidad que legalmente no sea susceptible de exclusión.',
        ),
      ],
    },
    {
      id: 'disponibilidad',
      heading: 'Disponibilidad y modificaciones',
      blocks: [
        p(
          'El titular puede modificar, suspender o retirar, total o parcialmente y sin aviso previo, el contenido, la presentación y la configuración del sitio, así como estas condiciones. La versión aplicable es la publicada en el momento del acceso.',
        ),
      ],
    },
    {
      id: 'datos',
      heading: 'Protección de datos y cookies',
      blocks: [
        p(
          'El tratamiento de datos personales se describe en la ',
          link('Política de privacidad', '/privacidad/'),
          '. Las tecnologías de almacenamiento empleadas en el navegador se detallan en la ',
          link('Política de cookies', '/cookies/'),
          '.',
        ),
      ],
    },
    {
      id: 'ley',
      heading: 'Legislación aplicable y jurisdicción',
      blocks: [
        p(
          'Este aviso legal se rige por la legislación española. Para la resolución de cualquier controversia derivada del acceso o uso de este sitio, las partes se someterán a los juzgados y tribunales que resulten competentes conforme a la normativa aplicable.',
        ),
        p(
          'Cuando el usuario tenga la condición de consumidor, será competente el fuero que le reconozca la normativa de consumo, sin que este apartado limite ese derecho.',
        ),
        note(
          'La indicación de un fuero concreto queda pendiente de confirmar el domicilio del titular: ',
          pending('DOMICILIO LEGAL'),
          '.',
        ),
      ],
    },
  ],
};

/* =========================================================== privacidad === */

export const privacyPolicy: LegalDocument = {
  title: 'Política de privacidad.',
  navLabel: 'Privacidad',
  href: '/privacidad/',
  metaTitle: 'Política de privacidad',
  description:
    'Qué datos personales trata Colmillo Studio, con qué finalidad y base jurídica, durante cuánto tiempo y qué derechos puedes ejercer.',
  lede: 'Qué datos tratamos, por qué, durante cuánto tiempo y cómo puedes ejercer tus derechos.',
  updated,
  sections: [
    {
      id: 'responsable',
      heading: 'Quién es el responsable',
      blocks: [
        p(
          'El responsable del tratamiento de los datos personales recogidos a través de este sitio es:',
        ),
        list(
          ['Responsable: ', pending('RAZÓN SOCIAL O NOMBRE DEL TITULAR')],
          ['NIF / CIF: ', pending('NIF / CIF')],
          ['Domicilio: ', pending('DOMICILIO LEGAL')],
          ['Correo de contacto en materia de privacidad: ', mail],
        ),
        p(
          'No se ha designado delegado de protección de datos, al no concurrir ninguno de los supuestos del artículo 37 del RGPD ni del artículo 34 de la LOPDGDD. Para cualquier cuestión sobre privacidad puedes escribir a la dirección indicada.',
        ),
      ],
    },
    {
      id: 'datos',
      heading: 'Qué datos tratamos y cómo llegan hasta nosotros',
      blocks: [
        p(
          'Conviene explicar antes cómo funciona este sitio, porque determina todo lo demás. Se trata de una web estática: no dispone de servidor de aplicación, de base de datos ni de ningún sistema que reciba y almacene formularios.',
        ),
        p(
          'El formulario de la página de ',
          link('Contacto', '/contacto/'),
          ' no envía nada por sí mismo. Al pulsar el botón, el navegador compone un borrador de correo en tu propio programa o servicio de correo electrónico, dirigido a la dirección del estudio. Ese mensaje sigues enviándolo tú, desde tu cuenta. Mientras no lo envíes, el estudio no recibe ningún dato.',
        ),
        p(
          'Por tanto, los datos personales que tratamos son los que tú decides incluir en ese correo, o en cualquier otro que nos dirijas. El formulario propone estos campos:',
        ),
        list(
          ['nombre (obligatorio para poder dirigirnos a ti);'],
          ['correo electrónico (obligatorio para poder responderte);'],
          ['empresa o proyecto (opcional);'],
          [
            'servicio de interés (opcional, a elegir entre las opciones propuestas);',
          ],
          ['mensaje (obligatorio): el contenido que tú redactes.'],
        ),
        p(
          'Te pedimos que no incluyas en el mensaje datos de categorías especiales (salud, ideología, afiliación sindical, origen étnico, datos biométricos o similares), ya que no son necesarios para atender una solicitud de contacto profesional.',
        ),
        h3('Datos de conexión'),
        p(
          'Como en cualquier sitio web, el proveedor de alojamiento registra datos técnicos de la conexión —entre ellos la dirección IP, la fecha y hora, la página solicitada y datos del navegador— en los registros del servidor, con la finalidad de servir las páginas y mantener la seguridad y la estabilidad del servicio. Esos registros los genera y conserva el proveedor de alojamiento conforme a sus propias políticas; el estudio no los utiliza para elaborar perfiles, medir audiencias ni identificar visitantes.',
        ),
        note(
          'Este sitio no incorpora herramientas de analítica, publicidad, medición de audiencia, mapas de calor ni seguimiento de ningún tipo, ni propias ni de terceros.',
        ),
      ],
    },
    {
      id: 'finalidades',
      heading: 'Con qué finalidad tratamos tus datos',
      blocks: [
        list(
          [
            'Atender y responder las consultas, solicitudes de información y propuestas de colaboración que nos dirijas.',
          ],
          [
            'Mantener la comunicación posterior necesaria para valorar el encargo, preparar una propuesta o presupuesto y, en su caso, gestionar la relación profesional que se derive.',
          ],
          [
            'Cumplir las obligaciones legales que resulten aplicables al responsable.',
          ],
        ),
        p(
          'No utilizamos tus datos para enviarte comunicaciones comerciales no solicitadas, ni los empleamos para elaborar perfiles ni para adoptar decisiones automatizadas.',
        ),
      ],
    },
    {
      id: 'base',
      heading: 'Base jurídica del tratamiento',
      blocks: [
        p(
          'Cuando nos escribes para plantear un proyecto o solicitar información, la base jurídica es la aplicación de medidas precontractuales adoptadas a petición del interesado, y en su caso la ejecución del contrato que llegue a celebrarse (artículo 6.1.b del RGPD).',
        ),
        p(
          'Cuando el mensaje no persigue una posible contratación, sino una consulta general, la base jurídica es el interés legítimo del responsable en atender las comunicaciones que se le dirigen y mantener una relación profesional ordinaria (artículo 6.1.f del RGPD). Es un tratamiento previsible, limitado a lo que tú mismo nos comunicas, y que puedes interrumpir en cualquier momento oponiéndote a él.',
        ),
        p(
          'Cuando exista una obligación legal que nos imponga conservar o comunicar determinada información, la base será el cumplimiento de esa obligación (artículo 6.1.c del RGPD).',
        ),
        p(
          'No solicitamos tu consentimiento para estos tratamientos porque no es la base jurídica que les corresponde. Tampoco se instala en tu equipo ningún dispositivo de almacenamiento que requiera consentimiento: puedes consultarlo en la ',
          link('Política de cookies', '/cookies/'),
          '.',
        ),
      ],
    },
    {
      id: 'conservacion',
      heading: 'Durante cuánto tiempo los conservamos',
      blocks: [
        p(
          'Conservamos la correspondencia y los datos que contiene durante el tiempo necesario para atender tu solicitud y, si de ella surge una relación profesional, mientras dure y durante los plazos de prescripción de las acciones que puedan derivarse de ella.',
        ),
        p(
          'Si la consulta no da lugar a ninguna relación, los datos se conservan únicamente el tiempo razonable para dejar constancia de la comunicación y de su respuesta, y después se suprimen.',
        ),
        p(
          'Los datos sujetos a obligaciones legales de conservación —por ejemplo, los de naturaleza fiscal o contable— se conservan durante los plazos que fije la normativa aplicable.',
        ),
        note(
          'El plazo concreto de conservación de la correspondencia se fijará junto con el titular: ',
          pending('PLAZO DE CONSERVACIÓN'),
          '.',
        ),
      ],
    },
    {
      id: 'destinatarios',
      heading: 'A quién comunicamos tus datos',
      blocks: [
        p(
          'No vendemos, cedemos ni comunicamos tus datos a terceros, salvo obligación legal.',
        ),
        p(
          'Sí intervienen los proveedores estrictamente necesarios para que el sitio funcione y para que podamos leer y responder tu correo. Actúan como encargados del tratamiento, únicamente siguiendo nuestras instrucciones:',
        ),
        h3('Alojamiento del sitio web'),
        p(
          'El sitio está alojado en la plataforma de Vercel Inc. Como proveedor de alojamiento y de red de entrega de contenidos, trata los datos técnicos de conexión descritos más arriba para servir las páginas y garantizar la seguridad del servicio.',
        ),
        h3('Correo electrónico'),
        p(
          'El correo que nos envías se recibe y se conserva en el proveedor de correo del estudio: ',
          pending('PROVEEDOR DE CORREO ELECTRÓNICO'),
          '. Recuerda que el envío parte de tu propio proveedor de correo, que trata el mensaje conforme a sus propias condiciones.',
        ),
        note(
          'Queda pendiente de aportar el detalle del contrato de encargo del tratamiento con cada proveedor, exigido por el artículo 28 del RGPD: ',
          pending('CONTRATOS DE ENCARGO DEL TRATAMIENTO'),
          '.',
        ),
      ],
    },
    {
      id: 'transferencias',
      heading: 'Transferencias internacionales',
      blocks: [
        p(
          'Vercel Inc. es una entidad con sede en los Estados Unidos, por lo que la prestación del servicio de alojamiento puede implicar una transferencia internacional de datos o el acceso a ellos desde fuera del Espacio Económico Europeo.',
        ),
        p(
          'Estas transferencias deben ampararse en alguna de las garantías previstas en el capítulo V del RGPD, como las cláusulas contractuales tipo de la Comisión Europea o un marco de adecuación aplicable al proveedor.',
        ),
        note(
          'Pendiente de acreditar y publicar la garantía concreta aplicable a cada proveedor, y de confirmar la región de alojamiento contratada: ',
          pending('GARANTÍAS DE TRANSFERENCIA INTERNACIONAL'),
          '.',
        ),
      ],
    },
    {
      id: 'derechos',
      heading: 'Qué derechos tienes',
      blocks: [
        p(
          'Puedes ejercer en cualquier momento los siguientes derechos escribiendo a ',
          mail,
          ', indicando el derecho que deseas ejercer. Podremos solicitarte que acredites tu identidad cuando sea necesario para atender la solicitud.',
        ),
        list(
          [
            'Acceso: saber si tratamos datos tuyos y obtener una copia de ellos.',
          ],
          ['Rectificación: corregir los datos inexactos o incompletos.'],
          [
            'Supresión: solicitar que se eliminen cuando ya no sean necesarios para la finalidad que los originó.',
          ],
          [
            'Oposición: oponerte al tratamiento basado en nuestro interés legítimo, por motivos relacionados con tu situación particular.',
          ],
          [
            'Limitación: solicitar que se suspenda el tratamiento en los supuestos previstos por la norma.',
          ],
          [
            'Portabilidad: recibir tus datos en un formato estructurado y de uso común, cuando el tratamiento se base en tu consentimiento o en un contrato y se realice por medios automatizados.',
          ],
          [
            'Retirada del consentimiento: cuando un tratamiento concreto se base en tu consentimiento, retirarlo en cualquier momento, sin que ello afecte a la licitud del tratamiento previo.',
          ],
        ),
        p(
          'Atenderemos tu solicitud en el plazo de un mes, ampliable conforme al artículo 12 del RGPD cuando la complejidad o el número de solicitudes lo justifique.',
        ),
      ],
    },
    {
      id: 'reclamacion',
      heading: 'Reclamación ante la autoridad de control',
      blocks: [
        p(
          'Si consideras que el tratamiento de tus datos no se ajusta a la normativa, o que no hemos atendido correctamente tu solicitud, puedes presentar una reclamación ante la Agencia Española de Protección de Datos (AEPD), autoridad de control competente en España: ',
          link('www.aepd.es', AEPD),
          '.',
        ),
        p(
          'Te agradecemos que, antes de acudir a la autoridad de control, nos des la oportunidad de resolver la cuestión escribiéndonos a ',
          mail,
          '.',
        ),
      ],
    },
    {
      id: 'seguridad',
      heading: 'Seguridad de la información',
      blocks: [
        p(
          'Aplicamos medidas técnicas y organizativas razonables y proporcionadas al riesgo del tratamiento, teniendo en cuenta que este se limita a la correspondencia profesional: el sitio se sirve mediante conexión cifrada (HTTPS), el acceso al correo está protegido mediante credenciales y el acceso a la información se limita a quienes necesitan conocerla para atender tu solicitud.',
        ),
        p(
          'Ningún sistema de información puede garantizar una seguridad absoluta. Por eso no prometemos una protección total: nos comprometemos a mantener medidas adecuadas, a revisarlas y a notificar las violaciones de seguridad en los términos previstos en los artículos 33 y 34 del RGPD cuando proceda.',
        ),
      ],
    },
    {
      id: 'menores',
      heading: 'Menores de edad',
      blocks: [
        p(
          'Este sitio se dirige a profesionales y organizaciones, no a menores de edad, y no recaba datos de menores de forma consciente. Si detectamos que hemos recibido datos de un menor sin la autorización que corresponda, los suprimiremos.',
        ),
      ],
    },
    {
      id: 'cambios',
      heading: 'Cambios en esta política',
      blocks: [
        p(
          'Esta política puede actualizarse cuando cambie la normativa aplicable o cuando el sitio incorpore nuevos tratamientos o proveedores. La fecha de la última actualización figura al principio del documento; si el cambio fuera sustancial, se advertirá de forma visible.',
        ),
      ],
    },
  ],
};

/* ============================================================== cookies === */

export const cookiePolicy: LegalDocument = {
  title: 'Política de cookies.',
  navLabel: 'Cookies',
  href: '/cookies/',
  metaTitle: 'Política de cookies',
  description:
    'Qué cookies y tecnologías de almacenamiento utiliza realmente el sitio de Colmillo Studio, y por qué no necesita banner de consentimiento.',
  lede: 'Este sitio no instala cookies. Solo utiliza un dato técnico que tu navegador olvida al cerrar la pestaña. Aquí se explica exactamente cuál.',
  updated,
  sections: [
    {
      id: 'que-son',
      heading: 'Qué son las cookies y las tecnologías similares',
      blocks: [
        p(
          'Una cookie es un pequeño archivo que un sitio web guarda en tu navegador para que su servidor pueda leerlo después. Junto a las cookies existen otras tecnologías equivalentes —como el almacenamiento local (localStorage) y el almacenamiento de sesión (sessionStorage)— que guardan información en tu equipo aunque no se envíe automáticamente al servidor.',
        ),
        p(
          'El artículo 22.2 de la LSSI-CE exige el consentimiento del usuario para almacenar o acceder a información en su equipo, salvo cuando ese almacenamiento sea estrictamente necesario para prestar un servicio que el propio usuario haya solicitado.',
        ),
      ],
    },
    {
      id: 'que-usa',
      heading: 'Qué utiliza realmente esta web',
      blocks: [
        p(
          'Se ha revisado el código de este sitio y las respuestas que envía el servidor. El resultado es el siguiente:',
        ),
        list(
          ['este sitio no instala ninguna cookie, ni propia ni de terceros;'],
          [
            'el servidor no envía ninguna cabecera que cree cookies en tu navegador;',
          ],
          [
            'no se utilizan herramientas de analítica o medición de audiencia, ni gestores de etiquetas, ni píxeles publicitarios, ni mapas de calor, ni ningún otro sistema de seguimiento;',
          ],
          [
            'no hay contenido incrustado de terceros —vídeos, mapas, reproductores o publicaciones de redes sociales— que pudiera instalar cookies desde otro dominio;',
          ],
          [
            'las tipografías y los vídeos se sirven desde este mismo sitio, no desde servicios externos;',
          ],
          [
            'la única información que se guarda en tu navegador es un dato técnico de sesión, descrito en la tabla siguiente.',
          ],
        ),
      ],
    },
    {
      id: 'tabla',
      heading: 'Almacenamiento utilizado',
      blocks: [
        {
          kind: 'table',
          caption:
            'Único dato que este sitio guarda en tu navegador. No es una cookie y no se envía al servidor.',
          columns: ['Nombre', 'Tipo', 'Proveedor', 'Finalidad', 'Duración'],
          rows: [
            [
              ['colmilloIntroPlayed'],
              ['Almacenamiento de sesión (sessionStorage). No es una cookie.'],
              ['Colmillo Studio (propio)'],
              [
                'Recordar que la animación de entrada de la página de inicio ya se ha mostrado en esta pestaña, para no repetirla cada vez que vuelves al inicio.',
              ],
              [
                'Hasta que cierras la pestaña. El navegador lo elimina automáticamente.',
              ],
            ],
          ],
        },
        p(
          'Este dato guarda únicamente el valor «true». No contiene identificadores, no permite reconocerte, no se comparte con nadie, no viaja al servidor y desaparece al cerrar la pestaña. Si tu navegador bloquea el almacenamiento, el sitio funciona igual: simplemente vuelve a mostrar la animación.',
        ),
        p(
          'Por transparencia: el sitio también elimina, si existe, un valor antiguo llamado «colmillo-motion», que correspondía a un control de movimiento ya retirado. Es una operación de borrado; no se escribe ningún dato nuevo.',
        ),
      ],
    },
    {
      id: 'sin-banner',
      heading: 'Por qué no verás un banner de cookies',
      blocks: [
        p(
          'Un banner de consentimiento tiene sentido cuando existen cookies o tecnologías que requieren autorización previa: analítica, publicidad, personalización o seguimiento. En este sitio no existe ninguna.',
        ),
        p(
          'El único dato almacenado es técnico, propio, de sesión, sin identificadores y necesario para prestar correctamente la experiencia de navegación solicitada, de modo que no requiere consentimiento conforme al artículo 22.2 de la LSSI-CE. Mostrar un aviso de consentimiento para algo que no lo necesita no aportaría información útil y contribuiría a la fatiga del consentimiento.',
        ),
        p(
          'Si en el futuro el sitio incorporase analítica, contenido incrustado de terceros o cualquier tecnología que requiera consentimiento, se implantaría previamente un mecanismo de consentimiento conforme a la normativa —con opciones de aceptar, rechazar y configurar en igualdad de condiciones— y esta política se actualizaría antes de activarlo.',
        ),
      ],
    },
    {
      id: 'redes',
      heading: 'Enlaces a redes sociales',
      blocks: [
        p(
          'Este sitio enlaza al perfil público del estudio en Instagram. Es un enlace corriente: no se carga ningún componente de Instagram ni de Meta dentro de estas páginas, y por tanto no se instala nada en tu navegador por el hecho de que el enlace exista.',
        ),
        p(
          'Si decides seguirlo, saldrás de este sitio y pasarás a estar sujeto a las políticas de privacidad y de cookies de esa plataforma, que sí utiliza sus propias tecnologías de seguimiento.',
        ),
      ],
    },
    {
      id: 'gestionar',
      heading: 'Cómo borrar o bloquear este almacenamiento',
      blocks: [
        p(
          'Puedes eliminar o impedir el almacenamiento desde la configuración de tu navegador, normalmente en el apartado de privacidad o de datos de sitios. Al hacerlo no perderás ninguna funcionalidad de este sitio.',
        ),
        p(
          'La navegación en modo privado o de incógnito también descarta este dato al cerrar la ventana.',
        ),
      ],
    },
    {
      id: 'cambios',
      heading: 'Cambios en esta política',
      blocks: [
        p(
          'Esta política se revisará siempre que se modifique la tecnología del sitio. La fecha de la última actualización figura al principio del documento. Puedes consultar también el ',
          link('Aviso legal', '/aviso-legal/'),
          ' y la ',
          link('Política de privacidad', '/privacidad/'),
          '.',
        ),
      ],
    },
  ],
};

/** The three documents, in the order the footer lists them. */
export const legalDocuments: LegalDocument[] = [
  legalNotice,
  privacyPolicy,
  cookiePolicy,
];

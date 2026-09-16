import type { gsap as GsapCore } from 'gsap';
import type { ScrollTrigger as ScrollTriggerClass } from 'gsap/ScrollTrigger';
import {
  contactEmail,
  contactFields,
  contactFormEndpoint,
  contactServices,
  contactStatus,
  contactSubject,
  contactSubmit,
  type ContactField,
} from '@/data/contactPage';

/**
 * The shared tools, handed over by `ContactPage.ts`. This chunk imports them
 * for their types only, so GSAP and ScrollTrigger stay in the shared motion
 * bundle alone and are never duplicated into a chunk.
 */
export interface ContactPageTools {
  gsap: typeof GsapCore;
  ScrollTrigger: typeof ScrollTriggerClass;
}

type Control = HTMLInputElement | HTMLTextAreaElement;

const none = () => undefined;

/** Where the two-column brief exists, and with it the contact pulse. */
const WIDE_QUERY = '(min-width: 64.01rem)';
const FINE_QUERY = '(hover: hover) and (pointer: fine)';

/**
 * /contacto/ — the route's behaviour, loaded only on this page.
 *
 * - The hero's unfinished trajectory: its disc walks the line, slipping out of
 *   one open end and back in at the other, and a fine pointer bends the whole
 *   arc a few pixels towards it and nudges the disc a few degrees forward. It
 *   runs only while the hero is on screen in a visible tab.
 * - The white brief sheet rising over the charcoal hero is sticky layout, not
 *   motion; the only thing scrubbed here is the last of its top radius
 *   flattening as it takes the screen.
 * - One quiet reveal per block as the sheet enters, once.
 * - The contact pulse: a small orange ring that glides to the field with
 *   focus, on the two-column layout only.
 * - The form itself: validation with the copy from `src/data/contactPage.ts`,
 *   the field states, and the submit path.
 *
 * Reduced motion keeps every one of those except the movement: the arc is
 * still and fully drawn, the sheet's radius is whatever CSS left it, the
 * blocks are simply there and the pulse does not travel. The form behaves
 * identically. No pin, no parallax, no permanent loop off screen. Every
 * listener, observer, tween and ScrollTrigger is released by the returned
 * cleanup, which `MotionController` runs before a motion-preference restart.
 */
export function mountContactPage(
  page: HTMLElement,
  tools: ContactPageTools,
): () => void {
  const reduced = document.documentElement.dataset.motion === 'reduced';
  const cleanups = [
    initOrbit(page, reduced, tools),
    initSheet(page, reduced, tools),
    initReveals(page, reduced, tools),
    initPulse(page, reduced, tools),
    initForm(page),
  ];

  return () => cleanups.forEach((cleanup) => cleanup());
}

/* ---------------------------------------------------------------- orbit --- */

/** How many points of the path are cached, so no frame queries geometry. */
const SAMPLES = 480;
/** One full pass along the trajectory, in seconds. */
const PASS = 54;
/**
 * Where the disc rests when nothing moves — with no JavaScript, under reduced
 * motion and on the first paint. It is a point well inside the visible part of
 * the trajectory on every viewport, and `ContactOrbit.astro` carries the same
 * place as the group's own `transform`, so the disc never starts somewhere
 * else and jumps here when this chunk arrives.
 */
const REST = 0.87;
/** Share of the path over which the disc fades out of, and back into, view. */
const FADE = 0.07;
/** Furthest the arc leans towards the pointer, in CSS pixels. */
const BEND = 7;
/** How far past the arc's line the pointer starts to be felt, in pixels. */
const REACH = 180;
/** Furthest the pointer nudges the disc along the line (about seven degrees). */
const NUDGE = 0.02;

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

/** 0 at the ends of the open arc, 1 along the rest of it. */
const presenceAt = (t: number) =>
  clamp(t / FADE, 0, 1) * clamp((1 - t) / FADE, 0, 1);

function initOrbit(
  page: HTMLElement,
  reduced: boolean,
  { gsap }: ContactPageTools,
): () => void {
  const svg = page.querySelector<SVGSVGElement>('[data-contact-orbit]');
  const line = svg?.querySelector<SVGPathElement>('.contact-orbit__line');
  const bendGroup = svg?.querySelector<SVGGElement>('[data-orbit-bend]');
  const dotGroup = svg?.querySelector<SVGGElement>('[data-orbit-dot]');
  if (!svg || !line || !bendGroup || !dotGroup) return none;

  // The path in user units, sampled once. `getPointAtLength` never runs again.
  const total = line.getTotalLength();
  if (!total) return none;
  const points: { x: number; y: number }[] = [];
  for (let index = 0; index <= SAMPLES; index += 1) {
    const point = line.getPointAtLength((index / SAMPLES) * total);
    points.push({ x: point.x, y: point.y });
  }
  const pointAt = (t: number) => {
    const raw = clamp(t, 0, 1) * SAMPLES;
    const index = Math.min(SAMPLES - 1, Math.floor(raw));
    const from = points[index]!;
    const to = points[index + 1]!;
    const f = raw - index;
    return { x: from.x + (to.x - from.x) * f, y: from.y + (to.y - from.y) * f };
  };

  const place = (t: number, opacity: number) => {
    const point = pointAt(t);
    dotGroup.setAttribute(
      'transform',
      `translate(${point.x.toFixed(2)} ${point.y.toFixed(2)})`,
    );
    dotGroup.setAttribute('opacity', opacity.toFixed(3));
  };

  // The still picture, which is also the whole of it under reduced motion.
  place(REST, 1);
  if (reduced) {
    return () => {
      dotGroup.removeAttribute('transform');
      dotGroup.removeAttribute('opacity');
    };
  }

  const travel = { value: REST };
  const pull = { x: 0, y: 0, nudge: 0 };
  /** Rendered pixels per SVG user unit, remeasured on resize and scroll. */
  let unit = 1;
  let box = svg.getBoundingClientRect();
  const measure = () => {
    box = svg.getBoundingClientRect();
    unit = box.width ? box.width / 600 : 1;
  };
  measure();

  let lastBend = '';
  const render = () => {
    const t = (((travel.value + pull.nudge) % 1) + 1) % 1;
    place(t, presenceAt(t));
    const dx = (pull.x / unit).toFixed(2);
    const dy = (pull.y / unit).toFixed(2);
    const transform = `translate(${dx} ${dy})`;
    if (transform !== lastBend) {
      bendGroup.setAttribute('transform', transform);
      lastBend = transform;
    }
  };

  /*
   * One tween drives the disc and, through `render`, everything the pointer
   * asked for. It is paused whenever the hero is off screen or the tab is
   * hidden, so nothing runs while the drawing cannot be seen.
   */
  const walk = gsap.to(travel, {
    value: REST + 1,
    duration: PASS,
    ease: 'none',
    repeat: -1,
    onUpdate: render,
  });

  let visible = false;
  const sync = () => {
    if (visible && !document.hidden) walk.play();
    else walk.pause();
  };
  const observer = new IntersectionObserver(([entry]) => {
    visible = Boolean(entry?.isIntersecting);
    sync();
  });
  observer.observe(svg);
  document.addEventListener('visibilitychange', sync);
  sync();

  const fine = window.matchMedia(FINE_QUERY);
  const leanX = gsap.quickTo(pull, 'x', { duration: 1.1, ease: 'power2.out' });
  const leanY = gsap.quickTo(pull, 'y', { duration: 1.1, ease: 'power2.out' });
  const slide = gsap.quickTo(pull, 'nudge', {
    duration: 1.6,
    ease: 'power2.out',
  });

  /*
   * The arc never follows the pointer: the pointer only says how far, and in
   * which direction, it gives. No layout is read here — the box was measured
   * on resize — and nothing is written; the tween's own frame renders it.
   */
  const respond = (event: PointerEvent) => {
    if (!fine.matches || event.pointerType === 'touch') return;
    const cx = box.left + box.width / 2;
    const cy = box.top + box.height / 2;
    const dx = event.clientX - cx;
    const dy = event.clientY - cy;
    const distance = Math.hypot(dx, dy) || 1;
    const radius = box.width / 2;
    let k = clamp((radius + REACH - distance) / REACH, 0, 1);
    k = k * k * (3 - 2 * k);
    leanX((dx / distance) * BEND * k);
    leanY((dy / distance) * BEND * k);
    slide(NUDGE * k);
  };
  const release = () => {
    leanX(0);
    leanY(0);
    slide(0);
  };

  window.addEventListener('pointermove', respond, { passive: true });
  document.addEventListener('pointerleave', release);
  window.addEventListener('resize', measure);
  window.addEventListener('scroll', measure, { passive: true });

  return () => {
    window.removeEventListener('pointermove', respond);
    document.removeEventListener('pointerleave', release);
    window.removeEventListener('resize', measure);
    window.removeEventListener('scroll', measure);
    document.removeEventListener('visibilitychange', sync);
    observer.disconnect();
    gsap.killTweensOf([travel, pull]);
    walk.kill();
    bendGroup.removeAttribute('transform');
    dotGroup.removeAttribute('transform');
    dotGroup.removeAttribute('opacity');
  };
}

/* ---------------------------------------------------------------- sheet --- */

/**
 * The white sheet rises over the charcoal hero on sticky layout alone. The
 * only thing here is the last of its top radius flattening out as it takes the
 * screen, so the sheet lands rather than stopping.
 */
function initSheet(
  page: HTMLElement,
  reduced: boolean,
  { gsap }: ContactPageTools,
): () => void {
  if (reduced) return none;
  const sheet = page.querySelector<HTMLElement>('[data-contact-brief]');
  if (!sheet) return none;

  const context = gsap.context(() => {
    gsap.to(sheet, {
      '--cn-sheet-radius': '0rem',
      ease: 'none',
      scrollTrigger: {
        trigger: sheet,
        start: 'top bottom',
        end: 'top 12%',
        scrub: 0.5,
        invalidateOnRefresh: true,
      },
    });
  }, page);

  return () => context.revert();
}

/* -------------------------------------------------------------- reveals --- */

/**
 * The left block, then the fields, each settling upwards a few pixels as the
 * sheet arrives — once, with a small stagger, and never again while scrolling.
 */
function initReveals(
  page: HTMLElement,
  reduced: boolean,
  { gsap }: ContactPageTools,
): () => void {
  if (reduced) return none;

  const context = gsap.context(() => {
    gsap.utils
      .toArray<HTMLElement>('[data-contact-reveal]')
      .forEach((element, index) => {
        gsap.from(element, {
          y: 22,
          opacity: 0,
          duration: 0.66,
          delay: Math.min(index, 6) * 0.05,
          ease: 'power3.out',
          scrollTrigger: { trigger: element, start: 'top 94%', once: true },
        });
      });
  }, page);

  return () => context.revert();
}

/* ---------------------------------------------------------------- pulse --- */

/**
 * The contact pulse: one small orange ring at the form's left edge that glides
 * to whichever field has focus, so the page visibly answers while the brief is
 * filled in.
 *
 * It only ever writes a transform. The field's place is read once per focus
 * through the offset chain (never on a pointer move, never per frame), and the
 * ring is not in the layout at all below the two-column brief. Under reduced
 * motion it rests where focus is, without travelling there.
 */
function initPulse(
  page: HTMLElement,
  reduced: boolean,
  { gsap }: ContactPageTools,
): () => void {
  const form = page.querySelector<HTMLFormElement>('[data-contact-form]');
  const pulse = form?.querySelector<HTMLElement>('[data-contact-pulse]');
  if (!form || !pulse) return none;

  const wide = window.matchMedia(WIDE_QUERY);
  const glide = gsap.quickTo(pulse, 'y', { duration: 0.5, ease: 'power3.out' });
  let current: HTMLElement | null = null;

  /*
   * How far a node sits below the form, through the offset chain.
   *
   * A single `offsetTop` is not enough: the reveal tween leaves a transform on
   * every field, which makes the field itself the offset parent, so the
   * control reports its place inside its own field instead of inside the form.
   * Summing the chain up to the form is right whatever is positioned on the
   * way, and — unlike `getBoundingClientRect` — it ignores transforms, so a
   * field still playing its reveal does not drag the ring a few pixels with it.
   */
  const offsetWithin = (node: HTMLElement) => {
    let top = 0;
    for (
      let el: HTMLElement | null = node;
      el && el !== form;
      el = el.offsetParent as HTMLElement | null
    ) {
      top += el.offsetTop;
    }
    return top;
  };

  /** The middle of the control, or of a tall textarea's first lines. */
  const centreOf = (field: HTMLElement) => {
    const anchor = field.querySelector<HTMLElement>(
      '.contact-field__control, .contact-choices',
    );
    if (!anchor) return 0;
    return offsetWithin(anchor) + Math.min(anchor.offsetHeight, 64) / 2;
  };

  const settle = (field: HTMLElement | null, animate: boolean) => {
    if (!field || !wide.matches) return;
    current = field;
    const y = centreOf(field) - pulse.offsetHeight / 2;
    if (animate) glide(y);
    else gsap.set(pulse, { y });
  };

  const fields = [
    ...form.querySelectorAll<HTMLElement>('[data-contact-field]'),
  ];
  settle(fields[0] ?? null, false);
  const clear = () => {
    gsap.killTweensOf(pulse);
    gsap.set(pulse, { clearProps: 'transform' });
    delete form.dataset.pulse;
  };

  /*
   * Reduced motion leaves the ring where it started and never sends it
   * anywhere: it is a mark in the margin, not a moving one. Everything else
   * about the form is unchanged.
   */
  if (reduced) return clear;

  const onFocus = (event: FocusEvent) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    const field = target.closest<HTMLElement>('[data-contact-field]');
    if (!field) return;
    form.dataset.pulse = 'active';
    settle(field, true);
  };
  const onBlur = () => {
    // One frame later the next control has focus, if there is one.
    window.requestAnimationFrame(() => {
      if (!form.contains(document.activeElement)) delete form.dataset.pulse;
    });
  };
  const onResize = () => settle(current, false);

  form.addEventListener('focusin', onFocus);
  form.addEventListener('focusout', onBlur);
  window.addEventListener('resize', onResize);

  return () => {
    form.removeEventListener('focusin', onFocus);
    form.removeEventListener('focusout', onBlur);
    window.removeEventListener('resize', onResize);
    clear();
  };
}

/* ----------------------------------------------------------------- form --- */

/*
 * Deliberately loose: it only rules out what cannot be an address at all, so
 * nobody with an unusual but valid one is turned away. The real test of an
 * address is whether the reply arrives.
 */
const ADDRESS = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const specOf = (name: string): ContactField | undefined =>
  contactFields.find((field) => field.name === name);

/** The message this field should show, or null when it is fine. */
function problemOf(field: HTMLElement): string | null {
  const spec = specOf(field.dataset.name ?? '');
  const control = field.querySelector<Control>('.contact-field__control');
  if (!spec || !control) return null;
  const value = control.value.trim();
  if (spec.required && !value) return spec.missing;
  if (spec.type === 'email' && value && !ADDRESS.test(value))
    return spec.invalid;
  return null;
}

function showProblem(field: HTMLElement, message: string | null): void {
  const slot = field.querySelector<HTMLElement>('[data-field-error]');
  const control = field.querySelector<Control>('.contact-field__control');
  if (slot) slot.textContent = message ?? '';
  if (message) field.dataset.invalid = 'true';
  else delete field.dataset.invalid;
  control?.setAttribute('aria-invalid', message ? 'true' : 'false');
}

/**
 * The form.
 *
 * Validation, the field states and the submit path. It runs whatever the
 * motion preference is: none of it is decoration.
 *
 * On submit there are exactly two branches, and which one runs is decided by
 * `contactFormEndpoint` in `src/data/contactPage.ts`:
 *
 * - an endpoint exists — the brief is POSTed as JSON and the form reports what
 *   actually happened, `success` only on a response that came back ok;
 * - no endpoint, which is this repository's state today — the finished brief
 *   is handed to the visitor's own mail client as a prepared draft. The form
 *   then says exactly that and shows the address as well, so a blocked or
 *   missing mail client is never a dead end. It never says "sent".
 */
function initForm(page: HTMLElement): () => void {
  const form = page.querySelector<HTMLFormElement>('[data-contact-form]');
  const status = page.querySelector<HTMLElement>('[data-contact-status]');
  const submit = page.querySelector<HTMLButtonElement>('[data-contact-submit]');
  if (!form || !status || !submit) return none;

  // From here the copy above owns the messages, not the browser's own bubbles.
  form.noValidate = true;
  const fields = [
    ...form.querySelectorAll<HTMLElement>('[data-contact-field]'),
  ];
  let attempted = false;

  const writeStatus = (text: string, withAddress: boolean) => {
    status.textContent = text;
    if (!withAddress || !contactEmail?.value) return;
    status.append(' ');
    const link = document.createElement('a');
    link.href = contactEmail.href;
    link.textContent = contactEmail.value;
    link.dataset.cursorLabel = 'Abrir';
    status.append(link, '.');
  };

  const clearStatus = () => {
    status.textContent = '';
    delete form.dataset.state;
  };

  /** Every field's message at once. Returns the first one with a problem. */
  const check = (): HTMLElement | null => {
    let first: HTMLElement | null = null;
    for (const field of fields) {
      const problem = problemOf(field);
      showProblem(field, problem);
      if (problem && !first) first = field;
    }
    return first;
  };

  const payload = () => {
    const data = new FormData(form);
    const value = (name: string) => String(data.get(name) ?? '').trim();
    const service = value('service');
    return {
      name: value('name'),
      email: value('email'),
      company: value('company'),
      service,
      serviceLabel:
        contactServices.options.find((option) => option.value === service)
          ?.label ?? '',
      message: value('message'),
    };
  };

  /** The whole brief as a plain-text draft in the visitor's mail client. */
  const draft = (brief: ReturnType<typeof payload>): string | null => {
    if (!contactEmail) return null;
    const lines = [
      `${specOf('name')?.label ?? 'Nombre'}: ${brief.name}`,
      `${specOf('email')?.label ?? 'Correo'}: ${brief.email}`,
      brief.company
        ? `${specOf('company')?.label ?? 'Empresa'}: ${brief.company}`
        : null,
      brief.serviceLabel
        ? `${contactServices.legend}: ${brief.serviceLabel}`
        : null,
      '',
      brief.message,
    ].filter((line): line is string => line !== null);
    const query = new URLSearchParams({
      subject: contactSubject,
      body: lines.join('\r\n'),
    });
    return `${contactEmail.href}?${query.toString()}`;
  };

  const onSubmit = (event: SubmitEvent) => {
    event.preventDefault();
    attempted = true;
    const first = check();
    if (first) {
      form.dataset.state = 'invalid';
      writeStatus(contactStatus.invalid, false);
      first.querySelector<Control>('.contact-field__control')?.focus();
      return;
    }

    const brief = payload();
    if (!contactFormEndpoint) {
      const href = draft(brief);
      if (!href) {
        form.dataset.state = 'error';
        writeStatus(contactStatus.failed, true);
        return;
      }
      form.dataset.state = 'handoff';
      writeStatus(`${contactStatus.handoff} ${contactStatus.fallback}`, true);
      window.location.href = href;
      return;
    }

    form.dataset.state = 'submitting';
    submit.disabled = true;
    writeStatus(contactSubmit.busy, false);
    void fetch(contactFormEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(brief),
    })
      .then((response) => {
        if (!response.ok) throw new Error(String(response.status));
        form.dataset.state = 'success';
        writeStatus(contactStatus.sent, false);
        form.reset();
        fields.forEach((field) => showProblem(field, null));
      })
      .catch(() => {
        form.dataset.state = 'error';
        writeStatus(contactStatus.failed, true);
      })
      .finally(() => {
        submit.disabled = false;
      });
  };

  /* A field that has been marked clears itself the moment it is put right. */
  const onInput = (event: Event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    const field = target.closest<HTMLElement>('[data-contact-field]');
    if (!field || !('invalid' in field.dataset)) return;
    if (!problemOf(field)) {
      showProblem(field, null);
      if (form.dataset.state === 'invalid' && !check()) clearStatus();
    }
  };

  /* After a first attempt, leaving a field checks it again. */
  const onBlur = (event: FocusEvent) => {
    if (!attempted) return;
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    const field = target.closest<HTMLElement>('[data-contact-field]');
    if (field) showProblem(field, problemOf(field));
  };

  form.addEventListener('submit', onSubmit);
  form.addEventListener('input', onInput);
  form.addEventListener('change', onInput);
  form.addEventListener('focusout', onBlur);

  return () => {
    form.removeEventListener('submit', onSubmit);
    form.removeEventListener('input', onInput);
    form.removeEventListener('change', onInput);
    form.removeEventListener('focusout', onBlur);
    form.noValidate = false;
    submit.disabled = false;
    fields.forEach((field) => showProblem(field, null));
    clearStatus();
  };
}

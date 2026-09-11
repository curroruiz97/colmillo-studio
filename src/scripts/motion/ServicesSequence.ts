import type { gsap as Gsap } from 'gsap';

/**
 * Share of one service's step spent handing the stage to the next. The rest is
 * a hold, so every service is read at rest before anything moves again.
 */
const HANDOVER = 0.6;

/**
 * Tiny horizontal poses of the illustration, one per service, in px. The art
 * is a single flat PNG, so it cannot move a detail of its own: it only settles
 * a few pixels differently after each handover, pressed down and released.
 */
const ART_POSES = [0, -7, 5, -3];

/**
 * The home services sequence: one scrubbed timeline, driven by ordinary
 * vertical scroll across the section's track, hands the protagonist role from
 * one service to the next. The service in place rises a little and fades; the
 * next arrives from below, its parts a beat apart, and its rule draws in. The
 * `01 / 04` readout, the orange progress line and a small press of the
 * illustration follow the same playhead.
 *
 * A separate chunk, loaded by the section's own script and mounted by
 * `ServicesMotion.ts` once the section is already in its sequence layout, so
 * the shared motion bundle stays inside its budget. GSAP is passed in, never
 * imported, so it stays in that bundle alone.
 *
 * Nothing is pinned. The stage is CSS `sticky` inside the track, so when the
 * track ends ordinary scroll releases it and the project rail, which pins
 * itself only once its own top reaches the screen's, follows without the two
 * scroll ranges ever overlapping.
 */
export function mountServicesSequence(
  section: HTMLElement,
  entries: HTMLElement[],
  gsap: typeof Gsap,
): () => void {
  const track = section.querySelector<HTMLElement>('[data-services-track]');
  if (!track) return () => undefined;

  const counter = section.querySelector<HTMLElement>('[data-services-counter]');
  const fill = section.querySelector<HTMLElement>('[data-services-progress]');
  // The frame presses; the layers inside it are what change per service.
  const art = section.querySelector<HTMLElement>('[data-services-art]');
  const layers = [
    ...section.querySelectorAll<HTMLImageElement>('[data-services-layer]'),
  ];
  const shared = layers.find(
    (layer) => layer.dataset.servicesLayer === 'shared',
  );
  const layerFor = (index: number) =>
    layers.find((layer) => layer.dataset.servicesLayer === String(index)) ??
    shared;
  const count = entries.length;
  const half = HANDOVER / 2;

  /*
   * The service layers are lazy, so the page never pays for them up front.
   * Once the track is within a screen and a half of the viewport they are
   * fetched and decoded, so no handover ever waits on the network or a decode
   * and nothing flickers on a fast scroll.
   */
  const pending = layers.filter((layer) => layer !== shared);
  let preload: IntersectionObserver | undefined;
  if (pending.length > 0 && 'IntersectionObserver' in window) {
    preload = new IntersectionObserver(
      (records) => {
        if (!records.some((record) => record.isIntersecting)) return;
        preload?.disconnect();
        pending.forEach((image) => {
          image.loading = 'eager';
          void image.decode().catch(() => undefined);
        });
      },
      { rootMargin: '150% 0px' },
    );
    preload.observe(track);
  }

  let active = -1;
  const setActive = (index: number) => {
    if (index === active) return;
    active = index;
    entries.forEach((entry, position) =>
      entry.toggleAttribute('data-active', position === index),
    );
    if (counter) counter.textContent = String(index + 1).padStart(2, '0');
  };
  setActive(0);

  let timeline: gsap.core.Timeline | undefined;
  const context = gsap.context(() => {
    // One unit of time per service, so the service on stage is the whole part
    // of the playhead and every handover is centred on a step boundary.
    const sequence = gsap.timeline({
      defaults: { ease: 'none' },
      onUpdate: () =>
        setActive(Math.min(count - 1, Math.floor(sequence.time()))),
      scrollTrigger: {
        trigger: track,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.8,
      },
    });
    timeline = sequence;

    // The readout's line runs the whole track. The empty `set` at the end
    // fixes the duration at one unit per service whatever else is present.
    if (fill) {
      sequence.fromTo(fill, { scaleX: 0 }, { scaleX: 1, duration: count }, 0);
    }
    sequence.set({}, {}, count);

    // Only the first service's layer is painted at the start; every later
    // change is a cross-fade inside the timeline, so scrolling back restores
    // the right layer.
    const firstLayer = layerFor(0);
    if (layers.length > 1) {
      gsap.set(layers, {
        opacity: (_: number, layer: HTMLElement) =>
          layer === firstLayer ? 1 : 0,
      });
    }

    entries.forEach((entry, index) => {
      const previous = entries[index - 1];
      if (!previous) return;
      const at = index - half;
      const parts = entry.querySelectorAll('[data-service-part]');
      const rule = entry.querySelector('[data-service-rule]');

      /*
       * The two services never share the stage: the one in place is gone just
       * before the step boundary and the next starts just after it, so two
       * names are never read over each other. The short empty beat between
       * them is the tension; the arrival is the release.
       *
       * `force3D` stays off: the names only translate, and a promoted layer
       * would soften them for the whole scrub (see `ManifestoMotion.ts`).
       */
      sequence
        // The service in place rises slightly and gives up the stage. Its
        // starting pose is the CSS one, so it never renders ahead of time.
        .fromTo(
          previous,
          { yPercent: 0 },
          {
            yPercent: -14,
            duration: half + 0.05,
            ease: 'power1.in',
            force3D: false,
            immediateRender: false,
          },
          at,
        )
        .fromTo(
          previous,
          { opacity: 1 },
          {
            opacity: 0,
            duration: half - 0.04,
            ease: 'power1.in',
            immediateRender: false,
          },
          at,
        )
        // The next arrives from below and takes the same line.
        .fromTo(
          entry,
          { yPercent: 26 },
          {
            yPercent: 0,
            duration: half + 0.02,
            ease: 'power3.out',
            force3D: false,
          },
          index - 0.02,
        )
        .fromTo(
          entry,
          { opacity: 0 },
          { opacity: 1, duration: half - 0.04, ease: 'power1.out' },
          index,
        )
        // Number, name, copy and drawing settle a beat apart.
        .fromTo(
          parts,
          { y: 16 },
          {
            y: 0,
            duration: half,
            ease: 'power2.out',
            force3D: false,
            stagger: 0.035,
          },
          index,
        );

      if (rule) {
        sequence.fromTo(
          rule,
          { scaleX: 0 },
          { scaleX: 1, duration: half, ease: 'power2.out' },
          index + 0.05,
        );
      }

      // A service with its own image takes the frame over with a soft
      // cross-fade across the handover, in step with the copy; the shared
      // layer covers the rest. Same window and same ease both ways, so the
      // two opacities always sum to one and the frame never dims. The leaving
      // art settles a hair down and in, the arriving one lands from a hair
      // above its size, both from the frame's foot, so the change reads as
      // one drawing turning into the next rather than a slide swap.
      const leaving = layerFor(index - 1);
      const arriving = layerFor(index);
      if (leaving && arriving && leaving !== arriving) {
        const fade = {
          duration: 0.4,
          ease: 'sine.inOut',
          transformOrigin: '50% 100%',
          immediateRender: false,
        };
        sequence
          .fromTo(
            leaving,
            { opacity: 1, scale: 1, y: 0 },
            { opacity: 0, scale: 0.99, y: -4, ...fade },
            index - 0.2,
          )
          .fromTo(
            arriving,
            { opacity: 0, scale: 1.015, y: 6 },
            { opacity: 1, scale: 1, y: 0, ...fade },
            index - 0.2,
          );
      }

      // The anchor answers each handover with a small press, then settles
      // into the next service's pose.
      if (art) {
        sequence
          .fromTo(
            art,
            { x: ART_POSES[index - 1] ?? 0, y: 0, scaleX: 1, scaleY: 1 },
            {
              y: 6,
              scaleX: 1.006,
              scaleY: 0.988,
              duration: half,
              ease: 'sine.inOut',
              immediateRender: false,
              transformOrigin: '50% 100%',
            },
            at,
          )
          .fromTo(
            art,
            { y: 6, scaleX: 1.006, scaleY: 0.988 },
            {
              x: ART_POSES[index] ?? 0,
              y: 0,
              scaleX: 1,
              scaleY: 1,
              duration: half,
              ease: 'sine.inOut',
              immediateRender: false,
            },
            index,
          );
      }
    });
  }, section);

  /*
   * Keyboard focus on a service that is not on stage (a service link, once
   * approved destinations exist) scrolls the page to that service's step, so
   * focus is never inside a transparent entry.
   */
  const revealFocused = (event: FocusEvent) => {
    const entry = (event.target as Element | null)?.closest<HTMLElement>(
      '[data-service-entry]',
    );
    const index = entry ? entries.indexOf(entry) : -1;
    const trigger = timeline?.scrollTrigger;
    if (index < 0 || index === active || !trigger) return;
    trigger.scroll(
      trigger.start + (trigger.end - trigger.start) * ((index + 0.5) / count),
    );
  };
  section.addEventListener('focusin', revealFocused);

  return () => {
    preload?.disconnect();
    section.removeEventListener('focusin', revealFocused);
    context.revert();
    entries.forEach((entry) => entry.removeAttribute('data-active'));
    if (counter) counter.textContent = '01';
  };
}

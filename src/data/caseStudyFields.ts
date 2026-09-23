import { z } from 'astro/zod';

/*
 * The case-study frontmatter an approved project may carry, spread into the
 * collection's schema by `src/content.config.ts`.
 *
 * Everything is optional: a project with no `caseStudy` block still publishes
 * a complete page through the fallback in `resolveCaseStudy()`. What is
 * validated here is what a person can realistically get wrong in a Markdown
 * file — a colour that is not a colour, a layout or hero variant that does not
 * exist, a module type that was never built — so the build fails with a clear
 * message instead of the page rendering half a study.
 *
 * The modules' own fields stay permissive on purpose: they are a wide
 * discriminated union (`CaseStudyModule`), authored with full TypeScript
 * checking in `src/data/caseStudies.ts`, and re-describing all fourteen shapes
 * in Zod would be a second source of truth to keep in step. The type is the
 * contract; this is the guard rail.
 */

const hex = z
  .string()
  .regex(/^#(?:[0-9a-f]{3}|[0-9a-f]{4}|[0-9a-f]{6}|[0-9a-f]{8})$/i, {
    message: 'Use a literal hex colour, for example #cd5730.',
  });

const theme = z
  .object({
    background: hex.optional(),
    foreground: hex.optional(),
    accent: hex.optional(),
    surface: hex.optional(),
    secondary: hex.optional(),
    chrome: z.enum(['light', 'dark']).optional(),
  })
  .optional();

const module = z
  .object({
    type: z.enum([
      'fullMedia',
      'text',
      'split',
      'twoUp',
      'gallery',
      'video',
      'statement',
      'sticky',
      'process',
      'quote',
      'facts',
      'palette',
      'type',
      'sequence',
    ]),
    chapter: z.object({ id: z.string(), label: z.string() }).optional(),
  })
  // The module's own fields are the discriminated union's business, not this
  // guard rail's; they pass through untouched.
  .catchall(z.unknown());

/**
 * One beat of the shared spine. The template names the beats, so the keys
 * below are the only ones there are: an author fills them in, and cannot
 * rename, reorder or add to them. `figures` is read on `results` alone and
 * must carry approved, verifiable numbers — never an invented metric.
 */
const beat = z
  .object({
    body: z.array(z.string()),
    media: z.object({}).catchall(z.unknown()).optional(),
    figures: z
      .array(z.object({ value: z.string(), label: z.string() }))
      .optional(),
  })
  .optional();

export const caseStudyFields = {
  caseStudy: z
    .object({
      client: z.string().optional(),
      headline: z.string().optional(),
      intro: z.array(z.string()).optional(),
      /* The fixed narrative every project shares (`src/data/caseStudy.ts`). */
      spine: z
        .object({ strategy: beat, execution: beat, results: beat })
        .optional(),
      /* The pieces beside the brief: an image and a film, or two images. */
      showcase: z.array(z.object({}).catchall(z.unknown())).optional(),
      deliverables: z.array(z.string()).optional(),
      hero: z
        .object({
          variant: z.enum(['full', 'contained', 'split']).optional(),
        })
        .catchall(z.unknown())
        .optional(),
      theme,
      layout: z
        .enum(['editorial', 'immersion', 'graphic', 'minimal'])
        .optional(),
      modules: z.array(module).optional(),
      chapters: z.boolean().optional(),
      /** Slugs of approved projects; the first published one is "next". */
      related: z.array(z.string()).optional(),
      seo: z
        .object({
          title: z.string().optional(),
          description: z.string().optional(),
          image: z.string().optional(),
          imageAlt: z.string().optional(),
        })
        .optional(),
    })
    .optional(),
};

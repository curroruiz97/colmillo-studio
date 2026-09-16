import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { caseStudyFields } from './data/caseStudyFields';
import { fileURLToPath } from 'node:url';
import { readdirSync } from 'node:fs';

const projectsDirectory = fileURLToPath(
  new URL('./content/projects/', import.meta.url),
);
const hasProjectEntries = readdirSync(projectsDirectory, {
  recursive: true,
}).some((entry) => /\.(md|mdx)$/i.test(String(entry)));

const projects = defineCollection({
  // The directory is intentionally empty until approved entries arrive. The
  // publication flag remains separate so drafts cannot leak into production.
  loader: hasProjectEntries
    ? glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' })
    : async () => [],
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      summary: z.string(),
      year: z.number().int(),
      services: z.array(z.string()).default([]),
      // The archive's filter (`/proyectos/`): the studio's four services. A
      // project may belong to several and then appears under each of them.
      categories: z
        .array(z.enum(['estrategia', 'identidad', 'digital', 'contenido']))
        .default([]),
      // The shape the piece takes in the archive's masonry, directed here
      // rather than taken from the file's own proportion.
      format: z
        .enum(['portrait', 'square', 'landscape', 'wide'])
        .default('landscape'),
      cover: image(),
      coverAlt: z.string(),
      gallery: z
        .array(
          z.object({
            image: image(),
            alt: z.string(),
            caption: z.string().optional(),
          }),
        )
        .default([]),
      featured: z.boolean().default(false),
      // Position in the home rail, the archive and previous/next navigation.
      order: z.number().int().optional(),
      draft: z.boolean().default(true),
      // The project's own case study (`/proyectos/<slug>/`). Optional: without
      // it the page is built from the fields above (`src/data/caseStudy.ts`).
      ...caseStudyFields,
    }),
});

export const collections = { projects };

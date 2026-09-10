import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
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
    }),
});

export const collections = { projects };

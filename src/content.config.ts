import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      timeframe: z.string(),
      order: z.number().default(99),
      tags: z.array(z.string()).default([]),
      hero: image().optional(),
      heroAlt: z.string().optional(),
    }),
});

const experiences = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/experiences' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      role: z.string().optional(),
      date: z.string(),
      location: z.string().optional(),
      order: z.number().default(99),
      summary: z.string().optional(),
      hero: image().optional(),
      heroAlt: z.string().optional(),
    }),
});

export const collections = { projects, experiences };

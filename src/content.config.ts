import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/posts' }),
  schema: z.object({
    title: z.string(),
    categories: z.string(),
    tags: z.array(z.string()).default([]),
    image: z.string().optional(),
    comments: z.boolean().default(false),
    draft: z.boolean().default(false),
    hide: z.boolean().default(false),
    series: z.string().optional(),
    cover: z.string().optional()
  })
});

export const collections = { posts };

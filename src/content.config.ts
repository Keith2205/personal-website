import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Every entry carries the same minimal frontmatter for now. Widen a single
// collection's schema when its needs diverge from the others.
const baseSchema = z.object({
	title: z.string(),
	date: z.coerce.date(),
});

const projects = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
	schema: baseSchema,
});

const poems = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/poems' }),
	schema: baseSchema,
});

const stories = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/stories' }),
	schema: baseSchema,
});

export const collections = { projects, poems, stories };

import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';

// Collections are declared but intentionally empty. Add a `schema` to any
// collection when its first entry lands.
const projects = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
});

const writing = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/writing' }),
});

const music = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/music' }),
});

export const collections = { projects, writing, music };

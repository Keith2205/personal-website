const WORDS_PER_MINUTE = 220;

/**
 * Minutes to read a Markdown body at 220 wpm, rounded to the nearest minute
 * and never less than 1. Counts only the prose: Markdown syntax, HTML tags
 * and link targets are stripped first, and a "word" must contain a letter or
 * digit, so stray punctuation and list markers don't count.
 */
export function readingMinutes(markdown: string): number {
	const prose = markdown
		.replace(/```[\s\S]*?```/g, ' ')
		.replace(/<[^>]+>/g, ' ')
		.replace(/!?\[([^\]]*)\]\([^)]*\)/g, '$1');
	const words = prose.split(/\s+/).filter((token) => /[\p{L}\p{N}]/u.test(token)).length;
	return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

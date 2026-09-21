import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { isExternalHref } from '../lib/external-links.mjs';

// Quoted runs are skipped so a `>` inside an attribute value doesn't end the
// match early. This only ever reads HTML the build just emitted, never input
// from elsewhere.
const OPENING_ANCHOR = /<a\b(?:"[^"]*"|'[^']*'|[^>])*>/gi;
const ANCHOR_PARTS = /^<a\b([\s\S]*?)(\/?)>$/i;
const HREF = /\bhref\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/i;
const REL = /\brel\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/i;
const TARGET = /\btarget\s*=/i;

/**
 * Adds target/rel to external links in built pages. The rehype plugin already
 * covers markdown; this catches links written straight into .astro templates,
 * which no markdown pipeline ever sees. Build only — `astro dev` serves
 * .astro-authored external links untouched.
 */
export default function externalLinks() {
	return {
		name: 'external-links',
		hooks: {
			'astro:build:done': async ({ dir, logger }) => {
				const entries = await readdir(dir, { recursive: true, withFileTypes: true });
				let rewritten = 0;

				for (const entry of entries) {
					if (!entry.isFile() || !entry.name.endsWith('.html')) continue;

					const file = join(entry.parentPath ?? entry.path, entry.name);
					const html = await readFile(file, 'utf8');
					const next = addTargetBlank(html);

					if (next !== html) {
						await writeFile(file, next);
						rewritten += 1;
					}
				}

				logger.info(`external links: rewrote ${rewritten} page(s)`);
			},
		},
	};
}

function addTargetBlank(html) {
	return html.replace(OPENING_ANCHOR, (tag) => {
		const parts = ANCHOR_PARTS.exec(tag);
		if (!parts) return tag;

		if (!isExternalHref(attrValue(HREF.exec(tag)))) return tag;
		// An explicit target means the author already decided.
		if (TARGET.test(tag)) return tag;

		const [, body, selfClose] = parts;
		const existingRel = REL.exec(tag);
		const rel = `rel="${mergeRel(attrValue(existingRel))}"`;
		const next = existingRel ? body.replace(REL, rel) : `${body} ${rel}`;

		return `<a${next} target="_blank"${selfClose}>`;
	});
}

function attrValue(match) {
	return match ? (match[1] ?? match[2] ?? match[3]) : undefined;
}

function mergeRel(existing) {
	const tokens = new Set((existing ?? '').split(/\s+/).filter(Boolean));
	tokens.add('noopener');
	tokens.add('noreferrer');
	return [...tokens].join(' ');
}

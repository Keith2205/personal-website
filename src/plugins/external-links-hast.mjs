import { isExternalHref } from '../lib/external-links.mjs';

/**
 * Opens external links in rendered markdown in a new tab. Registered on the
 * Sätteri processor in astro.config.mjs so content authors keep writing plain
 * `[text](url)` and get the attributes for free.
 *
 * A plain object rather than `defineHastPlugin(...)`: that helper is only an
 * identity function for typing, and importing it would pull in `satteri`,
 * which we don't depend on directly.
 */
export const externalLinksHastPlugin = {
	name: 'external-links',
	element: {
		filter: ['a'],
		visit(node, ctx) {
			if (!isExternalHref(node.properties?.href)) return;

			ctx.setProperty(node, 'target', '_blank');
			ctx.setProperty(node, 'rel', 'noopener noreferrer');
		},
	},
};

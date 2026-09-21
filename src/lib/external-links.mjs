// One source of truth for "does this link leave the site?", shared by the
// markdown hast plugin and the build-time pass over rendered pages.

export const SITE = 'https://keithrodrigues.com';

// The bare and www forms are the same site; any other host is somebody else's.
const INTERNAL_HOSTS = new Set(['keithrodrigues.com', 'www.keithrodrigues.com']);

export function isExternalHref(href) {
	if (typeof href !== 'string') return false;

	let url;
	try {
		// Resolving against SITE lands every relative href (/about, ./x, #anchor)
		// on an internal host, so only absolute and protocol-relative URLs can
		// come back pointing somewhere else.
		url = new URL(href.trim(), SITE);
	} catch {
		return false;
	}

	// mailto:, tel: and friends aren't pages — a new tab does nothing for them.
	if (url.protocol !== 'http:' && url.protocol !== 'https:') return false;

	return !INTERNAL_HOSTS.has(url.hostname);
}

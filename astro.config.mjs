// @ts-check
import { defineConfig } from 'astro/config';

import cloudflare from '@astrojs/cloudflare';
import { satteri } from '@astrojs/markdown-satteri';

import externalLinks from './src/integrations/external-links.mjs';
import { externalLinksHastPlugin } from './src/plugins/external-links-hast.mjs';
import { SITE } from './src/lib/external-links.mjs';

// Astro has no function form for its config, so the sub-command is read off
// argv: the first argument that isn't a flag.
const command = process.argv.slice(2).find((arg) => !arg.startsWith('-'));

// The adapter is only wanted where it produces or serves the real output.
// `dev` is left off deliberately — see the note on `adapter` below.
const usesAdapter = command === 'build' || command === 'preview';

// https://astro.build/config
export default defineConfig({
  // Also the origin every href is measured against to decide if it's external.
  site: SITE,

  // This site is fully static: no on-demand rendering, no images.
  // Both opt-outs below stop the adapter injecting bindings we don't use
  // (a SESSION KV namespace and an IMAGES binding) into the generated
  // wrangler config at build time.
  session: false,

  // Every page is prerendered, so in development the Workers runtime renders
  // nothing that Astro's own dev server doesn't. Loading it anyway costs the
  // one thing it can still get wrong: the adapter runs SSR modules inside
  // workerd, and when Vite's dep optimizer re-bundles mid-session the runner
  // worker is left holding a path that no longer exists —
  //   The file does not exist at .../node_modules/.vite/deps_ssr/<name>.js
  // with a different name each run, ending in a libuv assertion on Windows.
  // Builds and deploys are unaffected: `astro build` still runs through the
  // adapter, so the output and the generated wrangler config are the same.
  adapter: usesAdapter
    ? cloudflare({
        imageService: 'passthrough'
      })
    : undefined,

  markdown: {
    // Sätteri is already the default processor; naming it here is what lets us
    // hang the external-link plugin off it. Content authors write plain links
    // and the plugin adds target/rel, in dev and in the build alike.
    processor: satteri({
      hastPlugins: [externalLinksHastPlugin]
    })
  },

  // Catches external links written in .astro templates, which the markdown
  // pipeline above never sees.
  integrations: [externalLinks()]
});

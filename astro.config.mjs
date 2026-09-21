// @ts-check
import { defineConfig } from 'astro/config';

import cloudflare from '@astrojs/cloudflare';
import { satteri } from '@astrojs/markdown-satteri';

import externalLinks from './src/integrations/external-links.mjs';
import { externalLinksHastPlugin } from './src/plugins/external-links-hast.mjs';
import { SITE } from './src/lib/external-links.mjs';

// https://astro.build/config
export default defineConfig({
  // Also the origin every href is measured against to decide if it's external.
  site: SITE,

  // This site is fully static: no on-demand rendering, no images.
  // Both opt-outs below stop the adapter injecting bindings we don't use
  // (a SESSION KV namespace and an IMAGES binding) into the generated
  // wrangler config at build time.
  session: false,
  adapter: cloudflare({
    imageService: 'passthrough'
  }),

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

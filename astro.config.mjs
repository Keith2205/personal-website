// @ts-check
import { defineConfig } from 'astro/config';

import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  // This site is fully static: no on-demand rendering, no images.
  // Both opt-outs below stop the adapter injecting bindings we don't use
  // (a SESSION KV namespace and an IMAGES binding) into the generated
  // wrangler config at build time.
  session: false,
  adapter: cloudflare({
    imageService: 'passthrough'
  })
});

import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

import netlify from '@astrojs/netlify';

export default defineConfig({
  integrations: [tailwind()],

  vite: {
    ssr: {
      noExternal: ['sortablejs', 'nanostores', 'gcode-preview']
    }
  },

  output: 'server',
  adapter: netlify()
});
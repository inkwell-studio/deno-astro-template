import { defineConfig, passthroughImageService } from 'astro/config';
import deno from '@deno/astro-adapter';
import react from '@astrojs/react';
import sitemap, { SitemapOptions } from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';

import { baseUrl } from './config.ts';

const sitemapConfig: SitemapOptions = {
    filter: (page) => !page.includes('/partials/'),
};

export default defineConfig({
    site: baseUrl,
    adapter: deno(),
    integrations: [react(), tailwind(), sitemap(sitemapConfig)],
    srcDir: './source',
    prefetch: {
        prefetchAll: true,
    },
    image: {
        // This is used because `@deno/astro-adapter` does not support the `npm:sharp` image processor
        service: passthroughImageService(),
    },
});

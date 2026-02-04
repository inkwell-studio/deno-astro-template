import { defineConfig, passthroughImageService } from 'astro/config';
import deno from '@deno/astro-adapter';
import sitemap, { SitemapOptions } from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

import { baseUrl } from './config.ts';

const sitemapConfig: SitemapOptions = {
    filter: (page) => !page.includes('/partials/'),
};

export default defineConfig({
    site: baseUrl,
    srcDir: './source',
    trailingSlash: 'never',

    adapter: deno(),
    integrations: [sitemap(sitemapConfig)],

    prefetch: {
        prefetchAll: true,
    },

    image: {
        // This is used because `@deno/astro-adapter` does not support the `npm:sharp` image processor
        service: passthroughImageService(),
    },

    vite: {
        // The `tailwindcss` plugin appears to be incorrectly typed, so we assert that it's of the type `any` to avoid typechecking errors.
        // deno-lint-ignore no-explicit-any
        plugins: [tailwindcss() as any],
    },
});

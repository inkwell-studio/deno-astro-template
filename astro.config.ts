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
    integrations: [
        sitemap(sitemapConfig),
    ],

    prefetch: {
        prefetchAll: true,
    },

    image: {
        // This is used because `@deno/astro-adapter` does not support the `npm:sharp` image processor
        service: passthroughImageService(),
    },

    vite: {
        plugins: [tailwindcss()],
        server: {
            // This allows the localhost site to be accessed from other devices (see `DEVELOPMENT.md`)
            allowedHosts: ['.lhr.life'],
        },
    },

    experimental: {
        preserveScriptOrder: true,
    },

    devToolbar: {
        enabled: false,
    },
});

import { defineConfig, fontProviders } from 'astro/config';
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

    vite: {
        plugins: [tailwindcss()],
        server: {
            // This allows the localhost site to be accessed from other devices (see `DEVELOPMENT.md`)
            allowedHosts: ['.lhr.life'],
        },
    },

    devToolbar: {
        enabled: false,
    },

    fonts: [
        {
            name: 'JetBrains Mono',
            cssVariable: '--font-jetbrains-mono',
            provider: fontProviders.local(),
            // Setting `fallbacks` to an empty array disables Astro's fallbacks functionality and allows us to specify the fallbacks via Tailwind in `base.css`.
            // See: https://docs.astro.build/en/reference/configuration-reference/#fontfallbacks
            fallbacks: [],
            options: {
                variants: [
                    { src: ['./source/fonts/JetBrainsMono-Regular.woff2'] },
                ],
            },
        },
        {
            name: 'PT Sans',
            cssVariable: '--font-pt-sans',
            provider: fontProviders.local(),
            // Setting `fallbacks` to an empty array disables Astro's fallbacks functionality and allows us to specify the fallbacks via Tailwind in `base.css`.
            // See: https://docs.astro.build/en/reference/configuration-reference/#fontfallbacks
            fallbacks: [],
            options: {
                variants: [
                    { src: ['./source/fonts/PTSans-Regular.ttf'] },
                    { src: ['./source/fonts/PTSans-Bold.ttf'] },
                    { src: ['./source/fonts/PTSans-Italic.ttf'] },
                    { src: ['./source/fonts/PTSans-BoldItalic.ttf'] },
                ],
            },
        },
    ],
});

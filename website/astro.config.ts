import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
    site: 'https://www.TODO.dev',
    integrations: [react(), tailwind()],
    prefetch: {
        prefetchAll: true,
    },
});

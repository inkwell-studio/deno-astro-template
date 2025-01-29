import { type Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme.js';

export default {
    content: ['source/**/*.{astro,tsx}'],
    darkMode: 'selector',
    theme: {
        fontFamily: {
            // See `source/global-styles.css` for the `@font-face` definitions
            sans: ['PTSans', ...defaultTheme.fontFamily.sans],
            mono: ['JetBrains Mono', ...defaultTheme.fontFamily.mono],
        },
    },
} satisfies Config;

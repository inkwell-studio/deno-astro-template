// The logic and constant values of this script must be kept in sync with those of the inline script in the `<head>` element of `base-layout.astro`.

// This value must match the class used in the selector for `@custom-variant dark` in `base.css`
export const DARK_MODE_CLASS = 'dark';
export const DARK_MODE_MEDIA_QUERY = '(prefers-color-scheme: dark)';
export const LOCAL_STORAGE_KEY_THEME = 'theme';

export enum Theme {
    LIGHT = 'LIGHT',
    DARK = 'DARK',
    SYSTEM = 'SYSTEM',
}

export function onThemeSelection(themeValue: Theme): void {
    globalThis.localStorage.setItem(LOCAL_STORAGE_KEY_THEME, themeValue);

    const darkModeEnabled = isDarkModeEnabled(themeValue);
    updateDarkModeClass(darkModeEnabled);
}

export function updateDarkModeClass(darkModeEnabled: boolean): void {
    const e = document.documentElement;

    if (darkModeEnabled) {
        e.classList.add(DARK_MODE_CLASS);
    } else {
        e.classList.remove(DARK_MODE_CLASS);

        /* Remove the `class` attribute if it is empty to prevent the `class` attribute
           being present without a value, which is invalid HTML (i.e. `<html class>`) */
        if (e.classList.length === 0) {
            e.removeAttribute('class');
        }
    }
}

function isDarkModeEnabled(themeValue: Theme): boolean {
    if (Theme.SYSTEM === themeValue) {
        return globalThis.matchMedia(DARK_MODE_MEDIA_QUERY).matches;
    } else {
        return Theme.DARK === themeValue;
    }
}

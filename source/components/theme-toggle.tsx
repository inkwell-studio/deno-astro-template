// @ts-types="npm:@types/react@19.0.0"
import { ReactElement, useEffect, useState } from 'react';
import { useStore } from '@nanostores/react';

import { $theme } from '@logic/store.ts';
import { Theme } from '@logic/theme.ts';

export function ThemeToggle(): ReactElement {
    const theme = useStore($theme);

    const [isClient, setIsClient] = useState(false);
    useEffect(() => setIsClient(true));
    if (!isClient) {
        return <></>;
    }

    const options = [
        { value: Theme.SYSTEM, label: 'OS Default' },
        { value: Theme.LIGHT, label: 'Light' },
        { value: Theme.DARK, label: 'Dark' },
    ];

    return (
        <fieldset className='border border-stone-400/50 rounded pt-1 pb-2 px-3'>
            <legend className='px-2'>Theme</legend>

            <div className='flex flex-col'>
                {options.map((option) => (
                    <label
                        key={option.value}
                        className='cursor-pointer rounded p-2 hover:bg-white/30 transition-colors'
                        onClick={() => setTheme(option.value)}
                    >
                        <input
                            type='radio'
                            name='dark-mode-toggle'
                            defaultChecked={option.value === theme}
                        />
                        <span className='ml-2'>{option.label}</span>
                    </label>
                ))}
            </div>
        </fieldset>
    );
}

function setTheme(value: Theme): void {
    $theme.set(value);
}

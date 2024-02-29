'use client';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useTheme } from 'next-themes';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { useCallback } from 'react';
import { darkTheme, lightTheme } from '@/theme';
import createEmotionCache from '@/theme/createEmotionCache';

import React from 'react';
import { ColorModeContext } from '../SwitchTheme';

interface ProvidersProps {
    children?: React.ReactNode;
    emotionCache?: EmotionCache;
}

export function Providers({ children, emotionCache }: ProvidersProps) {
    const [mode, setMode] = React.useState<'light' | 'dark'>('light');

    const colorMode = React.useMemo(
        () => ({
            toggleColorMode: () => {
                setMode(prevMode => (prevMode === 'light' ? 'dark' : 'light'));
            },
        }),
        [],
    );
    const theme = useCallback(() => {
        if (mode === 'light') {
            return createTheme(lightTheme);
        } else {
            return createTheme(darkTheme);
        }
    }, [mode]);

    return (
        <CacheProvider value={emotionCache ?? createEmotionCache()}>
            <SessionProvider>
                <ColorModeContext.Provider value={colorMode}>
                    <ThemeProvider theme={theme}>{children}</ThemeProvider>
                </ColorModeContext.Provider>
            </SessionProvider>
        </CacheProvider>
    );
}

'use client';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useCallback } from 'react';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';

import React from 'react';
import { ColorModeContext } from '@/components/SwitchTheme';
import { lightTheme, darkTheme } from '../theme';

interface ProvidersProps {
    children?: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
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
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
            <SessionProvider>
                <ColorModeContext.Provider value={colorMode}>
                    <ThemeProvider theme={theme}>{children}</ThemeProvider>
                </ColorModeContext.Provider>
            </SessionProvider>
        </AppRouterCacheProvider>
    );
}

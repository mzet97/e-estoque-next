'use client';

import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import EmotionRegistry from '../theme/emotionRegistry';
import theme from '@/theme/theme';
import Layout from '@/components/Layout';
import { usePathname } from 'next/navigation';
import { ColorModeProvider } from '@/theme/ColorModeProvider';
import { SnackbarProvider } from '@/context/SnackbarContext';

export default function RootLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname() || '';
  const isAuthPage = pathname.startsWith('/auth/');

  return (
    <html lang="pt-br">
      <body>
        <SessionProvider
          refetchInterval={5 * 60}
          refetchOnWindowFocus={false}
        >
          <EmotionRegistry>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <SnackbarProvider>
                <ColorModeProvider>
                  {isAuthPage ? children : <Layout>{children}</Layout>}
                </ColorModeProvider>
              </SnackbarProvider>
            </ThemeProvider>
          </EmotionRegistry>
        </SessionProvider>
      </body>
    </html>
  );
}

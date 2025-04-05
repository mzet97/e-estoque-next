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

export default function RootLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname() || '';
  const isAuthPage = pathname.startsWith('/auth/');

  return (
    <html lang="pt-br">
      <body>
        <SessionProvider>
          <EmotionRegistry>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <ColorModeProvider>
                {isAuthPage ? children : <Layout>{children}</Layout>}
              </ColorModeProvider>
            </ThemeProvider>
          </EmotionRegistry>
        </SessionProvider>
      </body>
    </html>
  );
}

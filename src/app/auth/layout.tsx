'use client';

import { ReactNode } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import EmotionRegistry from '../../theme/emotionRegistry';
import theme from '@/theme/theme';

export default function SignInLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <EmotionRegistry>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </EmotionRegistry>
    </>
  );
}

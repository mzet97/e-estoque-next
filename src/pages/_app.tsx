import { ColorModeScript } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import { Providers } from './providers';
import Header from '@/components/Header';

import theme from './theme';
import { AuthProvider } from '@/contexts/AuthContext';

const MyApp = ({ Component, pageProps }: AppProps) => {
    return (
        <AuthProvider>
            <Providers>
                <ColorModeScript
                    initialColorMode={theme.config.initialColorMode}
                />
                <Header />
                <Component {...pageProps} />
            </Providers>
        </AuthProvider>
    );
};

export default MyApp;

import { ColorModeScript } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import { Providers } from './providers';
import Header from '@/components/Header';

import theme from './theme';

const MyApp = ({ Component, pageProps }: AppProps) => {
    return (
        <Providers>
            <ColorModeScript initialColorMode={theme.config.initialColorMode} />
            <Header />
            <Component {...pageProps} />
        </Providers>
    );
};

export default MyApp;

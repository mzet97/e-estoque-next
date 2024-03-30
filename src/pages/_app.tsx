import type { AppProps } from 'next/app';

import CssBaseline from '@mui/material/CssBaseline';
import { EmotionCache } from '@emotion/react';
import Header from '@/components/Header';
import createEmotionCache from '@/theme/createEmotionCache';
import { Providers } from '@/components/helpers/providers';
import Head from 'next/head';
import { FC } from 'react';

const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
    emotionCache?: EmotionCache;
}

const MyApp: FC<MyAppProps> = ({ Component, pageProps, emotionCache }) => {
    return (
        <Providers emotionCache={emotionCache ?? clientSideEmotionCache}>
            <Head>
                <meta
                    name="viewport"
                    content="initial-scale=1, width=device-width"
                />
            </Head>
            <Header />
            <CssBaseline />
            <Component {...pageProps} />
        </Providers>
    );
};

export default MyApp;

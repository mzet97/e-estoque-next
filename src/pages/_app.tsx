import type { AppProps } from 'next/app';

import CssBaseline from '@mui/material/CssBaseline';
import { EmotionCache } from '@emotion/react';
import Header from '@/components/Header';
import createEmotionCache from '@/theme/createEmotionCache';
import { Providers } from '@/components/helpers/providers';

const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
    emotionCache?: EmotionCache;
}

const MyApp = (props: MyAppProps) => {
    const {
        Component,
        emotionCache = clientSideEmotionCache,
        pageProps,
    } = props;
    return (
        <Providers emotionCache={emotionCache}>
            <Header />
            <CssBaseline />
            <Component {...pageProps} />
        </Providers>
    );
};

export default MyApp;

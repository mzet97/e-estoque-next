import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { Providers } from './providers';
import Header from '@/components/Header';

export default function RootLayout(props: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                <Providers>
                    <Header />
                    <CssBaseline />
                    {props.children}
                </Providers>
            </body>
        </html>
    );
}
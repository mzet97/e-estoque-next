import Header from '@/components/Header';
import { Providers } from './providers';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <Providers>
            <html lang="en">
                <body>
                    <Header />
                    <div className="flex justify-center items-center">
                        {children}
                    </div>
                </body>
            </html>
        </Providers>
    );
}

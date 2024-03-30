'use client';
import Link from 'next/link';
export default function NotFound() {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                alignContent: 'center',
                height: '100vh',
            }}
        >
            <h1>404 - Page Not Found</h1>
            <Link href="/">Go back to home</Link>
        </div>
    );
}

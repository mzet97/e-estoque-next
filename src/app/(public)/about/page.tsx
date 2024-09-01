import Link from 'next/link';

export default function Home() {
    return (
        <>
            <div>Sobre!</div>
            <Link href="/home" color="blue.400">
                Home
            </Link>
            <Link href="/" color="blue.400">
                Index
            </Link>
        </>
    );
}

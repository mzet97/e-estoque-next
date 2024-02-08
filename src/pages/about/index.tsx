import { Link } from '@chakra-ui/next-js';

export default function Home() {
    return (
        <>
            <div>Sobre!</div>
            <Link href="/home" color="blue.400" _hover={{ color: 'blue.500' }}>
                Home
            </Link>
            <Link href="/" color="blue.400" _hover={{ color: 'blue.500' }}>
                Index
            </Link>
        </>
    );
}

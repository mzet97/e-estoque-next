import {
    AspectRatio,
    Box,
    Center,
    Heading,
    StackDivider,
    Text,
    VStack,
} from '@chakra-ui/react';
import { Link } from '@chakra-ui/next-js';
import styles from './styles.module.css';

const Home = () => {
    return (
        <div className={styles['box-center']}>
            <VStack spacing={10} align="stretch" mt={10}>
                <VStack align="center">
                    <Box>
                        <Heading>Internal management system</Heading>
                    </Box>
                </VStack>
                <VStack align="center">
                    <Box>
                        <Heading>Do you have a account?</Heading>
                    </Box>
                    <Box>
                        <Link href="/login">
                            <Text fontSize="4xl">Login</Text>
                        </Link>
                    </Box>
                </VStack>
                <VStack align="center">
                    <Box>
                        <Heading>Or create a new account!</Heading>
                    </Box>
                    <Box>
                        <Link href="/signUp">
                            <Text fontSize="4xl">SingUp</Text>
                        </Link>
                    </Box>
                </VStack>
            </VStack>
        </div>
    );
};

export default Home;

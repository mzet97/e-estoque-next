'use client';

import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    useToast,
    FormErrorMessage,
} from '@chakra-ui/react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/contexts/AuthContext';
import { useContext } from 'react';
import UserLogin from '@/models/auth/UserLogin';

const schema = yup.object().shape({
    username: yup.string().required(),
    password: yup.string().min(8).required(),
});

const Login: React.FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<UserLogin>({
        mode: 'onBlur',
        resolver: yupResolver(schema),
    });

    const toast = useToast();
    const router = useRouter();
    const { signIn } = useContext(AuthContext);

    const onSubmit = async (values: UserLogin) => {
        try {
            console.log('input', values);
            await signIn({
                username: values.username,
                password: values.password,
            });

            toast({
                title: 'Success login.',
                description: 'Can use the system',
                status: 'success',
                duration: 9000,
                isClosable: true,
            });

            router.push('/dashboard');
        } catch (err) {
            toast({
                title: 'Failure login.',
                description: 'Check password and e-mail',
                status: 'error',
                duration: 9000,
                isClosable: true,
            });
        }
    };

    return (
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}
        >
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'}>Sign in to your account</Heading>
                </Stack>
                <Box
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={8}
                >
                    <form
                        style={{ width: 350 }}
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <Stack spacing={4}>
                            <FormControl
                                isInvalid={!!errors?.username?.message}
                                errortext={errors?.username?.message}
                                id="username"
                                isRequired
                            >
                                <FormLabel>Username or Email</FormLabel>
                                <Input
                                    type="text"
                                    placeholder="Username"
                                    {...register('username', {
                                        required: 'Required',
                                    })}
                                />
                                <FormErrorMessage>
                                    {errors?.username?.message}
                                </FormErrorMessage>
                            </FormControl>
                            <FormControl
                                isInvalid={!!errors?.password?.message}
                                errortext={errors?.password?.message}
                                id="password"
                            >
                                <FormLabel>Password</FormLabel>
                                <Input
                                    type="password"
                                    placeholder="Password"
                                    {...register('password', {
                                        required: 'Required',
                                    })}
                                />
                                <FormErrorMessage>
                                    {errors?.password?.message}
                                </FormErrorMessage>
                            </FormControl>
                            <Stack spacing={10}>
                                <Stack
                                    direction={{ base: 'column', sm: 'row' }}
                                    align={'start'}
                                    justify={'space-between'}
                                >
                                    <Checkbox>Remember me</Checkbox>
                                    <Text color={'blue.400'}>
                                        Forgot password?
                                    </Text>
                                </Stack>
                                <Button
                                    bg={'blue.400'}
                                    color={'white'}
                                    _hover={{
                                        bg: 'blue.500',
                                    }}
                                    onClick={handleSubmit(onSubmit)}
                                    disabled={
                                        !!errors.username || !!errors.password
                                    }
                                >
                                    Sign in
                                </Button>
                            </Stack>
                        </Stack>
                    </form>
                </Box>
            </Stack>
        </Flex>
    );
};

export default Login;

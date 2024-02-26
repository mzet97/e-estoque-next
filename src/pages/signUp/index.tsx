'use client';

import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { yupResolver } from '@hookform/resolvers/yup';

import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    HStack,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Link,
    useToast,
    FormErrorMessage,
} from '@chakra-ui/react';
import { useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import UserRegister from '@/models/auth/UserRegister';
import { signUp } from '@/services/auth';

const schema = yup.object().shape({
    username: yup.string().required('Username is required'),
    password: yup.string().required('Password is required'),
    confirmPassword: yup
        .string()
        .required('Password confirmation is required')
        .oneOf([yup.ref('password')], 'Passwords must match'),
    email: yup.string().email().required('E-mail is required'),
    firstName: yup.string().max(80).required('First name is required'),
    lastName: yup.string().max(80).required('Last name is required'),
});

export default function SignUp() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<UserRegister>({
        mode: 'onBlur',
        resolver: yupResolver(schema),
    });

    const toast = useToast();
    const router = useRouter();

    const onSubmit = async (values: UserRegister) => {
        try {
            console.log('input', values);
            await signUp(values);

            toast({
                title: 'Success singUp.',
                description: 'Can use the system',
                status: 'success',
                duration: 9000,
                isClosable: true,
            });

            router.push('/dashboard');
        } catch (err) {
            toast({
                title: 'Failure singUp.',
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
            <form onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={8} mx={'auto'} maxW={'2xl'} py={1} px={1}>
                    <Stack align={'center'}>
                        <Heading fontSize={'4xl'} textAlign={'center'}>
                            Sign up
                        </Heading>
                    </Stack>
                    <Box
                        rounded={'xl'}
                        bg={useColorModeValue('white', 'gray.700')}
                        boxShadow={'xl'}
                        p={8}
                    >
                        <Stack>
                            <HStack spacing={4}>
                                <Box>
                                    <Text fontSize="2xl">Personal data</Text>
                                </Box>
                            </HStack>
                            <HStack spacing={4}>
                                <Box>
                                    <FormControl
                                        isInvalid={!!errors?.firstName?.message}
                                        id="name"
                                        isRequired
                                    >
                                        <FormLabel>First Name</FormLabel>
                                        <Input
                                            type="text"
                                            placeholder="FirstName"
                                            {...register('firstName', {
                                                required: 'Required',
                                            })}
                                        />
                                        <FormErrorMessage>
                                            {errors?.firstName?.message}
                                        </FormErrorMessage>
                                    </FormControl>
                                </Box>
                                <Box>
                                    <FormControl
                                        isInvalid={!!errors?.lastName?.message}
                                        id="lastName"
                                        isRequired
                                    >
                                        <FormLabel>Last Name</FormLabel>
                                        <Input
                                            type="text"
                                            placeholder="Last name"
                                            {...register('lastName', {
                                                required: 'Required',
                                            })}
                                        />
                                        <FormErrorMessage>
                                            {errors?.lastName?.message}
                                        </FormErrorMessage>
                                    </FormControl>
                                </Box>
                                <Box>
                                    <FormControl
                                        isInvalid={!!errors?.username?.message}
                                        id="username"
                                        isRequired
                                    >
                                        <FormLabel>Username</FormLabel>
                                        <Input
                                            type="text"
                                            {...register('username', {
                                                required: 'Required',
                                            })}
                                        />
                                        <FormErrorMessage>
                                            {errors?.username?.message}
                                        </FormErrorMessage>
                                    </FormControl>
                                </Box>
                            </HStack>
                            <Stack spacing={4}>
                                <FormControl
                                    isInvalid={!!errors?.email?.message}
                                    id="email"
                                    isRequired
                                >
                                    <FormLabel>Email address</FormLabel>
                                    <Input
                                        type="email"
                                        {...register('email', {
                                            required: 'Required',
                                        })}
                                    />
                                    <FormErrorMessage>
                                        {errors?.email?.message}
                                    </FormErrorMessage>
                                </FormControl>
                                <FormControl
                                    isInvalid={!!errors?.password?.message}
                                    id="password"
                                    isRequired
                                >
                                    <FormLabel>Password</FormLabel>
                                    <InputGroup>
                                        <Input
                                            type={
                                                showPassword
                                                    ? 'text'
                                                    : 'password'
                                            }
                                            {...register('password', {
                                                required: 'Required',
                                            })}
                                        />
                                        <InputRightElement h={'full'}>
                                            <Button
                                                variant={'ghost'}
                                                onClick={() =>
                                                    setShowPassword(
                                                        showPassword =>
                                                            !showPassword,
                                                    )
                                                }
                                            >
                                                {showPassword ? (
                                                    <ViewIcon />
                                                ) : (
                                                    <ViewOffIcon />
                                                )}
                                            </Button>
                                        </InputRightElement>
                                    </InputGroup>
                                    <FormErrorMessage>
                                        {errors?.password?.message}
                                    </FormErrorMessage>
                                </FormControl>
                                <FormControl
                                    isInvalid={
                                        !!errors?.confirmPassword?.message
                                    }
                                    id="confirmPassword"
                                    isRequired
                                >
                                    <FormLabel>Confirm Password</FormLabel>
                                    <InputGroup>
                                        <Input
                                            type={
                                                showConfirmPassword
                                                    ? 'text'
                                                    : 'password'
                                            }
                                            {...register('confirmPassword', {
                                                required: 'Required',
                                            })}
                                        />
                                        <InputRightElement h={'full'}>
                                            <Button
                                                variant={'ghost'}
                                                onClick={() =>
                                                    setShowConfirmPassword(
                                                        showConfirmPassword =>
                                                            !showConfirmPassword,
                                                    )
                                                }
                                            >
                                                {showConfirmPassword ? (
                                                    <ViewIcon />
                                                ) : (
                                                    <ViewOffIcon />
                                                )}
                                            </Button>
                                        </InputRightElement>
                                    </InputGroup>
                                    <FormErrorMessage>
                                        {errors?.confirmPassword?.message}
                                    </FormErrorMessage>
                                </FormControl>
                            </Stack>
                            <Stack spacing={4}>
                                <Stack spacing={10} pt={2}>
                                    <Button
                                        loadingText="Submitting"
                                        size="lg"
                                        bg={'blue.400'}
                                        color={'white'}
                                        _hover={{
                                            bg: 'blue.500',
                                        }}
                                        onClick={handleSubmit(onSubmit)}
                                    >
                                        Sign up
                                    </Button>
                                </Stack>
                                <Stack pt={6}>
                                    <Text align={'center'}>
                                        Already a user?
                                        <Link href="/login" color={'blue.400'}>
                                            Login
                                        </Link>
                                    </Text>
                                </Stack>
                            </Stack>
                        </Stack>
                    </Box>
                </Stack>
            </form>
        </Flex>
    );
}

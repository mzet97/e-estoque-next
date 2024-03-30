'use client';
import React from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { yupResolver } from '@hookform/resolvers/yup';

import UserRegister from '@/models/auth/UserRegister';
import { signUp } from '@/services/authServices';
import {
    Alert,
    Box,
    Button,
    Snackbar,
    Stack,
    TextField,
    Typography,
} from '@mui/material';

import styles from './styles.module.css';
import SnackbarAlert from '@/components/SnackbarAlert/SnackbarAlert';

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

const SignUp: React.FC = () => {
    const [isError, setIsError] = React.useState(false);
    const [isOpen, setIsOpen] = React.useState(false);
    const [message, setMessage] = React.useState('Teste');

    const handleClose = (
        event?: React.SyntheticEvent | Event,
        reason?: string,
    ) => {
        if (reason === 'clickaway') {
            return;
        }

        setIsOpen(false);
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<UserRegister>({
        mode: 'onBlur',
        resolver: yupResolver(schema),
    });

    const router = useRouter();

    const onSubmit = async (values: UserRegister) => {
        try {
            console.log('input', values);
            await signUp(values);

            setMessage('Success singUp.');
            setIsError(false);
            setIsOpen(true);

            router.push('/');
        } catch (err) {
            setMessage('Failure singUp.');
            setIsError(true);
            setIsOpen(true);
        }
    };

    return (
        <>
            <Box className={styles.boxCenter}>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    noValidate
                    autoComplete="off"
                >
                    <Box className={styles.boxItem}>
                        <Typography
                            variant="h2"
                            component="h2"
                            sx={{ color: '#000' }}
                        >
                            SignUp
                        </Typography>
                        <Typography variant="subtitle1" sx={{ color: '#000' }}>
                            Enter with your data
                        </Typography>
                    </Box>
                    <Stack
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        spacing={2}
                    >
                        <Stack
                            direction="column"
                            justifyContent="center"
                            alignItems="center"
                            spacing={2}
                        >
                            <Stack className={styles.Login}>
                                <Box className={styles.boxItem}>
                                    <TextField
                                        required
                                        id="username"
                                        label="Username"
                                        variant="outlined"
                                        type="text"
                                        sx={{
                                            input: { color: '#000' },
                                            label: { color: '#000' },
                                            width: '100%',
                                        }}
                                        {...register('username')}
                                        error={!!errors.username}
                                        helperText={errors.username?.message}
                                    />
                                </Box>
                                <Box className={styles.boxItem}>
                                    <TextField
                                        required
                                        id="password"
                                        label="Password"
                                        type="password"
                                        sx={{
                                            input: { color: '#000' },
                                            label: { color: '#000' },
                                            width: '100%',
                                        }}
                                        {...register('password')}
                                        error={!!errors.password}
                                        helperText={errors.password?.message}
                                    />
                                </Box>
                                <Box className={styles.boxItem}>
                                    <TextField
                                        required
                                        id="confirmPassword"
                                        label="Confirm password"
                                        type="password"
                                        sx={{
                                            input: { color: '#000' },
                                            label: { color: '#000' },
                                            width: '100%',
                                        }}
                                        {...register('confirmPassword')}
                                        error={!!errors.confirmPassword}
                                        helperText={
                                            errors.confirmPassword?.message
                                        }
                                    />
                                </Box>
                            </Stack>
                        </Stack>
                        <Stack
                            direction="column"
                            justifyContent="center"
                            alignItems="center"
                            spacing={2}
                        >
                            <Stack className={styles.Login}>
                                <Box className={styles.boxItem}>
                                    <TextField
                                        required
                                        id="email"
                                        label="email"
                                        variant="outlined"
                                        type="email"
                                        sx={{
                                            input: { color: '#000' },
                                            label: { color: '#000' },
                                            width: '100%',
                                        }}
                                        {...register('email')}
                                        error={!!errors.email}
                                        helperText={errors.email?.message}
                                    />
                                </Box>
                                <Box className={styles.boxItem}>
                                    <TextField
                                        required
                                        id="firstName"
                                        label="First Name"
                                        type="text"
                                        sx={{
                                            input: { color: '#000' },
                                            label: { color: '#000' },
                                            width: '100%',
                                        }}
                                        {...register('firstName')}
                                        error={!!errors.firstName}
                                        helperText={errors.firstName?.message}
                                    />
                                </Box>
                                <Box className={styles.boxItem}>
                                    <TextField
                                        required
                                        id="lastName"
                                        label="Last Name"
                                        type="lastName"
                                        sx={{
                                            input: { color: '#000' },
                                            label: { color: '#000' },
                                            width: '100%',
                                        }}
                                        {...register('lastName')}
                                        error={!!errors.lastName}
                                        helperText={errors.lastName?.message}
                                    />
                                </Box>
                            </Stack>
                        </Stack>
                    </Stack>
                    <Box className={styles.boxItem}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="secondary"
                            sx={{ width: '100%' }}
                        >
                            SignUp
                        </Button>
                    </Box>
                </form>
            </Box>
            <SnackbarAlert
                open={isOpen}
                handleClose={handleClose}
                isError={isError}
                message={message}
            />
        </>
    );
};
export default SignUp;

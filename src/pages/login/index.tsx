'use client';
import React from 'react';
import {
    Container,
    Alert,
    Snackbar,
    Button,
    Box,
    Stack,
    TextField,
    Typography,
} from '@mui/material';

import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import UserLogin from '@/models/auth/UserLogin';
import { signIn } from 'next-auth/react';

import styles from './styles.module.css';
import SnackbarAlert from '@/components/SnackbarAlert/SnackbarAlert';

const schema = yup.object().shape({
    email: yup.string().required(),
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

    const [isError, setIsError] = React.useState(false);
    const [isOpen, setIsOpen] = React.useState(false);
    const [message, setMessage] = React.useState('Teste');
    const router = useRouter();

    const handleClose = (
        event?: React.SyntheticEvent | Event,
        reason?: string,
    ) => {
        if (reason === 'clickaway') {
            return;
        }

        setIsOpen(false);
    };

    const onSubmit = async (values: UserLogin) => {
        try {
            const response = await signIn('credentials', {
                redirect: false,
                email: values.email,
                password: values.password,
            });

            if (!response?.error) {
                setMessage('Success login.');
                setIsError(false);
                setIsOpen(true);
                router.push('/dashboard');
            } else {
                setMessage('Failure login.');
                setIsError(true);
                setIsOpen(true);
            }
        } catch (err) {
            setMessage('Failure login.');
            setIsError(true);
            setIsOpen(true);
        }
    };

    return (
        <>
            <Box className={styles.boxCenter}>
                <Stack
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    spacing={2}
                >
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        noValidate
                        autoComplete="off"
                    >
                        <Stack className={styles.Login}>
                            <Box className={styles.boxItem}>
                                <Typography
                                    variant="h2"
                                    component="h2"
                                    sx={{ color: '#000' }}
                                >
                                    Login
                                </Typography>
                                <Typography
                                    variant="subtitle1"
                                    sx={{ color: '#000' }}
                                >
                                    Enter your email and password
                                </Typography>
                            </Box>
                            <Box className={styles.boxItem}>
                                <TextField
                                    required
                                    id="email"
                                    label="Email"
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
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="secondary"
                                    sx={{ width: '100%' }}
                                >
                                    Login
                                </Button>
                            </Box>
                        </Stack>
                    </form>
                </Stack>
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

export default Login;

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
    const [showPassword, setShowPassword] = React.useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

    const [isError, setIsError] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [message, setMessage] = React.useState('Teste');

    const handleClose = (
        event?: React.SyntheticEvent | Event,
        reason?: string,
    ) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
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
            setOpen(true);

            router.push('/');
        } catch (err) {
            setMessage('Failure singUp.');
            setIsError(true);
            setOpen(true);
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
                        >
                            SignUp
                        </Button>
                    </Box>
                </form>
            </Box>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert
                    onClose={handleClose}
                    severity={isError ? 'error' : 'success'}
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {message}
                </Alert>
            </Snackbar>
        </>
    );
};
export default SignUp;

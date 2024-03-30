import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';

import { api } from '@/services/apiClient';
import CreateCustomer from '@/models/Customer/CreateCustomer';
import { useState } from 'react';
import SnackbarAlert from '@/components/SnackbarAlert/SnackbarAlert';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import styles from './../styles.module.css';

const schema = yup.object().shape({
    name: yup.string().required().min(3).max(80),
    docId: yup.string().required().min(3).max(80),
    email: yup.string().required().min(3).max(250).email(),
    description: yup.string().required().min(3).max(250),
    phoneNumber: yup.string().required().min(3).max(80),
    Address: yup.object({
        street: yup.string().required().min(3).max(80),
        number: yup.string().required().min(3).max(80),
        complement: yup.string().required().min(3).max(80),
        neighborhood: yup.string().required().min(3).max(80),
        district: yup.string().required().min(3).max(80),
        city: yup.string().required().min(3).max(80),
        county: yup.string().required().min(3).max(80),
        zipCode: yup.string().required().min(3).max(80),
        latitude: yup.string().required().min(3).max(80),
        longitude: yup.string().required().min(3).max(80),
    }),
});

export default function CreateCustomerPage() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CreateCustomer>({
        mode: 'onBlur',
        resolver: yupResolver(schema),
    });

    const router = useRouter();
    const [isError, setIsError] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('Teste');

    const handleClose = (
        event?: React.SyntheticEvent | Event,
        reason?: string,
    ) => {
        if (reason === 'clickaway') {
            return;
        }

        setIsOpen(false);
    };

    const onSubmit = async (values: CreateCustomer) => {
        try {
            console.log('input', values);
            await api.post('Customer', values);

            router.push('/customer');
        } catch (err) {}
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
                        <Box className={styles.boxItem}>
                            <Typography
                                variant="h4"
                                component="h4"
                                sx={{ color: '#000' }}
                            >
                                Create a new Customer
                            </Typography>
                            <Typography
                                variant="subtitle1"
                                sx={{ color: '#000' }}
                            >
                                Enter with data
                            </Typography>
                        </Box>
                        <Stack direction="row">
                            <Stack className={styles.Login}>
                                <Box className={styles.boxItem}>
                                    <TextField
                                        focused
                                        required
                                        id="name"
                                        label="Name"
                                        variant="outlined"
                                        type="text"
                                        sx={{
                                            input: { color: '#000' },
                                            label: { color: '#000' },
                                            width: '100%',
                                        }}
                                        {...register('name')}
                                        error={!!errors.name}
                                        helperText={errors.name?.message}
                                    />
                                </Box>
                                <Box className={styles.boxItem}>
                                    <TextField
                                        focused
                                        required
                                        id="docId"
                                        label="DocId"
                                        variant="outlined"
                                        type="text"
                                        sx={{
                                            input: { color: '#000' },
                                            label: { color: '#000' },
                                            width: '100%',
                                        }}
                                        {...register('docId')}
                                        error={!!errors.docId}
                                        helperText={errors.docId?.message}
                                    />
                                </Box>
                                <Box className={styles.boxItem}>
                                    <TextField
                                        focused
                                        required
                                        id="phoneNumber"
                                        label="PhoneNumber"
                                        variant="outlined"
                                        type="text"
                                        sx={{
                                            input: { color: '#000' },
                                            label: { color: '#000' },
                                            width: '100%',
                                        }}
                                        {...register('phoneNumber')}
                                        error={!!errors.phoneNumber}
                                        helperText={errors.phoneNumber?.message}
                                    />
                                </Box>
                                <Box className={styles.boxItem}>
                                    <TextField
                                        focused
                                        required
                                        id="description"
                                        label="Description"
                                        variant="outlined"
                                        type="text"
                                        multiline
                                        maxRows={4}
                                        sx={{
                                            input: { color: '#000' },
                                            label: { color: '#000' },
                                            width: '100%',
                                        }}
                                        {...register('description')}
                                        error={!!errors.description}
                                        helperText={errors.description?.message}
                                    />
                                </Box>
                                <Box className={styles.boxItem}>
                                    <TextField
                                        focused
                                        required
                                        id="street"
                                        label="Street"
                                        variant="outlined"
                                        type="text"
                                        sx={{
                                            input: { color: '#000' },
                                            label: { color: '#000' },
                                            width: '100%',
                                        }}
                                        {...register('Address.street')}
                                        error={!!errors.Address?.street}
                                        helperText={
                                            errors.Address?.street?.message
                                        }
                                    />
                                </Box>
                            </Stack>
                            <Stack className={styles.Login}>
                                <Box className={styles.boxItem}>
                                    <TextField
                                        focused
                                        required
                                        id="number"
                                        label="Number"
                                        variant="outlined"
                                        type="text"
                                        sx={{
                                            input: { color: '#000' },
                                            label: { color: '#000' },
                                            width: '100%',
                                        }}
                                        {...register('Address.number')}
                                        error={!!errors.Address?.number}
                                        helperText={
                                            errors.Address?.number?.message
                                        }
                                    />
                                </Box>
                                <Box className={styles.boxItem}>
                                    <TextField
                                        focused
                                        required
                                        id="complement"
                                        label="Complement"
                                        variant="outlined"
                                        type="text"
                                        sx={{
                                            input: { color: '#000' },
                                            label: { color: '#000' },
                                            width: '100%',
                                        }}
                                        {...register('Address.complement')}
                                        error={!!errors.Address?.complement}
                                        helperText={
                                            errors.Address?.complement?.message
                                        }
                                    />
                                </Box>
                                <Box className={styles.boxItem}>
                                    <TextField
                                        focused
                                        required
                                        id="neighborhood"
                                        label="Neighborhood"
                                        variant="outlined"
                                        type="text"
                                        sx={{
                                            input: { color: '#000' },
                                            label: { color: '#000' },
                                            width: '100%',
                                        }}
                                        {...register('Address.neighborhood')}
                                        error={!!errors.Address?.neighborhood}
                                        helperText={
                                            errors.Address?.neighborhood
                                                ?.message
                                        }
                                    />
                                </Box>
                                <Box className={styles.boxItem}>
                                    <TextField
                                        focused
                                        required
                                        id="district"
                                        label="District"
                                        variant="outlined"
                                        type="text"
                                        sx={{
                                            input: { color: '#000' },
                                            label: { color: '#000' },
                                            width: '100%',
                                        }}
                                        {...register('Address.district')}
                                        error={!!errors.Address?.district}
                                        helperText={
                                            errors.Address?.district?.message
                                        }
                                    />
                                </Box>
                                <Box className={styles.boxItem}>
                                    <TextField
                                        focused
                                        required
                                        id="city"
                                        label="City"
                                        variant="outlined"
                                        type="text"
                                        sx={{
                                            input: { color: '#000' },
                                            label: { color: '#000' },
                                            width: '100%',
                                        }}
                                        {...register('Address.city')}
                                        error={!!errors.Address?.city}
                                        helperText={
                                            errors.Address?.city?.message
                                        }
                                    />
                                </Box>
                            </Stack>
                            <Stack className={styles.Login}>
                                <Box className={styles.boxItem}>
                                    <TextField
                                        focused
                                        required
                                        id="county"
                                        label="County"
                                        variant="outlined"
                                        type="text"
                                        sx={{
                                            input: { color: '#000' },
                                            label: { color: '#000' },
                                            width: '100%',
                                        }}
                                        {...register('Address.county')}
                                        error={!!errors.Address?.county}
                                        helperText={
                                            errors.Address?.county?.message
                                        }
                                    />
                                </Box>
                                <Box className={styles.boxItem}>
                                    <TextField
                                        focused
                                        required
                                        id="zipCode"
                                        label="ZipCode"
                                        variant="outlined"
                                        type="text"
                                        sx={{
                                            input: { color: '#000' },
                                            label: { color: '#000' },
                                            width: '100%',
                                        }}
                                        {...register('Address.zipCode')}
                                        error={!!errors.Address?.zipCode}
                                        helperText={
                                            errors.Address?.zipCode?.message
                                        }
                                    />
                                </Box>
                                <Box className={styles.boxItem}>
                                    <TextField
                                        focused
                                        required
                                        id="latitude"
                                        label="Latitude"
                                        variant="outlined"
                                        type="text"
                                        sx={{
                                            input: { color: '#000' },
                                            label: { color: '#000' },
                                            width: '100%',
                                        }}
                                        {...register('Address.latitude')}
                                        error={!!errors.Address?.latitude}
                                        helperText={
                                            errors.Address?.latitude?.message
                                        }
                                    />
                                </Box>
                                <Box className={styles.boxItem}>
                                    <TextField
                                        focused
                                        required
                                        id="longitude"
                                        label="Longitude"
                                        variant="outlined"
                                        type="text"
                                        sx={{
                                            input: { color: '#000' },
                                            label: { color: '#000' },
                                            width: '100%',
                                        }}
                                        {...register('Address.longitude')}
                                        error={!!errors.Address?.longitude}
                                        helperText={
                                            errors.Address?.longitude?.message
                                        }
                                    />
                                </Box>
                            </Stack>
                        </Stack>
                        <Box className={styles.boxItem}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="secondary"
                                sx={{ width: '100%' }}
                            >
                                Create
                            </Button>
                        </Box>
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
}

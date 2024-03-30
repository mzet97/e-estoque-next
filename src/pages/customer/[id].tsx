import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';

import { api } from '@/services/apiClient';
import EditCustomer from '@/models/Customer/EditCustomer';
import { useCallback, useEffect, useState } from 'react';
import { useRouter as useQueryRouter } from 'next/router';
import { findEditCustomerById } from '@/services/customersServices';
import SnackbarAlert from '@/components/SnackbarAlert/SnackbarAlert';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import styles from './styles.module.css';

const schema = yup.object().shape({
    name: yup.string().required().min(3).max(80),
    docId: yup.string().required().min(3).max(80),
    email: yup.string().required().min(3).max(250).email(),
    description: yup.string().required().min(3).max(250),
    phoneNumber: yup.string().required().min(3).max(80),
    idCustomerAddress: yup.string().required().min(3).max(80),
    id: yup.string().required().min(3).max(80),
    customerAddress: yup.object({
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

export default function EditCustomerPage() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<EditCustomer>({
        mode: 'onBlur',
        resolver: yupResolver(schema),
    });

    const router = useRouter();
    const queryRouter = useQueryRouter();
    const [customer, setCustomer] = useState<EditCustomer>();
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

    const onSubmit = async (values: EditCustomer) => {
        try {
            console.log('input', values);
            await api.post('Customer', values);

            setMessage('Success edit customer.');
            setIsError(false);
            setIsOpen(true);

            router.push('/customer');
        } catch (err) {
            setMessage('Failure to edit customer.');
            setIsError(true);
            setIsOpen(true);
        }
    };

    const getData = useCallback(async () => {
        const { id } = queryRouter.query;
        const result = await findEditCustomerById(id + '');

        if (result) {
            setCustomer(result);
        }
    }, [queryRouter.query]);

    useEffect(() => {
        getData();
    }, [getData]);

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
                                Edit a new customer
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
                                        value={customer?.name}
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
                                        value={customer?.docId}
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
                                        value={customer?.phoneNumber}
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
                                        value={customer?.description}
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
                                        {...register('customerAddress.street')}
                                        error={!!errors.customerAddress?.street}
                                        helperText={
                                            errors.customerAddress?.street
                                                ?.message
                                        }
                                        value={
                                            customer?.customerAddress?.street
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
                                        {...register('customerAddress.number')}
                                        error={!!errors.customerAddress?.number}
                                        helperText={
                                            errors.customerAddress?.number
                                                ?.message
                                        }
                                        value={
                                            customer?.customerAddress?.number
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
                                        {...register(
                                            'customerAddress.complement',
                                        )}
                                        error={
                                            !!errors.customerAddress?.complement
                                        }
                                        helperText={
                                            errors.customerAddress?.complement
                                                ?.message
                                        }
                                        value={
                                            customer?.customerAddress
                                                ?.complement
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
                                        {...register(
                                            'customerAddress.neighborhood',
                                        )}
                                        error={
                                            !!errors.customerAddress
                                                ?.neighborhood
                                        }
                                        helperText={
                                            errors.customerAddress?.neighborhood
                                                ?.message
                                        }
                                        value={
                                            customer?.customerAddress
                                                ?.neighborhood
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
                                        {...register(
                                            'customerAddress.district',
                                        )}
                                        error={
                                            !!errors.customerAddress?.district
                                        }
                                        helperText={
                                            errors.customerAddress?.district
                                                ?.message
                                        }
                                        value={
                                            customer?.customerAddress?.district
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
                                        {...register('customerAddress.city')}
                                        error={!!errors.customerAddress?.city}
                                        helperText={
                                            errors.customerAddress?.city
                                                ?.message
                                        }
                                        value={customer?.customerAddress?.city}
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
                                        {...register('customerAddress.county')}
                                        error={!!errors.customerAddress?.county}
                                        helperText={
                                            errors.customerAddress?.county
                                                ?.message
                                        }
                                        value={
                                            customer?.customerAddress?.county
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
                                        {...register('customerAddress.zipCode')}
                                        error={
                                            !!errors.customerAddress?.zipCode
                                        }
                                        helperText={
                                            errors.customerAddress?.zipCode
                                                ?.message
                                        }
                                        value={
                                            customer?.customerAddress?.zipCode
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
                                        {...register(
                                            'customerAddress.latitude',
                                        )}
                                        error={
                                            !!errors.customerAddress?.latitude
                                        }
                                        helperText={
                                            errors.customerAddress?.latitude
                                                ?.message
                                        }
                                        value={
                                            customer?.customerAddress?.latitude
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
                                        {...register(
                                            'customerAddress.longitude',
                                        )}
                                        error={
                                            !!errors.customerAddress?.longitude
                                        }
                                        helperText={
                                            errors.customerAddress?.longitude
                                                ?.message
                                        }
                                        value={
                                            customer?.customerAddress?.longitude
                                        }
                                    />
                                </Box>
                            </Stack>
                        </Stack>
                        <Box className={styles.boxItemHidden}>
                            <TextField
                                disabled
                                required
                                id="idcustomerAddress"
                                label="IdcustomerAddress"
                                variant="outlined"
                                type="text"
                                sx={{
                                    input: { color: '#000' },
                                    label: { color: '#000' },
                                    width: '100%',
                                }}
                                {...register('idCustomerAddress')}
                                error={!!errors.idCustomerAddress}
                                helperText={errors.idCustomerAddress?.message}
                                hidden
                                value={customer?.idCustomerAddress}
                            />
                        </Box>
                        <Box className={styles.boxItemHidden}>
                            <TextField
                                disabled
                                required
                                id="id"
                                label="Id"
                                variant="outlined"
                                type="text"
                                sx={{
                                    input: { color: '#000' },
                                    label: { color: '#000' },
                                    width: '100%',
                                }}
                                {...register('id')}
                                error={!!errors.id}
                                helperText={errors.id?.message}
                                hidden
                                value={customer?.id}
                            />
                        </Box>
                        <Box className={styles.boxItem}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="secondary"
                                sx={{ width: '100%' }}
                            >
                                Edit
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

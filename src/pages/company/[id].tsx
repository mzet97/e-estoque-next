import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';

import { api } from '@/services/apiClient';
import EditCompany from '@/models/Company/EditCompany';
import { useCallback, useEffect, useState } from 'react';
import { useRouter as useQueryRouter } from 'next/router';
import { findEditCompanyById } from '@/services/companiesServices';
import SnackbarAlert from '@/components/SnackbarAlert/SnackbarAlert';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import styles from './styles.module.css';

const schema = yup.object().shape({
    name: yup.string().required().min(3).max(80),
    docId: yup.string().required().min(3).max(80),
    email: yup.string().required().min(3).max(250).email(),
    description: yup.string().required().min(3).max(250),
    phoneNumber: yup.string().required().min(3).max(80),
    idCompanyAddress: yup.string().required().min(3).max(80),
    id: yup.string().required().min(3).max(80),
    companyAddress: yup.object({
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

export default function EditCompanyPage() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<EditCompany>({
        mode: 'onBlur',
        resolver: yupResolver(schema),
    });

    const router = useRouter();
    const queryRouter = useQueryRouter();
    const [company, setCompany] = useState<EditCompany>();
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

    const onSubmit = async (values: EditCompany) => {
        try {
            await api.post('Company', values);

            setMessage('Success edit company.');
            setIsError(false);
            setIsOpen(true);

            router.push('/company');
        } catch (err) {
            setMessage('Failure to edit company.');
            setIsError(true);
            setIsOpen(true);
        }
    };

    const getData = useCallback(async () => {
        const { id } = queryRouter.query;
        const result = await findEditCompanyById(id + '');

        if (result) {
            setCompany(result);
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
                                Edit a new Company
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
                                        value={company?.name}
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
                                        value={company?.docId}
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
                                        value={company?.phoneNumber}
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
                                        value={company?.description}
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
                                        {...register('companyAddress.street')}
                                        error={!!errors.companyAddress?.street}
                                        helperText={
                                            errors.companyAddress?.street
                                                ?.message
                                        }
                                        value={company?.companyAddress?.street}
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
                                        {...register('companyAddress.number')}
                                        error={!!errors.companyAddress?.number}
                                        helperText={
                                            errors.companyAddress?.number
                                                ?.message
                                        }
                                        value={company?.companyAddress?.number}
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
                                            'companyAddress.complement',
                                        )}
                                        error={
                                            !!errors.companyAddress?.complement
                                        }
                                        helperText={
                                            errors.companyAddress?.complement
                                                ?.message
                                        }
                                        value={
                                            company?.companyAddress?.complement
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
                                            'companyAddress.neighborhood',
                                        )}
                                        error={
                                            !!errors.companyAddress
                                                ?.neighborhood
                                        }
                                        helperText={
                                            errors.companyAddress?.neighborhood
                                                ?.message
                                        }
                                        value={
                                            company?.companyAddress
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
                                        {...register('companyAddress.district')}
                                        error={
                                            !!errors.companyAddress?.district
                                        }
                                        helperText={
                                            errors.companyAddress?.district
                                                ?.message
                                        }
                                        value={
                                            company?.companyAddress?.district
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
                                        {...register('companyAddress.city')}
                                        error={!!errors.companyAddress?.city}
                                        helperText={
                                            errors.companyAddress?.city?.message
                                        }
                                        value={company?.companyAddress?.city}
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
                                        {...register('companyAddress.county')}
                                        error={!!errors.companyAddress?.county}
                                        helperText={
                                            errors.companyAddress?.county
                                                ?.message
                                        }
                                        value={company?.companyAddress?.county}
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
                                        {...register('companyAddress.zipCode')}
                                        error={!!errors.companyAddress?.zipCode}
                                        helperText={
                                            errors.companyAddress?.zipCode
                                                ?.message
                                        }
                                        value={company?.companyAddress?.zipCode}
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
                                        {...register('companyAddress.latitude')}
                                        error={
                                            !!errors.companyAddress?.latitude
                                        }
                                        helperText={
                                            errors.companyAddress?.latitude
                                                ?.message
                                        }
                                        value={
                                            company?.companyAddress?.latitude
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
                                            'companyAddress.longitude',
                                        )}
                                        error={
                                            !!errors.companyAddress?.longitude
                                        }
                                        helperText={
                                            errors.companyAddress?.longitude
                                                ?.message
                                        }
                                        value={
                                            company?.companyAddress?.longitude
                                        }
                                    />
                                </Box>
                            </Stack>
                        </Stack>
                        <Box className={styles.boxItemHidden}>
                            <TextField
                                disabled
                                required
                                id="idCompanyAddress"
                                label="IdCompanyAddress"
                                variant="outlined"
                                type="text"
                                sx={{
                                    input: { color: '#000' },
                                    label: { color: '#000' },
                                    width: '100%',
                                }}
                                {...register('idCompanyAddress')}
                                error={!!errors.idCompanyAddress}
                                helperText={errors.idCompanyAddress?.message}
                                hidden
                                value={company?.idCompanyAddress}
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
                                value={company?.id}
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

import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import CreateCategory from '@/models/category/CreateCategory';
import { api } from '@/services/apiClient';
import SnackbarAlert from '@/components/SnackbarAlert/SnackbarAlert';
import { useState } from 'react';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import styles from './styles.module.css';

const schema = yup.object().shape({
    name: yup.string().required().min(3).max(80),
    description: yup.string().required().min(3).max(5000),
    shortDescription: yup.string().required().min(3).max(500),
});

export default function CreateCategoryPage() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CreateCategory>({
        mode: 'onBlur',
        resolver: yupResolver(schema),
    });

    const [isError, setIsError] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('Teste');
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

    const onSubmit = async (values: CreateCategory) => {
        try {
            console.log('input', values);
            await api.post('Category', values);

            setMessage('Success create category.');
            setIsError(false);
            setIsOpen(true);

            router.push('/category');
        } catch (err) {
            setMessage('Failure to create category.');
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
                                    variant="h4"
                                    component="h4"
                                    sx={{ color: '#000' }}
                                >
                                    Create a new Category
                                </Typography>
                                <Typography
                                    variant="subtitle1"
                                    sx={{ color: '#000' }}
                                >
                                    Enter with data
                                </Typography>
                            </Box>
                            <Box className={styles.boxItem}>
                                <TextField
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
                                    required
                                    id="shortDescription"
                                    label="ShortDescription"
                                    variant="outlined"
                                    type="text"
                                    sx={{
                                        input: { color: '#000' },
                                        label: { color: '#000' },
                                        width: '100%',
                                    }}
                                    {...register('shortDescription')}
                                    error={!!errors.shortDescription}
                                    helperText={
                                        errors.shortDescription?.message
                                    }
                                />
                            </Box>
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
}

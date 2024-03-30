import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import { useRouter as useQueryRouter } from 'next/router';

import { api } from '@/services/apiClient';
import EditCategory from '@/models/category/EditCategory';
import { useCallback, useEffect, useState } from 'react';
import { findCategoryById } from '@/services/categoriesServices';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import SnackbarAlert from '@/components/SnackbarAlert/SnackbarAlert';
import styles from './styles.module.css';

const schema = yup.object().shape({
    id: yup.string().required(),
    name: yup.string().required().min(3).max(80),
    description: yup.string().required().min(3).max(5000),
    shortDescription: yup.string().required().min(3).max(500),
});

export default function EditCategoryPage() {
    const [category, setCategory] = useState<EditCategory>();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<EditCategory>({
        mode: 'onBlur',
        resolver: yupResolver(schema),
    });

    const [isError, setIsError] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('Teste');
    const router = useRouter();
    const queryRouter = useQueryRouter();

    const handleClose = (
        event?: React.SyntheticEvent | Event,
        reason?: string,
    ) => {
        if (reason === 'clickaway') {
            return;
        }

        setIsOpen(false);
    };

    const onSubmit = async (values: EditCategory) => {
        try {
            await api.put('Category/' + values.id, values);

            setMessage('Success edit category.');
            setIsError(false);
            setIsOpen(true);

            router.push('/category');
        } catch (err) {
            setMessage('Failure to edit category.');
            setIsError(true);
            setIsOpen(true);
        }
    };

    const getData = useCallback(async () => {
        const { id } = queryRouter.query;
        if (id) {
            const entity = await findCategoryById(id + '');

            if (entity) {
                setCategory(entity);
            }
        } else {
            router.push('/tax');
        }
    }, [queryRouter.query, router]);

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
                                    value={category?.id}
                                />
                            </Box>
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
                                    value={category?.name}
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
                                    value={category?.description}
                                />
                            </Box>
                            <Box className={styles.boxItem}>
                                <TextField
                                    focused
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
                                    value={category?.shortDescription}
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

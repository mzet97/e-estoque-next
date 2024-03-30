import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import {
    Box,
    Button,
    MenuItem,
    Stack,
    TextField,
    Typography,
} from '@mui/material';

import { api } from '@/services/apiClient';
import CreateTax from '@/models/Tax/CreateTax';
import { useCallback, useEffect, useState } from 'react';
import Category from '@/models/category/Category';
import { findAllCategories } from '@/services/categoriesServices';
import SnackbarAlert from '@/components/SnackbarAlert/SnackbarAlert';
import styles from './styles.module.css';

const schema = yup.object().shape({
    name: yup.string().required().min(3).max(80),
    description: yup.string().required().min(3).max(5000),
    percentage: yup.number().required().min(0).max(100),
    idCategory: yup.string().required(),
});

export default function CreateTaxPage() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CreateTax>({
        mode: 'onBlur',
        resolver: yupResolver(schema),
    });

    const [isError, setIsError] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('Teste');
    const router = useRouter();
    const [categories, setCategories] = useState<Category[]>([]);

    const handleClose = (
        event?: React.SyntheticEvent | Event,
        reason?: string,
    ) => {
        if (reason === 'clickaway') {
            return;
        }

        setIsOpen(false);
    };

    const onSubmit = async (values: CreateTax) => {
        try {
            console.log('input', values);
            await api.post('Tax', values);

            setMessage('Success create tax.');
            setIsError(false);
            setIsOpen(true);

            router.push('/tax');
        } catch (err) {
            setMessage('Failure to create tax.');
            setIsError(true);
            setIsOpen(true);
        }
    };

    const getData = useCallback(async () => {
        const result = await findAllCategories();

        if (result) {
            setCategories([...result.data]);
        }
    }, []);

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
                        <Stack
                            className={styles.Login}
                            useFlexGap
                            flexWrap="wrap"
                            sx={{ width: '30rem' }}
                        >
                            <Box className={styles.boxItem}>
                                <Typography
                                    variant="h4"
                                    component="h4"
                                    sx={{
                                        color: '#000',
                                    }}
                                >
                                    Create a new Tax
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
                                    id="percentage"
                                    label="Percentage"
                                    variant="outlined"
                                    type="number"
                                    sx={{
                                        input: { color: '#000' },
                                        label: { color: '#000' },
                                        width: '100%',
                                    }}
                                    {...register('percentage')}
                                    error={!!errors.percentage}
                                    helperText={errors.percentage?.message}
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
                                    id="idCategory"
                                    select
                                    label="Category"
                                    sx={{
                                        input: { color: '#000' },
                                        label: { color: '#000' },
                                        width: '100%',
                                    }}
                                    {...register('idCategory')}
                                    error={!!errors.idCategory}
                                    helperText={errors.idCategory?.message}
                                >
                                    {categories.map(option => (
                                        <MenuItem
                                            key={option.id}
                                            value={option.id}
                                        >
                                            {option.name}
                                        </MenuItem>
                                    ))}
                                </TextField>
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

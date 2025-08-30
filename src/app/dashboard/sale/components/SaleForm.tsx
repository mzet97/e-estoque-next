'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    TextField,
    Button,
    Box,
    Container,
    Typography,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
    FormHelperText,
    Stack,
    Autocomplete,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useSnackbar } from '@/context/SnackbarContext';
import { Sale, SaleSchema } from '../types/Sale';
import { createSale, updateSale } from '../api/saleService';
import { Customer } from '../../customer/types/Customer';
import { getCustomers } from '../../customer/api/customerService';
import { Product } from '../../product/types/Product';
import { getProducts } from '../../product/api/productService';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { format } from 'date-fns';
import { getTaxByCategory } from '../../tax/api/taxService';
import { Tax } from '../../tax/types/Tax';

interface SaleFormProps {
    title?: string;
    initialSale?: Sale;
    onSuccess: () => void;
    onCancel: () => void;
}

// Enum options
const saleTypeOptions = [
    { value: 'Retail', label: 'Retail' },
    { value: 'Wholesale', label: 'Wholesale' },
    { value: 'Online', label: 'Online' },
    { value: 'InStore', label: 'In Store' },
];

const paymentTypeOptions = [
    { value: 'Cash', label: 'Cash' },
    { value: 'CreditCard', label: 'Credit Card' },
    { value: 'DebitCard', label: 'Debit Card' },
    { value: 'BankTransfer', label: 'Bank Transfer' },
    { value: 'Check', label: 'Check' },
];

const SaleForm: React.FC<SaleFormProps> = ({
    title = 'Sale Form',
    initialSale,
    onSuccess,
    onCancel,
}) => {
    const { showMessage } = useSnackbar();
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
    const [productTaxes, setProductTaxes] = useState<Map<string, Tax | null>>(new Map());

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        control,
        formState: { errors },
    } = useForm<Sale>({
        resolver: zodResolver(SaleSchema),
        defaultValues: {
            quantity: 0,
            totalPrice: 0,
            totalTax: 0,
            saleType: 'Retail',
            paymentType: 'Cash',
            saleDate: format(new Date(), 'yyyy-MM-dd'),
            idCustomer: '',
            products: [],
            createdAt: format(new Date(), 'yyyy-MM-dd'),
        },
    });

    useEffect(() => {
        if (initialSale) {
            Object.keys(initialSale).forEach((key) => {
                setValue(key as keyof Sale, initialSale[key as keyof Sale]);
            });

            if (initialSale.products) {
                setSelectedProducts(initialSale.products as Product[]);
            }
        }
    }, [initialSale, setValue]);

    const onSubmit = async (data: Sale) => {
        try {
            data.products = selectedProducts;

            if (initialSale) {
                await updateSale({ ...data, id: initialSale.id });
                showMessage('Sale updated successfully', 'success');
            } else {
                await createSale(data);
                showMessage('Sale created successfully', 'success');
            }
            onSuccess();
        } catch (error) {
            console.error('Error creating/updating sale:', error);
            showMessage('Error creating/updating sale', 'error');
        }
    };

    const fetchCustomers = async () => {
        try {
            const data = await getCustomers();
            setCustomers(data);
        } catch (error) {
            console.error('Error fetching customers:', error);
            showMessage('Error fetching customers', 'error');
        }
    };

    const fetchProducts = async () => {
        try {
            const data = await getProducts();
            setProducts(data);
        } catch (error) {
            console.error('Error fetching products:', error);
            showMessage('Error fetching products', 'error');
        }
    };

    useEffect(() => {
        fetchCustomers();
        fetchProducts();
    }, []);

    const quantity = watch('quantity');

    const fetchTaxForCategory = async (categoryId: string) => {
        try {
            const tax = await getTaxByCategory(categoryId);
            setProductTaxes(prev => new Map(prev).set(categoryId, tax));
            return tax;
        } catch (error) {
            console.error(`Error fetching tax for category ${categoryId}:`, error);
            return null;
        }
    };

    // Fetch taxes for all selected products
    useEffect(() => {
        const fetchTaxesForProducts = async () => {
            if (selectedProducts.length > 0) {
                // Get unique category IDs from selected products
                const categoryIds = [...new Set(selectedProducts.map(product => product.idCategory))];

                // Fetch taxes for each category if not already in state
                for (const categoryId of categoryIds) {
                    if (!productTaxes.has(categoryId)) {
                        await fetchTaxForCategory(categoryId);
                    }
                }
            }
        };

        fetchTaxesForProducts();
    }, [selectedProducts]);

    // Calculate prices and taxes when products, quantity, or taxes change
    useEffect(() => {
        if (selectedProducts.length > 0) {
            // Calculate base price from selected products
            const basePrice = selectedProducts.reduce((sum, product) => sum + (product.price || 0), 0);

            // Only set quantity if it's not manually set or when products are first selected
            if (!quantity || selectedProducts.length !== Number(quantity)) {
                setValue('quantity', selectedProducts.length);
            }

            // Use the current quantity value to calculate the total price
            const currentQuantity = Number(quantity) >= 0 ? Number(quantity) : selectedProducts.length;
            const pricePerUnit = basePrice / selectedProducts.length;
            const totalPrice = currentQuantity === 0 ? 0 : pricePerUnit * currentQuantity;

            setValue('totalPrice', totalPrice);

            // Calculate tax based on product categories and their tax rates
            let totalTax = 0;

            for (const product of selectedProducts) {
                const tax = productTaxes.get(product.idCategory);
                if (tax) {
                    // Calculate tax for this product based on its percentage
                    const taxRate = tax.percentage / 100;
                    const productTaxAmount = product.price * taxRate;
                    totalTax += productTaxAmount;
                }
            }

            // Adjust tax for quantity
            if (currentQuantity === 0) {
                totalTax = 0;
            } else if (currentQuantity !== selectedProducts.length) {
                const taxPerUnit = totalTax / selectedProducts.length;
                totalTax = taxPerUnit * currentQuantity;
            }

            setValue('totalTax', totalTax);
        }
    }, [selectedProducts, setValue, quantity, productTaxes]);

    return (
        <Container fixed>
            <Typography variant="h4" gutterBottom>
                {title}
            </Typography>
            <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
                <Stack spacing={2}>
                    <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                        <Box sx={{ width: { xs: '100%', md: '50%' } }}>
                            <FormControl fullWidth margin="normal" error={!!errors.idCustomer}>
                                <InputLabel id="customer-label">Customer</InputLabel>
                                <Controller
                                    name="idCustomer"
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field }) => (
                                        <Select
                                            labelId="customer-label"
                                            id="idCustomer"
                                            label="Customer"
                                            value={field.value ?? ''}
                                            onChange={field.onChange}
                                            onBlur={field.onBlur}
                                            ref={field.ref}
                                        >
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>
                                            {customers.map((customer) => (
                                                <MenuItem key={customer.id} value={customer.id}>
                                                    {customer.name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    )}
                                />
                                <FormHelperText>
                                    {errors.idCustomer?.message as string}
                                </FormHelperText>
                            </FormControl>
                        </Box>

                        <Box sx={{ width: { xs: '100%', md: '50%' } }}>
                            <FormControl fullWidth margin="normal" error={!!errors.saleType}>
                                <InputLabel id="saleType-label">Sale Type</InputLabel>
                                <Controller
                                    name="saleType"
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field }) => (
                                        <Select
                                            labelId="saleType-label"
                                            id="saleType"
                                            label="Sale Type"
                                            value={field.value ?? ''}
                                            onChange={field.onChange}
                                            onBlur={field.onBlur}
                                            ref={field.ref}
                                        >
                                            {saleTypeOptions.map((option) => (
                                                <MenuItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    )}
                                />
                                <FormHelperText>
                                    {errors.saleType?.message as string}
                                </FormHelperText>
                            </FormControl>
                        </Box>
                    </Stack>

                    <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                        <Box sx={{ width: { xs: '100%', md: '50%' } }}>
                            <FormControl fullWidth margin="normal" error={!!errors.paymentType}>
                                <InputLabel id="paymentType-label">Payment Type</InputLabel>
                                <Controller
                                    name="paymentType"
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field }) => (
                                        <Select
                                            labelId="paymentType-label"
                                            id="paymentType"
                                            label="Payment Type"
                                            value={field.value ?? ''}
                                            onChange={field.onChange}
                                            onBlur={field.onBlur}
                                            ref={field.ref}
                                        >
                                            {paymentTypeOptions.map((option) => (
                                                <MenuItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    )}
                                />
                                <FormHelperText>
                                    {errors.paymentType?.message as string}
                                </FormHelperText>
                            </FormControl>
                        </Box>

                        <Box sx={{ width: { xs: '100%', md: '50%' } }}>
                            <FormControl fullWidth margin="normal">
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <Controller
                                        name="saleDate"
                                        control={control}
                                        render={({ field }) => (
                                            <DatePicker
                                                label="Sale Date"
                                                value={field.value ? new Date(field.value) : null}
                                                onChange={(date) => {
                                                    field.onChange(date ? format(date, 'yyyy-MM-dd') : '');
                                                }}
                                                inputRef={field.ref}
                                                slotProps={{
                                                    textField: {
                                                        fullWidth: true,
                                                        error: !!errors.saleDate,
                                                        helperText: errors.saleDate?.message as string,
                                                        onBlur: field.onBlur,
                                                    },
                                                }}
                                            />
                                        )}
                                    />
                                </LocalizationProvider>
                            </FormControl>
                        </Box>
                    </Stack>

                    <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                        <Box sx={{ width: { xs: '100%', md: '50%' } }}>
                            <FormControl fullWidth margin="normal">
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <Controller
                                        name="deliveryDate"
                                        control={control}
                                        render={({ field }) => (
                                            <DatePicker
                                                label="Delivery Date"
                                                value={field.value ? new Date(field.value) : null}
                                                onChange={(date) => {
                                                    field.onChange(date ? format(date, 'yyyy-MM-dd') : null);
                                                }}
                                                inputRef={field.ref}
                                                slotProps={{
                                                    textField: {
                                                        fullWidth: true,
                                                        error: !!errors.deliveryDate,
                                                        helperText: errors.deliveryDate?.message as string,
                                                        onBlur: field.onBlur,
                                                    },
                                                }}
                                            />
                                        )}
                                    />
                                </LocalizationProvider>
                            </FormControl>
                        </Box>

                        <Box sx={{ width: { xs: '100%', md: '50%' } }}>
                            <FormControl fullWidth margin="normal">
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <Controller
                                        name="paymentDate"
                                        control={control}
                                        render={({ field }) => (
                                            <DatePicker
                                                label="Payment Date"
                                                value={field.value ? new Date(field.value) : null}
                                                onChange={(date) => {
                                                    field.onChange(date ? format(date, 'yyyy-MM-dd') : null);
                                                }}
                                                inputRef={field.ref}
                                                slotProps={{
                                                    textField: {
                                                        fullWidth: true,
                                                        error: !!errors.paymentDate,
                                                        helperText: errors.paymentDate?.message as string,
                                                        onBlur: field.onBlur,
                                                    },
                                                }}
                                            />
                                        )}
                                    />
                                </LocalizationProvider>
                            </FormControl>
                        </Box>
                    </Stack>

                    <Box width="100%">
                        <FormControl fullWidth margin="normal">
                            <Autocomplete
                                multiple
                                id="products"
                                options={products}
                                getOptionLabel={(option) => option.name}
                                value={selectedProducts}
                                onChange={(_, newValue) => {
                                    setSelectedProducts(newValue);
                                }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Products"
                                        placeholder="Select products"
                                        error={!!errors.products}
                                        helperText={errors.products?.message as string}
                                    />
                                )}
                            />
                        </FormControl>
                    </Box>

                    <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                        <Box sx={{ width: { xs: '100%', md: '33.33%' } }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="quantity"
                                label="Quantity"
                                type="number"
                                inputProps={{ min: 0, step: 1 }}
                                error={!!errors.quantity}
                                helperText={errors.quantity?.message}
                                {...register('quantity', {
                                    valueAsNumber: true,
                                    onChange: (e) => {
                                        const newQuantity = parseInt(e.target.value) || 0;
                                        setValue('quantity', newQuantity);
                                    }
                                })}
                            />
                        </Box>

                        <Box sx={{ width: { xs: '100%', md: '33.33%' } }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="totalPrice"
                                label="Total Price"
                                type="number"
                                inputProps={{ min: 0, step: 0.01 }}
                                error={!!errors.totalPrice}
                                helperText={errors.totalPrice?.message}
                                {...register('totalPrice', { valueAsNumber: true })}
                                disabled
                            />
                        </Box>

                        <Box sx={{ width: { xs: '100%', md: '33.33%' } }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="totalTax"
                                label="Total Tax"
                                type="number"
                                inputProps={{ min: 0, step: 0.01 }}
                                error={!!errors.totalTax}
                                helperText={errors.totalTax?.message}
                                {...register('totalTax', { valueAsNumber: true })}
                                disabled
                            />
                        </Box>
                    </Stack>
                </Stack>

                <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                    <Button type="submit" fullWidth variant="contained" color="primary">
                        {initialSale ? 'Update Sale' : 'Create Sale'}
                    </Button>
                    <Button fullWidth variant="outlined" onClick={onCancel}>
                        Cancel
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default SaleForm;

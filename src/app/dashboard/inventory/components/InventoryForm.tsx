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
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useSnackbar } from '@/context/SnackbarContext';
import { Inventory, InventorySchema } from '../types/Inventory';
import { createInventory, updateInventory } from '../api/inventoryService';
import { Product } from '../../product/types/Product';
import { getProducts } from '../../product/api/productService';

interface InventoryFormProps {
  title?: string;
  initialInventory?: Inventory;
  onSuccess: () => void;
  onCancel: () => void;
}

const InventoryForm: React.FC<InventoryFormProps> = ({
  title = 'Inventory Form',
  initialInventory,
  onSuccess,
  onCancel,
}) => {
  const { showMessage } = useSnackbar();
  const [products, setProducts] = useState<Product[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm<Inventory>({
    resolver: zodResolver(InventorySchema),
    defaultValues: {
      dateOrder: new Date().toISOString().split('T')[0],
      quantity: 0,
      idProduct: '',
    },
  });

  useEffect(() => {
    if (initialInventory) {
      Object.keys(initialInventory).forEach((key) => {
        // Ajustar a data para o formato YYYY-MM-DD se necessário
        if (key === 'dateOrder' && initialInventory.dateOrder) {
          const date = new Date(initialInventory.dateOrder);
          setValue('dateOrder', date.toISOString().split('T')[0]);
        } else {
          setValue(
            key as keyof Inventory,
            initialInventory[key as keyof Inventory],
          );
        }
      });
    }
  }, [initialInventory, setValue]);

  const onSubmit = async (data: Inventory) => {
    try {
      // Garantir que quantity seja um número
      const submitData = {
        ...data,
        quantity: Number(data.quantity),
      };

      if (initialInventory) {
        await updateInventory({ ...submitData, id: initialInventory.id });
        showMessage('Update success', 'success');
      } else {
        await createInventory(submitData);
        showMessage('Create success', 'success');
      }
      onSuccess();
    } catch (error) {
      console.error('Erro ao criar/editar inventory:', error);
      showMessage('Error creating/editing inventory', 'error');
    }
  };

  // Função para buscar produtos
  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
      showMessage('Products fetched successfully', 'success');
    } catch (error) {
      console.error('Error fetching products:', error);
      showMessage('Error fetching products', 'error');
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <Container fixed>
      <Typography variant="h4" gutterBottom>
        {title}
      </Typography>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
        <FormControl fullWidth margin="normal" error={!!errors.idProduct}>
          <InputLabel id="product-label">Product</InputLabel>
          <Controller
            name="idProduct"
            control={control}
            rules={{ required: 'Product is required' }}
            render={({ field }) => (
              <Select
                labelId="product-label"
                id="idProduct"
                label="Product"
                value={field.value ?? ''}
                onChange={field.onChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {products.map((prod) => (
                  <MenuItem key={prod.id} value={prod.id}>
                    {prod.name}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
          <FormHelperText>{errors.idProduct?.message as string}</FormHelperText>
        </FormControl>

        <TextField
          margin="normal"
          required
          fullWidth
          id="dateOrder"
          label="Order Date"
          type="date"
          InputLabelProps={{
            shrink: true,
          }}
          error={!!errors.dateOrder}
          helperText={errors.dateOrder?.message}
          {...register('dateOrder')}
        />

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
          {...register('quantity', { valueAsNumber: true })}
        />

        <Button type="submit" fullWidth variant="contained" color="primary">
          {initialInventory ? 'Update Inventory' : 'Create Inventory'}
        </Button>
        <Button fullWidth variant="outlined" onClick={onCancel} sx={{ mt: 1 }}>
          Cancel
        </Button>
      </Box>
    </Container>
  );
};

export default InventoryForm;

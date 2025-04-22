'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextField, Button, Box, Container, Typography, MenuItem, Select, InputLabel, FormControl, FormHelperText } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSnackbar } from '@/context/SnackbarContext';
import { Tax, TaxSchema } from '../types/Tax';
import { createTax, updateTax } from '../api/taxService';
import { Category } from '../../category/types/Category';
import { getCategories } from '../../category/api/categoryService';

interface TaxFormProps {
  title?: string;
  initialTax?: Tax;
  onSuccess: () => void;
  onCancel: () => void;
}

const TaxForm: React.FC<TaxFormProps> = ({
  title = 'Tax Form',
  initialTax,
  onSuccess,
  onCancel,
}) => {
  const { showMessage } = useSnackbar();
  const [categories, setCategories] = useState<Category[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm<Tax>({
    resolver: zodResolver(TaxSchema),
    defaultValues: {
      name: '',
      description: '',
      idCategory: '',
      percentage: 0,
    },
  });

  useEffect(() => {
    if (initialTax) {
      Object.keys(initialTax).forEach((key) => {
        setValue(key as keyof Tax, initialTax[key as keyof Tax]);
      });
    }
  }, [initialTax, setValue]);

  const onSubmit = async (data: Tax) => {
    try {
      if (initialTax) {
        await updateTax({ ...data, id: initialTax.id });
        showMessage('Update success', 'success');
      } else {
        await createTax(data);
        showMessage('Create success', 'success');
      }
      onSuccess();
    } catch (error) {
      console.error('Erro ao criar/editar tax:', error);
      showMessage('Error creating/editing tax', 'error');
    }
  };

  const fetchCategories = async () => {
    try {
     const data = await getCategories();
      setCategories(data);
      showMessage('Categories fetched successfully', 'success');
    } catch (error) {
      console.error('Error fetching categories:', error);
      showMessage('Error fetching categories', 'error');
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <Container fixed>
      <Typography variant="h4" gutterBottom>
        {title}
      </Typography>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
        <FormControl fullWidth margin="normal" error={!!errors.idCategory}>
          <InputLabel id="category-label">Category</InputLabel>
          <Controller
            name="idCategory"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Select
                labelId="category-label"
                id="idCategory"
                label="Category"
                value={field.value ?? ''}
                onChange={field.onChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {categories.map((cat) => (
                  <MenuItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
          <FormHelperText>{errors.idCategory?.message as string}</FormHelperText>
        </FormControl>
        <TextField
          margin="normal"
          required
          fullWidth
          id="name"
          label="Name"
          error={!!errors.name}
          helperText={errors.name?.message}
          {...register('name')}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="percentage"
          label="Percentage"
          type="number"
          inputProps={{ min: 0, step: 0.01 }}
          error={!!errors.percentage}
          helperText={errors.percentage?.message}
          {...register('percentage', { valueAsNumber: true })}
        />
        <TextField
          margin="normal"
          fullWidth
          id="description"
          label="Description"
          multiline
          rows={2}
          {...register('description')}
        />
        <Button type="submit" fullWidth variant="contained" color="primary">
          {initialTax ? 'Update Tax' : 'Create Tax'}
        </Button>
        <Button fullWidth variant="outlined" onClick={onCancel} sx={{ mt: 1 }}>
          Cancel
        </Button>
      </Box>
    </Container>
  );
};

export default TaxForm;

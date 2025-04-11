'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextField, Button, Box, FormHelperText } from '@mui/material';
import { Category, CategorySchema } from '../types/Category';
import { createCategory, updateCategory } from '../api/categoryService';
import { useEffect } from 'react';

interface CategoryFormProps {
  initialCategory?: Category;
  onSuccess: () => void;
  onCancel: () => void;
}

const CategoryForm: React.FC<CategoryFormProps> = ({ initialCategory, onSuccess, onCancel }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Category>({
    resolver: zodResolver(CategorySchema),
    defaultValues: {
      name: '',
      description: '',
      shortDescription: '',
    },
  });

  useEffect(() => {
    if (initialCategory) {
      Object.keys(initialCategory).forEach(key => {
        setValue(key as keyof Category, initialCategory[key as keyof Category]);
      });
    }
  }, [initialCategory, setValue]);

  const onSubmit = async (data: Category) => {
    try {
      if (initialCategory) {
        // Editar categoria
        await updateCategory({ ...data, id: initialCategory.id }); // Mantém o ID original
      } else {
        // Criar categoria
        await createCategory(data);
      }
      onSuccess();
    } catch (error) {
      console.error('Erro ao criar/editar categoria:', error);
      // Lidar com o erro (ex: exibir mensagem de erro)
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
      <TextField
        margin="normal"
        required
        fullWidth
        id="name"
        label="Name"
        name="name"
        error={!!errors.name}
        helperText={errors.name?.message}
        {...register('name')}
      />
      <TextField
        margin="normal"
        fullWidth
        id="description"
        label="Description"
        name="description"
        multiline
        rows={4}
        {...register('description')}
      />
      <TextField
        margin="normal"
        fullWidth
        id="shortDescription"
        label="Short Description"
        name="shortDescription"
        {...register('shortDescription')}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
      >
        {initialCategory ? 'Update Category' : 'Create Category'}
      </Button>
      <Button
        fullWidth
        variant="outlined"
        onClick={onCancel}
        sx={{ mt: 1 }}
      >
        Cancel
      </Button>
    </Box>
  );
};

export default CategoryForm;
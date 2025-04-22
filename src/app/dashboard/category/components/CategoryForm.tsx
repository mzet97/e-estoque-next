'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextField, Button, Box, Container, Typography } from '@mui/material';
import { Category, CategorySchema } from '../types/Category';
import { createCategory, updateCategory } from '../api/categoryService';
import { useEffect } from 'react';
import { useSnackbar } from '@/context/SnackbarContext';

interface CategoryFormProps {
  title?: string;
  initialCategory?: Category;
  onSuccess: () => void;
  onCancel: () => void;
}

const CategoryForm: React.FC<CategoryFormProps> = ({
  title = 'Category Form',
  initialCategory,
  onSuccess,
  onCancel,
}) => {
  const { showMessage } = useSnackbar();
  
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
      Object.keys(initialCategory).forEach((key) => {
        setValue(key as keyof Category, initialCategory[key as keyof Category]);
      });
    }
  }, [initialCategory, setValue]);

  const onSubmit = async (data: Category) => {
    try {
      if (initialCategory) {
        await updateCategory({ ...data, id: initialCategory.id });
        showMessage('Update success', 'success');
      } else {
        await createCategory(data);
        showMessage('Create success', 'success');
      }
      onSuccess();
    } catch (error) {
      console.error('Erro ao criar/editar categoria:', error);
      showMessage('Error creating/editing category', 'error');
    }
  };

  return (
    <Container fixed>
      <Typography variant="h4" gutterBottom>
        {title}
      </Typography>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
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
          fullWidth
          id="description"
          label="Description"
          multiline
          rows={5}
          {...register('description')}
        />
        <TextField
          margin="normal"
          fullWidth
          multiline
          rows={2}
          id="shortDescription"
          label="Short Description"
          {...register('shortDescription')}
        />
        <Button type="submit" fullWidth variant="contained" color="primary">
          {initialCategory ? 'Update Category' : 'Create Category'}
        </Button>
        <Button fullWidth variant="outlined" onClick={onCancel} sx={{ mt: 1 }}>
          Cancel
        </Button>
      </Box>
    </Container>
  );
};
	
export default CategoryForm;

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
import { Product, ProductSchema } from '../types/Product';
import { Category } from '../../category/types/Category';
import { getCategories } from '../../category/api/categoryService';
import { createProduct, updateProduct } from '../api/productService';
import { Company } from '../../company/types/Company';
import { getCompanies } from '../../company/api/companyService';

interface ProductFormProps {
  title?: string;
  initialProduct?: Product;
  onSuccess: () => void;
  onCancel: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({
  title = 'Product Form',
  initialProduct,
  onSuccess,
  onCancel,
}) => {
  const { showMessage } = useSnackbar();
  const [categories, setCategories] = useState<Category[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm<Product>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      name: '',
      description: '',
      shortDescription: '',
      price: 0,
      weight: 0,
      height: 0,
      length: 0,
      image: '',
      idCategory: '',
      idCompany: '',
      isDeleted: false,
    },
  });

  useEffect(() => {
    if (initialProduct) {
      Object.keys(initialProduct).forEach((key) => {
        setValue(key as keyof Product, initialProduct[key as keyof Product]);
      });
    }
  }, [initialProduct, setValue]);

  const onSubmit = async (data: Product) => {
    try {
      if (initialProduct) {
        await updateProduct({ ...data, id: initialProduct.id });
        showMessage('Update success', 'success');
      } else {
        await createProduct(data);
        showMessage('Create success', 'success');
      }
      onSuccess();
    } catch (error) {
      console.error('Erro ao criar/editar Product:', error);
      showMessage('Error creating/editing Product', 'error');
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

  const fetchCompanies = async () => {
    try {
      const data = await getCompanies();
      setCompanies(data);
      showMessage('Companies fetched successfully', 'success');
    } catch (error) {
      console.error('Error fetching companies:', error);
      showMessage('Error fetching companies', 'error');
    }
  };
  useEffect(() => {
    fetchCategories();
    fetchCompanies();
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
          <FormHelperText>
            {errors.idCategory?.message as string}
          </FormHelperText>
        </FormControl>
        <FormControl fullWidth margin="normal" error={!!errors.idCompany}>
          <InputLabel id="company-label">Company</InputLabel>
          <Controller
            name="idCompany"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Select
                labelId="company-label"
                id="idCompany"
                label="Company"
                value={field.value ?? ''}
                onChange={field.onChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {companies.map((cat) => (
                  <MenuItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
          <FormHelperText>{errors.idCompany?.message as string}</FormHelperText>
        </FormControl>
        {/* Name */}
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
        {/* Short Description */}
        <TextField
          margin="normal"
          fullWidth
          id="shortDescription"
          label="Short Description"
          multiline
          rows={2}
          error={!!errors.shortDescription}
          helperText={errors.shortDescription?.message}
          {...register('shortDescription')}
        />
        {/* Description */}
        <TextField
          margin="normal"
          fullWidth
          id="description"
          label="Description"
          multiline
          rows={2}
          error={!!errors.description}
          helperText={errors.description?.message}
          {...register('description')}
        />
        {/* Price */}
        <TextField
          margin="normal"
          required
          fullWidth
          id="price"
          label="Price"
          type="number"
          inputProps={{ min: 1, step: 0.01 }}
          error={!!errors.price}
          helperText={errors.price?.message}
          {...register('price', { valueAsNumber: true })}
        />
        {/* Weight */}
        <TextField
          margin="normal"
          required
          fullWidth
          id="weight"
          label="Weight"
          type="number"
          inputProps={{ min: 1, step: 0.01 }}
          error={!!errors.weight}
          helperText={errors.weight?.message}
          {...register('weight', { valueAsNumber: true })}
        />
        {/* Height */}
        <TextField
          margin="normal"
          required
          fullWidth
          id="height"
          label="Height"
          type="number"
          inputProps={{ min: 1, step: 0.01 }}
          error={!!errors.height}
          helperText={errors.height?.message}
          {...register('height', { valueAsNumber: true })}
        />
        {/* Length */}
        <TextField
          margin="normal"
          required
          fullWidth
          id="length"
          label="Length"
          type="number"
          inputProps={{ min: 1, step: 0.01 }}
          error={!!errors.length}
          helperText={errors.length?.message}
          {...register('length', { valueAsNumber: true })}
        />
        {/* Image */}
        <TextField
          margin="normal"
          fullWidth
          id="image"
          label="Image URL"
          error={!!errors.image}
          helperText={errors.image?.message}
          {...register('image')}
        />
        {/* Is Deleted */}
        <FormControl fullWidth margin="normal">
          <InputLabel id="isDeleted-label">Is Deleted?</InputLabel>
          <Controller
            name="isDeleted"
            control={control}
            render={({ field }) => (
              <Select
                labelId="isDeleted-label"
                id="isDeleted"
                label="Is Deleted?"
                value={field.value ? 'true' : 'false'}
                onChange={(e) => field.onChange(e.target.value === 'true')}
              >
                <MenuItem value="false">No</MenuItem>
                <MenuItem value="true">Yes</MenuItem>
              </Select>
            )}
          />
        </FormControl>
        {/* Submit and Cancel */}
        <Button type="submit" fullWidth variant="contained" color="primary">
          {initialProduct ? 'Update Product' : 'Create Product'}
        </Button>
        <Button fullWidth variant="outlined" onClick={onCancel} sx={{ mt: 1 }}>
          Cancel
        </Button>
      </Box>
    </Container>
  );
};

export default ProductForm;

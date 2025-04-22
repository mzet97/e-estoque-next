'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextField, Button, Box, Container, Typography, Grid } from '@mui/material';
import { createCustomer, updateCustomer } from '../api/customerService';
import { useEffect } from 'react';
import { useSnackbar } from '@/context/SnackbarContext';
import { Customer, CustomerSchema } from '../types/Customer';

interface CustomerFormProps {
  title?: string;
  initialCustomer?: Customer;
  onSuccess: () => void;
  onCancel: () => void;
}

const CustomerForm: React.FC<CustomerFormProps> = ({
  title = 'Customer Form',
  initialCustomer,
  onSuccess,
  onCancel,
}) => {
  const { showMessage } = useSnackbar();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Customer>({
    resolver: zodResolver(CustomerSchema),
    defaultValues: {
      name: '',
      docId: '',
      email: '',
      description: '',
      phoneNumber: '',
      customerAddress: {
        street: '',
        number: '',
        complement: '',
        neighborhood: '',
        district: '',
        city: '',
        country: '',
        zipCode: '',
        latitude: '',
        longitude: '',
      },
    },
  });

  useEffect(() => {
    if (initialCustomer) {
      Object.keys(initialCustomer).forEach((key) => {
        if (key === 'customerAddress') {
          Object.keys(initialCustomer.customerAddress).forEach((addrKey) => {
            setValue(`customerAddress.${addrKey}` as any, (initialCustomer.customerAddress as any)[addrKey]);
          });
        } else {
          setValue(key as keyof Customer, initialCustomer[key as keyof Customer]);
        }
      });
    }
  }, [initialCustomer, setValue]);

  const onSubmit = async (data: Customer) => {
    try {
      if (initialCustomer) {
        await updateCustomer({ ...data, id: initialCustomer.id });
        showMessage('Update success', 'success');
      } else {
        await createCustomer(data);
        showMessage('Create success', 'success');
      }
      onSuccess();
    } catch (error) {
      console.error('Erro ao criar/editar empresa:', error);
      showMessage('Error creating/editing Customer', 'error');
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
          required
          fullWidth
          id="docId"
          label="Document"
          error={!!errors.docId}
          helperText={errors.docId?.message}
          {...register('docId')}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email"
          error={!!errors.email}
          helperText={errors.email?.message}
          {...register('email')}
        />
        <TextField
          margin="normal"
          fullWidth
          id="description"
          label="Description"
          multiline
          rows={3}
          error={!!errors.description}
          helperText={errors.description?.message}
          {...register('description')}
        />
        <TextField
          margin="normal"
          fullWidth
          id="phoneNumber"
          label="Phone Number"
          error={!!errors.phoneNumber}
          helperText={errors.phoneNumber?.message}
          {...register('phoneNumber')}
        />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Address
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              margin="normal"
              fullWidth
              id="street"
              label="Street"
              error={!!errors.customerAddress?.street}
              helperText={errors.customerAddress?.street?.message}
              {...register('customerAddress.street')}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              margin="normal"
              fullWidth
              id="number"
              label="Number"
              error={!!errors.customerAddress?.number}
              helperText={errors.customerAddress?.number?.message}
              {...register('customerAddress.number')}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              margin="normal"
              fullWidth
              id="complement"
              label="Complement"
              error={!!errors.customerAddress?.complement}
              helperText={errors.customerAddress?.complement?.message}
              {...register('customerAddress.complement')}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              margin="normal"
              fullWidth
              id="neighborhood"
              label="Neighborhood"
              error={!!errors.customerAddress?.neighborhood}
              helperText={errors.customerAddress?.neighborhood?.message}
              {...register('customerAddress.neighborhood')}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              margin="normal"
              fullWidth
              id="district"
              label="District"
              error={!!errors.customerAddress?.district}
              helperText={errors.customerAddress?.district?.message}
              {...register('customerAddress.district')}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              margin="normal"
              fullWidth
              id="city"
              label="City"
              error={!!errors.customerAddress?.city}
              helperText={errors.customerAddress?.city?.message}
              {...register('customerAddress.city')}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              margin="normal"
              fullWidth
              id="country"
              label="Country"
              error={!!errors.customerAddress?.country}
              helperText={errors.customerAddress?.country?.message}
              {...register('customerAddress.country')}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              margin="normal"
              fullWidth
              id="zipCode"
              label="Zip Code"
              error={!!errors.customerAddress?.zipCode}
              helperText={errors.customerAddress?.zipCode?.message}
              {...register('customerAddress.zipCode')}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              margin="normal"
              fullWidth
              id="latitude"
              label="Latitude"
              error={!!errors.customerAddress?.latitude}
              helperText={errors.customerAddress?.latitude?.message}
              {...register('customerAddress.latitude')}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              margin="normal"
              fullWidth
              id="longitude"
              label="Longitude"
              error={!!errors.customerAddress?.longitude}
              helperText={errors.customerAddress?.longitude?.message}
              {...register('customerAddress.longitude')}
            />
          </Grid>
        </Grid>
        <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 2 }}>
          {initialCustomer ? 'Update Customer' : 'Create Customer'}
        </Button>
        <Button fullWidth variant="outlined" onClick={onCancel} sx={{ mt: 1 }}>
          Cancel
        </Button>
      </Box>
    </Container>
  );
};

export default CustomerForm;

'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextField, Button, Box, Container, Typography, Grid } from '@mui/material';
import { Company, CompanySchema } from '../types/Company';
import { createCompany, updateCompany } from '../api/companyService';
import { useEffect } from 'react';
import { useSnackbar } from '@/context/SnackbarContext';

interface CompanyFormProps {
  title?: string;
  initialCompany?: Company;
  onSuccess: () => void;
  onCancel: () => void;
}

const CompanyForm: React.FC<CompanyFormProps> = ({
  title = 'Company Form',
  initialCompany,
  onSuccess,
  onCancel,
}) => {
  const { showMessage } = useSnackbar();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Company>({
    resolver: zodResolver(CompanySchema),
    defaultValues: {
      name: '',
      docId: '',
      email: '',
      description: '',
      phoneNumber: '',
      companyAddress: {
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
    if (initialCompany) {
      Object.keys(initialCompany).forEach((key) => {
        if (key === 'companyAddress') {
          Object.keys(initialCompany.companyAddress).forEach((addrKey) => {
            setValue(`companyAddress.${addrKey}` as any, (initialCompany.companyAddress as any)[addrKey]);
          });
        } else {
          setValue(key as keyof Company, initialCompany[key as keyof Company]);
        }
      });
    }
  }, [initialCompany, setValue]);

  const onSubmit = async (data: Company) => {
    try {
      if (initialCompany) {
        await updateCompany({ ...data, id: initialCompany.id });
        showMessage('Update success', 'success');
      } else {
        await createCompany(data);
        showMessage('Create success', 'success');
      }
      onSuccess();
    } catch (error) {
      console.error('Erro ao criar/editar empresa:', error);
      showMessage('Error creating/editing company', 'error');
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
              error={!!errors.companyAddress?.street}
              helperText={errors.companyAddress?.street?.message}
              {...register('companyAddress.street')}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              margin="normal"
              fullWidth
              id="number"
              label="Number"
              error={!!errors.companyAddress?.number}
              helperText={errors.companyAddress?.number?.message}
              {...register('companyAddress.number')}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              margin="normal"
              fullWidth
              id="complement"
              label="Complement"
              error={!!errors.companyAddress?.complement}
              helperText={errors.companyAddress?.complement?.message}
              {...register('companyAddress.complement')}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              margin="normal"
              fullWidth
              id="neighborhood"
              label="Neighborhood"
              error={!!errors.companyAddress?.neighborhood}
              helperText={errors.companyAddress?.neighborhood?.message}
              {...register('companyAddress.neighborhood')}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              margin="normal"
              fullWidth
              id="district"
              label="District"
              error={!!errors.companyAddress?.district}
              helperText={errors.companyAddress?.district?.message}
              {...register('companyAddress.district')}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              margin="normal"
              fullWidth
              id="city"
              label="City"
              error={!!errors.companyAddress?.city}
              helperText={errors.companyAddress?.city?.message}
              {...register('companyAddress.city')}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              margin="normal"
              fullWidth
              id="country"
              label="Country"
              error={!!errors.companyAddress?.country}
              helperText={errors.companyAddress?.country?.message}
              {...register('companyAddress.country')}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              margin="normal"
              fullWidth
              id="zipCode"
              label="Zip Code"
              error={!!errors.companyAddress?.zipCode}
              helperText={errors.companyAddress?.zipCode?.message}
              {...register('companyAddress.zipCode')}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              margin="normal"
              fullWidth
              id="latitude"
              label="Latitude"
              error={!!errors.companyAddress?.latitude}
              helperText={errors.companyAddress?.latitude?.message}
              {...register('companyAddress.latitude')}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              margin="normal"
              fullWidth
              id="longitude"
              label="Longitude"
              error={!!errors.companyAddress?.longitude}
              helperText={errors.companyAddress?.longitude?.message}
              {...register('companyAddress.longitude')}
            />
          </Grid>
        </Grid>
        <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 2 }}>
          {initialCompany ? 'Update Company' : 'Create Company'}
        </Button>
        <Button fullWidth variant="outlined" onClick={onCancel} sx={{ mt: 1 }}>
          Cancel
        </Button>
      </Box>
    </Container>
  );
};

export default CompanyForm;

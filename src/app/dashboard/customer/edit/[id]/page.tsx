'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Box, CircularProgress } from '@mui/material';
import { useSnackbar } from '@/context/SnackbarContext';
import { Customer } from '../../types/Customer';
import { getCustomer } from '../../api/customerService';
import CustomerForm from '../../components/CompanyForm';

interface Props {
  params: { id: string };
}

const CustomerEditPage: React.FC<Props> = ({ params }) => {
  const { showMessage } = useSnackbar();
  const { id } = params;
  const router = useRouter();
  const [initialCustomer, setInitialCustomer] = useState<Customer | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadCustomer = async () => {
      setIsLoading(true);
      try {
        const CustomerData = await getCustomer(id);
        setInitialCustomer(CustomerData);
        showMessage('Customer loaded successfully', 'success');
      } catch (error) {
        console.error('Erro ao buscar categoria:', error);
        showMessage('Error loading Customer', 'error');
      } finally {
        setIsLoading(false);
      }
    };

    loadCustomer();
  }, [id]);

  const handleSuccess = () => {
    router.push('/dashboard/customer');
  };

  const handleCancel = () => {
    router.push('/dashboard/customer');
  };

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="200px"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!initialCustomer) {
    return <p>Categoria não encontrada.</p>;
  }

  return (
    <div>
      <CustomerForm
        title="Edit Customer"
        initialCustomer={initialCustomer}
        onSuccess={handleSuccess}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default CustomerEditPage;

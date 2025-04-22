'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Box, CircularProgress } from '@mui/material';
import { Tax } from '../../types/Tax';
import { getTax } from '../../api/taxService';
import TaxForm from '../../components/TaxForm';
import { useSnackbar } from '@/context/SnackbarContext';

interface Props {
  params: { id: string };
}

const TaxEditPage: React.FC<Props> = ({ params }) => {
  const { showMessage } = useSnackbar();
  const { id } = params;
  const router = useRouter();
  const [initialTax, setInitialTax] = useState<Tax | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Estado para controlar o carregamento

  useEffect(() => {
    const loadTax = async () => {
      setIsLoading(true); // Inicia o carregamento
      try {
        const taxData = await getTax(id);
        setInitialTax(taxData);
        showMessage('Tax loaded successfully', 'success');
      } catch (error) {
        console.error('Erro ao buscar taxa:', error);
        showMessage('Error loading tax', 'error');
      } finally {
        setIsLoading(false); // Finaliza o carregamento, independentemente do resultado
      }
    };

    loadTax();
  }, [id]);

  const handleSuccess = () => {
    // Redirecionar para a listagem após a edição
    router.push('/dashboard/tax');
  };

  const handleCancel = () => {
    // Redirecionar para a listagem
    router.push('/dashboard/tax');
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

  if (!initialTax) {
    return <p>Taxa não encontrada.</p>;
  }

  return (
    <div>
      <TaxForm
        title="Edit Tax"
        initialTax={initialTax}
        onSuccess={handleSuccess}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default TaxEditPage;

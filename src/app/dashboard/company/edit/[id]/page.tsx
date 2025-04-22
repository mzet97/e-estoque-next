'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Box, CircularProgress } from '@mui/material';
import { useSnackbar } from '@/context/SnackbarContext';
import { Company } from '../../types/Company';
import { getCompany } from '../../api/companyService';
import CompanyForm from '../../components/CompanyForm';

interface Props {
  params: { id: string };
}

const CompanyEditPage: React.FC<Props> = ({ params }) => {
  const { showMessage } = useSnackbar();
  const { id } = params;
  const router = useRouter();
  const [initialCompany, setInitialCompany] = useState<Company | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadCompany = async () => {
      setIsLoading(true);
      try {
        const CompanyData = await getCompany(id);
        setInitialCompany(CompanyData);
        showMessage('Company loaded successfully', 'success');
      } catch (error) {
        console.error('Erro ao buscar categoria:', error);
        showMessage('Error loading Company', 'error');
      } finally {
        setIsLoading(false);
      }
    };

    loadCompany();
  }, [id]);

  const handleSuccess = () => {
    router.push('/dashboard/company');
  };

  const handleCancel = () => {
    router.push('/dashboard/company');
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

  if (!initialCompany) {
    return <p>Categoria não encontrada.</p>;
  }

  return (
    <div>
      <CompanyForm
        title="Edit Company"
        initialCompany={initialCompany}
        onSuccess={handleSuccess}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default CompanyEditPage;

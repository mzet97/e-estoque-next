'use client';

import CategoryForm from '../../components/CategoryForm';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getCategory } from '../../api/categoryService';
import { Category } from '../../types/Category';
import { Box, CircularProgress } from '@mui/material';
import { useSnackbar } from '@/context/SnackbarContext';

interface Props {
  params: { id: string };
}

const CategoryEditPage: React.FC<Props> = ({ params }) => {
  const { showMessage } = useSnackbar();
  const { id } = params;
  const router = useRouter();
  const [initialCategory, setInitialCategory] = useState<Category | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Estado para controlar o carregamento

  useEffect(() => {
    const loadCategory = async () => {
      setIsLoading(true); // Inicia o carregamento
      try {
        const categoryData = await getCategory(id);
        setInitialCategory(categoryData);
        showMessage('Category loaded successfully', 'success');
      } catch (error) {
        console.error('Erro ao buscar categoria:', error);
        showMessage('Error loading category', 'error');
      } finally {
        setIsLoading(false);
      }
    };

    loadCategory();
  }, [id]);

  const handleSuccess = () => {
    // Redirecionar para a listagem após a edição
    router.push('/dashboard/category');
  };

  const handleCancel = () => {
    // Redirecionar para a listagem
    router.push('/dashboard/category');
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

  if (!initialCategory) {
    return <p>Categoria não encontrada.</p>;
  }

  return (
    <div>
      <CategoryForm
        title="Edit Category"
        initialCategory={initialCategory}
        onSuccess={handleSuccess}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default CategoryEditPage;

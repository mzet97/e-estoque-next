'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Box, CircularProgress } from '@mui/material';
import { Product } from '../../types/Product';
import ProductForm from '../../components/ProductForm';
import { useSnackbar } from '@/context/SnackbarContext';
import { getProduct } from '../../api/productService';

interface Props {
  params: { id: string };
}

const ProductEditPage: React.FC<Props> = ({ params }) => {
  const { showMessage } = useSnackbar();
  const { id } = params;
  const router = useRouter();
  const [initialProduct, setInitialProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProduct = async () => {
      setIsLoading(true);
      try {
        const ProductData = await getProduct(id);
        setInitialProduct(ProductData);
        showMessage('Product loaded successfully', 'success');
      } catch (error) {
        console.error('Erro ao buscar Producta:', error);
        showMessage('Error loading Product', 'error');
      } finally {
        setIsLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  const handleSuccess = () => {
    router.push('/dashboard/product');
  };

  const handleCancel = () => {
    router.push('/dashboard/product');
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

  if (!initialProduct) {
    return <p>Producta não encontrada.</p>;
  }

  return (
    <div>
      <ProductForm
        title="Edit Product"
        initialProduct={initialProduct}
        onSuccess={handleSuccess}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default ProductEditPage;

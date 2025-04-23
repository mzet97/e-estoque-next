'use client';

import { useRouter } from 'next/navigation';
import ProductForm from '../components/ProductForm';

const ProductCreatePage = () => {
  const router = useRouter();

  const handleSuccess = () => {
    router.push('/dashboard/product');
  };

  const handleCancel = () => {
    router.push('/dashboard/product');
  };

  return (
    <div>
      <ProductForm
        title="Create Product"
        onSuccess={handleSuccess}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default ProductCreatePage;

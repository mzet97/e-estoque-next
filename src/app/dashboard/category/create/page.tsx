// filepath: e:\TI\git\v2\e-estoque-next\src\features\category\app\create\page.tsx
'use client';

import { useRouter } from 'next/navigation';
import CategoryForm from '../components/CategoryForm';

const CategoryCreatePage = () => {
  const router = useRouter();

  const handleSuccess = () => {
    router.push('/dashboard/category');
  };

  const handleCancel = () => {
    router.push('/dashboard/category');
  };

  return (
    <div>
      <CategoryForm
        title="Create Category"
        onSuccess={handleSuccess}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default CategoryCreatePage;

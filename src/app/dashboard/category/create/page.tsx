// filepath: e:\TI\git\v2\e-estoque-next\src\features\category\app\create\page.tsx
'use client';


import { useRouter } from 'next/navigation';
import CategoryForm from '../components/CategoryForm';

const CategoryCreatePage = () => {
  const router = useRouter();

  const handleSuccess = () => {
    // Redirecionar para a listagem após a criação
    router.push('/dashboard/category');
  };

  const handleCancel = () => {
    // Redirecionar para a listagem
    router.push('/dashboard/category');
  };

  return (
    <div>
      <h1>Create Category</h1>
      <CategoryForm onSuccess={handleSuccess} onCancel={handleCancel} />
    </div>
  );
};

export default CategoryCreatePage;
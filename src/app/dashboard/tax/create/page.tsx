// filepath: e:\TI\git\v2\e-estoque-next\src\features\category\app\create\page.tsx
'use client';

import { useRouter } from 'next/navigation';
import TaxForm from '../components/TaxForm';

const TaxCreatePage = () => {
  const router = useRouter();

  const handleSuccess = () => {
    // Redirecionar para a listagem após a criação
    router.push('/dashboard/tax');
  };

  const handleCancel = () => {
    // Redirecionar para a listagem
    router.push('/dashboard/tax');
  };

  return (
    <div>
      <TaxForm
        title="Create Tax"
        onSuccess={handleSuccess}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default TaxCreatePage;

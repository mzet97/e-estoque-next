// filepath: e:\TI\git\v2\e-estoque-next\src\features\category\app\create\page.tsx
'use client';

import { useRouter } from 'next/navigation';
import InventoryForm from '../components/InventoryForm';

const InventoryCreatePage = () => {
  const router = useRouter();

  const handleSuccess = () => {
    router.push('/dashboard/inventory');
  };

  const handleCancel = () => {
    router.push('/dashboard/inventory');
  };

  return (
    <div>
      <InventoryForm
        title="Create Inventory"
        onSuccess={handleSuccess}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default InventoryCreatePage;

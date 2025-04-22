'use client';

import { useRouter } from 'next/navigation';
import CustomerForm from '../components/CompanyForm';

const CustomerCreatePage = () => {
  const router = useRouter();

  const handleSuccess = () => {
    router.push('/dashboard/customer');
  };

  const handleCancel = () => {
    router.push('/dashboard/customer');
  };

  return (
    <div>
      <CustomerForm
        title="Create Customer"
        onSuccess={handleSuccess}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default CustomerCreatePage;

'use client';

import { useRouter } from 'next/navigation';
import CompanyForm from '../components/CompanyForm';

const CompanyCreatePage = () => {
  const router = useRouter();

  const handleSuccess = () => {
    router.push('/dashboard/company');
  };

  const handleCancel = () => {
    router.push('/dashboard/company');
  };

  return (
    <div>
      <CompanyForm
        title="Create Company"
        onSuccess={handleSuccess}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default CompanyCreatePage;

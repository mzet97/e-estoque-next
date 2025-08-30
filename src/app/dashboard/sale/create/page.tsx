'use client';

import { useRouter } from 'next/navigation';
import SaleForm from '../components/SaleForm';

const SaleCreatePage = () => {
    const router = useRouter();

    const handleSuccess = () => {
        router.push('/dashboard/sale');
    };

    const handleCancel = () => {
        router.push('/dashboard/sale');
    };

    return (
        <div>
            <SaleForm
                title="Create Sale"
                onSuccess={handleSuccess}
                onCancel={handleCancel}
            />
        </div>
    );
};

export default SaleCreatePage;

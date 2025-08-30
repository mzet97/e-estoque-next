'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Box, CircularProgress } from '@mui/material';
import { Sale } from '../../types/Sale';
import { useSnackbar } from '@/context/SnackbarContext';
import { getSale } from '../../api/saleService';
import SaleForm from '../../components/SaleForm';

interface Props {
    params: { id: string };
}

const SaleEditPage: React.FC<Props> = ({ params }) => {
    const { showMessage } = useSnackbar();
    const { id } = params;
    const router = useRouter();
    const [initialSale, setInitialSale] = useState<Sale | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadSale = async () => {
            setIsLoading(true);
            try {
                const SaleData = await getSale(id);
                setInitialSale(SaleData);
                showMessage('Sale loaded successfully', 'success');
            } catch (error) {
                console.error('Error fetching sale:', error);
                showMessage('Error loading sale', 'error');
            } finally {
                setIsLoading(false);
            }
        };

        loadSale();
    }, [id]);

    const handleSuccess = () => {
        router.push('/dashboard/sale');
    };

    const handleCancel = () => {
        router.push('/dashboard/sale');
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

    if (!initialSale) {
        return <p>Sale not found.</p>;
    }

    return (
        <div>
            <SaleForm
                title="Edit Sale"
                initialSale={initialSale}
                onSuccess={handleSuccess}
                onCancel={handleCancel}
            />
        </div>
    );
};

export default SaleEditPage;

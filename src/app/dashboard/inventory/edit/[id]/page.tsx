'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Box, CircularProgress } from '@mui/material';
import { Inventory } from '../../types/Inventory';
import { getInventory } from '../../api/inventoryService';
import InventoryForm from '../../components/InventoryForm';
import { useSnackbar } from '@/context/SnackbarContext';

interface Props {
  params: { id: string };
}

const InventoryEditPage: React.FC<Props> = ({ params }) => {
  const { showMessage } = useSnackbar();
  const { id } = params;
  const router = useRouter();
  const [initialInventory, setInitialInventory] = useState<Inventory | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadInventory = async () => {
      setIsLoading(true);
      try {
        const inventoryData = await getInventory(id);
        setInitialInventory(inventoryData);
        showMessage('Inventory loaded successfully', 'success');
      } catch (error) {
        console.error('Erro ao buscar inventorya:', error);
        showMessage('Error loading inventory', 'error');
      } finally {
        setIsLoading(false);
      }
    };

    loadInventory();
  }, [id]);

  const handleSuccess = () => {
    router.push('/dashboard/inventory');
  };

  const handleCancel = () => {
    router.push('/dashboard/inventory');
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

  if (!initialInventory) {
    return <p>Inventorya não encontrada.</p>;
  }

  return (
    <div>
      <InventoryForm
        title="Edit Inventory"
        initialInventory={initialInventory}
        onSuccess={handleSuccess}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default InventoryEditPage;

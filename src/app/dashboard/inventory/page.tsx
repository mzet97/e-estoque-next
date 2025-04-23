'use client';

import {
  Box,
  Button,
  Grid,
  IconButton,
  Paper,
  Tooltip,
  Typography,
} from '@mui/material';
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSnackbar } from '@/context/SnackbarContext';
import { Inventory } from './types/Inventory';
import { getInventories } from './api/inventoryService';

const InventoryPage: React.FC = () => {
  const { showMessage } = useSnackbar();
  const { data: session, status } = useSession();
  const router = useRouter();
  const [inventories, setInventories] = useState<Inventory[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadInventorys = async () => {
      try {
        const InventorysData = await getInventories();
        setInventories(InventorysData);
        setIsLoading(false);
        showMessage('Inventorys loaded successfully', 'success');
      } catch (error) {
        console.error('Erro ao buscar inventoryas:', error);
        showMessage('Error fetching inventorys', 'error');
        setInventories([]);
        setIsLoading(false);
      }
    };

    if (session?.user) {
      loadInventorys();
    }
  }, [status]);

  const handleCreateClick = () => {
    router.push('/dashboard/inventory/create');
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'Id', flex: 1 },
    { field: 'quantity', headerName: 'Quantity', flex: 1 },
    { field: 'dateOrder', type: 'date', headerName: 'Date', flex: 1 },
    { field: 'idProduct', headerName: 'Id Product', flex: 1 },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', gap: 1, margin: 1 }}>
          <Tooltip title="Edit">
            <IconButton
              onClick={() =>
                router.push(`/dashboard/inventory/edit/${params.row.id}`)
              }
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];

  const rows = Array.isArray(inventories)
    ? inventories.map((Inventory) => ({
        id: Inventory.id,
        dateOrder: Inventory.dateOrder ? new Date(Inventory.dateOrder) : null,
        quantity: Inventory.quantity,
        idProduct: Inventory.idProduct,
      }))
    : [];

  if (status === 'loading') {
    return <p>Carregando...</p>;
  }

  if (!session) {
    return <p>Você não está logado.</p>;
  }

  return (
    <>
      <Paper elevation={5} sx={{ padding: 5, margin: 5 }}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid size={{ sm: 10, xs: 10, md: 10, lg: 10, xl: 10 }}>
              <Typography variant="h3" gutterBottom>
                List of Inventorys
              </Typography>
            </Grid>
            <Grid size={{ sm: 2, xs: 2, md: 2, lg: 2, xl: 2 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleCreateClick}
              >
                Create Inventory
              </Button>
            </Grid>
            <Grid
              direction="column"
              sx={{
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}
              size={{ sm: 5, xs: 8, md: 12, lg: 12, xl: 12 }}
            >
              <DataGrid
                rows={rows}
                columns={columns}
                loading={isLoading}
                slots={{
                  toolbar: GridToolbar,
                }}
              />
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </>
  );
};

export default InventoryPage;

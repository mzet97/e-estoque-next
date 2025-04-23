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
import { Product } from './types/Product';
import { getProducts } from './api/productService';

const ProductPage: React.FC = () => {
  const { showMessage } = useSnackbar();
  const { data: session, status } = useSession();
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const ProductsData = await getProducts();
        setProducts(ProductsData);
        setIsLoading(false);
        showMessage('Products loaded successfully', 'success');
      } catch (error) {
        console.error('Erro ao buscar Productas:', error);
        showMessage('Error fetching Products', 'error');
        setProducts([]);
        setIsLoading(false);
      }
    };

    if (session?.user) {
      loadProducts();
    }
  }, [status]);

  const handleCreateClick = () => {
    router.push('/dashboard/product/create');
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'Id', flex: 1 },
    { field: 'name', headerName: 'Nome', flex: 1 },
    { field: 'description', headerName: 'Descrição', flex: 1 },
    { field: 'shortDescription', headerName: 'Descrição Curta', flex: 1 },
    { field: 'price', headerName: 'Preço', flex: 1 },
    { field: 'weight', headerName: 'Peso', flex: 1 },
    { field: 'height', headerName: 'Altura', flex: 1 },
    { field: 'length', headerName: 'Comprimento', flex: 1 },
    { field: 'image', headerName: 'Imagem', flex: 1 },
    { field: 'idCategory', headerName: 'Categoria', flex: 1 },
    { field: 'idCompany', headerName: 'Empresa', flex: 1 },
    { field: 'isDeleted', headerName: 'Deletado?', flex: 1, type: 'boolean' },
    {
      field: 'actions',
      headerName: 'Ações',
      flex: 1,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', gap: 1, margin: 1 }}>
          <Tooltip title="Edit">
            <IconButton
              onClick={() =>
                router.push(`/dashboard/product/edit/${params.row.id}`)
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

  const rows = Array.isArray(products)
    ? products.map((product) => ({
        id: product.id,
        name: product.name,
        description: product.description,
        shortDescription: product.shortDescription,
        price: product.price,
        weight: product.weight,
        height: product.height,
        length: product.length,
        image: product.image,
        idCategory: product.idCategory,
        idCompany: product.idCompany,
        isDeleted: product.isDeleted,
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
                List of Products
              </Typography>
            </Grid>
            <Grid size={{ sm: 2, xs: 2, md: 2, lg: 2, xl: 2 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleCreateClick}
              >
                Create Product
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

export default ProductPage;

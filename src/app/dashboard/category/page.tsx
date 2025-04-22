'use client';

import { Box, Button, Grid, Paper, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getCategories } from './api/categoryService';
import { Category } from './types/Category';
import { useSnackbar } from '@/context/SnackbarContext';

const CategoryPage: React.FC = () => {
  const { showMessage } = useSnackbar();
  const { data: session, status } = useSession();
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const categoriesData = await getCategories();
        setCategories(categoriesData);
        setIsLoading(false);
        showMessage('Categories loaded successfully', 'success');
      } catch (error) {
        console.error("Erro ao buscar categorias:", error);
        showMessage('Error fetching Categories loaded successfully', 'error');
        setCategories([]);
        setIsLoading(false);
      }
    };

    if (session?.user) {
      loadCategories();
    }
  }, [status]);

  const handleCreateClick = () => {
    router.push('/dashboard/category/create');
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'Id', flex: 1 },
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'description', headerName: 'Description', flex: 1 },
    { field: 'shortDescription', headerName: 'Short Description', flex: 1 },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', gap: 1, margin: 1 }}>
          <Button
            variant="contained"
            color='success'
            endIcon={<EditIcon />}
            onClick={() => router.push(`/dashboard/category/edit/${params.row.id}`)}
          >
            Edit
          </Button>
          <Button variant="contained" color='error' endIcon={<DeleteIcon />}>
            Delete
          </Button>
        </Box>
      ),
    },
  ];

  const rows = Array.isArray(categories) ? categories.map(category => ({
    id: category.id,
    name: category.name,
    description: category.description,
    shortDescription: category.shortDescription,
  })) : [];

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
                List of Categories
              </Typography>
            </Grid>
            <Grid size={{ sm: 2, xs: 2, md: 2, lg: 2, xl: 2 }}>
              <Button variant="contained" color="primary" onClick={handleCreateClick}>
                Create Category
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

export default CategoryPage;
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
import { Company } from './types/Company';
import { getCompanies } from './api/companyService';

const CompanyPage: React.FC = () => {
  const { showMessage } = useSnackbar();
  const { data: session, status } = useSession();
  const router = useRouter();
  const [Companies, setCompanies] = useState<Company[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadCompanies = async () => {
      try {
        const CompaniesData = await getCompanies();
        setCompanies(CompaniesData);
        setIsLoading(false);
        showMessage('Companies loaded successfully', 'success');
      } catch (error) {
        console.error('Erro ao buscar Companyas:', error);
        showMessage('Error fetching Companies', 'error');
        setCompanies([]);
        setIsLoading(false);
      }
    };

    if (session?.user) {
      loadCompanies();
    }
  }, [status]);

  const handleCreateClick = () => {
    router.push('/dashboard/company/create');
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'Id', flex: 1 },
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'docId', headerName: 'Document', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 1 },
    { field: 'description', headerName: 'Description', flex: 1 },
    { field: 'phoneNumber', headerName: 'Phone', flex: 1 },
    {
      field: 'address',
      headerName: 'Address',
      flex: 2,
      valueGetter: (_params, row) => {
        const addr = row.CompanyAddress;
        console.log('row', row);
        if (!addr) return '';
        return `${addr.street}, ${addr.number} - ${addr.neighborhood}, ${addr.city} - ${addr.country}, ${addr.zipCode}`;
      },
    },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', gap: 1, margin: 1 }}>
          <Tooltip title="Edit">
            <IconButton
              onClick={() =>
                router.push(`/dashboard/company/edit/${params.row.id}`)
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

  const rows = Array.isArray(Companies)
    ? Companies.map((Company) => ({
        id: Company.id,
        name: Company.name,
        docId: Company.docId,
        email: Company.email,
        description: Company.description,
        phoneNumber: Company.phoneNumber,
        CompanyAddress: Company.companyAddress,
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
                List of Companies
              </Typography>
            </Grid>
            <Grid size={{ sm: 2, xs: 2, md: 2, lg: 2, xl: 2 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleCreateClick}
              >
                Create Company
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

export default CompanyPage;

'use client';

import {
    Box,
    Button,
    Stack,
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
import { Sale } from './types/Sale';
import { getSales } from './api/saleService';
import { format } from 'date-fns';

const SalePage: React.FC = () => {
    const { showMessage } = useSnackbar();
    const { data: session, status } = useSession();
    const router = useRouter();
    const [sales, setSales] = useState<Sale[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadSales = async () => {
            try {
                const salesData = await getSales();
                setSales(salesData);
                setIsLoading(false);
                showMessage('Sales loaded successfully', 'success');
            } catch (error) {
                console.error('Error fetching sales:', error);
                showMessage('Error fetching sales', 'error');
                setSales([]);
                setIsLoading(false);
            }
        };

        if (session?.user) {
            loadSales();
        }
    }, [status]);

    const handleCreateClick = () => {
        router.push('/dashboard/sale/create');
    };

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'customerName', headerName: 'Customer', flex: 1 },
        { field: 'saleType', headerName: 'Sale Type', flex: 1 },
        { field: 'paymentType', headerName: 'Payment Type', flex: 1 },
        { field: 'quantity', headerName: 'Quantity', type: 'number', width: 100 },
        {
            field: 'totalPrice',
            headerName: 'Total Price',
            type: 'number',
            width: 120,
        },
        {
            field: 'totalTax',
            headerName: 'Tax',
            type: 'number',
            width: 100,
        },
        {
            field: 'saleDate',
            headerName: 'Sale Date',
            flex: 1,
        },
        {
            field: 'deliveryDate',
            headerName: 'Delivery Date',
            flex: 1,
        },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 120,
            renderCell: (params) => (
                <Stack direction="row" spacing={1}>
                    <Tooltip title="Edit">
                        <IconButton
                            onClick={() =>
                                router.push(`/dashboard/sale/edit/${params.row.id}`)
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
                </Stack>
            ),
        },
    ];

    const rows = Array.isArray(sales)
        ? sales.map((sale) => ({
            id: sale.id,
            customerName: sale.customer?.name || 'Unknown',
            saleType: sale.saleType,
            paymentType: sale.paymentType,
            quantity: sale.quantity,
            totalPrice: sale.totalPrice,
            totalTax: sale.totalTax,
            saleDate: sale.saleDate,
            deliveryDate: sale.deliveryDate,
            productsCount: sale.products?.length || 0,
        }))
        : [];

    if (status === 'loading') {
        return <p>Loading...</p>;
    }

    if (!session) {
        return <p>You are not logged in.</p>;
    }

    return (
        <>
            <Paper elevation={5} sx={{ padding: 5, margin: 5 }}>
                <Box sx={{ flexGrow: 1 }}>
                    <Stack
                        direction="row"
                        spacing={2}
                        alignItems="center"
                        justifyContent="space-between"
                        sx={{ mb: 3 }}
                    >
                        <Typography variant="h4">
                            Sales
                        </Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleCreateClick}
                        >
                            Create Sale
                        </Button>
                    </Stack>

                    <Box sx={{ height: 600, width: '100%' }}>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            loading={isLoading}
                            pageSizeOptions={[10, 25, 50]}
                            initialState={{
                                pagination: {
                                    paginationModel: { pageSize: 10, page: 0 },
                                },
                            }}
                            slots={{
                                toolbar: GridToolbar,
                            }}
                            disableRowSelectionOnClick
                        />
                    </Box>
                </Box>
            </Paper>
        </>
    );
};

export default SalePage;

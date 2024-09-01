'use client';
import canAccess from '@/components/CanAccess/CanAccess';
import Product from '@/models/Product/Product';
import PagedResult from '@/models/Result/PagedResult';
import { api } from '@/services/apiClient';
import { findAllProducts } from '@/services/productsServices';
import { Button, IconButton, Skeleton, Stack, Typography } from '@mui/material';
import {
    DataGrid,
    GridColDef,
    GridRowParams,
    GridToolbarColumnsButton,
    GridToolbarContainer,
    GridToolbarDensitySelector,
    GridToolbarExport,
    GridToolbarFilterButton,
} from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import SnackbarAlert from '@/components/SnackbarAlert/SnackbarAlert';

function CustomGridToolbar(pros: any) {
    return (
        <GridToolbarContainer>
            <GridToolbarColumnsButton />
            <GridToolbarFilterButton />
            <GridToolbarDensitySelector />
            <GridToolbarExport
                csvOptions={{
                    fileName: `products-${Date.now()}`,
                    delimiter: ';',
                    utf8WithBom: true,
                }}
            />
        </GridToolbarContainer>
    );
}

function ProductPage() {
    const columns: GridColDef[] = [
        { field: 'id', headerName: 'Id', width: 100 },
        { field: 'name', headerName: 'Name', width: 200 },
        { field: 'description', headerName: 'Description', width: 200 },
        {
            field: 'shortDescription',
            headerName: 'ShortDescription',
            width: 200,
        },
        { field: 'price', headerName: 'Price', width: 200 },
        { field: 'weight', headerName: 'Weight', width: 200 },
        { field: 'height', headerName: 'Height', width: 200 },
        { field: 'length', headerName: 'Length', width: 200 },
        { field: 'image', headerName: 'Image', width: 200 },
        {
            field: 'idCategory',
            headerName: 'IdCategory',
            width: 100,
        },
        {
            field: 'idCompany',
            headerName: 'IdCompany',
            width: 100,
        },
        {
            field: 'createdAt',
            headerName: 'Create Date',
            type: 'text',
            width: 100,
        },
        {
            field: 'updatedAt',
            headerName: 'Update Date',
            type: 'text',
            width: 100,
        },
        {
            field: 'deletedAt',
            headerName: 'Delete Date',
            type: 'text',
            width: 100,
        },
        {
            field: 'action',
            headerName: 'Action',
            sortable: false,
            renderCell: ({ id }: Partial<GridRowParams>) => (
                <>
                    <IconButton
                        aria-label="edit"
                        size="large"
                        onClick={() => handleEdit(id + '')}
                    >
                        <EditIcon />
                    </IconButton>
                    <IconButton
                        aria-label="delete"
                        size="large"
                        onClick={() => handleDelete(id + '')}
                    >
                        <DeleteIcon />
                    </IconButton>
                </>
            ),
            width: 200,
        },
    ];
    const router = useRouter();
    const [products, setProducts] = useState<Product[]>([]);
    const [pagedResult, setPagedResult] = useState<PagedResult>();
    const [isError, setIsError] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('Teste');

    const handleClose = (
        event?: React.SyntheticEvent | Event,
        reason?: string,
    ) => {
        if (reason === 'clickaway') {
            return;
        }

        setIsOpen(false);
    };

    const getData = useCallback(async () => {
        const reuslt = await findAllProducts();
        if (reuslt) {
            setProducts([...(reuslt.data as Product[])]);
            setPagedResult(reuslt.pagedResult);

            setMessage('Success load products.');
            setIsError(false);
            setIsOpen(true);
        }
    }, []);

    useEffect(() => {
        getData();
    }, [getData]);

    const handleDelete = (id: string) => {
        api.delete(`Product/${id}`)
            .then(response => {
                setMessage('Success delete product.');
                setIsError(false);
                setIsOpen(true);

                router.push('/product/');
            })
            .catch(err => {
                setMessage('Failure delete product.');
                setIsError(true);
                setIsOpen(true);
            });
    };
    const handleEdit = (id: string) => {
        router.push('/product/' + id);
    };

    const handleCreate = () => {
        router.push('/product/create');
    };

    return (
        <>
            <Stack direction="column" spacing={2}>
                <Stack
                    direction="row"
                    justifyContent="space-around"
                    alignItems="center"
                    spacing={2}
                    sx={{ mt: '2rem', pt: '1rem' }}
                >
                    <Typography variant="h2">List of Products</Typography>
                    <Button
                        type="submit"
                        variant="contained"
                        color="secondary"
                        onClick={handleCreate}
                    >
                        <Typography variant="h6">
                            Create a new Product
                        </Typography>
                    </Button>
                </Stack>
                <Stack
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    spacing={2}
                >
                    {!products && !pagedResult ? (
                        <Skeleton
                            variant="rectangular"
                            width={210}
                            height={118}
                        />
                    ) : (
                        <DataGrid
                            sx={{ backgroundColor: 'rgba(72, 180, 212, 0.3)' }}
                            rows={products}
                            columns={columns}
                            initialState={{
                                pagination: {
                                    paginationModel: {
                                        page: 1,
                                        pageSize: 10,
                                    },
                                },
                            }}
                            pageSizeOptions={[5, 10, 20, 30]}
                            slots={{
                                toolbar: CustomGridToolbar,
                            }}
                        />
                    )}
                </Stack>
            </Stack>

            <SnackbarAlert
                open={isOpen}
                handleClose={handleClose}
                isError={isError}
                message={message}
            />
        </>
    );
}

export default canAccess(ProductPage);

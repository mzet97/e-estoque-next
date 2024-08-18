import canAccess from '@/components/CanAccess/CanAccess';
import SnackbarAlert from '@/components/SnackbarAlert/SnackbarAlert';
import PagedResult from '@/models/Result/PagedResult';
import Category from '@/models/category/Category';
import { api } from '@/services/apiClient';
import { findAllCategories } from '@/services/categoriesServices';
import { Button, IconButton, Skeleton, Stack, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import {
    DataGrid,
    GridColDef,
    GridPagination,
    GridToolbarColumnsButton,
    GridToolbarContainer,
    GridValueGetterParams,
    GridToolbarFilterButton,
    GridToolbarDensitySelector,
    GridToolbarExport,
    GridRowParams,
} from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

function CustomGridToolbar(pros: any) {
    return (
        <GridToolbarContainer>
            <GridToolbarColumnsButton />
            <GridToolbarFilterButton />
            <GridToolbarDensitySelector />
            <GridToolbarExport
                csvOptions={{
                    fileName: `categories-${Date.now()}`,
                    delimiter: ';',
                    utf8WithBom: true,
                }}
            />
        </GridToolbarContainer>
    );
}

function CategoryPage() {
    const columns: GridColDef[] = [
        { field: 'id', headerName: 'Id', width: 300 },
        { field: 'name', headerName: 'Name', width: 200 },
        { field: 'description', headerName: 'Description', width: 300 },
        {
            field: 'createdAt',
            headerName: 'Create Date',
            type: 'text',
            width: 300,
        },
        {
            field: 'updatedAt',
            headerName: 'Update Date',
            type: 'text',
            width: 300,
        },
        {
            field: 'deletedAt',
            headerName: 'Delete Date',
            type: 'text',
            width: 300,
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
            width: 150,
        },
    ];

    const router = useRouter();
    const [isError, setIsError] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('Teste');
    const [categories, setCategories] = useState<Category[]>([]);
    const [pagedResult, setPagedResult] = useState<PagedResult>();

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
        const reuslt = await findAllCategories();
        if (reuslt) {
            setCategories([...reuslt.data]);
            setPagedResult(reuslt.pagedResult);

            setMessage('Success load categories.');
            setIsError(false);
            setIsOpen(true);
        }
    }, []);

    useEffect(() => {
        getData();
    }, [getData]);

    const handleDelete = (id: string) => {
        api.delete(`Category/${id}`)
            .then(response => {
                setMessage('Success delete categories.');
                setIsError(false);
                setIsOpen(true);

                router.push('/category/');
            })
            .catch(err => {
                setMessage('Failure delete categories.');
                setIsError(true);
                setIsOpen(true);
            });
    };
    const handleEdit = (id: string) => {
        router.push('/category/' + id);
    };

    const handleCreate = () => {
        router.push('/category/create');
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
                    <Typography variant="h2">List of Categories</Typography>
                    <Button
                        type="submit"
                        variant="contained"
                        color="secondary"
                        onClick={handleCreate}
                    >
                        <Typography variant="h6">
                            Create a new Category
                        </Typography>
                    </Button>
                </Stack>
                <Stack
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    spacing={2}
                >
                    {!categories && !pagedResult ? (
                        <Skeleton
                            variant="rectangular"
                            width={210}
                            height={118}
                        />
                    ) : (
                        <DataGrid
                            sx={{ backgroundColor: 'rgba(72, 180, 212, 0.3)' }}
                            rows={categories}
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

export default canAccess(CategoryPage);

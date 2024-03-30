import canAccess from '@/components/CanAccess/CanAccess';
import SnackbarAlert from '@/components/SnackbarAlert/SnackbarAlert';
import PagedResult from '@/models/Result/PagedResult';
import Tax from '@/models/Tax/Tax';
import { api } from '@/services/apiClient';
import { findAllTaxs } from '@/services/taxServices';
import { Button, IconButton, Skeleton, Stack, Typography } from '@mui/material';
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
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

function CustomGridToolbar(pros: any) {
    return (
        <GridToolbarContainer>
            <GridToolbarColumnsButton />
            <GridToolbarFilterButton />
            <GridToolbarDensitySelector />
            <GridToolbarExport
                csvOptions={{
                    fileName: `taxs-${Date.now()}`,
                    delimiter: ';',
                    utf8WithBom: true,
                }}
            />
        </GridToolbarContainer>
    );
}

function TaxPage() {
    const columns: GridColDef[] = [
        {
            field: 'id',
            headerName: 'Id',
            width: 300,
            resizable: true,
        },
        { field: 'name', headerName: 'Name', width: 100, resizable: true },
        {
            field: 'description',
            headerName: 'Description',
            width: 200,
            resizable: true,
        },
        {
            field: 'percentage',
            headerName: 'Percentage',
            width: 100,
            resizable: true,
        },
        {
            field: 'idCategory',
            headerName: 'Id Category',
            width: 300,
            resizable: true,
        },
        {
            field: 'createdAt',
            headerName: 'Create Date',
            type: 'text',
            width: 300,
            resizable: true,
        },
        {
            field: 'updatedAt',
            headerName: 'Update Date',
            type: 'text',
            width: 300,
            resizable: true,
        },
        {
            field: 'deletedAt',
            headerName: 'Delete Date',
            type: 'text',
            width: 120,
            resizable: true,
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
            width: 120,
            resizable: true,
        },
    ];

    const router = useRouter();
    const [isError, setIsError] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('Teste');
    const [taxs, setTaxs] = useState<Tax[]>([]);
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
        const reuslt = await findAllTaxs();
        if (reuslt) {
            setTaxs([...reuslt.data]);
            setPagedResult(reuslt.pagedResult);

            setMessage('Success load tax.');
            setIsError(false);
            setIsOpen(true);
        }
    }, []);

    useEffect(() => {
        getData();
    }, [getData]);

    const handleDelete = (id: string) => {
        api.delete(`Tax/${id}`)
            .then(response => {
                setMessage('Success delete tax.');
                setIsError(false);
                setIsOpen(true);
                router.push('/tax/');
            })
            .catch(err => {
                setMessage('Failure delete tax.');
                setIsError(true);
                setIsOpen(true);
            });
    };
    const handleEdit = (id: string) => {
        router.push('/tax/' + id);
    };

    const handleCreate = () => {
        router.push('/tax/create');
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
                    <Typography variant="h2">List of Taxs</Typography>
                    <Button
                        type="submit"
                        variant="contained"
                        color="secondary"
                        onClick={handleCreate}
                    >
                        <Typography variant="h6">Create a new Tax</Typography>
                    </Button>
                </Stack>
                <Stack
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    spacing={2}
                >
                    {!taxs && !pagedResult ? (
                        <Skeleton
                            variant="rectangular"
                            width={210}
                            height={118}
                        />
                    ) : (
                        <DataGrid
                            sx={{ backgroundColor: 'rgba(72, 180, 212, 0.3)' }}
                            rows={taxs}
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

export default canAccess(TaxPage);

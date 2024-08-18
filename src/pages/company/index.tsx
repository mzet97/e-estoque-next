import canAccess from '@/components/CanAccess/CanAccess';
import SnackbarAlert from '@/components/SnackbarAlert/SnackbarAlert';
import Company from '@/models/Company/Company';
import PagedResult from '@/models/Result/PagedResult';
import { api } from '@/services/apiClient';
import { findAllCompanies } from '@/services/companiesServices';
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
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
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
                    fileName: `companies-${Date.now()}`,
                    delimiter: ';',
                    utf8WithBom: true,
                }}
            />
        </GridToolbarContainer>
    );
}

function CompanyPage() {
    const columns: GridColDef[] = [
        { field: 'id', headerName: 'Id', width: 100 },
        { field: 'docId', headerName: 'DocId', width: 200 },
        { field: 'name', headerName: 'Name', width: 200 },
        { field: 'email', headerName: 'Email', width: 200 },
        { field: 'phoneNumber', headerName: 'PhoneNumber', width: 200 },
        { field: 'description', headerName: 'Description', width: 200 },
        {
            field: 'idCompanyAddress',
            headerName: 'IdCompanyAddress',
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
    const [isError, setIsError] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('Teste');
    const [companies, setCompanies] = useState<Company[]>([]);
    const [pagedResult, setPagedResult] = useState<PagedResult>();

    const getData = useCallback(async () => {
        const reuslt = await findAllCompanies();
        if (reuslt) {
            setCompanies([...reuslt.data]);
            setPagedResult(reuslt.pagedResult);

            setMessage('Success load companies.');
            setIsError(false);
            setIsOpen(true);
        }
    }, []);

    useEffect(() => {
        getData();
    }, [getData]);

    const handleClose = (
        event?: React.SyntheticEvent | Event,
        reason?: string,
    ) => {
        if (reason === 'clickaway') {
            return;
        }

        setIsOpen(false);
    };

    const handleDelete = (id: string) => {
        api.delete(`Company/${id}`)
            .then(response => {
                setMessage('Success delete company.');
                setIsError(false);
                setIsOpen(true);

                router.push('/company/');
            })
            .catch(err => {
                setMessage('Failure delete company.');
                setIsError(true);
                setIsOpen(true);
            });
    };
    const handleEdit = (id: string) => {
        router.push('/company/' + id);
    };

    const handleCreate = () => {
        router.push('/company/create');
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
                    <Typography variant="h2">List of Companies</Typography>
                    <Button
                        type="submit"
                        variant="contained"
                        color="secondary"
                        onClick={handleCreate}
                    >
                        <Typography variant="h6">
                            Create a new Company
                        </Typography>
                    </Button>
                </Stack>
                <Stack
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    spacing={2}
                >
                    {!companies && !pagedResult ? (
                        <Skeleton
                            variant="rectangular"
                            width={210}
                            height={118}
                        />
                    ) : (
                        <DataGrid
                            sx={{ backgroundColor: 'rgba(72, 180, 212, 0.3)' }}
                            rows={companies}
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

export default canAccess(CompanyPage);

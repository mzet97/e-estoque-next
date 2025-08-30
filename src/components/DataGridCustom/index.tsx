'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Button,
  Grid,
  IconButton,
  Paper,
  Tooltip,
  Typography,
} from '@mui/material';
import {
  DataGrid,
  GridColDef,
  GridToolbar,
  GridPaginationModel,
  GridSortModel,
  GridFilterModel,
} from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
  DataGridCustomProps,
  ServerSideParams,
  PaginatedResponse,
  SortModel,
  FilterModel,
} from '@/types/DataGridTypes';
import { useSnackbar } from '@/context/SnackbarContext';

const DataGridCustom = <T extends { id: string | number }>({
  columns,
  fetchData,
  title,
  createButtonText = 'Create',
  onCreateClick,
  onEditClick,
  onDeleteClick,
  showActions = true,
  initialPageSize = 25,
}: DataGridCustomProps<T>) => {
  const { showMessage } = useSnackbar();
  const [rows, setRows] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [rowCount, setRowCount] = useState(0);
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: initialPageSize,
  });
  const [sortModel, setSortModel] = useState<GridSortModel>([]);
  const [filterModel, setFilterModel] = useState<GridFilterModel>({
    items: [],
  });

  // Função para converter GridSortModel para SortModel[]
  const convertSortModel = (gridSortModel: GridSortModel): SortModel[] => {
    return gridSortModel.map((item) => ({
      field: item.field,
      sort: item.sort as 'asc' | 'desc',
    }));
  };

  // Função para converter GridFilterModel para FilterModel[]
  const convertFilterModel = (gridFilterModel: GridFilterModel): FilterModel[] => {
    return gridFilterModel.items.map((item) => ({
      field: item.field,
      operator: item.operator,
      value: item.value,
    }));
  };

  // Função para buscar dados do servidor
  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const params: ServerSideParams = {
        page: paginationModel.page,
        pageSize: paginationModel.pageSize,
        sortModel: convertSortModel(sortModel),
        filterModel: convertFilterModel(filterModel),
      };

      const response: PaginatedResponse<T> = await fetchData(params);
      setRows(response.data);
      setRowCount(response.total);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      showMessage('Erro ao carregar dados', 'error');
      setRows([]);
      setRowCount(0);
    } finally {
      setLoading(false);
    }
  }, [paginationModel, sortModel, filterModel, fetchData, showMessage]);

  // Carregar dados quando os parâmetros mudarem
  useEffect(() => {
    loadData();
  }, [loadData]);

  // Colunas com ações (se habilitado)
  const columnsWithActions: GridColDef[] = showActions
    ? [
        ...columns,
        {
          field: 'actions',
          headerName: 'Actions',
          width: 120,
          sortable: false,
          filterable: false,
          renderCell: (params) => (
            <Box sx={{ display: 'flex', gap: 1 }}>
              {onEditClick && (
                <Tooltip title="Edit">
                  <IconButton
                    size="small"
                    onClick={() => onEditClick(String(params.row.id))}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              )}
              {onDeleteClick && (
                <Tooltip title="Delete">
                  <IconButton
                    size="small"
                    onClick={() => onDeleteClick(String(params.row.id))}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              )}
            </Box>
          ),
        },
      ]
    : columns;

  return (
    <Paper elevation={5} sx={{ padding: 5, margin: 5 }}>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid size={{ sm: 10, xs: 10, md: 10, lg: 10, xl: 10 }}>
            <Typography variant="h3" gutterBottom>
              {title}
            </Typography>
          </Grid>
          {onCreateClick && (
            <Grid size={{ sm: 2, xs: 2, md: 2, lg: 2, xl: 2 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={onCreateClick}
                fullWidth
              >
                {createButtonText}
              </Button>
            </Grid>
          )}
          <Grid
            direction="column"
            sx={{
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}
            size={{ sm: 12, xs: 12, md: 12, lg: 12, xl: 12 }}
          >
            <DataGrid
              rows={rows}
              columns={columnsWithActions}
              loading={loading}
              rowCount={rowCount}
              paginationMode="server"
              sortingMode="server"
              filterMode="server"
              paginationModel={paginationModel}
              onPaginationModelChange={setPaginationModel}
              sortModel={sortModel}
              onSortModelChange={setSortModel}
              filterModel={filterModel}
              onFilterModelChange={setFilterModel}
              pageSizeOptions={[10, 25, 50, 100]}
              slots={{
                toolbar: GridToolbar,
              }}
              sx={{
                height: 600,
                width: '100%',
              }}
            />
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default DataGridCustom;
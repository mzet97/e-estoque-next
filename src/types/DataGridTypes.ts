export interface SortModel {
  field: string;
  sort: 'asc' | 'desc';
}

export interface FilterModel {
  field: string;
  operator: string;
  value: any;
}

export interface PaginationModel {
  page: number;
  pageSize: number;
}

export interface ServerSideParams {
  page: number;
  pageSize: number;
  sortModel?: SortModel[];
  filterModel?: FilterModel[];
  search?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface DataGridCustomProps<T> {
  columns: any[];
  fetchData: (params: ServerSideParams) => Promise<PaginatedResponse<T>>;
  title: string;
  createButtonText?: string;
  onCreateClick?: () => void;
  onEditClick?: (id: string) => void;
  onDeleteClick?: (id: string) => void;
  showActions?: boolean;
  initialPageSize?: number;
}
export default interface ApiResponse<T> {
  data: T;
  success: boolean;
  message: string;
  pagedResult?: {
    currentPage: number;
    pageCount: number;
    pageSize: number;
    rowCount: number;
    firstRowOnPage: number;
    lastRowOnPage: number;
  };
}
import axiosInstance from '@/config/axiosInstance';
import { Category } from '../types/Category';
import ApiResponse from '@/types/ApiResponse';
import { ServerSideParams, PaginatedResponse } from '@/types/DataGridTypes';

export const getCategories = async (): Promise<Category[]> => {
  try {
    const response = await axiosInstance.get<ApiResponse<Category[]>>('/categories');
    return response.data.data;
  } catch (error) {
    console.error("Erro ao buscar categorias:", error);
    throw error;
  }
};

// Tipo para a resposta da API conforme especificação
interface ApiCategoryResponse {
  data: Category[];
  pagedResult: {
    currentPage: number;
    pageCount: number;
    pageSize: number;
    rowCount: number;
    firstRowOnPage: number;
    lastRowOnPage: number;
  };
  success: boolean;
  message: string;
}

export const getCategoriesPaginated = async (params: ServerSideParams): Promise<PaginatedResponse<Category>> => {
  try {
    const queryParams = new URLSearchParams();

    // Parâmetros de paginação
    queryParams.append('PageIndex', (params.page + 1).toString()); // MUI DataGrid usa 0-based, backend usa 1-based
    queryParams.append('PageSize', params.pageSize.toString());

    // Parâmetros de ordenação
    if (params.sortModel && params.sortModel.length > 0) {
      const sort = params.sortModel[0];
      queryParams.append('Order', `${sort.field} ${sort.sort}`);
    }

    // Parâmetros de filtro específicos
    if (params.filterModel && params.filterModel.length > 0) {
      params.filterModel.forEach((filter) => {
        switch (filter.field) {
          case 'name':
            queryParams.append('Name', filter.value);
            break;
          case 'description':
            queryParams.append('Description', filter.value);
            break;
          case 'shortDescription':
            queryParams.append('ShortDescription', filter.value);
            break;
          case 'id':
            queryParams.append('Id', filter.value);
            break;
          case 'createdAt':
            queryParams.append('CreatedAt', filter.value);
            break;
          case 'updatedAt':
            queryParams.append('UpdatedAt', filter.value);
            break;
          case 'deletedAt':
            queryParams.append('DeletedAt', filter.value);
            break;
        }
      });
    }

    // Busca global pode ser aplicada aos campos principais
    if (params.search) {
      queryParams.append('Name', params.search);
    }

    const response = await axiosInstance.get<ApiCategoryResponse>(
      `/categories?${queryParams.toString()}`
    );

    // Converter a resposta da API para o formato esperado pelo DataGrid
    const apiResponse = response.data;
    return {
      data: apiResponse.data,
      total: apiResponse.pagedResult.rowCount,
      page: apiResponse.pagedResult.currentPage - 1, // Converter para 0-based
      pageSize: apiResponse.pagedResult.pageSize,
      totalPages: apiResponse.pagedResult.pageCount
    };
  } catch (error) {
    console.error("Erro ao buscar categorias paginadas:", error);
    throw error;
  }
};

export const getCategory = async (id: string): Promise<Category> => {
  try {
    const response = await axiosInstance.get<ApiResponse<Category>>(`/categories/${id}`);
    return response.data.data;
  } catch (error) {
    console.error(`Erro ao buscar categoria com ID ${id}:`, error);
    throw error;
  }
};

export const createCategory = async (category: Omit<Category, 'id'>): Promise<Category> => {
  try {
    const response = await axiosInstance.post<ApiResponse<Category>>('/categories', category);
    return response.data.data;
  } catch (error) {
    console.error("Erro ao criar categoria:", error);
    throw error;
  }
};

export const updateCategory = async (category: Category & { id: string }): Promise<Category> => {
  try {
    const response = await axiosInstance.put<ApiResponse<Category>>(`/categories/${category.id}`, category);
    return response.data.data;
  } catch (error) {
    console.error(`Erro ao atualizar categoria com ID ${category.id}:`, error);
    throw error;
  }
};

export const deleteCategory = async (id: string): Promise<void> => {
  try {
    await axiosInstance.delete(`/categories/${id}`);
  } catch (error) {
    console.error(`Erro ao deletar categoria com ID ${id}:`, error);
    throw error;
  }
};
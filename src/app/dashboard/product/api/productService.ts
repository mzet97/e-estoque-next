import axiosInstance from '@/config/axiosInstance';
import ApiResponse from '@/types/ApiResponse';
import { Product } from '../types/Product';

export const getProducts = async (): Promise<Product[]> => {
  try {
    const response =
      await axiosInstance.get<ApiResponse<Product[]>>('/Products');
    return response.data.data;
  } catch (error) {
    console.error('Erro ao buscar clientes:', error);
    throw error;
  }
};

export const getProduct = async (id: string): Promise<Product> => {
  try {
    const response = await axiosInstance.get<ApiResponse<Product>>(
      `/Products/${id}`,
    );
    return response.data.data;
  } catch (error) {
    console.error(`Erro ao buscar categoria com ID ${id}:`, error);
    throw error;
  }
};

export const createProduct = async (
  product: Omit<Product, 'id'>,
): Promise<Product> => {
  try {
    const response = await axiosInstance.post<ApiResponse<Product>>(
      '/Products',
      product,
    );
    return response.data.data;
  } catch (error) {
    console.error('Erro ao criar categoria:', error);
    throw error;
  }
};

export const updateProduct = async (product: Product): Promise<Product> => {
  try {
    const response = await axiosInstance.put<ApiResponse<Product>>(
      `/Products/${product.id}`,
      product,
    );
    return response.data.data;
  } catch (error) {
    console.error(`Erro ao atualizar categoria com ID ${product.id}:`, error);
    throw error;
  }
};

export const deleteProduct = async (id: string): Promise<void> => {
  try {
    await axiosInstance.delete(`/Products/${id}`);
  } catch (error) {
    console.error(`Erro ao deletar categoria com ID ${id}:`, error);
    throw error;
  }
};

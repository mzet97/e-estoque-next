import axiosInstance from '@/config/axiosInstance';
import { Category } from '../types/Category';
import ApiResponse from '@/types/ApiResponse';

export const getCategories = async (): Promise<Category[]> => {
  try {
    const response = await axiosInstance.get<ApiResponse<Category[]>>('/categories');
    return response.data.data;
  } catch (error) {
    console.error("Erro ao buscar categorias:", error);
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

export const updateCategory = async (category: Category): Promise<Category> => {
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
import axiosInstance from '@/config/axiosInstance';
import ApiResponse from '@/types/ApiResponse';
import { Company } from '../types/Company';

export const getCompanies = async (): Promise<Company[]> => {
  try {
    const response = await axiosInstance.get<ApiResponse<Company[]>>('/Companies');
    return response.data.data;
  } catch (error) {
    console.error("Erro ao buscar categorias:", error);
    throw error;
  }
};

export const getCompany = async (id: string): Promise<Company> => {
  try {
    const response = await axiosInstance.get<ApiResponse<Company>>(`/Companies/${id}`);
    return response.data.data;
  } catch (error) {
    console.error(`Erro ao buscar categoria com ID ${id}:`, error);
    throw error;
  }
};

export const createCompany = async (company: Omit<Company, 'id'>): Promise<Company> => {
  try {
    const response = await axiosInstance.post<ApiResponse<Company>>('/Companies', company);
    return response.data.data;
  } catch (error) {
    console.error("Erro ao criar categoria:", error);
    throw error;
  }
};

export const updateCompany = async (company: Company): Promise<Company> => {
  try {
    const response = await axiosInstance.put<ApiResponse<Company>>(`/Companies/${company.id}`, company);
    return response.data.data;
  } catch (error) {
    console.error(`Erro ao atualizar categoria com ID ${company.id}:`, error);
    throw error;
  }
};

export const deleteCompany = async (id: string): Promise<void> => {
  try {
    await axiosInstance.delete(`/Companies/${id}`);
  } catch (error) {
    console.error(`Erro ao deletar categoria com ID ${id}:`, error);
    throw error;
  }
};
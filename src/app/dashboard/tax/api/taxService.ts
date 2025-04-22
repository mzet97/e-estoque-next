import axiosInstance from '@/config/axiosInstance';
import { Tax } from '../types/Tax';
import ApiResponse from '@/types/ApiResponse';

export const getTaxs = async (): Promise<Tax[]> => {
  try {
    const response = await axiosInstance.get<ApiResponse<Tax[]>>('/Taxs');
    return response.data.data;
  } catch (error) {
    console.error("Erro ao buscar taxa:", error);
    throw error;
  }
};

export const getTax = async (id: string): Promise<Tax> => {
  try {
    const response = await axiosInstance.get<ApiResponse<Tax>>(`/Taxs/${id}`);
    return response.data.data;
  } catch (error) {
    console.error(`Erro ao buscar taxa com ID ${id}:`, error);
    throw error;
  }
};

export const createTax = async (tax: Omit<Tax, 'id'>): Promise<Tax> => {
  try {
    const response = await axiosInstance.post<ApiResponse<Tax>>('/Taxs', tax);
    return response.data.data;
  } catch (error) {
    console.error("Erro ao criar taxa:", error);
    throw error;
  }
};

export const updateTax = async (tax: Tax): Promise<Tax> => {
  try {
    const response = await axiosInstance.put<ApiResponse<Tax>>(`/Taxs/${tax.id}`, tax);
    return response.data.data;
  } catch (error) {
    console.error(`Erro ao atualizar taxa com ID ${tax.id}:`, error);
    throw error;
  }
};

export const deleteTax = async (id: string): Promise<void> => {
  try {
    await axiosInstance.delete(`/Taxs/${id}`);
  } catch (error) {
    console.error(`Erro ao deletar taxa com ID ${id}:`, error);
    throw error;
  }
};
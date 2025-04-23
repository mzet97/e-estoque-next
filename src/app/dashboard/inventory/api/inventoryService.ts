import axiosInstance from '@/config/axiosInstance';
import ApiResponse from '@/types/ApiResponse';
import { Inventory } from '../types/Inventory';

export const getInventories = async (): Promise<Inventory[]> => {
  try {
    const response =
      await axiosInstance.get<ApiResponse<Inventory[]>>('/Inventories');
    return response.data.data;
  } catch (error) {
    console.error('Erro ao buscar categorias:', error);
    throw error;
  }
};

export const getInventory = async (id: string): Promise<Inventory> => {
  try {
    const response = await axiosInstance.get<ApiResponse<Inventory>>(
      `/Inventories/${id}`,
    );
    return response.data.data;
  } catch (error) {
    console.error(`Erro ao buscar categoria com ID ${id}:`, error);
    throw error;
  }
};

export const createInventory = async (
  inventory: Omit<Inventory, 'id'>,
): Promise<Inventory> => {
  try {
    const response = await axiosInstance.post<ApiResponse<Inventory>>(
      '/Inventories',
      inventory,
    );
    return response.data.data;
  } catch (error) {
    console.error('Erro ao criar categoria:', error);
    throw error;
  }
};

export const updateInventory = async (
  inventory: Inventory,
): Promise<Inventory> => {
  try {
    const response = await axiosInstance.put<ApiResponse<Inventory>>(
      `/Inventories/${inventory.id}`,
      inventory,
    );
    return response.data.data;
  } catch (error) {
    console.error(`Erro ao atualizar categoria com ID ${inventory.id}:`, error);
    throw error;
  }
};

export const deleteInventory = async (id: string): Promise<void> => {
  try {
    await axiosInstance.delete(`/Inventories/${id}`);
  } catch (error) {
    console.error(`Erro ao deletar categoria com ID ${id}:`, error);
    throw error;
  }
};

import axiosInstance from '@/config/axiosInstance';
import ApiResponse from '@/types/ApiResponse';
import { Sale } from '../types/Sale';

export const getSales = async (): Promise<Sale[]> => {
    try {
        const response =
            await axiosInstance.get<ApiResponse<Sale[]>>('/Sales');
        return response.data.data;
    } catch (error) {
        console.error('Erro ao buscar clientes:', error);
        throw error;
    }
};

export const getSale = async (id: string): Promise<Sale> => {
    try {
        const response = await axiosInstance.get<ApiResponse<Sale>>(
            `/Sales/${id}`,
        );
        return response.data.data;
    } catch (error) {
        console.error(`Erro ao buscar categoria com ID ${id}:`, error);
        throw error;
    }
};

export const createSale = async (
    Sale: Omit<Sale, 'id'>,
): Promise<Sale> => {
    try {
        const response = await axiosInstance.post<ApiResponse<Sale>>(
            '/Sales',
            Sale,
        );
        return response.data.data;
    } catch (error) {
        console.error('Erro ao criar categoria:', error);
        throw error;
    }
};

export const updateSale = async (Sale: Sale): Promise<Sale> => {
    try {
        const response = await axiosInstance.put<ApiResponse<Sale>>(
            `/Sales/${Sale.id}`,
            Sale,
        );
        return response.data.data;
    } catch (error) {
        console.error(`Erro ao atualizar categoria com ID ${Sale.id}:`, error);
        throw error;
    }
};

export const deleteSale = async (id: string): Promise<void> => {
    try {
        await axiosInstance.delete(`/Sales/${id}`);
    } catch (error) {
        console.error(`Erro ao deletar categoria com ID ${id}:`, error);
        throw error;
    }
};

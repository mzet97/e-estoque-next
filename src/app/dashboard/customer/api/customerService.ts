import axiosInstance from '@/config/axiosInstance';
import ApiResponse from '@/types/ApiResponse';
import { Customer } from '../types/Customer';

export const getCustomers = async (): Promise<Customer[]> => {
  try {
    const response =
      await axiosInstance.get<ApiResponse<Customer[]>>('/Customers');
    return response.data.data;
  } catch (error) {
    console.error('Erro ao buscar clientes:', error);
    throw error;
  }
};

export const getCustomer = async (id: string): Promise<Customer> => {
  try {
    const response = await axiosInstance.get<ApiResponse<Customer>>(
      `/Customers/${id}`,
    );
    return response.data.data;
  } catch (error) {
    console.error(`Erro ao buscar categoria com ID ${id}:`, error);
    throw error;
  }
};

export const createCustomer = async (
  customer: Omit<Customer, 'id'>,
): Promise<Customer> => {
  try {
    const response = await axiosInstance.post<ApiResponse<Customer>>(
      '/Customers',
      customer,
    );
    return response.data.data;
  } catch (error) {
    console.error('Erro ao criar categoria:', error);
    throw error;
  }
};

export const updateCustomer = async (customer: Customer): Promise<Customer> => {
  try {
    const response = await axiosInstance.put<ApiResponse<Customer>>(
      `/Customers/${customer.id}`,
      customer,
    );
    return response.data.data;
  } catch (error) {
    console.error(`Erro ao atualizar categoria com ID ${customer.id}:`, error);
    throw error;
  }
};

export const deleteCustomer = async (id: string): Promise<void> => {
  try {
    await axiosInstance.delete(`/Customers/${id}`);
  } catch (error) {
    console.error(`Erro ao deletar categoria com ID ${id}:`, error);
    throw error;
  }
};

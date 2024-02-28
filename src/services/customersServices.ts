import EditCustomer from '@/models/Customer/EditCustomer';
import { api } from './apiClient';
import Customer from '@/models/Customer/Customer';
import DataResult from '@/models/Result/DataResult';

export async function findAllCustomers(): Promise<DataResult<Customer>> {
    const response = await api.get(`Customer`);

    const data: DataResult<Customer> = response.data;

    return Promise.resolve(data);
}

export async function findEditCustomerById(id: string): Promise<EditCustomer> {
    const response = await api.get(`Customer/${id}`);

    return Promise.resolve(response.data);
}

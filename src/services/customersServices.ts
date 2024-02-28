import EditCustomer from '@/models/Customer/EditCustomer';
import { api } from './apiClient';
import Customer from '@/models/Customer/Customer';

export async function findAllCustomers(): Promise<Customer[]> {
    const temp: Customer[] = [];
    const response = await api.get(`Customer`);

    response.data.data.forEach((customer: Customer) => {
        temp.push(customer);
    });

    return Promise.resolve(temp);
}

export async function findEditCustomerById(id: string): Promise<EditCustomer> {
    const response = await api.get(`Customer/${id}`);

    return Promise.resolve(response.data);
}

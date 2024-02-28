import { api } from './apiClient';
import Product from '@/models/Product/Product';
import DataResult from '@/models/Result/DataResult';

export async function findAllProducts(): Promise<DataResult<Product>> {
    const response = await api.get(`Product`);

    const data: DataResult<Product> = response.data;

    return Promise.resolve(data);
}

export async function findProductsById(id: string): Promise<Product> {
    const response = await api.get(`Product/${id}`);

    return Promise.resolve(response.data);
}

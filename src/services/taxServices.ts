import Tax from '@/models/Tax/Tax';
import { api } from './apiClient';
import DataResult from '@/models/Result/DataResult';

export async function findAllTaxs(): Promise<DataResult<Tax>> {
    const response = await api.get(`Tax`);

    const data: DataResult<Tax> = response.data;

    return Promise.resolve(data);
}

export async function findTaxById(id: string): Promise<Tax> {
    const response = await api.get(`tax/${id}`);

    return Promise.resolve(response.data);
}

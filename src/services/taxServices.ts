import Tax from '@/models/Tax/Tax';
import { api } from './apiClient';

export async function findAllTaxs(): Promise<Tax[]> {
    const temp: Tax[] = [];
    const response = await api.get(`Tax`);

    response.data.data.forEach((tax: Tax) => {
        temp.push(tax);
    });

    return Promise.resolve(temp);
}

export async function findTaxById(id: string): Promise<Tax> {
    const response = await api.get(`tax/${id}`);

    return Promise.resolve(response.data);
}

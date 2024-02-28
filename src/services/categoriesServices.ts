import Category from '@/models/category/Category';
import { api } from './apiClient';
import DataResult from '@/models/Result/DataResult';

export async function findAllCategories(): Promise<DataResult<Category>> {
    const response = await api.get(`Category`);

    const data: DataResult<Category> = response.data;

    return Promise.resolve(data);
}

export async function findCategoryById(id: string): Promise<Category> {
    const response = await api.get(`Category/${id}`);

    return Promise.resolve(response.data);
}

import Category from '@/models/category/Category';
import { api } from './apiClient';

export async function findAllCategories(): Promise<Category[]> {
    const temp: Category[] = [];
    const response = await api.get(`Category`);

    response.data.data.forEach((category: Category) => {
        temp.push(category);
    });

    return Promise.resolve(temp);
}

export async function findCategoryById(id: string): Promise<Category> {
    const response = await api.get(`Category/${id}`);

    return Promise.resolve(response.data);
}

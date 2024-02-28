import { api } from './apiClient';
import Company from '@/models/Company/Company';
import EditCompany from '@/models/Company/EditCompany';
import DataResult from '@/models/Result/DataResult';

export async function findAllCompanies(): Promise<DataResult<Company>> {
    const response = await api.get(`Company`);

    const data: DataResult<Company> = response.data;

    return Promise.resolve(data);
}

export async function findEditCompanyById(id: string): Promise<EditCompany> {
    const response = await api.get(`Company/${id}`);

    return Promise.resolve(response.data);
}

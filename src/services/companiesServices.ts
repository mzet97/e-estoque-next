import { api } from './apiClient';
import Company from '@/models/Company/Company';
import EditCompany from '@/models/Company/EditCompany';

export async function findAllCompanies(): Promise<Company[]> {
    const temp: Company[] = [];
    const response = await api.get(`Company`);

    response.data.data.forEach((company: Company) => {
        temp.push(company);
    });

    return Promise.resolve(temp);
}

export async function findEditCompanyById(id: string): Promise<EditCompany> {
    const response = await api.get(`Company/${id}`);

    return Promise.resolve(response.data);
}

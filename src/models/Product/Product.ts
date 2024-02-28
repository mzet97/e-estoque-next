import Company from '../Company/Company';
import Category from '../category/Category';

type Product = {
    id: string;
    name: string;
    description: string;
    shortDescription: string;
    price: number;
    weight: number;
    height: number;
    length: number;
    image: string;
    category: Category;
    idCategory: string;
    company: Company;
    idCompany: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string;
};

export default Product;

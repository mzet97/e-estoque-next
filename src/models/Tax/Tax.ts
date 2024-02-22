import Category from '../category/Category';

type Tax = {
    id: string;
    name: string;
    description: string;
    percentage: number;
    idCategory: string;
    category: Category;
    createdAt: string;
    updatedAt: string;
    deletedAt: string;
};

export default Tax;

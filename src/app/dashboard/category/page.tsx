'use client';

import { GridColDef } from '@mui/x-data-grid';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Category } from './types/Category';
import DataGridCustom from '@/components/DataGridCustom';
import { ServerSideParams, PaginatedResponse } from '@/types/DataGridTypes';
import { getCategoriesPaginated } from './api/categoryService';

// Tipo específico para o DataGrid que garante que o id seja obrigatório
type CategoryWithId = Category & { id: string; };

const CategoryPage: React.FC = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleCreateClick = () => {
    router.push('/dashboard/category/create');
  };

  const handleEditClick = (id: string) => {
    router.push(`/dashboard/category/edit/${id}`);
  };

  const handleDeleteClick = (id: string) => {
    // Implementar lógica de delete aqui
    console.log('Delete category:', id);
  };

  const fetchCategories = async (params: ServerSideParams): Promise<PaginatedResponse<CategoryWithId>> => {
    return await getCategoriesPaginated(params) as PaginatedResponse<CategoryWithId>;
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'Id', width: 100 },
    { field: 'name', headerName: 'Name', flex: 1, minWidth: 150 },
    { field: 'description', headerName: 'Description', flex: 2, minWidth: 200 },
    { field: 'shortDescription', headerName: 'Short Description', flex: 1, minWidth: 150 },
  ];

  if (status === 'loading') {
    return <p>Carregando...</p>;
  }

  if (!session) {
    return <p>Você não está logado.</p>;
  }

  return (
    <DataGridCustom<CategoryWithId>
      columns={columns}
      fetchData={fetchCategories}
      title="List of Categories"
      createButtonText="Create Category"
      onCreateClick={handleCreateClick}
      onEditClick={handleEditClick}
      onDeleteClick={handleDeleteClick}
      showActions={true}
      initialPageSize={25}
    />
  );
};

export default CategoryPage;

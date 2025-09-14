import { getCategories, getCategoriesPaginated, getCategory, createCategory, updateCategory, deleteCategory } from '../categoryService';
import axiosInstance from '@/config/axiosInstance';
import { Category } from '../../types/Category';
import { ServerSideParams } from '@/types/DataGridTypes';

// Mock axios instance
jest.mock('@/config/axiosInstance');
const mockedAxios = axiosInstance as jest.Mocked<typeof axiosInstance>;

describe('categoryService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getCategories', () => {
    it('should fetch all categories successfully', async () => {
      const mockCategories: Category[] = [
        {
          id: '1',
          name: 'Electronics',
          description: 'Electronic devices',
          shortDescription: 'Electronics'
        },
        {
          id: '2',
          name: 'Books',
          description: 'Books and literature',
          shortDescription: 'Books'
        }
      ];

      const mockResponse = {
        data: {
          data: mockCategories,
          success: true,
          message: 'Success'
        }
      };

      mockedAxios.get.mockResolvedValue(mockResponse);

      const result = await getCategories();

      expect(mockedAxios.get).toHaveBeenCalledWith('/categories');
      expect(result).toEqual(mockCategories);
    });

    it('should handle error when fetching categories', async () => {
      const mockError = new Error('Network error');
      mockedAxios.get.mockRejectedValue(mockError);

      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

      await expect(getCategories()).rejects.toThrow('Network error');
      expect(consoleSpy).toHaveBeenCalledWith('Erro ao buscar categorias:', mockError);

      consoleSpy.mockRestore();
    });
  });

  describe('getCategoriesPaginated', () => {
    it('should fetch paginated categories with basic params', async () => {
      const mockParams: ServerSideParams = {
        page: 0,
        pageSize: 10,
        sortModel: [],
        filterModel: []
      };

      const mockApiResponse = {
        data: {
          data: [
            {
              id: '1',
              name: 'Electronics',
              description: 'Electronic devices',
              shortDescription: 'Electronics'
            }
          ],
          pagedResult: {
            currentPage: 1,
            pageCount: 5,
            pageSize: 10,
            rowCount: 50,
            firstRowOnPage: 1,
            lastRowOnPage: 10
          },
          success: true,
          message: 'Success'
        }
      };

      mockedAxios.get.mockResolvedValue(mockApiResponse);

      const result = await getCategoriesPaginated(mockParams);

      expect(mockedAxios.get).toHaveBeenCalledWith('/categories?PageIndex=1&PageSize=10');
      expect(result).toEqual({
        data: mockApiResponse.data.data,
        total: 50,
        page: 0, // Converted back to 0-based
        pageSize: 10,
        totalPages: 5
      });
    });

    it('should handle sort parameters', async () => {
      const mockParams: ServerSideParams = {
        page: 1,
        pageSize: 25,
        sortModel: [{ field: 'name', sort: 'asc' }],
        filterModel: []
      };

      const mockApiResponse = {
        data: {
          data: [],
          pagedResult: {
            currentPage: 2,
            pageCount: 3,
            pageSize: 25,
            rowCount: 75,
            firstRowOnPage: 26,
            lastRowOnPage: 50
          },
          success: true,
          message: 'Success'
        }
      };

      mockedAxios.get.mockResolvedValue(mockApiResponse);

      await getCategoriesPaginated(mockParams);

      expect(mockedAxios.get).toHaveBeenCalledWith(
        expect.stringMatching(/\/categories\?PageIndex=2&PageSize=25&Order=name(%20|\+)asc/)
      );
    });

    it('should handle filter parameters', async () => {
      const mockParams: ServerSideParams = {
        page: 0,
        pageSize: 10,
        sortModel: [],
        filterModel: [
          { field: 'name', value: 'Electronics' },
          { field: 'description', value: 'devices' }
        ]
      };

      const mockApiResponse = {
        data: {
          data: [],
          pagedResult: {
            currentPage: 1,
            pageCount: 1,
            pageSize: 10,
            rowCount: 5,
            firstRowOnPage: 1,
            lastRowOnPage: 5
          },
          success: true,
          message: 'Success'
        }
      };

      mockedAxios.get.mockResolvedValue(mockApiResponse);

      await getCategoriesPaginated(mockParams);

      expect(mockedAxios.get).toHaveBeenCalledWith(
        expect.stringContaining('Name=Electronics')
      );
      expect(mockedAxios.get).toHaveBeenCalledWith(
        expect.stringContaining('Description=devices')
      );
    });

    it('should handle search parameter', async () => {
      const mockParams: ServerSideParams = {
        page: 0,
        pageSize: 10,
        sortModel: [],
        filterModel: [],
        search: 'electronics'
      };

      const mockApiResponse = {
        data: {
          data: [],
          pagedResult: {
            currentPage: 1,
            pageCount: 1,
            pageSize: 10,
            rowCount: 3,
            firstRowOnPage: 1,
            lastRowOnPage: 3
          },
          success: true,
          message: 'Success'
        }
      };

      mockedAxios.get.mockResolvedValue(mockApiResponse);

      await getCategoriesPaginated(mockParams);

      expect(mockedAxios.get).toHaveBeenCalledWith(
        expect.stringContaining('Name=electronics')
      );
    });

    it('should handle error when fetching paginated categories', async () => {
      const mockParams: ServerSideParams = {
        page: 0,
        pageSize: 10,
        sortModel: [],
        filterModel: []
      };

      const mockError = new Error('Server error');
      mockedAxios.get.mockRejectedValue(mockError);

      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

      await expect(getCategoriesPaginated(mockParams)).rejects.toThrow('Server error');
      expect(consoleSpy).toHaveBeenCalledWith('Erro ao buscar categorias paginadas:', mockError);

      consoleSpy.mockRestore();
    });
  });

  describe('getCategory', () => {
    it('should fetch a single category by id', async () => {
      const mockCategory: Category = {
        id: '1',
        name: 'Electronics',
        description: 'Electronic devices',
        shortDescription: 'Electronics'
      };

      const mockResponse = {
        data: {
          data: mockCategory,
          success: true,
          message: 'Success'
        }
      };

      mockedAxios.get.mockResolvedValue(mockResponse);

      const result = await getCategory('1');

      expect(mockedAxios.get).toHaveBeenCalledWith('/categories/1');
      expect(result).toEqual(mockCategory);
    });

    it('should handle error when fetching category by id', async () => {
      const mockError = new Error('Category not found');
      mockedAxios.get.mockRejectedValue(mockError);

      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

      await expect(getCategory('999')).rejects.toThrow('Category not found');
      expect(consoleSpy).toHaveBeenCalledWith('Erro ao buscar categoria com ID 999:', mockError);

      consoleSpy.mockRestore();
    });
  });

  describe('createCategory', () => {
    it('should create a new category', async () => {
      const newCategory: Omit<Category, 'id'> = {
        name: 'Sports',
        description: 'Sports equipment',
        shortDescription: 'Sports'
      };

      const createdCategory: Category = {
        id: '3',
        ...newCategory
      };

      const mockResponse = {
        data: {
          data: createdCategory,
          success: true,
          message: 'Category created successfully'
        }
      };

      mockedAxios.post.mockResolvedValue(mockResponse);

      const result = await createCategory(newCategory);

      expect(mockedAxios.post).toHaveBeenCalledWith('/categories', newCategory);
      expect(result).toEqual(createdCategory);
    });

    it('should handle error when creating category', async () => {
      const newCategory: Omit<Category, 'id'> = {
        name: 'Sports',
        description: 'Sports equipment',
        shortDescription: 'Sports'
      };

      const mockError = new Error('Validation error');
      mockedAxios.post.mockRejectedValue(mockError);

      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

      await expect(createCategory(newCategory)).rejects.toThrow('Validation error');
      expect(consoleSpy).toHaveBeenCalledWith('Erro ao criar categoria:', mockError);

      consoleSpy.mockRestore();
    });
  });

  describe('updateCategory', () => {
    it('should update an existing category', async () => {
      const categoryToUpdate: Category & { id: string } = {
        id: '1',
        name: 'Updated Electronics',
        description: 'Updated electronic devices',
        shortDescription: 'Updated Electronics'
      };

      const mockResponse = {
        data: {
          data: categoryToUpdate,
          success: true,
          message: 'Category updated successfully'
        }
      };

      mockedAxios.put.mockResolvedValue(mockResponse);

      const result = await updateCategory(categoryToUpdate);

      expect(mockedAxios.put).toHaveBeenCalledWith('/categories/1', categoryToUpdate);
      expect(result).toEqual(categoryToUpdate);
    });

    it('should handle error when updating category', async () => {
      const categoryToUpdate: Category & { id: string } = {
        id: '999',
        name: 'Non-existent',
        description: 'Non-existent category',
        shortDescription: 'Non-existent'
      };

      const mockError = new Error('Category not found');
      mockedAxios.put.mockRejectedValue(mockError);

      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

      await expect(updateCategory(categoryToUpdate)).rejects.toThrow('Category not found');
      expect(consoleSpy).toHaveBeenCalledWith('Erro ao atualizar categoria com ID 999:', mockError);

      consoleSpy.mockRestore();
    });
  });

  describe('deleteCategory', () => {
    it('should delete a category by id', async () => {
      mockedAxios.delete.mockResolvedValue({ data: {} });

      await deleteCategory('1');

      expect(mockedAxios.delete).toHaveBeenCalledWith('/categories/1');
    });

    it('should handle error when deleting category', async () => {
      const mockError = new Error('Category not found');
      mockedAxios.delete.mockRejectedValue(mockError);

      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

      await expect(deleteCategory('999')).rejects.toThrow('Category not found');
      expect(consoleSpy).toHaveBeenCalledWith('Erro ao deletar categoria com ID 999:', mockError);

      consoleSpy.mockRestore();
    });
  });

  describe('URL encoding', () => {
    it('should properly encode special characters in query parameters', async () => {
      const mockParams: ServerSideParams = {
        page: 0,
        pageSize: 10,
        sortModel: [{ field: 'name', sort: 'desc' }],
        filterModel: [
          { field: 'name', value: 'Electronics & Gadgets' },
          { field: 'description', value: 'High-tech devices' }
        ]
      };

      const mockApiResponse = {
        data: {
          data: [],
          pagedResult: {
            currentPage: 1,
            pageCount: 1,
            pageSize: 10,
            rowCount: 0,
            firstRowOnPage: 0,
            lastRowOnPage: 0
          },
          success: true,
          message: 'Success'
        }
      };

      mockedAxios.get.mockResolvedValue(mockApiResponse);

      await getCategoriesPaginated(mockParams);

      expect(mockedAxios.get).toHaveBeenCalledWith(
        expect.stringMatching(/Order=name(%20|\+)desc/)
      );
      expect(mockedAxios.get).toHaveBeenCalledWith(
        expect.stringMatching(/Name=Electronics(%20|\+)(%26|&)(%20|\+)Gadgets/)
      );
    });
  });

  describe('Edge cases', () => {
    it('should handle empty filter model', async () => {
      const mockParams: ServerSideParams = {
        page: 0,
        pageSize: 10,
        sortModel: [],
        filterModel: []
      };

      const mockApiResponse = {
        data: {
          data: [],
          pagedResult: {
            currentPage: 1,
            pageCount: 0,
            pageSize: 10,
            rowCount: 0,
            firstRowOnPage: 0,
            lastRowOnPage: 0
          },
          success: true,
          message: 'Success'
        }
      };

      mockedAxios.get.mockResolvedValue(mockApiResponse);

      const result = await getCategoriesPaginated(mockParams);

      expect(result.total).toBe(0);
      expect(result.data).toEqual([]);
    });

    it('should handle all supported filter fields', async () => {
      const mockParams: ServerSideParams = {
        page: 0,
        pageSize: 10,
        sortModel: [],
        filterModel: [
          { field: 'name', value: 'test-name' },
          { field: 'description', value: 'test-description' },
          { field: 'shortDescription', value: 'test-short' },
          { field: 'id', value: 'test-id' },
          { field: 'createdAt', value: '2024-01-01' },
          { field: 'updatedAt', value: '2024-01-02' },
          { field: 'deletedAt', value: '2024-01-03' }
        ]
      };

      const mockApiResponse = {
        data: {
          data: [],
          pagedResult: {
            currentPage: 1,
            pageCount: 1,
            pageSize: 10,
            rowCount: 0,
            firstRowOnPage: 0,
            lastRowOnPage: 0
          },
          success: true,
          message: 'Success'
        }
      };

      mockedAxios.get.mockResolvedValue(mockApiResponse);

      await getCategoriesPaginated(mockParams);

      const calledUrl = mockedAxios.get.mock.calls[0][0];
      expect(calledUrl).toContain('Name=test-name');
      expect(calledUrl).toContain('Description=test-description');
      expect(calledUrl).toContain('ShortDescription=test-short');
      expect(calledUrl).toContain('Id=test-id');
      expect(calledUrl).toContain('CreatedAt=2024-01-01');
      expect(calledUrl).toContain('UpdatedAt=2024-01-02');
      expect(calledUrl).toContain('DeletedAt=2024-01-03');
    });
  });
});
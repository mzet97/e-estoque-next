import { getInventories, getInventory, createInventory, updateInventory, deleteInventory } from '../inventoryService';
import axiosInstance from '@/config/axiosInstance';
import { Inventory } from '../../types/Inventory';

// Mock axios instance
jest.mock('@/config/axiosInstance');
const mockedAxios = axiosInstance as jest.Mocked<typeof axiosInstance>;

describe('inventoryService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getInventories', () => {
    it('should fetch all inventories successfully', async () => {
      const mockInventories: Inventory[] = [
        {
          id: '1',
          dateOrder: '2024-01-15',
          quantity: 100,
          idProduct: 'product-123'
        },
        {
          id: '2',
          dateOrder: '2024-01-16',
          quantity: 50,
          idProduct: 'product-456'
        }
      ];

      const mockResponse = {
        data: {
          data: mockInventories,
          success: true,
          message: 'Success'
        }
      };

      mockedAxios.get.mockResolvedValue(mockResponse);

      const result = await getInventories();

      expect(mockedAxios.get).toHaveBeenCalledWith('/Inventories');
      expect(result).toEqual(mockInventories);
    });

    it('should handle error when fetching inventories', async () => {
      const mockError = new Error('Network error');
      mockedAxios.get.mockRejectedValue(mockError);

      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

      await expect(getInventories()).rejects.toThrow('Network error');
      expect(consoleSpy).toHaveBeenCalledWith('Erro ao buscar categorias:', mockError);

      consoleSpy.mockRestore();
    });
  });

  describe('getInventory', () => {
    it('should fetch a single inventory by id', async () => {
      const mockInventory: Inventory = {
        id: '1',
        dateOrder: '2024-01-15',
        quantity: 100,
        idProduct: 'product-123'
      };

      const mockResponse = {
        data: {
          data: mockInventory,
          success: true,
          message: 'Success'
        }
      };

      mockedAxios.get.mockResolvedValue(mockResponse);

      const result = await getInventory('1');

      expect(mockedAxios.get).toHaveBeenCalledWith('/Inventories/1');
      expect(result).toEqual(mockInventory);
    });

    it('should handle error when fetching inventory by id', async () => {
      const mockError = new Error('Inventory not found');
      mockedAxios.get.mockRejectedValue(mockError);

      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

      await expect(getInventory('999')).rejects.toThrow('Inventory not found');
      expect(consoleSpy).toHaveBeenCalledWith('Erro ao buscar categoria com ID 999:', mockError);

      consoleSpy.mockRestore();
    });
  });

  describe('createInventory', () => {
    it('should create a new inventory', async () => {
      const newInventory: Omit<Inventory, 'id'> = {
        dateOrder: '2024-01-17',
        quantity: 75,
        idProduct: 'product-789'
      };

      const createdInventory: Inventory = {
        id: '3',
        ...newInventory
      };

      const mockResponse = {
        data: {
          data: createdInventory,
          success: true,
          message: 'Inventory created successfully'
        }
      };

      mockedAxios.post.mockResolvedValue(mockResponse);

      const result = await createInventory(newInventory);

      expect(mockedAxios.post).toHaveBeenCalledWith('/Inventories', newInventory);
      expect(result).toEqual(createdInventory);
    });

    it('should handle error when creating inventory', async () => {
      const newInventory: Omit<Inventory, 'id'> = {
        dateOrder: '2024-01-17',
        quantity: 75,
        idProduct: 'product-789'
      };

      const mockError = new Error('Validation error');
      mockedAxios.post.mockRejectedValue(mockError);

      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

      await expect(createInventory(newInventory)).rejects.toThrow('Validation error');
      expect(consoleSpy).toHaveBeenCalledWith('Erro ao criar categoria:', mockError);

      consoleSpy.mockRestore();
    });
  });

  describe('updateInventory', () => {
    it('should update an existing inventory', async () => {
      const inventoryToUpdate: Inventory = {
        id: '1',
        dateOrder: '2024-01-18',
        quantity: 150,
        idProduct: 'product-updated'
      };

      const mockResponse = {
        data: {
          data: inventoryToUpdate,
          success: true,
          message: 'Inventory updated successfully'
        }
      };

      mockedAxios.put.mockResolvedValue(mockResponse);

      const result = await updateInventory(inventoryToUpdate);

      expect(mockedAxios.put).toHaveBeenCalledWith('/Inventories/1', inventoryToUpdate);
      expect(result).toEqual(inventoryToUpdate);
    });

    it('should handle error when updating inventory', async () => {
      const inventoryToUpdate: Inventory = {
        id: '999',
        dateOrder: '2024-01-18',
        quantity: 150,
        idProduct: 'product-nonexistent'
      };

      const mockError = new Error('Inventory not found');
      mockedAxios.put.mockRejectedValue(mockError);

      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

      await expect(updateInventory(inventoryToUpdate)).rejects.toThrow('Inventory not found');
      expect(consoleSpy).toHaveBeenCalledWith('Erro ao atualizar categoria com ID 999:', mockError);

      consoleSpy.mockRestore();
    });
  });

  describe('deleteInventory', () => {
    it('should delete an inventory by id', async () => {
      mockedAxios.delete.mockResolvedValue({ data: {} });

      await deleteInventory('1');

      expect(mockedAxios.delete).toHaveBeenCalledWith('/Inventories/1');
    });

    it('should handle error when deleting inventory', async () => {
      const mockError = new Error('Inventory not found');
      mockedAxios.delete.mockRejectedValue(mockError);

      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

      await expect(deleteInventory('999')).rejects.toThrow('Inventory not found');
      expect(consoleSpy).toHaveBeenCalledWith('Erro ao deletar categoria com ID 999:', mockError);

      consoleSpy.mockRestore();
    });
  });

  describe('Date handling', () => {
    it('should handle different date formats', async () => {
      const inventoryWithDifferentDate: Omit<Inventory, 'id'> = {
        dateOrder: '2024-12-31',
        quantity: 25,
        idProduct: 'product-date-test'
      };

      const createdInventory: Inventory = {
        id: '4',
        ...inventoryWithDifferentDate
      };

      const mockResponse = {
        data: {
          data: createdInventory,
          success: true,
          message: 'Inventory created successfully'
        }
      };

      mockedAxios.post.mockResolvedValue(mockResponse);

      const result = await createInventory(inventoryWithDifferentDate);

      expect(result.dateOrder).toBe('2024-12-31');
      expect(result).toEqual(createdInventory);
    });

    it('should handle leap year dates', async () => {
      const leapYearInventory: Omit<Inventory, 'id'> = {
        dateOrder: '2024-02-29', // Leap year date
        quantity: 10,
        idProduct: 'product-leap-year'
      };

      const createdInventory: Inventory = {
        id: '5',
        ...leapYearInventory
      };

      const mockResponse = {
        data: {
          data: createdInventory,
          success: true,
          message: 'Inventory created successfully'
        }
      };

      mockedAxios.post.mockResolvedValue(mockResponse);

      const result = await createInventory(leapYearInventory);

      expect(result.dateOrder).toBe('2024-02-29');
    });
  });

  describe('Quantity edge cases', () => {
    it('should handle zero quantity', async () => {
      const zeroQuantityInventory: Omit<Inventory, 'id'> = {
        dateOrder: '2024-01-20',
        quantity: 0,
        idProduct: 'product-zero-qty'
      };

      const createdInventory: Inventory = {
        id: '6',
        ...zeroQuantityInventory
      };

      const mockResponse = {
        data: {
          data: createdInventory,
          success: true,
          message: 'Inventory created successfully'
        }
      };

      mockedAxios.post.mockResolvedValue(mockResponse);

      const result = await createInventory(zeroQuantityInventory);

      expect(result.quantity).toBe(0);
      expect(result).toEqual(createdInventory);
    });

    it('should handle very large quantities', async () => {
      const largeQuantityInventory: Omit<Inventory, 'id'> = {
        dateOrder: '2024-01-21',
        quantity: 999999,
        idProduct: 'product-large-qty'
      };

      const createdInventory: Inventory = {
        id: '7',
        ...largeQuantityInventory
      };

      const mockResponse = {
        data: {
          data: createdInventory,
          success: true,
          message: 'Inventory created successfully'
        }
      };

      mockedAxios.post.mockResolvedValue(mockResponse);

      const result = await createInventory(largeQuantityInventory);

      expect(result.quantity).toBe(999999);
    });
  });

  describe('Product ID validation', () => {
    it('should handle different product ID formats', async () => {
      const inventoryWithUUID: Omit<Inventory, 'id'> = {
        dateOrder: '2024-01-22',
        quantity: 30,
        idProduct: '550e8400-e29b-41d4-a716-446655440000' // UUID format
      };

      const createdInventory: Inventory = {
        id: '8',
        ...inventoryWithUUID
      };

      const mockResponse = {
        data: {
          data: createdInventory,
          success: true,
          message: 'Inventory created successfully'
        }
      };

      mockedAxios.post.mockResolvedValue(mockResponse);

      const result = await createInventory(inventoryWithUUID);

      expect(result.idProduct).toBe('550e8400-e29b-41d4-a716-446655440000');
    });

    it('should handle numeric product IDs as strings', async () => {
      const inventoryWithNumericId: Omit<Inventory, 'id'> = {
        dateOrder: '2024-01-23',
        quantity: 40,
        idProduct: '12345'
      };

      const createdInventory: Inventory = {
        id: '9',
        ...inventoryWithNumericId
      };

      const mockResponse = {
        data: {
          data: createdInventory,
          success: true,
          message: 'Inventory created successfully'
        }
      };

      mockedAxios.post.mockResolvedValue(mockResponse);

      const result = await createInventory(inventoryWithNumericId);

      expect(result.idProduct).toBe('12345');
      expect(typeof result.idProduct).toBe('string');
    });
  });

  describe('API Response validation', () => {
    it('should handle malformed API response', async () => {
      const mockResponse = {
        data: {
          // Missing 'data' field
          success: true,
          message: 'Success'
        }
      };

      mockedAxios.get.mockResolvedValue(mockResponse);

      await expect(getInventories()).rejects.toThrow();
    });

    it('should handle API response with null data', async () => {
      const mockResponse = {
        data: {
          data: null,
          success: false,
          message: 'No data found'
        }
      };

      mockedAxios.get.mockResolvedValue(mockResponse);

      const result = await getInventories();
      expect(result).toBeNull();
    });

    it('should handle empty array response', async () => {
      const mockResponse = {
        data: {
          data: [],
          success: true,
          message: 'No inventories found'
        }
      };

      mockedAxios.get.mockResolvedValue(mockResponse);

      const result = await getInventories();
      expect(result).toEqual([]);
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBe(0);
    });
  });

  describe('Network error handling', () => {
    it('should handle timeout errors', async () => {
      const timeoutError = new Error('Request timeout');
      timeoutError.name = 'TimeoutError';
      mockedAxios.get.mockRejectedValue(timeoutError);

      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

      await expect(getInventories()).rejects.toThrow('Request timeout');
      expect(consoleSpy).toHaveBeenCalledWith('Erro ao buscar categorias:', timeoutError);

      consoleSpy.mockRestore();
    });

    it('should handle 404 errors', async () => {
      const notFoundError = new Error('Not found');
      (notFoundError as any).response = { status: 404 };
      mockedAxios.get.mockRejectedValue(notFoundError);

      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

      await expect(getInventory('nonexistent')).rejects.toThrow('Not found');
      expect(consoleSpy).toHaveBeenCalledWith('Erro ao buscar categoria com ID nonexistent:', notFoundError);

      consoleSpy.mockRestore();
    });

    it('should handle 500 server errors', async () => {
      const serverError = new Error('Internal server error');
      (serverError as any).response = { status: 500 };
      mockedAxios.post.mockRejectedValue(serverError);

      const newInventory: Omit<Inventory, 'id'> = {
        dateOrder: '2024-01-24',
        quantity: 50,
        idProduct: 'product-server-error'
      };

      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

      await expect(createInventory(newInventory)).rejects.toThrow('Internal server error');
      expect(consoleSpy).toHaveBeenCalledWith('Erro ao criar categoria:', serverError);

      consoleSpy.mockRestore();
    });
  });

  describe('Concurrent operations', () => {
    it('should handle multiple simultaneous requests', async () => {
      const mockInventories = [
        {
          id: '1',
          dateOrder: '2024-01-25',
          quantity: 10,
          idProduct: 'product-1'
        },
        {
          id: '2',
          dateOrder: '2024-01-26',
          quantity: 20,
          idProduct: 'product-2'
        }
      ];

      const mockResponse = {
        data: {
          data: mockInventories,
          success: true,
          message: 'Success'
        }
      };

      mockedAxios.get.mockResolvedValue(mockResponse);

      // Make multiple simultaneous requests
      const promises = [
        getInventories(),
        getInventories(),
        getInventories()
      ];

      const results = await Promise.all(promises);

      expect(results).toHaveLength(3);
      results.forEach(result => {
        expect(result).toEqual(mockInventories);
      });
      expect(mockedAxios.get).toHaveBeenCalledTimes(3);
    });
  });
});
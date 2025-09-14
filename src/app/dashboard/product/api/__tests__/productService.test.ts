import { getProducts, getProduct, createProduct, updateProduct, deleteProduct } from '../productService';
import axiosInstance from '@/config/axiosInstance';
import { Product } from '../../types/Product';

// Mock axios instance
jest.mock('@/config/axiosInstance');
const mockedAxios = axiosInstance as jest.Mocked<typeof axiosInstance>;

describe('productService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getProducts', () => {
    it('should fetch all products successfully', async () => {
      const mockProducts: Product[] = [
        {
          id: '1',
          name: 'Laptop',
          description: 'Gaming laptop',
          price: 1500.99,
          stock: 10
        },
        {
          id: '2',
          name: 'Mouse',
          description: 'Wireless mouse',
          price: 29.99,
          stock: 50
        }
      ];

      const mockResponse = {
        data: {
          data: mockProducts,
          success: true,
          message: 'Success'
        }
      };

      mockedAxios.get.mockResolvedValue(mockResponse);

      const result = await getProducts();

      expect(mockedAxios.get).toHaveBeenCalledWith('/Products');
      expect(result).toEqual(mockProducts);
    });

    it('should handle error when fetching products', async () => {
      const mockError = new Error('Network error');
      mockedAxios.get.mockRejectedValue(mockError);

      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

      await expect(getProducts()).rejects.toThrow('Network error');
      expect(consoleSpy).toHaveBeenCalledWith('Erro ao buscar clientes:', mockError);

      consoleSpy.mockRestore();
    });
  });

  describe('getProduct', () => {
    it('should fetch a single product by id', async () => {
      const mockProduct: Product = {
        id: '1',
        name: 'Laptop',
        description: 'Gaming laptop',
        price: 1500.99,
        stock: 10
      };

      const mockResponse = {
        data: {
          data: mockProduct,
          success: true,
          message: 'Success'
        }
      };

      mockedAxios.get.mockResolvedValue(mockResponse);

      const result = await getProduct('1');

      expect(mockedAxios.get).toHaveBeenCalledWith('/Products/1');
      expect(result).toEqual(mockProduct);
    });

    it('should handle error when fetching product by id', async () => {
      const mockError = new Error('Product not found');
      mockedAxios.get.mockRejectedValue(mockError);

      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

      await expect(getProduct('999')).rejects.toThrow('Product not found');
      expect(consoleSpy).toHaveBeenCalledWith('Erro ao buscar categoria com ID 999:', mockError);

      consoleSpy.mockRestore();
    });
  });

  describe('createProduct', () => {
    it('should create a new product', async () => {
      const newProduct: Omit<Product, 'id'> = {
        name: 'Keyboard',
        description: 'Mechanical keyboard',
        price: 99.99,
        stock: 25
      };

      const createdProduct: Product = {
        id: '3',
        ...newProduct
      };

      const mockResponse = {
        data: {
          data: createdProduct,
          success: true,
          message: 'Product created successfully'
        }
      };

      mockedAxios.post.mockResolvedValue(mockResponse);

      const result = await createProduct(newProduct);

      expect(mockedAxios.post).toHaveBeenCalledWith('/Products', newProduct);
      expect(result).toEqual(createdProduct);
    });

    it('should handle error when creating product', async () => {
      const newProduct: Omit<Product, 'id'> = {
        name: 'Keyboard',
        description: 'Mechanical keyboard',
        price: 99.99,
        stock: 25
      };

      const mockError = new Error('Validation error');
      mockedAxios.post.mockRejectedValue(mockError);

      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

      await expect(createProduct(newProduct)).rejects.toThrow('Validation error');
      expect(consoleSpy).toHaveBeenCalledWith('Erro ao criar categoria:', mockError);

      consoleSpy.mockRestore();
    });
  });

  describe('updateProduct', () => {
    it('should update an existing product', async () => {
      const productToUpdate: Product = {
        id: '1',
        name: 'Updated Laptop',
        description: 'Updated gaming laptop',
        price: 1699.99,
        stock: 15
      };

      const mockResponse = {
        data: {
          data: productToUpdate,
          success: true,
          message: 'Product updated successfully'
        }
      };

      mockedAxios.put.mockResolvedValue(mockResponse);

      const result = await updateProduct(productToUpdate);

      expect(mockedAxios.put).toHaveBeenCalledWith('/Products/1', productToUpdate);
      expect(result).toEqual(productToUpdate);
    });

    it('should handle error when updating product', async () => {
      const productToUpdate: Product = {
        id: '999',
        name: 'Non-existent',
        description: 'Non-existent product',
        price: 0,
        stock: 0
      };

      const mockError = new Error('Product not found');
      mockedAxios.put.mockRejectedValue(mockError);

      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

      await expect(updateProduct(productToUpdate)).rejects.toThrow('Product not found');
      expect(consoleSpy).toHaveBeenCalledWith('Erro ao atualizar categoria com ID 999:', mockError);

      consoleSpy.mockRestore();
    });
  });

  describe('deleteProduct', () => {
    it('should delete a product by id', async () => {
      mockedAxios.delete.mockResolvedValue({ data: {} });

      await deleteProduct('1');

      expect(mockedAxios.delete).toHaveBeenCalledWith('/Products/1');
    });

    it('should handle error when deleting product', async () => {
      const mockError = new Error('Product not found');
      mockedAxios.delete.mockRejectedValue(mockError);

      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

      await expect(deleteProduct('999')).rejects.toThrow('Product not found');
      expect(consoleSpy).toHaveBeenCalledWith('Erro ao deletar categoria com ID 999:', mockError);

      consoleSpy.mockRestore();
    });
  });

  describe('Edge cases', () => {
    it('should handle products with zero price', async () => {
      const freeProduct: Omit<Product, 'id'> = {
        name: 'Free Sample',
        description: 'Free product sample',
        price: 0,
        stock: 100
      };

      const createdProduct: Product = {
        id: '4',
        ...freeProduct
      };

      const mockResponse = {
        data: {
          data: createdProduct,
          success: true,
          message: 'Product created successfully'
        }
      };

      mockedAxios.post.mockResolvedValue(mockResponse);

      const result = await createProduct(freeProduct);

      expect(result.price).toBe(0);
      expect(result).toEqual(createdProduct);
    });

    it('should handle products with zero stock', async () => {
      const outOfStockProduct: Omit<Product, 'id'> = {
        name: 'Out of Stock Item',
        description: 'Currently unavailable',
        price: 49.99,
        stock: 0
      };

      const createdProduct: Product = {
        id: '5',
        ...outOfStockProduct
      };

      const mockResponse = {
        data: {
          data: createdProduct,
          success: true,
          message: 'Product created successfully'
        }
      };

      mockedAxios.post.mockResolvedValue(mockResponse);

      const result = await createProduct(outOfStockProduct);

      expect(result.stock).toBe(0);
      expect(result).toEqual(createdProduct);
    });

    it('should handle products with very long descriptions', async () => {
      const longDescription = 'A'.repeat(1000);
      const productWithLongDescription: Omit<Product, 'id'> = {
        name: 'Product with Long Description',
        description: longDescription,
        price: 99.99,
        stock: 10
      };

      const createdProduct: Product = {
        id: '6',
        ...productWithLongDescription
      };

      const mockResponse = {
        data: {
          data: createdProduct,
          success: true,
          message: 'Product created successfully'
        }
      };

      mockedAxios.post.mockResolvedValue(mockResponse);

      const result = await createProduct(productWithLongDescription);

      expect(result.description).toBe(longDescription);
      expect(result.description.length).toBe(1000);
    });

    it('should handle products with special characters in name', async () => {
      const productWithSpecialChars: Omit<Product, 'id'> = {
        name: 'Product & Co. (Special Edition) - 50% Off!',
        description: 'Special characters test',
        price: 199.99,
        stock: 5
      };

      const createdProduct: Product = {
        id: '7',
        ...productWithSpecialChars
      };

      const mockResponse = {
        data: {
          data: createdProduct,
          success: true,
          message: 'Product created successfully'
        }
      };

      mockedAxios.post.mockResolvedValue(mockResponse);

      const result = await createProduct(productWithSpecialChars);

      expect(result.name).toBe('Product & Co. (Special Edition) - 50% Off!');
    });

    it('should handle very high price values', async () => {
      const expensiveProduct: Omit<Product, 'id'> = {
        name: 'Luxury Item',
        description: 'Very expensive product',
        price: 999999.99,
        stock: 1
      };

      const createdProduct: Product = {
        id: '8',
        ...expensiveProduct
      };

      const mockResponse = {
        data: {
          data: createdProduct,
          success: true,
          message: 'Product created successfully'
        }
      };

      mockedAxios.post.mockResolvedValue(mockResponse);

      const result = await createProduct(expensiveProduct);

      expect(result.price).toBe(999999.99);
    });

    it('should handle very high stock values', async () => {
      const highStockProduct: Omit<Product, 'id'> = {
        name: 'Bulk Item',
        description: 'High stock product',
        price: 1.99,
        stock: 1000000
      };

      const createdProduct: Product = {
        id: '9',
        ...highStockProduct
      };

      const mockResponse = {
        data: {
          data: createdProduct,
          success: true,
          message: 'Product created successfully'
        }
      };

      mockedAxios.post.mockResolvedValue(mockResponse);

      const result = await createProduct(highStockProduct);

      expect(result.stock).toBe(1000000);
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

      const result = await getProducts();
      expect(result).toBeUndefined();
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

      const result = await getProducts();
      expect(result).toBeNull();
    });

    it('should handle empty array response', async () => {
      const mockResponse = {
        data: {
          data: [],
          success: true,
          message: 'No products found'
        }
      };

      mockedAxios.get.mockResolvedValue(mockResponse);

      const result = await getProducts();
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

      await expect(getProducts()).rejects.toThrow('Request timeout');
      expect(consoleSpy).toHaveBeenCalledWith('Erro ao buscar clientes:', timeoutError);

      consoleSpy.mockRestore();
    });

    it('should handle 404 errors', async () => {
      const notFoundError = new Error('Not found');
      (notFoundError as any).response = { status: 404 };
      mockedAxios.get.mockRejectedValue(notFoundError);

      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

      await expect(getProduct('nonexistent')).rejects.toThrow('Not found');
      expect(consoleSpy).toHaveBeenCalledWith('Erro ao buscar categoria com ID nonexistent:', notFoundError);

      consoleSpy.mockRestore();
    });

    it('should handle 500 server errors', async () => {
      const serverError = new Error('Internal server error');
      (serverError as any).response = { status: 500 };
      mockedAxios.post.mockRejectedValue(serverError);

      const newProduct: Omit<Product, 'id'> = {
        name: 'Test Product',
        description: 'Test description',
        price: 99.99,
        stock: 10
      };

      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

      await expect(createProduct(newProduct)).rejects.toThrow('Internal server error');
      expect(consoleSpy).toHaveBeenCalledWith('Erro ao criar categoria:', serverError);

      consoleSpy.mockRestore();
    });
  });
});
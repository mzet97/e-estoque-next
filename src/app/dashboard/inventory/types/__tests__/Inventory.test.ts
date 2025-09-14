import { InventorySchema, Inventory } from '../Inventory';
import { maxInteger } from '@/utils/maxValues';
import { z } from 'zod';

describe('InventorySchema', () => {
  describe('Valid data', () => {
    it('should validate a complete valid inventory', () => {
      const validInventory = {
        id: '123',
        dateOrder: '2024-01-15',
        quantity: 100,
        idProduct: 'product-123',
      };

      const result = InventorySchema.parse(validInventory);
      expect(result).toEqual(validInventory);
    });

    it('should validate inventory without id (optional field)', () => {
      const validInventory = {
        dateOrder: '2024-01-15',
        quantity: 50,
        idProduct: 'product-456',
      };

      const result = InventorySchema.parse(validInventory);
      expect(result).toEqual(validInventory);
    });

    it('should validate with minimum quantity (0)', () => {
      const validInventory = {
        dateOrder: '2024-01-15',
        quantity: 0,
        idProduct: 'product-789',
      };

      const result = InventorySchema.parse(validInventory);
      expect(result).toEqual(validInventory);
    });

    it('should validate with maximum quantity (maxInteger)', () => {
      const validInventory = {
        dateOrder: '2024-01-15',
        quantity: maxInteger,
        idProduct: 'product-max',
      };

      const result = InventorySchema.parse(validInventory);
      expect(result).toEqual(validInventory);
    });

    it('should validate with valid date formats', () => {
      const validDates = [
        '2024-01-01',
        '2024-12-31',
        '2023-02-28',
        '2024-02-29', // leap year
      ];

      validDates.forEach(date => {
        const validInventory = {
          dateOrder: date,
          quantity: 10,
          idProduct: 'product-date-test',
        };

        expect(() => InventorySchema.parse(validInventory)).not.toThrow();
      });
    });
  });

  describe('Invalid data - dateOrder field', () => {
    it('should reject invalid date format', () => {
      const invalidInventory = {
        dateOrder: '15/01/2024', // wrong format
        quantity: 100,
        idProduct: 'product-123',
      };

      expect(() => InventorySchema.parse(invalidInventory)).toThrow();
    });

    it('should reject non-date strings', () => {
      const invalidInventory = {
        dateOrder: 'not-a-date',
        quantity: 100,
        idProduct: 'product-123',
      };

      expect(() => InventorySchema.parse(invalidInventory)).toThrow();
    });

    it('should reject missing dateOrder field', () => {
      const invalidInventory = {
        quantity: 100,
        idProduct: 'product-123',
      };

      expect(() => InventorySchema.parse(invalidInventory)).toThrow();
    });

    it('should reject empty string for dateOrder', () => {
      const invalidInventory = {
        dateOrder: '',
        quantity: 100,
        idProduct: 'product-123',
      };

      expect(() => InventorySchema.parse(invalidInventory)).toThrow();
    });
  });

  describe('Invalid data - quantity field', () => {
    it('should reject negative quantity', () => {
      const invalidInventory = {
        dateOrder: '2024-01-15',
        quantity: -1,
        idProduct: 'product-123',
      };

      expect(() => InventorySchema.parse(invalidInventory)).toThrow(
        'Percentage must be a positive number'
      );
    });

    it('should reject quantity greater than maxInteger', () => {
      const invalidInventory = {
        dateOrder: '2024-01-15',
        quantity: maxInteger + 1,
        idProduct: 'product-123',
      };

      expect(() => InventorySchema.parse(invalidInventory)).toThrow(
        `Percentage must be less than or equal to ${maxInteger}`
      );
    });

    it('should reject non-number quantity', () => {
      const invalidInventory = {
        dateOrder: '2024-01-15',
        quantity: '100', // string instead of number
        idProduct: 'product-123',
      };

      expect(() => InventorySchema.parse(invalidInventory)).toThrow();
    });

    it('should reject missing quantity field', () => {
      const invalidInventory = {
        dateOrder: '2024-01-15',
        idProduct: 'product-123',
      };

      expect(() => InventorySchema.parse(invalidInventory)).toThrow();
    });

    it('should reject NaN quantity', () => {
      const invalidInventory = {
        dateOrder: '2024-01-15',
        quantity: NaN,
        idProduct: 'product-123',
      };

      expect(() => InventorySchema.parse(invalidInventory)).toThrow();
    });

    it('should reject Infinity quantity', () => {
      const invalidInventory = {
        dateOrder: '2024-01-15',
        quantity: Infinity,
        idProduct: 'product-123',
      };

      expect(() => InventorySchema.parse(invalidInventory)).toThrow();
    });
  });

  describe('Invalid data - idProduct field', () => {
    it('should reject missing idProduct field', () => {
      const invalidInventory = {
        dateOrder: '2024-01-15',
        quantity: 100,
      };

      expect(() => InventorySchema.parse(invalidInventory)).toThrow();
    });

    it('should reject empty string for idProduct', () => {
      const invalidInventory = {
        dateOrder: '2024-01-15',
        quantity: 100,
        idProduct: '',
      };

      expect(() => InventorySchema.parse(invalidInventory)).toThrow();
    });

    it('should reject non-string idProduct', () => {
      const invalidInventory = {
        dateOrder: '2024-01-15',
        quantity: 100,
        idProduct: 123, // number instead of string
      };

      expect(() => InventorySchema.parse(invalidInventory)).toThrow();
    });
  });

  describe('Type inference', () => {
    it('should infer correct TypeScript type', () => {
      const inventory: Inventory = {
        id: '123',
        dateOrder: '2024-01-15',
        quantity: 100,
        idProduct: 'product-123',
      };

      // Type check - this should compile without errors
      expect(inventory.id).toBe('123');
      expect(inventory.dateOrder).toBe('2024-01-15');
      expect(inventory.quantity).toBe(100);
      expect(inventory.idProduct).toBe('product-123');
    });

    it('should allow optional id field in type', () => {
      const inventory: Inventory = {
        dateOrder: '2024-01-15',
        quantity: 100,
        idProduct: 'product-123',
      };

      // Type check - this should compile without errors
      expect(inventory.id).toBeUndefined();
      expect(inventory.dateOrder).toBe('2024-01-15');
    });
  });

  describe('Schema validation methods', () => {
    it('should use safeParse for non-throwing validation', () => {
      const invalidInventory = {
        dateOrder: '2024-01-15',
        quantity: -5, // negative quantity
        idProduct: 'product-123',
      };

      const result = InventorySchema.safeParse(invalidInventory);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues).toHaveLength(1);
        expect(result.error.issues[0].message).toBe(
          'Percentage must be a positive number'
        );
      }
    });

    it('should return success true for valid data with safeParse', () => {
      const validInventory = {
        dateOrder: '2024-01-15',
        quantity: 100,
        idProduct: 'product-123',
      };

      const result = InventorySchema.safeParse(validInventory);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual(validInventory);
      }
    });
  });

  describe('Edge cases', () => {
    it('should handle decimal quantities', () => {
      const inventoryWithDecimal = {
        dateOrder: '2024-01-15',
        quantity: 10.5,
        idProduct: 'product-decimal',
      };

      const result = InventorySchema.parse(inventoryWithDecimal);
      expect(result.quantity).toBe(10.5);
    });

    it('should handle very large valid quantities', () => {
      const inventoryWithLargeQuantity = {
        dateOrder: '2024-01-15',
        quantity: maxInteger - 1,
        idProduct: 'product-large',
      };

      const result = InventorySchema.parse(inventoryWithLargeQuantity);
      expect(result.quantity).toBe(maxInteger - 1);
    });
  });
});
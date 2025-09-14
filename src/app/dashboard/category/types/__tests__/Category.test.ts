import { CategorySchema, Category } from '../Category';
import { z } from 'zod';

describe('CategorySchema', () => {
  describe('Valid data', () => {
    it('should validate a complete valid category', () => {
      const validCategory = {
        id: '123',
        name: 'Electronics',
        description: 'Electronic devices and accessories',
        shortDescription: 'Electronics category',
      };

      const result = CategorySchema.parse(validCategory);
      expect(result).toEqual(validCategory);
    });

    it('should validate category without id (optional field)', () => {
      const validCategory = {
        name: 'Books',
        description: 'Books and literature',
        shortDescription: 'Books category',
      };

      const result = CategorySchema.parse(validCategory);
      expect(result).toEqual(validCategory);
    });

    it('should validate with minimum length values', () => {
      const validCategory = {
        name: 'ABC', // minimum 3 characters
        description: 'XYZ', // minimum 3 characters
        shortDescription: 'DEF', // minimum 3 characters
      };

      const result = CategorySchema.parse(validCategory);
      expect(result).toEqual(validCategory);
    });

    it('should validate with maximum length values', () => {
      const validCategory = {
        name: 'A'.repeat(80), // maximum 80 characters
        description: 'B'.repeat(5000), // maximum 5000 characters
        shortDescription: 'C'.repeat(500), // maximum 500 characters
      };

      const result = CategorySchema.parse(validCategory);
      expect(result).toEqual(validCategory);
    });
  });

  describe('Invalid data - name field', () => {
    it('should reject name shorter than 3 characters', () => {
      const invalidCategory = {
        name: 'AB',
        description: 'Valid description',
        shortDescription: 'Valid short description',
      };

      expect(() => CategorySchema.parse(invalidCategory)).toThrow(
        'Name must be 3 or more characters long'
      );
    });

    it('should reject name longer than 80 characters', () => {
      const invalidCategory = {
        name: 'A'.repeat(81),
        description: 'Valid description',
        shortDescription: 'Valid short description',
      };

      expect(() => CategorySchema.parse(invalidCategory)).toThrow(
        'Name must be 80 or fewer characters long'
      );
    });

    it('should reject missing name field', () => {
      const invalidCategory = {
        description: 'Valid description',
        shortDescription: 'Valid short description',
      };

      expect(() => CategorySchema.parse(invalidCategory)).toThrow();
    });
  });

  describe('Invalid data - description field', () => {
    it('should reject description shorter than 3 characters', () => {
      const invalidCategory = {
        name: 'Valid name',
        description: 'AB',
        shortDescription: 'Valid short description',
      };

      expect(() => CategorySchema.parse(invalidCategory)).toThrow(
        'Description must be 3 or more characters long'
      );
    });

    it('should reject description longer than 5000 characters', () => {
      const invalidCategory = {
        name: 'Valid name',
        description: 'A'.repeat(5001),
        shortDescription: 'Valid short description',
      };

      expect(() => CategorySchema.parse(invalidCategory)).toThrow(
        'Description must be 5000 or fewer characters long'
      );
    });

    it('should reject missing description field', () => {
      const invalidCategory = {
        name: 'Valid name',
        shortDescription: 'Valid short description',
      };

      expect(() => CategorySchema.parse(invalidCategory)).toThrow();
    });
  });

  describe('Invalid data - shortDescription field', () => {
    it('should reject shortDescription shorter than 3 characters', () => {
      const invalidCategory = {
        name: 'Valid name',
        description: 'Valid description',
        shortDescription: 'AB',
      };

      expect(() => CategorySchema.parse(invalidCategory)).toThrow(
        'Short description must be 3 or more characters long'
      );
    });

    it('should reject shortDescription longer than 500 characters', () => {
      const invalidCategory = {
        name: 'Valid name',
        description: 'Valid description',
        shortDescription: 'A'.repeat(501),
      };

      expect(() => CategorySchema.parse(invalidCategory)).toThrow(
        'Short description must be 500 or fewer characters long'
      );
    });

    it('should reject missing shortDescription field', () => {
      const invalidCategory = {
        name: 'Valid name',
        description: 'Valid description',
      };

      expect(() => CategorySchema.parse(invalidCategory)).toThrow();
    });
  });

  describe('Type inference', () => {
    it('should infer correct TypeScript type', () => {
      const category: Category = {
        id: '123',
        name: 'Test Category',
        description: 'Test Description',
        shortDescription: 'Test Short',
      };

      // Type check - this should compile without errors
      expect(category.id).toBe('123');
      expect(category.name).toBe('Test Category');
      expect(category.description).toBe('Test Description');
      expect(category.shortDescription).toBe('Test Short');
    });

    it('should allow optional id field in type', () => {
      const category: Category = {
        name: 'Test Category',
        description: 'Test Description',
        shortDescription: 'Test Short',
      };

      // Type check - this should compile without errors
      expect(category.id).toBeUndefined();
      expect(category.name).toBe('Test Category');
    });
  });

  describe('Schema validation methods', () => {
    it('should use safeParse for non-throwing validation', () => {
      const invalidCategory = {
        name: 'AB', // too short
        description: 'Valid description',
        shortDescription: 'Valid short description',
      };

      const result = CategorySchema.safeParse(invalidCategory);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues).toHaveLength(1);
        expect(result.error.issues[0].message).toBe(
          'Name must be 3 or more characters long'
        );
      }
    });

    it('should return success true for valid data with safeParse', () => {
      const validCategory = {
        name: 'Valid name',
        description: 'Valid description',
        shortDescription: 'Valid short description',
      };

      const result = CategorySchema.safeParse(validCategory);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual(validCategory);
      }
    });
  });
});
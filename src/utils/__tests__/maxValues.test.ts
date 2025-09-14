import {
  maxDecimal,
  minDecimal,
  maxInteger,
  minInteger,
  maxFloat,
  minFloat,
  maxDouble,
  minDouble,
} from '../maxValues';

describe('maxValues', () => {
  describe('Decimal values', () => {
    it('should have correct maxDecimal value', () => {
      expect(maxDecimal).toBe(79228162514264337593543950335);
      expect(typeof maxDecimal).toBe('number');
    });

    it('should have correct minDecimal value', () => {
      expect(minDecimal).toBe(-79228162514264337593543950335);
      expect(typeof minDecimal).toBe('number');
    });

    it('should have minDecimal as negative of maxDecimal', () => {
      expect(minDecimal).toBe(-maxDecimal);
    });
  });

  describe('Integer values', () => {
    it('should have correct maxInteger value', () => {
      expect(maxInteger).toBe(2147483647);
      expect(typeof maxInteger).toBe('number');
    });

    it('should have correct minInteger value', () => {
      expect(minInteger).toBe(-2147483648);
      expect(typeof minInteger).toBe('number');
    });

    it('should have integer values within 32-bit signed integer range', () => {
      expect(maxInteger).toBe(Math.pow(2, 31) - 1);
      expect(minInteger).toBe(-Math.pow(2, 31));
    });

    it('should have minInteger as one less than negative of maxInteger', () => {
      expect(minInteger).toBe(-maxInteger - 1);
    });
  });

  describe('Float values', () => {
    it('should have correct maxFloat value', () => {
      expect(maxFloat).toBe(3.40282347e38);
      expect(typeof maxFloat).toBe('number');
    });

    it('should have correct minFloat value', () => {
      expect(minFloat).toBe(-3.40282347e38);
      expect(typeof minFloat).toBe('number');
    });

    it('should have minFloat as negative of maxFloat', () => {
      expect(minFloat).toBe(-maxFloat);
    });

    it('should be finite numbers', () => {
      expect(Number.isFinite(maxFloat)).toBe(true);
      expect(Number.isFinite(minFloat)).toBe(true);
    });
  });

  describe('Double values', () => {
    it('should have correct maxDouble value', () => {
      expect(maxDouble).toBe(1.7976931348623157e308);
      expect(typeof maxDouble).toBe('number');
    });

    it('should have correct minDouble value', () => {
      expect(minDouble).toBe(-1.7976931348623157e308);
      expect(typeof minDouble).toBe('number');
    });

    it('should have minDouble as negative of maxDouble', () => {
      expect(minDouble).toBe(-maxDouble);
    });

    it('should be finite numbers', () => {
      expect(Number.isFinite(maxDouble)).toBe(true);
      expect(Number.isFinite(minDouble)).toBe(true);
    });

    it('should be close to JavaScript Number.MAX_VALUE', () => {
      expect(maxDouble).toBeCloseTo(Number.MAX_VALUE, 10);
    });
  });

  describe('Value comparisons', () => {
    it('should have double values larger than float values', () => {
      expect(maxDouble).toBeGreaterThan(maxFloat);
      expect(minDouble).toBeLessThan(minFloat);
    });

    it('should have decimal values larger than integer values', () => {
      expect(maxDecimal).toBeGreaterThan(maxInteger);
      expect(minDecimal).toBeLessThan(minInteger);
    });

    it('should have float values larger than integer values', () => {
      expect(maxFloat).toBeGreaterThan(maxInteger);
      expect(minFloat).toBeLessThan(minInteger);
    });
  });

  describe('Type safety', () => {
    it('should export all values as numbers', () => {
      expect(typeof maxDecimal).toBe('number');
      expect(typeof minDecimal).toBe('number');
      expect(typeof maxInteger).toBe('number');
      expect(typeof minInteger).toBe('number');
      expect(typeof maxFloat).toBe('number');
      expect(typeof minFloat).toBe('number');
      expect(typeof maxDouble).toBe('number');
      expect(typeof minDouble).toBe('number');
    });

    it('should not be NaN', () => {
      expect(Number.isNaN(maxDecimal)).toBe(false);
      expect(Number.isNaN(minDecimal)).toBe(false);
      expect(Number.isNaN(maxInteger)).toBe(false);
      expect(Number.isNaN(minInteger)).toBe(false);
      expect(Number.isNaN(maxFloat)).toBe(false);
      expect(Number.isNaN(minFloat)).toBe(false);
      expect(Number.isNaN(maxDouble)).toBe(false);
      expect(Number.isNaN(minDouble)).toBe(false);
    });
  });
});
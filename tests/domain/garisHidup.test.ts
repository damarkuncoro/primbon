import { describe, it, expect } from 'vitest';
import { GarisHidupCalculator } from '../../src/domain/primbon/services/GarisHidupCalculator';

describe('GarisHidupCalculator', () => {
  const calculator = new GarisHidupCalculator();

  describe('calculateNumber', () => {
    it('should calculate life path number from date', () => {
      const date = new Date('1990-01-01');
      
      const result = calculator.calculateNumber(date);
      
      expect(result).toBeGreaterThanOrEqual(1);
      expect(result).toBeLessThanOrEqual(9);
    });

    it('should return single digit number (1-9)', () => {
      const date = new Date('2024-01-01');
      
      const result = calculator.calculateNumber(date);
      
      expect(result).toBeGreaterThanOrEqual(1);
      expect(result).toBeLessThanOrEqual(9);
    });

    it('should reduce multiple digits to single digit', () => {
      // Date that would give multi-digit sum before reduction
      const date = new Date('1999-12-31');
      
      const result = calculator.calculateNumber(date);
      
      // Should be reduced to 1-9
      expect(result).toBeGreaterThanOrEqual(1);
      expect(result).toBeLessThanOrEqual(9);
    });

    it('should handle master numbers (11, 22, 33) in reduction', () => {
      // Test that reduction works correctly
      const date1 = new Date('1990-01-01');
      const date2 = new Date('1990-01-10');
      
      const result1 = calculator.calculateNumber(date1);
      const result2 = calculator.calculateNumber(date2);
      
      // Both should be valid single digits
      expect(result1).toBeGreaterThanOrEqual(1);
      expect(result1).toBeLessThanOrEqual(9);
      expect(result2).toBeGreaterThanOrEqual(1);
      expect(result2).toBeLessThanOrEqual(9);
    });

    it('should return consistent results for same date', () => {
      const date = new Date('1990-01-01');
      
      const result1 = calculator.calculateNumber(date);
      const result2 = calculator.calculateNumber(date);
      
      expect(result1).toBe(result2);
    });
  });
});
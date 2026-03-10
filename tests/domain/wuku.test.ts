import { describe, it, expect } from 'vitest';
import { WukuCalculator } from '../../src/domain/pawukon/services/WukuCalculator.js';
import { WUKU_LIST } from '../../src/domain/pawukon/entities/Wuku.js';

describe('WukuCalculator', () => {
  const calculator = new WukuCalculator();

  describe('calculate', () => {
    it('should calculate wuku from date', () => {
      const date = new Date('2024-01-01');
      const result = calculator.calculate(date);
      
      expect(result.nama).toBeDefined();
      expect(result.watak).toBeDefined();
    });

    it('should return valid wuku name', () => {
      const date = new Date('2024-06-15');
      const result = calculator.calculate(date);
      
      expect(WUKU_LIST).toContain(result.nama);
    });

    it('should return consistent results for same date', () => {
      const date = new Date('2024-01-01');
      
      const result1 = calculator.calculate(date);
      const result2 = calculator.calculate(date);
      
      expect(result1.nama).toBe(result2.nama);
    });
  });

  describe('calculateIndex', () => {
    it('should return valid wuku index', () => {
      const date = new Date('2024-01-01');
      const index = calculator.calculateIndex(date);
      
      expect(index).toBeGreaterThanOrEqual(0);
      expect(index).toBeLessThan(30);
    });

    it('should return consistent indices for same date', () => {
      const date = new Date('2024-01-01');
      
      const index1 = calculator.calculateIndex(date);
      const index2 = calculator.calculateIndex(date);
      
      expect(index1).toBe(index2);
    });
  });

  describe('getWukuName', () => {
    it('should return correct wuku name by index', () => {
      expect(calculator.getWukuName(0)).toBe('Sinta');
      expect(calculator.getWukuName(29)).toBe('Watugunung');
    });
  });
});
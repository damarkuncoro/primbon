import { describe, it, expect } from 'vitest';
import { JodohCalculator } from '../../src/domain/primbon/services/JodohCalculator';

describe('JodohCalculator', () => {
  const calculator = new JodohCalculator();

  describe('calculate', () => {
    it('should calculate compatibility between two dates', () => {
      const dateA = new Date('1990-01-01');
      const dateB = new Date('1992-06-15');
      
      const result = calculator.calculate(dateA, dateB);
      
      expect(result.personA).toBeDefined();
      expect(result.personB).toBeDefined();
      expect(result.totalNeptu).toBeGreaterThan(0);
      expect(result.sisa).toBeGreaterThanOrEqual(0);
      expect(result.sisa).toBeLessThan(8);
    });

    it('should return valid JodohResult', () => {
      const dateA = new Date('1990-01-01');
      const dateB = new Date('1990-01-01');
      
      const result = calculator.calculate(dateA, dateB);
      
      expect(result.personA.hari).toBeDefined();
      expect(result.personA.pasaran).toBeDefined();
      expect(result.personA.neptu).toBeGreaterThan(0);
      expect(result.personB.hari).toBeDefined();
      expect(result.personB.pasaran).toBeDefined();
      expect(result.personB.neptu).toBeGreaterThan(0);
    });

    it('should calculate total neptu correctly', () => {
      const dateA = new Date('1990-01-01');
      const dateB = new Date('1992-06-15');
      
      const result = calculator.calculate(dateA, dateB);
      
      expect(result.totalNeptu).toBe(result.personA.neptu + result.personB.neptu);
    });

    it('should calculate sisa correctly', () => {
      const dateA = new Date('1990-01-01');
      const dateB = new Date('1992-06-15');
      
      const result = calculator.calculate(dateA, dateB);
      
      expect(result.sisa).toBe(result.totalNeptu % 8);
    });

    it('should return consistent results for same inputs', () => {
      const dateA = new Date('1990-01-01');
      const dateB = new Date('1992-06-15');
      
      const result1 = calculator.calculate(dateA, dateB);
      const result2 = calculator.calculate(dateA, dateB);
      
      expect(result1.sisa).toBe(result2.sisa);
      expect(result1.totalNeptu).toBe(result2.totalNeptu);
    });
  });
});
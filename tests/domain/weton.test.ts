import { describe, it, expect } from 'vitest';
import { WetonCalculator } from '../../src/domain/primbon/services/WetonCalculator';

describe('WetonCalculator', () => {
  const calculator = new WetonCalculator();

  describe('getHari', () => {
    it('should return correct day name for Sunday', () => {
      const date = new Date('2024-01-07'); // Sunday
      expect(calculator.getHari(date)).toBe('Minggu');
    });

    it('should return correct day name for Monday', () => {
      const date = new Date('2024-01-08'); // Monday
      expect(calculator.getHari(date)).toBe('Senin');
    });

    it('should return correct day name for Saturday', () => {
      const date = new Date('2024-01-13'); // Saturday
      expect(calculator.getHari(date)).toBe('Sabtu');
    });
  });

  describe('getPasaran', () => {
    it('should return Pahing for base date 1900-01-01', () => {
      const date = new Date(1900, 0, 1);
      expect(calculator.getPasaran(date)).toBe('Pahing');
    });
  });

  describe('calculate', () => {
    it('should calculate weton correctly', () => {
      const date = new Date('2024-01-01');
      const weton = calculator.calculate(date);
      
      expect(weton.hari).toBeDefined();
      expect(weton.pasaran).toBeDefined();
      expect(weton.neptu).toBeGreaterThan(0);
    });

    it('should return valid weton object', () => {
      const date = new Date('2024-06-15');
      const weton = calculator.calculate(date);
      
      expect(typeof weton.toString()).toBe('string');
      expect(weton.toString()).toContain(weton.hari);
      expect(weton.toString()).toContain(weton.pasaran);
    });
  });

  describe('calculateNeptu', () => {
    it('should calculate neptu correctly for Minggu Legi', () => {
      const neptu = calculator.calculateNeptu('Minggu', 'Legi');
      expect(neptu).toBe(10); // 5 + 5
    });

    it('should calculate neptu correctly for Senin Pahing', () => {
      const neptu = calculator.calculateNeptu('Senin', 'Pahing');
      expect(neptu).toBe(13); // 4 + 9
    });

    it('should calculate neptu correctly for Saturday Kliwon', () => {
      const neptu = calculator.calculateNeptu('Sabtu', 'Kliwon');
      expect(neptu).toBe(17); // 9 + 8
    });
  });
});
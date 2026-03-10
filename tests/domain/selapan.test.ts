import { describe, it, expect } from 'vitest';
import { SelapanCalculator } from '../../src/domain/pawukon/services/SelapanCalculator';

describe('SelapanCalculator', () => {
  const calculator = new SelapanCalculator();

  describe('calculate', () => {
    it('should calculate selapan from birth date', () => {
      const tglLahir = new Date('2020-01-01');
      const tglSekarang = new Date('2020-01-36'); // 36 days after
      
      const result = calculator.calculate(tglLahir, tglSekarang);
      
      expect(result.jumlahSelapan).toBeGreaterThanOrEqual(0);
      expect(result.hariKe).toBeGreaterThanOrEqual(1);
      expect(result.hariKe).toBeLessThanOrEqual(35);
      expect(result.sisaHari).toBeGreaterThanOrEqual(0);
      expect(result.sisaHari).toBeLessThan(35);
    });

    it('should return hariKe 1 for same day', () => {
      const tglLahir = new Date('2020-01-01');
      const tglSekarang = new Date('2020-01-01');
      
      const result = calculator.calculate(tglLahir, tglSekarang);
      
      expect(result.hariKe).toBe(1);
      expect(result.jumlahSelapan).toBe(0);
      expect(result.sisaHari).toBe(0);
    });

    it('should calculate correct cycle after 35 days', () => {
      const tglLahir = new Date('2020-01-01');
      const tglSekarang = new Date('2020-02-05'); // 35 days after
      
      const result = calculator.calculate(tglLahir, tglSekarang);
      
      expect(result.jumlahSelapan).toBe(1);
      expect(result.hariKe).toBe(1);
      expect(result.sisaHari).toBe(0);
    });

    it('should calculate correct cycle after 70 days', () => {
      const tglLahir = new Date('2020-01-01');
      const tglSekarang = new Date('2020-03-11'); // 70 days after
      
      const result = calculator.calculate(tglLahir, tglSekarang);
      
      expect(result.jumlahSelapan).toBe(2);
      expect(result.hariKe).toBe(1);
    });
  });
});
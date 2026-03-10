import { describe, it, expect } from 'vitest';
import { KalenderJawaCalculator } from '../../src/domain/primbon/services/KalenderJawaCalculator';

describe('KalenderJawaCalculator', () => {
  const calculator = new KalenderJawaCalculator();

  describe('calculate', () => {
    it('should calculate Javanese calendar date', () => {
      const date = new Date('2024-01-01');
      const result = calculator.calculate(date);
      
      expect(result.tanggal).toBeGreaterThanOrEqual(1);
      expect(result.tanggal).toBeLessThanOrEqual(30);
      expect(result.bulan).toBeDefined();
      expect(result.tahun).toBeDefined();
      expect(result.namaTahun).toBeDefined();
    });

    it('should return valid TanggalJawa object', () => {
      const date = new Date('2024-06-15');
      const result = calculator.calculate(date);
      
      expect(typeof result.tanggal).toBe('number');
      expect(typeof result.bulan).toBe('string');
      expect(typeof result.tahun).toBe('number');
      expect(typeof result.namaTahun).toBe('string');
    });

    it('should have valid month names', () => {
      const validMonths = [
        'Sura', 'Sapar', 'Mulud', 'Bakda Mulud', 'Jumadil Awal', 'Jumadil Akhir',
        'Rejeb', 'Ruwah', 'Pasa', 'Sawal', 'Sela', 'Besar'
      ];
      
      const date = new Date('2024-01-01');
      const result = calculator.calculate(date);
      
      expect(validMonths).toContain(result.bulan);
    });

    it('should have valid year names', () => {
      const validYearNames = ['Alip', 'Ehe', 'Jimawal', 'Je', 'Dal', 'Be', 'Wawu', 'Jimakir'];
      
      const date = new Date('2024-01-01');
      const result = calculator.calculate(date);
      
      expect(validYearNames).toContain(result.namaTahun);
    });
  });
});
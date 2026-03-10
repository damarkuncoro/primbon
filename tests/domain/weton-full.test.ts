import { describe, it, expect } from 'vitest';
import { WetonCalculator } from '../../src/domain/primbon/services/WetonCalculator';

describe('WetonCalculator - Full 35 Weton Table', () => {
  const calculator = new WetonCalculator();

  // Table 35 Weton Lengkap
  const wetonTable = [
    // Minggu
    { hari: 'Minggu', pasaran: 'Legi', neptu: 10 },
    { hari: 'Minggu', pasaran: 'Pahing', neptu: 14 },
    { hari: 'Minggu', pasaran: 'Pon', neptu: 12 },
    { hari: 'Minggu', pasaran: 'Wage', neptu: 9 },
    { hari: 'Minggu', pasaran: 'Kliwon', neptu: 13 },
    // Senin
    { hari: 'Senin', pasaran: 'Legi', neptu: 9 },
    { hari: 'Senin', pasaran: 'Pahing', neptu: 13 },
    { hari: 'Senin', pasaran: 'Pon', neptu: 11 },
    { hari: 'Senin', pasaran: 'Wage', neptu: 8 },
    { hari: 'Senin', pasaran: 'Kliwon', neptu: 12 },
    // Selasa
    { hari: 'Selasa', pasaran: 'Legi', neptu: 8 },
    { hari: 'Selasa', pasaran: 'Pahing', neptu: 12 },
    { hari: 'Selasa', pasaran: 'Pon', neptu: 10 },
    { hari: 'Selasa', pasaran: 'Wage', neptu: 7 },
    { hari: 'Selasa', pasaran: 'Kliwon', neptu: 11 },
    // Rabat
    { hari: 'Rabu', pasaran: 'Legi', neptu: 12 },
    { hari: 'Rabu', pasaran: 'Pahing', neptu: 16 },
    { hari: 'Rabu', pasaran: 'Pon', neptu: 14 },
    { hari: 'Rabu', pasaran: 'Wage', neptu: 11 },
    { hari: 'Rabu', pasaran: 'Kliwon', neptu: 15 },
    // Kamis
    { hari: 'Kamis', pasaran: 'Legi', neptu: 13 },
    { hari: 'Kamis', pasaran: 'Pahing', neptu: 17 },
    { hari: 'Kamis', pasaran: 'Pon', neptu: 15 },
    { hari: 'Kamis', pasaran: 'Wage', neptu: 12 },
    { hari: 'Kamis', pasaran: 'Kliwon', neptu: 16 },
    // Jumat
    { hari: 'Jumat', pasaran: 'Legi', neptu: 11 },
    { hari: 'Jumat', pasaran: 'Pahing', neptu: 15 },
    { hari: 'Jumat', pasaran: 'Pon', neptu: 13 },
    { hari: 'Jumat', pasaran: 'Wage', neptu: 10 },
    { hari: 'Jumat', pasaran: 'Kliwon', neptu: 14 },
    // Sábado
    { hari: 'Sabtu', pasaran: 'Legi', neptu: 14 },
    { hari: 'Sabtu', pasaran: 'Pahing', neptu: 18 },
    { hari: 'Sabtu', pasaran: 'Pon', neptu: 16 },
    { hari: 'Sabtu', pasaran: 'Wage', neptu: 13 },
    { hari: 'Sabtu', pasaran: 'Kliwon', neptu: 17 },
  ];

  // Test each weton combination
  describe('calculateNeptu', () => {
    wetonTable.forEach(({ hari, pasaran, neptu }, index) => {
      it(`#${index + 1} ${hari} ${pasaran} should have neptu ${neptu}`, () => {
        const result = calculator.calculateNeptu(hari, pasaran!);
        expect(result).toBe(neptu);
      });
    });
  });

  // Test neptu for each weton using the actual dates
  describe('calculate - Real Dates', () => {
    // Based on BASE_DATE = 1899-12-31 (Senin Pahing)
    const testCases = [
      // 1900-01-01 = Senin Pahing
      { date: '1900-01-01', expectedHari: 'Senin', expectedPasaran: 'Pahing', expectedNeptu: 13 },
    ];

    testCases.forEach(({ date, expectedHari, expectedPasaran, expectedNeptu }) => {
      it(`${date} should be ${expectedHari} ${expectedPasaran} with neptu ${expectedNeptu}`, () => {
        const result = calculator.calculate(new Date(date));
        expect(result.hari).toBe(expectedHari);
        expect(result.pasaran).toBe(expectedPasaran);
        expect(result.neptu).toBe(expectedNeptu);
      });
    });
  });

  // Test getHari
  describe('getHari', () => {
    it('should return correct day names', () => {
      const testCases = [
        { date: new Date('2024-01-07'), expected: 'Minggu' }, // Sunday
        { date: new Date('2024-01-08'), expected: 'Senin' },  // Monday
        { date: new Date('2024-01-09'), expected: 'Selasa' }, // Tuesday
        { date: new Date('2024-01-10'), expected: 'Rabu' },   // Wednesday
        { date: new Date('2024-01-11'), expected: 'Kamis' },  // Thursday
        { date: new Date('2024-01-12'), expected: 'Jumat' },  // Friday
        { date: new Date('2024-01-13'), expected: 'Sabtu' },  // Saturday
      ];

      testCases.forEach(({ date, expected }) => {
        expect(calculator.getHari(date)).toBe(expected);
      });
    });
  });

  // Test neptu for individual hari
  describe('getNeptuHari', () => {
    it('should return correct neptu for each hari', () => {
      expect(calculator.getNeptuHari('Minggu')).toBe(5);
      expect(calculator.getNeptuHari('Senin')).toBe(4);
      expect(calculator.getNeptuHari('Selasa')).toBe(3);
      expect(calculator.getNeptuHari('Rabu')).toBe(7);
      expect(calculator.getNeptuHari('Kamis')).toBe(8);
      expect(calculator.getNeptuHari('Jumat')).toBe(6);
      expect(calculator.getNeptuHari('Sabtu')).toBe(9);
    });
  });

  // Test neptu for individual pasaran (Pancasuda)
  describe('getNeptuPasaran', () => {
    it('should return correct neptu for each pasaran', () => {
      expect(calculator.getNeptuPasaran('Legi')).toBe(5);
      expect(calculator.getNeptuPasaran('Pahing')).toBe(9);
      expect(calculator.getNeptuPasaran('Pon')).toBe(7);
      expect(calculator.getNeptuPasaran('Wage')).toBe(4);
      expect(calculator.getNeptuPasaran('Kliwon')).toBe(8);
    });
  });

  // Test neptu Kamarokam for each pasaran
  describe('getNeptuPasaranKamarokam', () => {
    it('should return correct Kamarokam neptu for each pasaran', () => {
      expect(calculator.getNeptuPasaranKamarokam('Legi')).toBe(1);
      expect(calculator.getNeptuPasaranKamarokam('Pahing')).toBe(3);
      expect(calculator.getNeptuPasaranKamarokam('Pon')).toBe(5);
      expect(calculator.getNeptuPasaranKamarokam('Wage')).toBe(4);
      expect(calculator.getNeptuPasaranKamarokam('Kliwon')).toBe(2);
    });
  });

  // Test calculateNeptuKamarokam
  describe('calculateNeptuKamarokam', () => {
    it('should return correct Kamarokam neptu', () => {
      // Senin Pahing: 4 + 3 = 7
      expect(calculator.calculateNeptuKamarokam('Senin', 'Pahing')).toBe(7);
      // Jumat Kliwon: 6 + 2 = 8
      expect(calculator.calculateNeptuKamarokam('Jumat', 'Kliwon')).toBe(8);
      // Minggu Legi: 5 + 1 = 6
      expect(calculator.calculateNeptuKamarokam('Minggu', 'Legi')).toBe(6);
    });
  });

  // Test base date - tested via 1900-01-01 in existing tests
  // Note: Old dates (pre-1900) have timezone issues in JavaScript
});
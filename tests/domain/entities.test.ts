import { describe, it, expect } from 'vitest';
import { Weton } from '../../src/domain/primbon/entities/Weton';
import { TanggalJawa } from '../../src/domain/primbon/entities/TanggalJawa';

describe('Domain Entities', () => {
  describe('Weton', () => {
    it('should create valid Weton instance', () => {
      const weton = new Weton('Minggu', 'Legi', 10);
      
      expect(weton.hari).toBe('Minggu');
      expect(weton.pasaran).toBe('Legi');
      expect(weton.neptu).toBe(10);
    });

    it('should return correct toString', () => {
      const weton = new Weton('Senin', 'Pahing', 13);
      
      expect(weton.toString()).toBe('Senin Pahing');
    });

    it('should return correct neptu value', () => {
      const weton = new Weton('Sabtu', 'Kliwon', 17);
      
      expect(weton.nilai).toBe(17);
    });

    it('should check equality correctly', () => {
      const weton1 = new Weton('Minggu', 'Legi', 10);
      const weton2 = new Weton('Minggu', 'Legi', 10);
      const weton3 = new Weton('Senin', 'Pahing', 13);
      
      expect(weton1.equals(weton2)).toBe(true);
      expect(weton1.equals(weton3)).toBe(false);
    });

    it('should throw error for empty hari', () => {
      expect(() => new Weton('', 'Legi', 5)).toThrow('Hari tidak boleh kosong');
    });

    it('should throw error for empty pasaran', () => {
      expect(() => new Weton('Minggu', '', 5)).toThrow('Pasaran tidak boleh kosong');
    });
  });

  describe('TanggalJawa', () => {
    it('should create valid TanggalJawa instance', () => {
      const tj = new TanggalJawa(1, 'Sura', 2000, 'Alip');
      
      expect(tj.tanggal).toBe(1);
      expect(tj.bulan).toBe('Sura');
      expect(tj.tahun).toBe(2000);
      expect(tj.namaTahun).toBe('Alip');
    });

    it('should return correct toString', () => {
      const tj = new TanggalJawa(15, 'Mulud', 2000, 'Ehe');
      
      expect(tj.toString()).toBe('15 Mulud 2000 (Ehe)');
    });

    it('should check equality correctly', () => {
      const tj1 = new TanggalJawa(1, 'Sura', 2000, 'Alip');
      const tj2 = new TanggalJawa(1, 'Sura', 2000, 'Alip');
      const tj3 = new TanggalJawa(2, 'Sura', 2000, 'Alip');
      
      expect(tj1.equals(tj2)).toBe(true);
      expect(tj1.equals(tj3)).toBe(false);
    });

    it('should throw error for invalid tanggal', () => {
      expect(() => new TanggalJawa(0, 'Sura', 2000, 'Alip')).toThrow('Tanggal Jawa harus antara 1-30');
      expect(() => new TanggalJawa(31, 'Sura', 2000, 'Alip')).toThrow('Tanggal Jawa harus antara 1-30');
    });

    it('should throw error for negative tahun', () => {
      expect(() => new TanggalJawa(1, 'Sura', -1, 'Alip')).toThrow('Tahun Jawa tidak boleh negatif');
    });
  });
});
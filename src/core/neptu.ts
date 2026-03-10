import { wetonCalculator } from '../domain/primbon/services/WetonCalculator.js';

/**
 * Nilai neptu untuk hari masehi.
 */
export const NEPTU_HARI: Record<string, number> = {
  'Minggu': 5,
  'Senin': 4,
  'Selasa': 3,
  'Rabu': 7,
  'Kamis': 8,
  'Jumat': 6,
  'Sabtu': 9
};

/**
 * Nilai neptu untuk pasaran Jawa.
 */
export const NEPTU_PASARAN: Record<string, number> = {
  'Legi': 5,
  'Pahing': 9,
  'Pon': 7,
  'Wage': 4,
  'Kliwon': 8
};

/**
 * Menghitung nilai neptu weton.
 * @param hari - Nama hari masehi.
 * @param pasaran - Nama pasaran Jawa.
 * @returns - Nilai neptu.
 */
export const calculateNeptu = (hari: string, pasaran: string): number => {
  return wetonCalculator.calculateNeptu(hari, pasaran);
};

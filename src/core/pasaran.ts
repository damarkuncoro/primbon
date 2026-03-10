import { wetonCalculator } from '../domain/primbon/services/WetonCalculator.js';

/**
 * Daftar nama pasaran Jawa.
 */
export const PASARAN_NAMES = ['Legi', 'Pahing', 'Pon', 'Wage', 'Kliwon'];

/**
 * Menghitung pasaran Jawa dari tanggal masehi.
 * @param date - Tanggal masehi.
 * @returns - Nama pasaran.
 */
export const calculatePasaran = (date: Date): string => {
  return wetonCalculator.getPasaran(date);
};

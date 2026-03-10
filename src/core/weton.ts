import { wetonCalculator } from '../domain/primbon/services/WetonCalculator.js';

export interface WetonResult {
  hari: string;
  pasaran: string;
  weton: string;
  neptu: number;
  neptuKamarokam?: number;
}

/**
 * Menghitung weton dari tanggal masehi.
 * @param date - Tanggal masehi.
 * @returns - Informasi weton.
 */
export const calculateWeton = (date: Date): WetonResult => {
  const weton = wetonCalculator.calculate(date);

  return {
    hari: weton.hari,
    pasaran: weton.pasaran,
    weton: weton.toString(),
    neptu: weton.neptu,
    neptuKamarokam: weton.neptuKamarokam
  };
};

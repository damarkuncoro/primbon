import { diffDays } from '../../../utils/date.js';

/**
 * SelapanCalculator - Domain Service for calculating 35-day cycle (Selapan)
 */
export class SelapanCalculator {
  private static readonly CYCLE_DAYS = 35;

  /**
   * Calculate selapan from birth date and current date
   */
  calculate(tglLahir: Date, tglSekarang: Date = new Date()): SelapanResult {
    const diff = diffDays(tglSekarang, tglLahir);
    
    const jumlahSelapan = Math.floor(diff / SelapanCalculator.CYCLE_DAYS);
    const sisaHari = diff % SelapanCalculator.CYCLE_DAYS;

    return {
      jumlahSelapan,
      hariKe: sisaHari + 1,
      sisaHari
    };
  }
}

export interface SelapanResult {
  jumlahSelapan: number;
  hariKe: number;
  sisaHari: number;
}

export const selapanCalculator = new SelapanCalculator();
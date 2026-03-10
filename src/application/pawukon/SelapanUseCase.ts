import { selapanCalculator } from '../../domain/pawukon/services/SelapanCalculator.js';

export interface SelapanResult {
  jumlahSelapan: number;
  hariKe: number;
  sisaHari: number;
}

/**
 * SelapanUseCase - Application Service for Selapan (35-day cycle) calculations
 */
export class SelapanUseCase {
  /**
   * Get selapan information based on birth date and current date
   */
  getSelapan(tglLahir: Date, tglSekarang: Date = new Date()): SelapanResult {
    return selapanCalculator.calculate(tglLahir, tglSekarang);
  }
}

export const selapanUseCase = new SelapanUseCase();
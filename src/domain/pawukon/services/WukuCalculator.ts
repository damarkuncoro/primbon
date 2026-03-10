import { Wuku, WUKU_LIST } from '../entities/Wuku.js';
import { Weton } from '../../primbon/entities/Weton.js';

/**
 * WukuCalculator - Domain Service for calculating wuku (30-week cycle)
 */
export class WukuCalculator {
  private static readonly WUKU_CYCLE_COUNT = 30;
  private static readonly DAYS_PER_WUKU = 7;
  private static readonly ANCHOR_DATE = new Date(1986, 10, 3);
  private static readonly ANCHOR_WUKU_INDEX = 13;

  /**
   * Calculate wuku from Gregorian date
   */
  calculate(date: Date): Wuku {
    const diffInDays = Math.floor((date.getTime() - WukuCalculator.ANCHOR_DATE.getTime()) / (24 * 60 * 60 * 1000));
    const diffInWeeks = Math.floor(diffInDays / WukuCalculator.DAYS_PER_WUKU);
    
    let wukuIndex = (WukuCalculator.ANCHOR_WUKU_INDEX + diffInWeeks) % WukuCalculator.WUKU_CYCLE_COUNT;
    if (wukuIndex < 0) wukuIndex += WukuCalculator.WUKU_CYCLE_COUNT;

    const nama = WUKU_LIST[wukuIndex];
    return new Wuku(nama, ''); // Watak will be populated by repository
  }

  /**
   * Calculate wuku index from date (for internal use)
   */
  calculateIndex(date: Date): number {
    const diffInDays = Math.floor((date.getTime() - WukuCalculator.ANCHOR_DATE.getTime()) / (24 * 60 * 60 * 1000));
    const diffInWeeks = Math.floor(diffInDays / WukuCalculator.DAYS_PER_WUKU);
    
    let wukuIndex = (WukuCalculator.ANCHOR_WUKU_INDEX + diffInWeeks) % WukuCalculator.WUKU_CYCLE_COUNT;
    if (wukuIndex < 0) wukuIndex += WukuCalculator.WUKU_CYCLE_COUNT;

    return wukuIndex;
  }

  /**
   * Get wuku name by index
   */
  getWukuName(index: number): string {
    return WUKU_LIST[index];
  }

  /**
   * Get wuku table for a specific month
   * @param year - Gregorian year
   * @param month - Gregorian month (1-12)
   * @returns Array of wuku data for each day in the month
   */
  getWukuMonth(year: number, month: number): WukuMonthResult[] {
    const daysInMonth = new Date(year, month, 0).getDate();
    const result: WukuMonthResult[] = [];

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month - 1, day);
      const wuku = this.calculate(date);
      const weton = this.getWetonForDate(date);
      
      result.push({
        tanggal: day,
        hari: weton.hari,
        wuku: wuku.nama,
        weton: weton.toString(),
        neptu: weton.neptu
      });
    }

    return result;
  }

  /**
   * Get weton for a specific date
   */
  private getWetonForDate(date: Date): Weton {
    // Use the same logic as WetonCalculator
    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const PASARAN_NAMES = ['Legi', 'Pahing', 'Pon', 'Wage', 'Kliwon'];
    const NEPTU_HARI: Record<string, number> = {
      'Minggu': 5, 'Senin': 4, 'Selasa': 3, 'Rabu': 7, 'Kamis': 8, 'Jumat': 6, 'Sabtu': 9
    };
    const NEPTU_PASARAN: Record<string, number> = {
      'Legi': 5, 'Pahing': 9, 'Pon': 7, 'Wage': 4, 'Kliwon': 8
    };
    
    const hari = days[date.getDay()];
    const baseDate = new Date(1899, 11, 31);
    const diffDays = Math.round((date.getTime() - baseDate.getTime()) / (24 * 60 * 60 * 1000));
    const pasaran = PASARAN_NAMES[diffDays % 5];
    const neptu = (NEPTU_HARI[hari] || 0) + (NEPTU_PASARAN[pasaran] || 0);
    
    return new Weton(hari, pasaran, neptu);
  }
}

/**
 * Interface for monthly wuku result
 */
export interface WukuMonthResult {
  tanggal: number;
  hari: string;
  wuku: string;
  weton: string;
  neptu: number;
}

export const wukuCalculator = new WukuCalculator();
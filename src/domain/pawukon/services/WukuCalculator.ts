import { Wuku, WUKU_LIST } from '../entities/Wuku.js';

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
}

export const wukuCalculator = new WukuCalculator();
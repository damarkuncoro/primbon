import { TanggalJawa } from '../entities/TanggalJawa.js';

/**
 * KalenderJawaCalculator - Domain Service for calculating Javanese calendar
 */
export class KalenderJawaCalculator {
  private static readonly JAWA_MONTHS = [
    'Sura', 'Sapar', 'Mulud', 'Bakda Mulud', 'Jumadil Awal', 'Jumadil Akhir',
    'Rejeb', 'Ruwah', 'Pasa', 'Sawal', 'Sela', 'Besar'
  ];

  private static readonly JAWA_YEAR_NAMES = [
    'Alip', 'Ehe', 'Jimawal', 'Je', 'Dal', 'Be', 'Wawu', 'Jimakir'
  ];

  private static readonly MONTH_LENGTHS = [30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29];
  private static readonly IS_KABISAT_YEAR = [false, true, false, false, true, false, false, true];

  private static readonly ANCHOR_MASEHI = new Date(1986, 10, 3);
  private static readonly ANCHOR_JAWA_TGL = 1;
  private static readonly ANCHOR_JAWA_BLN_IDX = 2; // Mulud
  private static readonly ANCHOR_JAWA_THN = 1919;

  /**
   * Calculate Javanese calendar date from Gregorian date
   */
  calculate(date: Date): TanggalJawa {
    const diff = Math.round((date.getTime() - KalenderJawaCalculator.ANCHOR_MASEHI.getTime()) / (24 * 60 * 60 * 1000));
    
    let currentThn = KalenderJawaCalculator.ANCHOR_JAWA_THN;
    let currentBlnIdx = KalenderJawaCalculator.ANCHOR_JAWA_BLN_IDX;
    let currentTgl = KalenderJawaCalculator.ANCHOR_JAWA_TGL;
    let remainingDays = diff;

    if (remainingDays >= 0) {
      while (remainingDays > 0) {
        const monthLen = this.getMonthLength(currentBlnIdx, currentThn);
        const daysLeftInMonth = monthLen - currentTgl + 1;
        if (remainingDays < daysLeftInMonth) {
          currentTgl += remainingDays;
          remainingDays = 0;
        } else {
          remainingDays -= daysLeftInMonth;
          currentTgl = 1;
          currentBlnIdx++;
          if (currentBlnIdx > 11) {
            currentBlnIdx = 0;
            currentThn++;
          }
        }
      }
    } else {
      // For dates before anchor, we need special handling
      // Start from beginning of previous month
      currentBlnIdx--;
      if (currentBlnIdx < 0) {
        currentBlnIdx = 11;
        currentThn--;
      }
      currentTgl = this.getMonthLength(currentBlnIdx, currentThn);
      
      remainingDays = Math.abs(remainingDays) - 1;
      while (remainingDays > 0) {
        if (remainingDays < currentTgl) {
          currentTgl -= remainingDays;
          remainingDays = 0;
        } else {
          remainingDays -= currentTgl;
          currentBlnIdx--;
          if (currentBlnIdx < 0) {
            currentBlnIdx = 11;
            currentThn--;
          }
          currentTgl = this.getMonthLength(currentBlnIdx, currentThn);
        }
      }
    }

    return new TanggalJawa(
      currentTgl,
      KalenderJawaCalculator.JAWA_MONTHS[currentBlnIdx],
      currentThn,
      this.getNamaTahun(currentThn)
    );
  }

  /**
   * Get month length considering kabisat years
   */
  private getMonthLength(blnIdx: number, thn: number): number {
    if (blnIdx === 11) { // Besar
      const yearIdx = this.getYearIndexInWindu(thn);
      return KalenderJawaCalculator.IS_KABISAT_YEAR[yearIdx] ? 30 : 29;
    }
    return KalenderJawaCalculator.MONTH_LENGTHS[blnIdx];
  }

  /**
   * Get year index in 8-year windu cycle
   */
  private getYearIndexInWindu(thn: number): number {
    return (thn - 1915 + 8000) % 8;
  }

  /**
   * Get Javanese year name
   */
  private getNamaTahun(thn: number): string {
    const index = this.getYearIndexInWindu(thn);
    return KalenderJawaCalculator.JAWA_YEAR_NAMES[index];
  }
}

export const kalenderJawaCalculator = new KalenderJawaCalculator();
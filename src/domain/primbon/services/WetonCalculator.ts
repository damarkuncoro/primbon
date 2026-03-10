import { Weton, WetonHari, Pasaran } from '../entities/Weton.js';

/**
 * WetonCalculator - Domain Service for calculating Javanese weton
 * This is a pure domain service with no external dependencies
 */
export class WetonCalculator {
  private static readonly PASARAN_NAMES = ['Legi', 'Pahing', 'Pon', 'Wage', 'Kliwon'];
  private static readonly BASE_DATE = new Date(1899, 11, 31); // Sunday, Pahing (day before 1900-01-01)

  /**
   * Calculate weton from a Date object
   */
  calculate(date: Date): Weton {
    const hari = this.getHari(date);
    const pasaran = this.getPasaran(date);
    const neptu = this.calculateNeptu(hari, pasaran);
    const neptuKamarokam = this.calculateNeptuKamarokam(hari, pasaran);

    return new Weton(hari, pasaran, neptu, neptuKamarokam);
  }

  /**
   * Get day name in Indonesian
   */
  getHari(date: Date): string {
    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    return days[date.getDay()];
  }

  /**
   * Calculate pasaran from date
   * Uses the fact that 1900-01-01 is Monday (Legi)
   */
  getPasaran(date: Date): string {
    const diffDays = this.diffDays(date, WetonCalculator.BASE_DATE);
    const index = diffDays % 5;
    return WetonCalculator.PASARAN_NAMES[index];
  }

  /**
   * Calculate neptu from hari and pasaran
   */
  calculateNeptu(hari: string, pasaran: string): number {
    const neptuHari = this.getNeptuHari(hari);
    const neptuPasaran = this.getNeptuPasaran(pasaran);
    return neptuHari + neptuPasaran;
  }

  /**
   * Get neptu value for hari
   */
  getNeptuHari(hari: string): number {
    const neptuHari: Record<string, number> = {
      'Minggu': 5,
      'Senin': 4,
      'Selasa': 3,
      'Rabu': 7,
      'Kamis': 8,
      'Jumat': 6,
      'Sabtu': 9
    };
    return neptuHari[hari] || 0;
  }

  /**
   * Get neptu value for pasaran (Pancasuda / Saptawara & Pancawara)
   */
  getNeptuPasaran(pasaran: string): number {
    const neptuPasaran: Record<string, number> = {
      'Legi': 5,
      'Pahing': 9,
      'Pon': 7,
      'Wage': 4,
      'Kliwon': 8
    };
    return neptuPasaran[pasaran] || 0;
  }

  /**
   * Get neptu value for Kamarokam (alternative calculation)
   * In Kamarokam, Pahing/Paing has value 3 instead of 9
   */
  getNeptuPasaranKamarokam(pasaran: string): number {
    const neptuPasaranKamarokam: Record<string, number> = {
      'Legi': 5,
      'Pahing': 3,
      'Pon': 7,
      'Wage': 4,
      'Kliwon': 8
    };
    return neptuPasaranKamarokam[pasaran] || 0;
  }

  /**
   * Calculate neptu for Kamarokam
   * Kamarokam uses different values for Pahing/Paing
   */
  calculateNeptuKamarokam(hari: string, pasaran: string): number {
    const neptuHari = this.getNeptuHari(hari);
    const neptuPasaran = this.getNeptuPasaranKamarokam(pasaran);
    return neptuHari + neptuPasaran;
  }

  /**
   * Calculate difference in days between two dates
   */
  private diffDays(date1: Date, date2: Date): number {
    const oneDay = 24 * 60 * 60 * 1000;
    return Math.round((date1.getTime() - date2.getTime()) / oneDay);
  }
}

// Singleton instance for convenience
export const wetonCalculator = new WetonCalculator();
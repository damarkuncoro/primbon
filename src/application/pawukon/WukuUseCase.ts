import { WukuCalculator } from '../../domain/pawukon/services/WukuCalculator.js';
import type { WukuRepository } from '../../domain/pawukon/repositories/index.js';

export interface WukuResult {
  nama: string;
  watak: string;
}

/**
 * WukuUseCase - Application Service for wuku calculations
 */
export class WukuUseCase {
  private wukuCalculator: WukuCalculator;
  private wukuRepository: WukuRepository;

  constructor(wukuRepository: WukuRepository) {
    this.wukuCalculator = new WukuCalculator();
    this.wukuRepository = wukuRepository;
  }

  /**
   * Get wuku based on Gregorian date
   */
  getWuku(date: Date): WukuResult {
    const wuku = this.wukuCalculator.calculate(date);
    const watak = this.wukuRepository.getWatakByWuku(wuku.nama);

    return {
      nama: wuku.nama,
      watak: watak || 'Belum ada data watak.'
    };
  }
}
import { GarisHidupCalculator } from '../../domain/primbon/services/GarisHidupCalculator.js';
import type { GarisHidupRepository } from '../../domain/primbon/repositories/index.js';

export interface GarisHidupResult {
  angka: number;
  karakter: string;
}

/**
 * GarisHidupUseCase - Application Service for calculating life path number
 */
export class GarisHidupUseCase {
  private garisHidupCalculator: GarisHidupCalculator;
  private garisHidupRepository: GarisHidupRepository;

  constructor(garisHidupRepository: GarisHidupRepository) {
    this.garisHidupCalculator = new GarisHidupCalculator();
    this.garisHidupRepository = garisHidupRepository;
  }

  /**
   * Get garis hidup (life path number) based on birth date
   */
  getGarisHidup(date: Date): GarisHidupResult {
    const number = this.garisHidupCalculator.calculateNumber(date);
    const data = this.garisHidupRepository.getGarisHidupByAngka(number);

    return {
      angka: number,
      karakter: data?.karakter || 'Belum ada data'
    };
  }
}
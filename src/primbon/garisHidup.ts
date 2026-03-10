import { GarisHidupUseCase } from '../application/primbon/GarisHidupUseCase.js';
import { garisHidupRepository } from '../infrastructure/repositories/JsonDataRepository.js';

const garisHidupUseCase = new GarisHidupUseCase(garisHidupRepository);

export interface GarisHidupResult {
  angka: number;
  karakter: string;
}

/**
 * Mendapatkan informasi karakter Garis Hidup berdasarkan tanggal lahir.
 * @param date - Tanggal lahir.
 * @returns - { angka, karakter }
 */
export const getGarisHidup = (date: Date): GarisHidupResult => {
  return garisHidupUseCase.getGarisHidup(date);
};

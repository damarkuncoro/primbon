import { HariBaikUseCase } from '../application/primbon/HariBaikUseCase.js';
import { hariBaikRepository } from '../infrastructure/repositories/JsonDataRepository.js';

const hariBaikUseCase = new HariBaikUseCase(hariBaikRepository);

export interface HariBaikResult {
  keperluan: string;
  bulan: string | null;
  rekomendasi: string[];
}

/**
 * Menentukan hari baik untuk keperluan tertentu.
 * @param keperluan - Keperluan (nikah, pindah_rumah, usaha).
 * @param bulan - Bulan Jawa (opsional).
 * @returns - { keperluan, bulan, rekomendasi }
 */
export const getHariBaik = (keperluan: string, bulan?: string): HariBaikResult => {
  return hariBaikUseCase.getHariBaik(keperluan, bulan);
};

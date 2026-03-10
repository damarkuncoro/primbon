import { WukuUseCase } from '../application/pawukon/WukuUseCase.js';
import { wukuRepository } from '../infrastructure/repositories/JsonDataRepository.js';

const wukuUseCase = new WukuUseCase(wukuRepository);

export interface WukuResult {
  nama: string;
  watak: string;
}

/**
 * Menghitung wuku berdasarkan tanggal masehi.
 * @param date - Tanggal masehi.
 * @returns - { nama, watak }
 */
export const calculateWuku = (date: Date): WukuResult => {
  return wukuUseCase.getWuku(date);
};

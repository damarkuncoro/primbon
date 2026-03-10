import { JodohUseCase } from '../application/primbon/JodohUseCase.js';
import { jodohRepository } from '../infrastructure/repositories/JsonDataRepository.js';

const jodohUseCase = new JodohUseCase(jodohRepository);

export interface JodohResult {
  personA: {
    hari: string;
    pasaran: string;
    weton: string;
    neptu: number;
  };
  personB: {
    hari: string;
    pasaran: string;
    weton: string;
    neptu: number;
  };
  totalNeptu: number;
  sisa: number;
  kategori: string;
  arti: string;
}

/**
 * Menghitung kecocokan jodoh berdasarkan dua tanggal lahir.
 * @param dateA - Tanggal lahir orang pertama.
 * @param dateB - Tanggal lahir orang kedua.
 * @returns - Hasil kecocokan jodoh.
 */
export const calculateJodoh = (dateA: Date, dateB: Date): JodohResult => {
  return jodohUseCase.calculate(dateA, dateB) as JodohResult;
};

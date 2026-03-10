import { WatakUseCase } from '../application/primbon/WatakUseCase.js';
import { watakRepository } from '../infrastructure/repositories/JsonDataRepository.js';

// Create singleton use case
const watakUseCase = new WatakUseCase(watakRepository);

export interface WatakResult {
  weton: string;
  sifat: string[];
  deskripsi: string;
  detail: {
    hari: {
      nama: string;
      beredar?: string;
      sifat: string[];
    };
    pasaran: {
      nama: string;
      gambaran?: string;
      binatang?: any[];
      sifat: string[];
    };
  };
}

/**
 * Mendapatkan watak berdasarkan weton.
 * @param date - Tanggal masehi.
 * @returns - Informasi watak.
 */
export const getWatak = (date: Date): WatakResult => {
  return watakUseCase.getWatak(date) as WatakResult;
};

/**
 * Mendapatkan watak berdasarkan tanggal Jawa (1-30).
 * @param tanggal - Tanggal Jawa.
 * @returns - Deskripsi watak.
 */
export const getWatakTanggalJawa = (tanggal: number | string): string => {
  return watakUseCase.getWatakTanggalJawa(tanggal);
};

export interface BulanWatakResult {
  neptu: number;
  watak: string;
}

/**
 * Mendapatkan watak berdasarkan Bulan Jawa.
 * @param bulan - Nama bulan Jawa.
 * @returns - { neptu, watak }
 */
export const getWatakBulanJawa = (bulan: string): BulanWatakResult => {
  const result = watakUseCase.getWatakBulanJawa(bulan);
  return result || { neptu: 0, watak: 'Belum ada data untuk bulan ini.' };
};

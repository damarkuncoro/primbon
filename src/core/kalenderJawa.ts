import { kalenderJawaCalculator } from '../domain/primbon/services/KalenderJawaCalculator.js';

export const JAWA_MONTHS = [
  'Sura', 'Sapar', 'Mulud', 'Bakda Mulud', 'Jumadil Awal', 'Jumadil Akhir',
  'Rejeb', 'Ruwah', 'Pasa', 'Sawal', 'Sela', 'Besar'
];

export const JAWA_YEAR_NAMES = [
  'Alip', 'Ehe', 'Jimawal', 'Je', 'Dal', 'Be', 'Wawu', 'Jimakir'
];

export interface KalenderJawaResult {
  tanggal: number;
  bulan: string;
  tahun: number;
  namaTahun: string;
}

export const calculateKalenderJawa = (date: Date): KalenderJawaResult => {
  const tj = kalenderJawaCalculator.calculate(date);
  return {
    tanggal: tj.tanggal,
    bulan: tj.bulan,
    tahun: tj.tahun,
    namaTahun: tj.namaTahun
  };
};

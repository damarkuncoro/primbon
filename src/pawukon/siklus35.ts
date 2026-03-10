import { SelapanUseCase } from '../application/pawukon/SelapanUseCase.js';

const selapanUseCase = new SelapanUseCase();

export interface SelapanResult {
  jumlahSelapan: number;
  hariKe: number;
  sisaHari: number;
}

/**
 * Menghitung informasi siklus 35 hari (Selapan).
 * @param tglLahir - Tanggal lahir.
 * @param tglSekarang - Tanggal sekarang.
 * @returns - { jumlahSelapan, hariKe, sisaHari }
 */
export const calculateSelapan = (tglLahir: Date, tglSekarang: Date = new Date()): SelapanResult => {
  return selapanUseCase.getSelapan(tglLahir, tglSekarang);
};

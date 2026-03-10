import { pranataMangsaRepository } from '../infrastructure/repositories/JsonDataRepository.js';

export interface PranataMangsaResult {
  id: string;
  nama: string;
  mulai: string;
  akhir: string;
  candra: string;
  sifat: string;
  kesehatan: string;
  karir: string;
  rejeki: string;
  jodoh?: string;
  batu_permata?: string;
  warna?: string;
  bunga?: string;
}

export const calculatePranataMangsa = (date: Date): PranataMangsaResult | null => {
  const year = date.getFullYear();
  const mangsaData = pranataMangsaRepository.getAll();

  const getMangsaDate = (dateStr: string, refYear: number) => {
    const [m, d] = dateStr.split('-').map(Number);
    return new Date(refYear, m - 1, d);
  };

  for (const mangsa of mangsaData) {
    const start = getMangsaDate(mangsa.mulai, year);
    let end = getMangsaDate(mangsa.akhir, year);

    if (end < start) {
      if (date >= start) {
        end = getMangsaDate(mangsa.akhir, year + 1);
      } else {
        const prevStart = getMangsaDate(mangsa.mulai, year - 1);
        if (date >= prevStart && date <= end) {
          return mangsa;
        }
        continue;
      }
    }

    if (date >= start && date <= end) {
      return mangsa;
    }
  }

  return null;
};

import type { 
  WatakRepository, 
  WatakData, 
  DinoWatakData, 
  PasaranWatakData, 
  BulanWatakData,
  JodohRepository,
  JodohResultData,
  HariBaikRepository,
  HariBaikData,
  GarisHidupRepository,
  GarisHidupData,
  PranataMangsaRepository,
  PranataMangsaData
} from '../../domain/primbon/repositories/index.js';
import type { WukuRepository } from '../../domain/pawukon/repositories/index.js';
import { preloadAllData, getWatakData, getDinoWatakData, getPasaranWatakData, getTanggalJawaWatakData, getBulanJawaWatakData, getJodohData, getHariBaikData, getGarisHidupData, getWukuWatakData, getPranataMangsaData } from '../../utils/dataLoader.js';

// Preload data on module load
preloadAllData();

/**
 * JSON Watak Repository - Infrastructure implementation using JSON files
 */
export class JsonWatakRepository implements WatakRepository {
  getWatakByWeton(weton: string): WatakData | null {
    const data = getWatakData();
    return data[weton] || null;
  }

  getWatakByHari(hari: string): DinoWatakData | null {
    const data = getDinoWatakData();
    return data[hari] || null;
  }

  getWatakByPasaran(pasaran: string): PasaranWatakData | null {
    const data = getPasaranWatakData();
    return data[pasaran] || null;
  }

  getWatakByTanggalJawa(tanggal: number | string): string {
    const data = getTanggalJawaWatakData();
    return data[tanggal.toString()] || 'Belum ada data untuk tanggal ini.';
  }

  getWatakByBulanJawa(bulan: string): BulanWatakData | null {
    const data = getBulanJawaWatakData();
    return data[bulan] || null;
  }
}

/**
 * JSON Jodoh Repository - Infrastructure implementation for jodoh data
 */
export class JsonJodohRepository implements JodohRepository {
  getJodohBySisa(sisa: number): JodohResultData | null {
    const data = getJodohData();
    return data[sisa.toString()] || null;
  }
}

/**
 * JSON HariBaik Repository - Infrastructure implementation for hari baik data
 */
export class JsonHariBaikRepository implements HariBaikRepository {
  getHariBaikByKeperluan(keperluan: string): HariBaikData | null {
    const data = getHariBaikData();
    return data[keperluan] || null;
  }
}

/**
 * JSON GarisHidup Repository - Infrastructure implementation for garis hidup data
 */
export class JsonGarisHidupRepository implements GarisHidupRepository {
  getGarisHidupByAngka(angka: number): GarisHidupData | null {
    const data = getGarisHidupData();
    return data[angka.toString()] || null;
  }
}

/**
 * JSON Wuku Repository - Infrastructure implementation for wuku data
 */
export class JsonWukuRepository implements WukuRepository {
  getWatakByWuku(nama: string): string | null {
    const data = getWukuWatakData();
    return data[nama] || null;
  }
}

/**
 * JSON PranataMangsa Repository - Infrastructure implementation for pranata mangsa data
 */
export class JsonPranataMangsaRepository implements PranataMangsaRepository {
  getAll(): PranataMangsaData[] {
    const data = getPranataMangsaData();
    return data as PranataMangsaData[];
  }

  getById(id: string): PranataMangsaData | null {
    const all = this.getAll();
    return all.find(m => m.id === id) || null;
  }
}

// Singleton instances for convenience
export const watakRepository = new JsonWatakRepository();
export const jodohRepository = new JsonJodohRepository();
export const hariBaikRepository = new JsonHariBaikRepository();
export const garisHidupRepository = new JsonGarisHidupRepository();
export const wukuRepository = new JsonWukuRepository();
export const pranataMangsaRepository = new JsonPranataMangsaRepository();
/**
 * WatakRepository Interface - Domain contract for accessing watak (character) data
 * This follows the Repository Pattern from DDD
 */
export interface WatakRepository {
  /**
   * Get watak data by weton key
   */
  getWatakByWeton(weton: string): WatakData | null;

  /**
   * Get watak data by hari (day of week)
   */
  getWatakByHari(hari: string): DinoWatakData | null;

  /**
   * Get watak data by pasaran
   */
  getWatakByPasaran(pasaran: string): PasaranWatakData | null;

  /**
   * Get watak by tanggal jawa (1-30)
   */
  getWatakByTanggalJawa(tanggal: number | string): string;

  /**
   * Get watak by bulan jawa
   */
  getWatakByBulanJawa(bulan: string): BulanWatakData | null;
}

export interface WatakData {
  sifat: string[];
  deskripsi?: string;
}

export interface DinoWatakData {
  sifat: string[];
  peredaran?: string;
}

export interface PasaranWatakData {
  sifat: string[];
  gambaran?: string;
  binatang?: string[];
}

export interface BulanWatakData {
  neptu: number;
  watak: string;
}
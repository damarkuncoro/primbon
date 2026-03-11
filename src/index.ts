import { calculateWeton, type WetonResult } from './core/weton.js';
import { calculatePasaran } from './core/pasaran.js';
import { calculateNeptu } from './core/neptu.js';
import { calculateKalenderJawa, type KalenderJawaResult } from './core/kalenderJawa.js';
import { calculatePranataMangsa, type PranataMangsaResult } from './core/pranataMangsa.js';
import { calculateSadwara, type SadwaraResult, SADWARA_NAMES } from './core/sadwara.js';
import { calculateAsatawara, type AsatawaraResult, ASATAWARA_NAMES } from './core/asatawara.js';
import { calculateSangawara, type SangawaraResult, SANGAWARA_NAMES } from './core/sangawara.js';
import { calculateHariNaas, type HariNaasResult, getAllHariNaas, HARI_NAAS_NAMES } from './core/hariNaas.js';
import { calculateSiklusRejeki, getRejekiByUsia, type SiklusRejekiResult, type RejekiPoint } from './core/siklusRejeki.js';
import { wetonCalculator, type WetonMonthResult } from './domain/primbon/services/index.js';
import { getWatak, getWatakTanggalJawa, getWatakBulanJawa, type WatakResult, type BulanWatakResult } from './primbon/watak.js';
import { calculateJodoh, type JodohResult } from './primbon/jodoh.js';
import { getHariBaik, type HariBaikResult } from './primbon/hariBaik.js';
import { getGarisHidup, type GarisHidupResult } from './primbon/garisHidup.js';
import { calculateWuku, type WukuResult } from './pawukon/wuku.js';
import { wukuCalculator, type WukuMonthResult } from './domain/pawukon/index.js';
import { calculateSelapan, type SelapanResult } from './pawukon/siklus35.js';
import { ensureDate } from './utils/date.js';
import { preloadAllData } from './utils/dataLoader.js';

// i18n imports
import {
  getLocale,
  setLocale,
  t,
  getTranslations,
  translateHari,
  translatePasaran,
  type Locale,
  type LocaleStrings
} from './i18n/index.js';

// Kitab references imports
import {
  KITAB_REFERENCES,
  getKitabInfo,
  getAllKitabReferences,
  getNeptuHari,
  getNeptuPasaran,
  getNeptuPasaranKamarokam,
  type KitabReference,
  type KitabInfo
} from './domain/primbon/references.js';

// Preload semua data saat modul di-import untuk performa
preloadAllData();

const primbon = {
  /**
   * Mendapatkan informasi weton lengkap.
   * @param tanggal - Tanggal masehi.
   * @returns - { hari, pasaran, weton, neptu }
   */
  weton: (tanggal: Date | string | number): WetonResult => {
    const d = ensureDate(tanggal);
    return calculateWeton(d);
  },

  /**
   * Mendapatkan tanggal Jawa lengkap (Masehi ke Jawa).
   * @param tanggal - Tanggal masehi.
   * @returns - { tanggal, bulan, tahun, namaTahun }
   */
  kalenderJawa: (tanggal: Date | string | number): KalenderJawaResult => {
    const d = ensureDate(tanggal);
    return calculateKalenderJawa(d);
  },

  /**
   * Mendapatkan informasi Pranata Mangsa (Kalender Musim Jawa).
   * @param tanggal - Tanggal masehi.
   * @returns - Detail Mangsa.
   */
  pranataMangsa: (tanggal: Date | string | number): PranataMangsaResult | null => {
    const d = ensureDate(tanggal);
    return calculatePranataMangsa(d);
  },

  /**
   * Mendapatkan pasaran Jawa.
   * @param tanggal - Tanggal masehi.
   * @returns - Legi, Pahing, Pon, Wage, Kliwon.
   */
  pasaran: (tanggal: Date | string | number): string => {
    const d = ensureDate(tanggal);
    return calculatePasaran(d);
  },

  /**
   * Menghitung nilai neptu.
   * @param hari - Nama hari.
   * @param pasaran - Nama pasaran.
   * @returns - Nilai neptu.
   */
  neptu: (hari: string, pasaran: string): number => calculateNeptu(hari, pasaran),

  /**
   * Mendapatkan watak berdasarkan weton.
   * @param tanggal - Tanggal masehi.
   * @returns - { weton, sifat }
   */
  watak: (tanggal: Date | string | number): WatakResult => {
    const d = ensureDate(tanggal);
    return getWatak(d);
  },

  /**
   * Mendapatkan watak berdasarkan tanggal Jawa (1-30).
   * @param tanggal - Tanggal Jawa.
   * @returns - Deskripsi watak.
   */
  watakTanggalJawa: (tanggal: number | string): string => getWatakTanggalJawa(tanggal),

  /**
   * Mendapatkan watak berdasarkan Bulan Jawa.
   * @param bulan - Nama bulan Jawa.
   * @returns - { neptu, watak }
   */
  watakBulanJawa: (bulan: string): BulanWatakResult => getWatakBulanJawa(bulan),

  /**
   * Menghitung kecocokan jodoh.
   * @param tglA - Tanggal lahir orang pertama.
   * @param tglB - Tanggal lahir orang kedua.
   * @returns - Hasil kecocokan jodoh.
   */
  jodoh: (tglA: Date | string | number, tglB: Date | string | number): JodohResult => {
    const dA = ensureDate(tglA);
    const dB = ensureDate(tglB);
    return calculateJodoh(dA, dB);
  },

  /**
   * Menentukan hari baik untuk keperluan tertentu.
   * @param keperluan - Keperluan (nikah, pindah_rumah, usaha).
   * @param bulan - Bulan Jawa (opsional).
   * @returns - { keperluan, bulan, rekomendasi }
   */
  hariBaik: (keperluan: string, bulan?: string): HariBaikResult => getHariBaik(keperluan, bulan),

  /**
   * Mendapatkan informasi Garis Hidup (Numerologi) berdasarkan tanggal lahir.
   * @param tanggal - Tanggal lahir.
   * @returns - { angka, karakter }
   */
  garisHidup: (tanggal: Date | string | number): GarisHidupResult => {
    const d = ensureDate(tanggal);
    return getGarisHidup(d);
  },

  /**
   * Menentukan wuku berdasarkan tanggal masehi.
   * @param tanggal - Tanggal masehi.
   * @returns - { nama, watak }
   */
  wuku: (tanggal: Date | string | number): WukuResult => {
    const d = ensureDate(tanggal);
    return calculateWuku(d);
  },

  /**
   * Menghitung informasi siklus 35 hari (Selapan).
   * @param tglLahir - Tanggal lahir.
   * @param tglSekarang - Tanggal sekarang.
   * @returns - { jumlahSelapan, hariKe, sisaHari }
   */
  selapan: (tglLahir: Date | string | number, tglSekarang: Date | string | number = new Date()): SelapanResult => {
    const dLahir = ensureDate(tglLahir);
    const dSekarang = ensureDate(tglSekarang);
    return calculateSelapan(dLahir, dSekarang);
  },

  /**
   * Mendapatkan tabel weton untuk bulan tertentu.
   * @param tahun - Tahun Masehi.
   * @param bulan - Bulan Masehi (1-12).
   * @returns - Array data weton untuk setiap hari dalam bulan.
   */
  wetonMonth: (tahun: number, bulan: number): WetonMonthResult[] => {
    return wetonCalculator.getWetonMonth(tahun, bulan);
  },

  /**
   * Mendapatkan tabel wuku untuk bulan tertentu.
   * @param tahun - Tahun Masehi.
   * @param bulan - Bulan Masehi (1-12).
   * @returns - Array data wuku untuk setiap hari dalam bulan.
   */
  wukuMonth: (tahun: number, bulan: number): WukuMonthResult[] => {
    return wukuCalculator.getWukuMonth(tahun, bulan);
  },

  /**
   * Menghitung Paringkelan (Sadwara) - Siklus 6 harian.
   * @param tanggal - Tanggal masehi.
   * @returns - Informasi Paringkelan lengkap.
   */
  sadwara: (tanggal: Date | string | number): SadwaraResult => {
    const d = ensureDate(tanggal);
    return calculateSadwara(d);
  },

  /**
   * Menghitung Padewan (Asatawara) - Siklus 8 harian.
   * @param tanggal - Tanggal masehi.
   * @returns - Informasi Padewan lengkap.
   */
  asatawara: (tanggal: Date | string | number): AsatawaraResult => {
    const d = ensureDate(tanggal);
    return calculateAsatawara(d);
  },

  /**
   * Menghitung Padangon (Sangawara) - Siklus 9 harian.
   * @param tanggal - Tanggal masehi.
   * @returns - Informasi Padangon lengkap.
   */
  sangawara: (tanggal: Date | string | number): SangawaraResult => {
    const d = ensureDate(tanggal);
    return calculateSangawara(d);
  },

  // ============== i18n (Lokalisasi) ==============
  
  /**
   * Mendapatkan locale saat ini.
   */
  getLocale: (): Locale => getLocale(),

  /**
   * Mengatur locale untuk internasionalisasi.
   * @param locale - Locale yang diinginkan ('id', 'jv', 'en')
   */
  setLocale: (locale: Locale): void => setLocale(locale),

  /**
   * Mendapatkan terjemahan untuk locale saat ini.
   */
  translate: (): LocaleStrings => t(),

  /**
   * Mendapatkan terjemahan untuk locale tertentu.
   * @param locale - Locale yang diinginkan.
   */
  getTranslations: (locale: Locale): LocaleStrings => getTranslations(locale),

  // ============== Kitab References ==============

  /**
   * Mendapatkan informasi kitab referensi.
   * @param kitabId - ID kitab referensi.
   */
  getKitabInfo: (kitabId: KitabReference): KitabInfo => getKitabInfo(kitabId),

  /**
   * Mendapatkan daftar semua kitab referensi.
   */
  getAllKitabReferences: (): KitabInfo[] => getAllKitabReferences()
};

export default primbon;

// Export individual functions for tree shaking
export {
  // Core functions
  calculateWeton,
  calculatePasaran,
  calculateNeptu,
  calculateKalenderJawa,
  calculatePranataMangsa,
  
  // Sadwara (Paringkelan)
  calculateSadwara,
  SADWARA_NAMES,
  
  // Asatawara (Padewan)
  calculateAsatawara,
  ASATAWARA_NAMES,
  
  // Sangawara (Padangon)
  calculateSangawara,
  SANGAWARA_NAMES,
  
  // Watak
  getWatak,
  getWatakTanggalJawa,
  getWatakBulanJawa,
  
  // Jodoh
  calculateJodoh,
  
  // Hari Baik
  getHariBaik,
  
  // Garis Hidup
  getGarisHidup,
  
  // Pawukon
  calculateWuku,
  calculateSelapan,
  
  // i18n
  getLocale,
  setLocale,
  t,
  getTranslations,
  translateHari,
  translatePasaran,
  
  // Kitab References
  KITAB_REFERENCES,
  getKitabInfo,
  getAllKitabReferences,
  getNeptuHari,
  getNeptuPasaran,
  getNeptuPasaranKamarokam,
  
  // Types
  type Locale,
  type LocaleStrings,
  type KitabReference,
  type KitabInfo
};

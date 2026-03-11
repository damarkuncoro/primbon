/**
 * Sistem Referensi Kitab Primbon
 * 
 * Primbon memiliki berbagai versi/rujukan dari kitab-kitab klasik:
 * - Betaljemur Adammakna (Kitab primbon tertua, karya Sunan Kalijaga)
 * - Primbon Lukmanakim (Versi komprehensif dari Arabia)
 * - Primbon Mustika Waktu (Kitab primbon dari Mataram)
 * - Primbon IJub (Kitab primbon dari komunitas Muslim Jawa)
 */

export type KitabReference = 'betaljemur' | 'lukmanakim' | 'mustikawaktu' | 'ijub' | 'default';

export interface KitabInfo {
  id: KitabReference;
  nama: string;
  namaJawa: string;
  deskripsi: string;
  tahun?: string;
}

/**
 * Daftar kitab referensi yang tersedia
 */
export const KITAB_REFERENCES: Record<KitabReference, KitabInfo> = {
  betaljemur: {
    id: 'betaljemur',
    nama: 'Betaljemur Adammakna',
    namaJawa: 'Betaljemur Adammakna',
    deskripsi: 'Kitab primbon tertua yang ditulis oleh Sunan Kalijaga. Terdiri dari 25 bab tentang primbon, weton, dan ramalan.',
    tahun: 'Abad ke-15'
  },
  lukmanakim: {
    id: 'lukmanakim',
    nama: 'Primbon Lukmanakim',
    namaJawa: 'Primbon Lukmanakim',
    deskripsi: 'Kitab primbon komprehensif dari tradisi Arab-Islam yang banyak digunakan di Jawa.',
    tahun: 'Abad ke-17'
  },
  mustikawaktu: {
    id: 'mustikawaktu',
    nama: 'Primbon Mustika Waktu',
    namaJawa: 'Primbon Mustika Waktu',
    deskripsi: 'Kitab primbon dari Keraton Mataram yang lebih fokus pada perhitungan waktu dan hari baik.',
    tahun: 'Abad ke-18'
  },
  ijub: {
    id: 'ijub',
    nama: 'Primbon IJub',
    namaJawa: 'Primbon IJub',
    deskripsi: 'Kitab primbon dari komunitas abangan atau Islam tradisional Jawa.',
    tahun: 'Abad ke-19'
  },
  default: {
    id: 'default',
    nama: 'Primbon Standar',
    namaJawa: 'Primbon Standar',
    deskripsi: 'Versi standar yang umum digunakan dalam perhitungan modern.'
  }
};

/**
 * Neptu hari berdasarkan referensi kitab
 */
export const NEPTU_HARI_BY_KITAB: Record<KitabReference, Record<string, number>> = {
  default: {
    'Minggu': 5,
    'Senin': 4,
    'Selasa': 3,
    'Rabu': 7,
    'Kamis': 8,
    'Jumat': 6,
    'Sabtu': 9
  },
  betaljemur: {
    'Minggu': 5,
    'Senin': 4,
    'Selasa': 3,
    'Rabu': 7,
    'Kamis': 8,
    'Jumat': 6,
    'Sabtu': 9
  },
  lukmanakim: {
    'Minggu': 5,
    'Senin': 4,
    'Selasa': 3,
    'Rabu': 7,
    'Kamis': 8,
    'Jumat': 6,
    'Sabtu': 9
  },
  mustikawaktu: {
    'Minggu': 5,
    'Senin': 4,
    'Selasa': 3,
    'Rabu': 7,
    'Kamis': 8,
    'Jumat': 6,
    'Sabtu': 9
  },
  ijub: {
    'Minggu': 5,
    'Senin': 4,
    'Selasa': 3,
    'Rabu': 7,
    'Kamis': 8,
    'Jumat': 6,
    'Sabtu': 9
  }
};

/**
 * Neptu pasaran berdasarkan referensi kitab
 */
export const NEPTU_PASARAN_BY_KITAB: Record<KitabReference, Record<string, number>> = {
  default: {
    'Legi': 5,
    'Pahing': 9,
    'Pon': 7,
    'Wage': 4,
    'Kliwon': 8
  },
  betaljemur: {
    'Legi': 5,
    'Pahing': 9,
    'Pon': 7,
    'Wage': 4,
    'Kliwon': 8
  },
  lukmanakim: {
    'Legi': 5,
    'Pahing': 9,
    'Pon': 7,
    'Wage': 4,
    'Kliwon': 8
  },
  mustikawaktu: {
    'Legi': 5,
    'Pahing': 9,
    'Pon': 7,
    'Wage': 4,
    'Kliwon': 8
  },
  ijub: {
    'Legi': 5,
    'Pahing': 9,
    'Pon': 7,
    'Wage': 4,
    'Kliwon': 8
  }
};

/**
 * Neptu pasaran dalam sistem Kamarokam (berdasarkan referensi kitab)
 */
export const NEPTU_PASARAN_KAMAROKAM: Record<string, number> = {
  'Legi': 1,
  'Pahing': 3,
  'Pon': 5,
  'Wage': 4,
  'Kliwon': 2
};

/**
 * Mendapatkan informasi kitab berdasarkan ID
 */
export const getKitabInfo = (kitabId: KitabReference): KitabInfo => {
  return KITAB_REFERENCES[kitabId] || KITAB_REFERENCES.default;
};

/**
 * Mendapatkan daftar semua kitab referensi
 */
export const getAllKitabReferences = (): KitabInfo[] => {
  return Object.values(KITAB_REFERENCES);
};

/**
 * Mendapatkan neptu hari berdasarkan kitab referensi
 */
export const getNeptuHari = (hari: string, kitab: KitabReference = 'default'): number => {
  const neptuHari = NEPTU_HARI_BY_KITAB[kitab] || NEPTU_HARI_BY_KITAB.default;
  return neptuHari[hari] || 0;
};

/**
 * Mendapatkan neptu pasaran berdasarkan kitab referensi
 */
export const getNeptuPasaran = (pasaran: string, kitab: KitabReference = 'default'): number => {
  const neptuPasaran = NEPTU_PASARAN_BY_KITAB[kitab] || NEPTU_PASARAN_BY_KITAB.default;
  return neptuPasaran[pasaran] || 0;
};

/**
 * Mendapatkan neptu pasaran dalam sistem Kamarokam
 */
export const getNeptuPasaranKamarokam = (pasaran: string): number => {
  return NEPTU_PASARAN_KAMAROKAM[pasaran] || 0;
};

export default {
  KITAB_REFERENCES,
  getKitabInfo,
  getAllKitabReferences,
  getNeptuHari,
  getNeptuPasaran,
  getNeptuPasaranKamarokam
};
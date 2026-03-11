/**
 * Sistem Lokalisasi untuk Library Primbon
 * Mendukung: Bahasa Indonesia (id), Bahasa Jawa (jv), Bahasa Inggris (en)
 */

export type Locale = 'id' | 'jv' | 'en';

/**
 * Interface untuk terjemahan
 */
export interface LocaleStrings {
  // Hari
  hari: {
    minggu: string;
    senin: string;
    selasa: string;
    rabu: string;
    kamis: string;
    jumat: string;
    sabtu: string;
  };
  
  // Pasaran
  pasaran: {
    legi: string;
    pahing: string;
    pon: string;
    wage: string;
    kliwon: string;
  };
  
  // Weton
  weton: {
    title: string;
    neptu: string;
    neptuKamarokam: string;
  };
  
  // Jodoh
  jodoh: {
    title: string;
    kategori: string;
    arti: string;
    personA: string;
    personB: string;
    totalNeptu: string;
    sisa: string;
  };
  
  // Sadwara (Paringkelan)
  sadwara: {
    title: string;
    nama: string;
    watak: string;
    deskripsi: string;
    neptu: string;
  };
  
  // Asatawara (Padewan)
  asatawara: {
    title: string;
    nama: string;
    watak: string;
    deskripsi: string;
    neptu: string;
  };
  
  // Sangawara (Padangon)
  sangawara: {
    title: string;
    nama: string;
    watak: string;
    deskripsi: string;
    neptu: string;
  };
  
  // Pranata Mangsa
  pranataMangsa: {
    title: string;
    nama: string;
    awal: string;
    akhir: string;
  };
  
  // Wuku
  wuku: {
    title: string;
    nama: string;
    watak: string;
  };
  
  // Watak
  watak: {
    title: string;
    sifat: string;
  };
  
  // Garis Hidup
  garisHidup: {
    title: string;
    angka: string;
    karakter: string;
  };
  
  // Hari Baik
  hariBaik: {
    title: string;
    keperluan: string;
    bulan: string;
    rekomendasi: string;
  };
  
  // Common
  common: {
    tanggal: string;
    bulan: string;
    tahun: string;
    hasil: string;
  };
}

// Translation dictionaries
const id: LocaleStrings = {
  hari: {
    minggu: 'Minggu',
    senin: 'Senin',
    selasa: 'Selasa',
    rabu: 'Rabu',
    kamis: 'Kamis',
    jumat: 'Jumat',
    sabtu: 'Sabtu'
  },
  pasaran: {
    legi: 'Legi',
    pahing: 'Pahing',
    pon: 'Pon',
    wage: 'Wage',
    kliwon: 'Kliwon'
  },
  weton: {
    title: 'Weton',
    neptu: 'Neptu',
    neptuKamarokam: 'Neptu Kamarokam'
  },
  jodoh: {
    title: 'Kecocokan Jodoh',
    kategori: 'Kategori',
    arti: 'Arti',
    personA: 'Orang Pertama',
    personB: 'Orang Kedua',
    totalNeptu: 'Total Neptu',
    sisa: 'Sisa'
  },
  sadwara: {
    title: 'Paringkelan (Sadwara)',
    nama: 'Nama',
    watak: 'Watak',
    deskripsi: 'Deskripsi',
    neptu: 'Neptu'
  },
  asatawara: {
    title: 'Padewan (Asatawara)',
    nama: 'Nama',
    watak: 'Watak',
    deskripsi: 'Deskripsi',
    neptu: 'Neptu'
  },
  sangawara: {
    title: 'Padangon (Sangawara)',
    nama: 'Nama',
    watak: 'Watak',
    deskripsi: 'Deskripsi',
    neptu: 'Neptu'
  },
  pranataMangsa: {
    title: 'Pranata Mangsa',
    nama: 'Nama Mangsa',
    awal: 'Awal',
    akhir: 'Akhir'
  },
  wuku: {
    title: 'Wuku',
    nama: 'Nama Wuku',
    watak: 'Watak'
  },
  watak: {
    title: 'Watak',
    sifat: 'Sifat'
  },
  garisHidup: {
    title: 'Garis Hidup',
    angka: 'Angka',
    karakter: 'Karakter'
  },
  hariBaik: {
    title: 'Hari Baik',
    keperluan: 'Keperluan',
    bulan: 'Bulan',
    rekomendasi: 'Rekomendasi'
  },
  common: {
    tanggal: 'Tanggal',
    bulan: 'Bulan',
    tahun: 'Tahun',
    hasil: 'Hasil'
  }
};

const jv: LocaleStrings = {
  hari: {
    minggu: 'Ahad',
    senin: 'Senen',
    selasa: 'Seloso',
    rabu: 'Rebu',
    kamis: 'Kemis',
    jumat: 'Jumuah',
    sabtu: 'Setu'
  },
  pasaran: {
    legi: 'Legi',
    pahing: 'Pahing',
    pon: 'Pon',
    wage: 'Wage',
    kliwon: 'Kliwon'
  },
  weton: {
    title: 'Weton',
    neptu: 'Neptu',
    neptuKamarokam: 'Neptu Kamarokam'
  },
  jodoh: {
    title: 'Cocoking Jodoh',
    kategori: 'Kategori',
    arti: 'Arti',
    personA: 'Sing Pertama',
    personB: 'Sing Kedua',
    totalNeptu: 'Total Neptu',
    sisa: 'Sisa'
  },
  sadwara: {
    title: 'Paringkelan (Sadwara)',
    nama: 'Aran',
    watak: 'Watak',
    deskripsi: 'Deskripsi',
    neptu: 'Neptu'
  },
  asatawara: {
    title: 'Padewan (Asatawara)',
    nama: 'Aran',
    watak: 'Watak',
    deskripsi: 'Deskripsi',
    neptu: 'Neptu'
  },
  sangawara: {
    title: 'Padangon (Sangawara)',
    nama: 'Aran',
    watak: 'Watak',
    deskripsi: 'Deskripsi',
    neptu: 'Neptu'
  },
  pranataMangsa: {
    title: 'Pranata Mangsa',
    nama: 'Aran Mangsa',
    awal: 'Mula',
    akhir: 'Pungkasan'
  },
  wuku: {
    title: 'Wuku',
    nama: 'Aran Wuku',
    watak: 'Watak'
  },
  watak: {
    title: 'Watak',
    sifat: 'Sifat'
  },
  garisHidup: {
    title: 'Garis Nd Hidup',
    angka: 'Angka',
    karakter: 'Karakter'
  },
  hariBaik: {
    title: 'Dina Becik',
    keperluan: 'Keperluan',
    bulan: 'Sasi',
    rekomendasi: 'Rekomendasi'
  },
  common: {
    tanggal: 'Tanggal',
    bulan: 'Sasi',
    tahun: 'Taun',
    hasil: 'Asil'
  }
};

const en: LocaleStrings = {
  hari: {
    minggu: 'Sunday',
    senin: 'Monday',
    selasa: 'Tuesday',
    rabu: 'Wednesday',
    kamis: 'Thursday',
    jumat: 'Friday',
    sabtu: 'Saturday'
  },
  pasaran: {
    legi: 'Legi',
    pahing: 'Pahing',
    pon: 'Pon',
    wage: 'Wage',
    kliwon: 'Kliwon'
  },
  weton: {
    title: 'Weton',
    neptu: 'Neptu',
    neptuKamarokam: 'Kamarokam Neptu'
  },
  jodoh: {
    title: 'Marriage Compatibility',
    kategori: 'Category',
    arti: 'Meaning',
    personA: 'First Person',
    personB: 'Second Person',
    totalNeptu: 'Total Neptu',
    sisa: 'Remainder'
  },
  sadwara: {
    title: 'Paringkelan (Sadwara)',
    nama: 'Name',
    watak: 'Character',
    deskripsi: 'Description',
    neptu: 'Neptu'
  },
  asatawara: {
    title: 'Padewan (Asatawara)',
    nama: 'Name',
    watak: 'Character',
    deskripsi: 'Description',
    neptu: 'Neptu'
  },
  sangawara: {
    title: 'Padangon (Sangawara)',
    nama: 'Name',
    watak: 'Character',
    deskripsi: 'Description',
    neptu: 'Neptu'
  },
  pranataMangsa: {
    title: 'Pranata Mangsa',
    nama: 'Mangsa Name',
    awal: 'Start',
    akhir: 'End'
  },
  wuku: {
    title: 'Wuku',
    nama: 'Wuku Name',
    watak: 'Character'
  },
  watak: {
    title: 'Character',
    sifat: 'Traits'
  },
  garisHidup: {
    title: 'Life Path',
    angka: 'Number',
    karakter: 'Character'
  },
  hariBaik: {
    title: 'Good Day',
    keperluan: 'Purpose',
    bulan: 'Month',
    rekomendasi: 'Recommendation'
  },
  common: {
    tanggal: 'Date',
    bulan: 'Month',
    tahun: 'Year',
    hasil: 'Result'
  }
};

// Locale dictionary mapping
const locales: Record<Locale, LocaleStrings> = {
  id,
  jv,
  en
};

// Current locale state
let currentLocale: Locale = 'id';

/**
 * Get current locale
 */
export const getLocale = (): Locale => currentLocale;

/**
 * Set current locale
 */
export const setLocale = (locale: Locale): void => {
  currentLocale = locale;
};

/**
 * Get translation strings for current locale
 */
export const t = (): LocaleStrings => locales[currentLocale];

/**
 * Get translation strings for specific locale
 */
export const getTranslations = (locale: Locale): LocaleStrings => locales[locale];

/**
 * Get day name in current locale
 */
export const translateHari = (nama: string): string => {
  const translations = locales[currentLocale].hari;
  const key = nama.toLowerCase() as keyof typeof translations;
  return translations[key] || nama;
};

/**
 * Get pasaran name in current locale
 */
export const translatePasaran = (nama: string): string => {
  const translations = locales[currentLocale].pasaran;
  const key = nama.toLowerCase() as keyof typeof translations;
  return translations[key] || nama;
};

export default {
  getLocale,
  setLocale,
  t,
  getTranslations,
  translateHari,
  translatePasaran
};
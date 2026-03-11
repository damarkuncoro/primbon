import { wetonCalculator } from '../domain/primbon/services/WetonCalculator.js';

/**
 * Paringkelan (Sadwara) - Siklus 6 Harian
 * 
 * Dalam tradisi Jawa, Paringkelan dihitung berdasarkan neptu weton (hari + pasaran).
 * Siklus ini digunakan untuk menentukan hari baik/buruk dalam berbagai aktivitas.
 * 
 * Referensi: Primbon Betaljemur Adammakna
 */

export interface SadwaraResult {
  /** Nama Paringkelan dalam Bahasa Indonesia */
  nama: string;
  /** Nama Paringkelan dalam Bahasa Jawa */
  namaJawa: string;
  /** Nilai neptu Paringkelan */
  neptu: number;
  /** Watak/karakter Paringkelan (nama hewan) */
  watak: string;
  /** Deskripsi detail Paringkelan */
  deskripsi: string;
}

/**
 * Menghitung Paringkelan (Sadwara) dari tanggal masehi.
 * Paringkelan dihitung dari neptu weton (hari + pasaran) modulo 6
 * 
 * @param date - Tanggal masehi
 * @returns - Informasi Paringkelan lengkap
 */
export const calculateSadwara = (date: Date): SadwaraResult => {
  const weton = wetonCalculator.calculate(date);
  const totalNeptu = weton.neptu;
  
  // Siklus Sadwara: 6 hari
  // Berdasarkan neptu modulo 6
  const sadwaraIndex = totalNeptu % 6;
  
  const sadwaraList: SadwaraResult[] = [
    {
      nama: "Pahing",
      namaJawa: "Pahing",
      neptu: 9,
      watak: "Gajah - Keras, kuat, berapi-api",
      deskripsi: "Hari yang energi kuat dan keras. Cocok untuk memulai hal-hal yang memerlukan kekuatan dan keteguhan."
    },
    {
      nama: "Pon",
      namaJawa: "Pon",
      neptu: 7,
      watak: "Monyet - Lincah, cerdas, banyak akal",
      deskripsi: "Hari yang penuh kecerdasan dan kelincahan. Baik untuk hal-hal yang memerlukan kreativitas dan pemikiran."
    },
    {
      nama: "Wage",
      namaJawa: "Wage",
      neptu: 4,
      watak: "Kerbau - Tenang, keras kepala, tabah",
      deskripsi: "Hari yang membawa ketenangan namun juga kekerasan kepala. Cocok untuk pekerjaan yang memerlukan kesabaran."
    },
    {
      nama: "Kliwon",
      namaJawa: "Kliwon",
      neptu: 8,
      watak: "Macan - Berani, kepemimpinan, spiritual",
      deskripsi: "Hari yang penuh dengan spiritualitas dan kekuatan batin. Cocok untuk meditasi dan kegiatan rohani."
    },
    {
      nama: "Legi",
      namaJawa: "Legi",
      neptu: 5,
      watak: "Ayam - Rajin, waspada, pemamah bangkai",
      deskripsi: "Hari yang membawa kerajin dan kewaspadaan. Cocok untuk pekerjaan yang memerlukan ketelitian."
    },
    {
      nama: "Manis",
      namaJawa: "Manis",
      neptu: 0,
      watak: "Anjing - Setia, pengorbanan, perlindungan",
      deskripsi: "Hari yang membawa kelembutan dan keharmonisan. Cocok untuk kegiatan sosial dan keluarga."
    }
  ];
  
  return sadwaraList[sadwaraIndex];
};

/**
 * Daftar nama Paringkelan lengkap
 */
export const SADWARA_NAMES = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi', 'Manis'];
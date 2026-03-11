import { wetonCalculator } from '../domain/primbon/services/WetonCalculator.js';

/**
 * Padangon (Sangawara) - Siklus 9 Harian
 * 
 * Sangawara berasal dari bahasa Jawa "Sanga" (sembilan) dan "wara" (hari)
 * Siklus ini menghitung hari berdasarkan weton dengan periode 9 hari
 * 
 * @reference Primbon Betaljemur Adammakna, Primbon Lukmanakim
 */

export interface SangawaraResult {
  /** Nama Padangon dalam Bahasa Indonesia */
  nama: string;
  /** Nama Padangon dalam Bahasa Jawa (Krama Alus) */
  namaJawa: string;
  /** Watak/karakter Padangon */
  watak: string;
  /** Deskripsi detail Padangon */
  deskripsi: string;
  /** Nilai neptu */
  neptu: number;
}

/**
 * Menghitung Padangon (Sangawara) dari tanggal masehi.
 * Padangon dihitung dari weton (hari + pasaran) modulo 9
 * 
 * @param date - Tanggal masehi
 * @returns - Informasi Padangon lengkap
 */
export const calculateSangawara = (date: Date): SangawaraResult => {
  const weton = wetonCalculator.calculate(date);
  const totalNeptu = weton.neptu;
  
  // Siklus Sangawara: 9 hari
  // Berdasarkan neptu modulo 9
  const sangawaraIndex = totalNeptu % 9;
  
  const sangawaraList: SangawaraResult[] = [
    {
      nama: "Mendhut",
      namaJawa: "Mendhut",
      neptu: 3,
      watak: "Lemah lembut, penuh cinta",
      deskripsi: "Hari yang membawa kelembutan dan kasih sayang. Cocok untuk kegiatan yang memerlukan keramahan."
    },
    {
      nama: "Kembang",
      namaJawa: "Kembang",
      neptu: 4,
      watak: "Bersemi, indah, berkembang",
      deskripsi: "Hari yang membawa keindahan dan pertumbuhan. Cocok untuk memulai hal-hal baru."
    },
    {
      nama: "Kertas",
      namaJawa: "Kertas",
      neptu: 5,
      watak: "Rapuh, sensitif, halus",
      deskripsi: "Hari yang membawa kehalusan dan ketelitian. Cocok untuk pekerjaan yang memerlukan ketelitian."
    },
    {
      nama: "Donga",
      namaJawa: "Donga",
      neptu: 6,
      watak: "Berdoa, spiritual, hening",
      deskripsi: "Hari yang membawa ketenangan spiritual. Cocok untuk meditasi dan doa."
    },
    {
      nama: "Dadi",
      namaJawa: "Dadi",
      neptu: 7,
      watak: "Menjadi, pertumbuhan, kesempurnaan",
      deskripsi: "Hari yang membawa pertumbuhan dan penyempurnaan. Cocok untuk menyelesaikan proyek."
    },
    {
      nama: "Pajeng",
      namaJawa: "Pajeng",
      neptu: 8,
      watak: "Kuat, berkuasa, berwibawa",
      deskripsi: "Hari yang membawa kekuatan dan otoritas. Cocok untuk mengambil keputusan penting."
    },
    {
      nama: "Sanga",
      namaJawa: "Sanga",
      neptu: 9,
      watak: "Sempurna, lengkap, ilahi",
      deskripsi: "Hari yang membawa kesempurnaan. Cocok untuk ritual dan acara sakral."
    },
    {
      nama: "Dauh",
      namaJawa: "Dauh",
      neptu: 1,
      watak: "Api, energi, kekuatan",
      deskripsi: "Hari yang membawa energi dan kekuatan. Cocok untuk aktivitas yang memerlukan tenaga."
    },
    {
      nama: "Alit",
      namaJawa: "Alit",
      neptu: 2,
      watak: "Kecil,细微, rahasia",
      deskripsi: "Hari yang membawa kehati-hatian dan kerahasiaan. Cocok untuk merenung dan berpikir."
    }
  ];
  
  return sangawaraList[sangawaraIndex];
};

/**
 * Daftar nama Padangon lengkap
 */
export const SANGAWARA_NAMES = [
  'Mendhut',
  'Kembang',
  'Kertas',
  'Donga',
  'Dadi',
  'Pajeng',
  'Sanga',
  'Dauh',
  'Alit'
];
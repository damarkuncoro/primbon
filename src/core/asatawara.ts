import { wetonCalculator } from '../domain/primbon/services/WetonCalculator.js';

/**
 * Padewan (Asatawara) - Siklus 8 Harian
 * 
 * Asatawara berasal dari bahasa Jawa "Asata" (delapan) dan "wara" (hari)
 * Siklus ini menghitung hari berdasarkan tanggal dalam kalender Jawa
 * yang dihitung dari hari markets (Legi, Pahing, Pon, Wage, Kliwon)
 * 
 * @reference Primbon Betaljemur Adammakna, Primbon Lukmanakim
 */

export interface AsatawaraResult {
  /** Nama Padewan dalam Bahasa Indonesia */
  nama: string;
  /** Nama Padewan dalam Bahasa Jawa (Krama Alus) */
  namaJawa: string;
  /** Watak/karakter Padewan */
  watak: string;
  /** Deskripsi detail Padewan */
  deskripsi: string;
  /** Nilai neptu */
  neptu: number;
}

/**
 * Menghitung Padewan (Asatawara) dari tanggal masehi.
 * Padewan dihitung dari hari pasar (pasaran) yang dimulai dari Legi
 * Siklus: Legi -> Pahing -> Pon -> Wage -> Kliwon -> Legi -> ...
 * 
 * @param date - Tanggal masehi
 * @returns - Informasi Padewan lengkap
 */
export const calculateAsatawara = (date: Date): AsatawaraResult => {
  const weton = wetonCalculator.calculate(date);
  const pasaran = weton.pasaran;
  
  // Daftar Padewan (Asatawara) - Siklus 8 hari
  const asatawaraList: AsatawaraResult[] = [
    {
      nama: "Aryang",
      namaJawa: "Aryang",
      neptu: 7,
      watak: "Gajah - Kuat, pemimpin, dermawan",
      deskripsi: "Hari yang membawa kekuatan dan kepemimpinan. Cocok untuk memulai usaha besar atau menjadi pemimpin."
    },
    {
      nama: "Madrideja",
      namaJawa: "Madrideja",
      neptu: 4,
      watak: "Kuda - Cepat, aktif, dinamis",
      deskripsi: "Hari yang membawa kecepatan dan dinamisme. Cocok untuk aktivitas yang memerlukan gerakan cepat."
    },
    {
      nama: "Marake",
      namaJawa: "Marake",
      neptu: 3,
      watak: "Kebo - Keras kepala, kuat, pekerja keras",
      deskripsi: "Hari yang membawa keteguhan dan ketahanan. Cocok untuk pekerjaan berat dan memerlukan kesabaran."
    },
    {
      nama: "Batareng",
      namaJawa: "Batareng",
      neptu: 8,
      watak: "Monyet - Cerdas, licik, kreatif",
      deskripsi: "Hari yang membawa kecerdasan dan kreativitas. Cocok untuk pemikiran dan inovasi."
    },
    {
      nama: "Kuda",
      namaJawa: "Kuda",
      neptu: 2,
      watak: "Macan - Berani, kuat, pemberani",
      deskripsi: "Hari yang membawa keberanian dan kekuatan. Cocok untuk menghadapi tantangan besar."
    },
    {
      nama: "Kumbakarna",
      namaJawa: "Kumbakarna",
      neptu: 9,
      watak: "Singa - Maju, berani, berwibawa",
      deskripsi: "Hari yang membawa kemahsyuran dan kehormatan. Cocok untuk kegiatan yang memerlukan reputasi."
    },
    {
      nama: "Dwendha",
      namaJawa: "Dwendha",
      neptu: 1,
      watak: "Gajah - Kuat, bijaksana, tenang",
      deskripsi: "Hari yang membawa kebijaksanaan dan ketenangan. Cocok untuk meditasi dan pemikiran mendalam."
    },
    {
      nama: "Naga",
      namaJawa: "Naga",
      neptu: 5,
      watak: "Naga - Spiritual, mistis, kuat",
      deskripsi: "Hari yang penuh dengan energi spiritual. Cocok untuk kegiatan rohani dan ritual."
    }
  ];
  
  // Hitung index berdasarkan pasaran
  // Pasaran: Legi=0, Pahing=1, Pon=2, Wage=3, Kliwon=4
  const pasaranIndex: Record<string, number> = {
    'Legi': 0,
    'Pahing': 1,
    'Pon': 2,
    'Wage': 3,
    'Kliwon': 4
  };
  
  // Dalam siklus 8, pasaran dihitung secara berurutan
  // Legi (0) -> Pahing (1) -> Pon (2) -> Wage (3) -> Kliwon (4)
  // Kemudian berulang dari Legi
  const idx = pasaranIndex[pasaran] ?? 0;
  
  return asatawaraList[idx];
};

/**
 * Daftar nama Padewan lengkap
 */
export const ASATAWARA_NAMES = [
  'Aryang',
  'Madrideja',
  'Marake',
  'Batareng',
  'Kuda',
  'Kumbakarna',
  'Dwendha',
  'Naga'
];
/**
 * Data Paringkelan (Sadwara) - Siklus 6 Harian
 * Paringkelan berasal dari kata "sanga" (9) dan "dwara" (jalan/keluar)
 * tapi dalam konteks ini指的是 6 harian cycle berdasarkan weton
 * 
 * Dalam tradisi Jawa, Sadwara dihitung dari kombinasi hari dan pasaran:
 * - Setiap hari dalam siklus 6 memiliki karakteristik tersendiri
 */

export interface SadwaraData {
  nama: string;
  namaJawa: string;
  neptu: number;
  watak: string;
  deskripsi: string;
}

export const sadwaraData: SadwaraData[] = [
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
    watak: "Kerbau - Tenang, keras kepala,tabah",
    deskripsi: "Hari yang membawa ketenangan namun juga kekerasankepalaan. Cocok untuk pekerjaan yang memerlukan kesabaran."
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

/**
 * Mendapatkan data Sadwara berdasarkan nama
 */
export const getSadwaraByName = (nama: string): SadwaraData | undefined => {
  return sadwaraData.find(s => s.nama.toLowerCase() === nama.toLowerCase());
};

/**
 * Mendapatkan index Sadwara dari neptu
 */
export const getSadwaraByNeptu = (neptu: number): SadwaraData | undefined => {
  return sadwaraData.find(s => s.neptu === neptu);
};
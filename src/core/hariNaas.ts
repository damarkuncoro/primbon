import { wetonCalculator } from '../domain/primbon/services/WetonCalculator.js';

/**
 * Hari Naas - Perhitungan hari kewaspadaan
 * 
 * Dalam tradisi Jawa, Hari Naas adalah hari di mana seseorang
 * sebaiknya lebih waspada dan menghindari aktivitas berisiko.
 * Perhitungan berdasarkan weton lahir dan siklus tertentu.
 * 
 * @reference Primbon Betaljemur Adammakna, Primbon Lukmanakim
 */

export interface HariNaasResult {
  /** Nama hari naas */
  nama: string;
  /** Watak/karakter hari naas */
  watak: string;
  /** Penjelasan tentang hari naas */
  deskripsi: string;
  /** Saran untuk hari naas */
  saran: string;
}

/**
 * Menghitung Hari Naas berdasarkan tanggal lahir.
 * Hari Naas dihitung dari weton dan siklus 7 tahun
 * 
 * @param date - Tanggal lahir
 * @returns - Informasi Hari Naas lengkap
 */
export const calculateHariNaas = (date: Date): HariNaasResult => {
  const weton = wetonCalculator.calculate(date);
  const tahunLahir = date.getFullYear();
  
  // Hitung siklus berdasarkan modulo 7 tahun
  const siklus = tahunLahir % 7;
  
  const hariNaasList: HariNaasResult[] = [
    {
      nama: "Dino Pengampel",
      watak: "Hari yang membawa cobaan dari arah selatan",
      deskripsi: "Pada hari ini, sebaiknya menghindari perjalanan jauh ke arah selatan.",
      saran: "Fokus pada pekerjaan rumah dan hindari konflik."
    },
    {
      nama: "Dino Pengakis",
      watak: "Hari yang membawa cobaan dari arah barat",
      deskripsi: "Hari ini membawa energi yang menantang dari arah barat.",
      saran: "Hindari pengambilan keputusan penting."
    },
    {
      nama: "Dino Pepedan",
      watak: "Hari yang membawa cobaan dari arah utara",
      deskripsi: "Pada hari ini, waspadalah terhadap hal-hal yang datang dari utara.",
      saran: "Tingkatkan doa dan zikir."
    },
    {
      nama: "Dino Pencolong",
      watak: "Hari yang membawa cobaan dari arah timur",
      deskripsi: "Hari ini membawa energi pencurian atau kehilangan dari arah timur.",
      saran: "Jaga barang berharga dengan baik."
    },
    {
      nama: "Dino Penangkok",
      watak: "Hari yang membawa cobaan dari segala arah",
      deskripsi: "Hari paling危险, membawa cobaan dari semua arah.",
      saran: "Tetap di rumah dan perbanyak doa."
    },
    {
      nama: "Dino Pepon",
      watak: "Hari yang membawa cobaan dari udara",
      deskripsi: "Hari ini membawa energi dari langit yang turun ke bumi.",
      saran: "Hindari aktivitas di luar ruangan."
    },
    {
      nama: "Dino Pekunden",
      watak: "Hari yang membawa cobaan dari dalam diri",
      deskripsi: "Hari ini membawa cobaan dari dalam diri sendiri.",
      saran: "Kontrol emosi dan pikiran negatif."
    }
  ];
  
  return hariNaasList[siklus];
};

/**
 * Mendapatkan daftar semua Hari Naas
 */
export const getAllHariNaas = (): HariNaasResult[] => {
  return [
    {
      nama: "Dino Pengampel",
      watak: "Hari yang membawa cobaan dari arah selatan",
      deskripsi: "Pada hari ini, sebaiknya menghindari perjalanan jauh ke arah selatan.",
      saran: "Fokus pada pekerjaan rumah dan hindari konflik."
    },
    {
      nama: "Dino Pengakis",
      watak: "Hari yang membawa cobaan dari arah barat",
      deskripsi: "Hari ini membawa energi yang menantang dari arah barat.",
      saran: "Hindari pengambilan keputusan penting."
    },
    {
      nama: "Dino Pepedan",
      watak: "Hari yang membawa cobaan dari arah utara",
      deskripsi: "Pada hari ini, waspadalah terhadap hal-hal yang datang dari utara.",
      saran: "Tingkatkan doa dan zikir."
    },
    {
      nama: "Dino Pencolong",
      watak: "Hari yang membawa cobaan dari arah timur",
      deskripsi: "Hari ini membawa energi pencurian atau kehilangan dari arah timur.",
      saran: "Jaga barang berharga dengan baik."
    },
    {
      nama: "Dino Penangkok",
      watak: "Hari yang membawa cobaan dari segala arah",
      deskripsi: "Hari paling berbahaya, membawa cobaan dari semua arah.",
      saran: "Tetap di rumah dan perbanyak doa."
    },
    {
      nama: "Dino Pepon",
      watak: "Hari yang membawa cobaan dari udara",
      deskripsi: "Hari ini membawa energi dari langit yang turun ke bumi.",
      saran: "Hindari aktivitas di luar ruangan."
    },
    {
      nama: "Dino Pekunden",
      watak: "Hari yang membawa cobaan dari dalam diri",
      deskripsi: "Hari ini membawa cobaan dari dalam diri sendiri.",
      saran: "Kontrol emosi dan pikiran negatif."
    }
  ];
};

export const HARI_NAAS_NAMES = [
  "Dino Pengampel",
  "Dino Pengakis", 
  "Dino Pepedan",
  "Dino Pencolong",
  "Dino Penangkok",
  "Dino Pepon",
  "Dino Pekunden"
];
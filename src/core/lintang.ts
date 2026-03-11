/**
 * Lintang (Zodiak Jawa) - Perhitungan Bintang Lahir
 * 
 * Dalam tradisi Jawa, Lintang atau Zodiak Jawa adalah penentuan
 * bintang atau rasi yang tampak pada malam hari kelahiran.
 * Dihitung berdasarkan weton dan hari dalam kalender Jawa.
 * 
 * @reference Primbon Betaljemur Adammakna, Primbon Lukmanakim
 */

export interface LintangResult {
  /** Nama Lintang */
  nama: string;
  /** Nama alternatif */
  namaAlt?: string;
  /** Watak/karakter Lintang */
  watak: string;
  /** Deskripsi detail */
  deskripsi: string;
  /** Sifat yang dominan */
  sifat: string[];
  /** Kecocokan dengan Lintang lain */
  kompatibel: string[];
  /** Tidak kompatibel dengan */
  tidakKompatibel: string[];
}

/**
 * Menghitung Lintang (Zodiak Jawa) dari tanggal lahir.
 * Lintang dihitung berdasarkan weton (hari + pasaran)
 * 
 * @param date - Tanggal lahir
 * @returns - Informasi Lintang lengkap
 */
export const calculateLintang = (date: Date): LintangResult => {
  const tahun = date.getFullYear();
  const bulan = date.getMonth() + 1;
  const hari = date.getDate();
  
  // Hitung berdasarkan tahun modulo 25 (siklus Lintang)
  // Setiap tahun dalam siklus 25 tahun memiliki Lintang berbeda
  const siklusTahun = (tahun - 1900) % 25;
  
  const lintangList: LintangResult[] = [
    {
      nama: "Kumbo Karningsih",
      namaAlt: "Kumbo Karno",
      watak: "Kaya-raya, keturunan bangsawan, banyak rejeki",
      deskripsi: "Lintang yang membawa berkah kemakmuran dan keturunan yang berbudi. Orang dengan Lintang ini biasanya lahir dari keluarga terhormat dan akan mencapai kedudukan tinggi.",
      sifat: ["Kaya", "Berbudi", "Berwibawa", "Dermawan"],
      kompatibel: ["Singa", "Garudha", "Kedhud"],
      tidakKompatibel: ["Monyong", "Gajah", "Bango"]
    },
    {
      nama: "Singa",
      watak: "Berani, kuat, pemimpin alam",
      deskripsi: "Lintang singa membawa keberanian dan kekuatan. Orang dengan Lintang ini biasanya menjadi pemimpin yang disegani dan memiliki karisma alami.",
      sifat: ["Berani", "Kuat", "Pemimpin", "Karismatik"],
      kompatibel: ["Kumbo Karningsih", "Macan", "Garudha"],
      tidakKompatibel: ["Monyong", "Bango", "Kuthuk"]
    },
    {
      nama: "Garudha",
      watak: "Spiritual, tinggi, pandangan jauh",
      deskripsi: "Lintang Garudha membawa kebijaksanaan dan spiritualitas tinggi. Orang dengan Lintang ini biasanya memiliki kemampuan melihat masa depan dan wisdom.",
      sifat: ["Bijaksana", "Spiritual", "Pintar", "Visioner"],
      kompatibel: ["Singa", "Kumbo Karningsih", "Kedhud"],
      tidakKompatibel: ["Monyong", "Bango", "Gajah"]
    },
    {
      nama: "Kedhud",
      watak: "Damai, harmoni, pendamai",
      deskripsi: "Lintang Kedhud membawa kedamaian dan keharmonisan. Orang dengan Lintang ini biasanya menjadi penengah yang dicari saat ada konflik.",
      sifat: ["Damai", "Harmonis", "Penyabar", "Penengah"],
      kompatibel: ["Kumbo Karningsih", "Garudha", "Macan"],
      tidakKompatibel: ["Monyong", "Bango", "Kuthuk"]
    },
    {
      nama: "Macan",
      watak: "Kuat, pemberani, penguasa",
      deskripsi: "Lintang Macan membawa kekuatan supernatural. Orang dengan Lintang ini biasanya memiliki aura yang kuat dan dijadikan pemimpin dalam situasi sulit.",
      sifat: ["Kuat", "Pemberani", "Penguasa", "Disegani"],
      kompatibel: ["Singa", "Garudha", "Kedhud"],
      tidakKompatibel: ["Monyong", "Bango", "Kuthuk"]
    },
    {
      nama: "Monyong",
      watak: "Licik, penipu, tidak jujur",
      deskripsi: "Lintang ini membawa karakter negatif. Orang dengan Lintang ini harus berhati-hati dengan tipu daya dan kejujuran.",
      sifat: ["Licik", "Penipu", "Tidak Jujur", "Manipulatif"],
      kompatibel: [],
      tidakKompatibel: ["Singa", "Garudha", "Macan", "Kedhud", "Kumbo Karningsih"]
    },
    {
      nama: "Gajah",
      watak: "Bijaksana, kuat, setia",
      deskripsi: "Lintang Gajah membawa kebijaksanaan dan kesetiaan. Orang dengan Lintang ini biasanya menjadi penasihat yang terpercaya dan memiliki kekuatan internal.",
      sifat: ["Bijaksana", "Kuat", "Setia", "Terpercaya"],
      kompatibel: ["Singa", "Macan", "Kedhud"],
      tidakKompatibel: ["Monyong", "Bango", "Kuthuk"]
    },
    {
      nama: "Bango",
      watak: "Mudah tersinggung, keras kepala",
      deskripsi: "Lintang Bango membawa karakter yang keras. Orang dengan Lintang ini harus mengontrol emosi dan tidak mudah tersinggung.",
      sifat: ["Keras Kepala", "Mudah Tersinggung", "Teguh", "Berprinsip"],
      kompatibel: [],
      tidakKompatibel: ["Singa", "Garudha", "Macan", "Gajah", "Kedhud", "Kumbo Karningsih"]
    },
    {
      nama: "Kuthuk",
      watak: "Ramah, periang, sosial",
      deskripsi: "Lintang Kuthuk (Ayam) membawa keramahan dan kegembiraan. Orang dengan Lintang ini biasanya menjadi pusat perhatian dalam keramaian.",
      sifat: ["Ramah", "Periang", "Sosial", "Penyenang"],
      kompatibel: ["Kedhud", "Macan", "Singa"],
      tidakKompatibel: ["Monyong", "Bango", "Gajah"]
    },
    {
      nama: "Mundhing",
      watak: "Sederhana, rendah hati, jujur",
      deskripsi: "Lintang Mundhing (Kuda) membawa kesederhanaan. Orang dengan Lintang ini biasanya hidup sederhana tapi jujur dan dapat dipercaya.",
      sifat: ["Sederhana", "Rendah Hati", "Jujur", "Dermawan"],
      kompatibel: ["Kumbo Karningsih", "Gajah", "Garudha"],
      tidakKompatibel: ["Monyong", "Bango"]
    },
    {
      nama: "Gajah Maling",
      watak: "Cerdik, licik, pencuri",
      deskripsi: "Lintang ini membawa karakter yang tidak jujur. Orang dengan Lintang ini harus berhati-hati dengan kecerdasan yang salah arah.",
      sifat: ["Cerdik", "Licik", "Pencuri", "Manipulatif"],
      kompatibel: [],
      tidakKompatibel: ["Singa", "Garudha", "Macan", "Gajah"]
    },
    {
      nama: "Centhong",
      watak: "Kaya, makmur, banyak rejeki",
      deskripsi: "Lintang Centhong membawa kemakmuran. Orang dengan Lintang ini biasanya diberkati dengan rejeki yang melimpah sepanjang hidup.",
      sifat: ["Kaya", "Makmur", "Berlimpah", "Berkah"],
      kompatibel: ["Singa", "Kumbo Karningsih", "Garudha"],
      tidakKompatibel: ["Monyong", "Bango"]
    },
    {
      nama: "Pithik",
      watak: "Kecil-kecil cabe rawit, cerdas tapi iri",
      deskripsi: "Lintang Pithik (Ayam) membawa kecerdasan tapi juga kecemburuan. Orang dengan Lintang ini harus mengontrol rasa iri.",
      sifat: ["Cerdas", "Iri", "Kecil-kecil", "Berbakat"],
      kompatibel: ["Garudha", "Kedhud", "Kuthuk"],
      tidakKompatibel: ["Monyong", "Bango", "Gajah"]
    },
    {
      nama: "Banteng",
      watak: "Kuat, keras, tidak menyerah",
      deskripsi: "Lintang Banteng membawa kekuatan dan keteguhan. Orang dengan Lintang ini tidak mudah menyerah dan memiliki ketahanan tinggi.",
      sifat: ["Kuat", "Keras", "Teguh", "Berani"],
      kompatibel: ["Singa", "Macan", "Gajah"],
      tidakKompatibel: ["Monyong", "Bango"]
    },
    {
      nama: "Macan Tanpa Kuku",
      watak: "Tampak kuat tapi lemah di dalam",
      deskripsi: "Lintang ini menunjukkan kesombongan. Orang dengan Lintang ini harus memperbaiki inner strength.",
      sifat: ["Sombong", "Lemah", "Tampak", "Berbisa"],
      kompatibel: [],
      tidakKompatibel: ["Singa", "Macan", "Garudha"]
    },
    {
      nama: "Gajah Gadhung",
      watak: "Besar di luar, kuat di dalam",
      deskripsi: "Lintang Gajah Gadhung menunjukkan kekuatan sejati yang tersembunyi. Orang dengan Lintang ini memiliki potensi besar.",
      sifat: ["Kuat", "Potensial", "Besar", "Tenang"],
      kompatibel: ["Singa", "Macan", "Kumbo Karningsih"],
      tidakKompatibel: ["Monyong", "Bango"]
    },
    {
      nama: "Bango Tuli",
      watak: "Diam-diam berbahaya",
      deskripsi: "Lintang ini menunjukkan bahaya yang tersembunyi. Orang dengan Lintang ini harus berhati-hati dengan tindakan tersembunyi.",
      sifat: ["Diam", "Berbahaya", "Tersembunyi", "Misterius"],
      kompatibel: [],
      tidakKompatibel: ["Singa", "Garudha", "Macan"]
    },
    {
      nama: "Ayam Bere",
      watak: "Ramai, heboh, pusat perhatian",
      deskripsi: "Lintang Ayam Bere membawa energi tinggi dan keceriaan. Orang dengan Lintang ini usually menjadi pusat perhatian.",
      sifat: ["Ramai", "Heboh", "Pusat Perhatian", "Energik"],
      kompatibel: ["Kuthuk", "Kedhud", "Centhong"],
      tidakKompatibel: ["Monyong", "Bango"]
    },
    {
      nama: "Munding Lari",
      watak: "Mudah lari, tidak konsisten",
      deskripsi: "Lintang ini menunjukkan karakter yang tidak konsisten. Orang dengan Lintang ini harus melatih disiplin.",
      sifat: ["Lari", "Tidak Konsisten", "Mudah Pindah", "Tidak Fokus"],
      kompatibel: [],
      tidakKompatibel: ["Singa", "Garudha", "Macan"]
    },
    {
      nama: "Jaranan",
      watak: "Cepat, dinamis, mobile",
      deskripsi: "Lintang Jaranan (Kuda) membawa kecepatan dan dinamisme. Orang dengan Lintang ini menyukai perubahan dan kemajuan.",
      sifat: ["Cepat", "Dinamis", "Mobile", "Perubahan"],
      kompatibel: ["Singa", "Macan", "Kuthuk"],
      tidakKompatibel: ["Monyong", "Bango"]
    },
    {
      nama: "Gajah Ngombe",
      watak: "Besar, kuat, tetapi lambat",
      deskripsi: "Lintang ini menunjukkan kekuatan tapi dengan tempo yang lambat. Orang dengan Lintang ini harus lebih cepat dalam bertindak.",
      sifat: ["Besar", "Kuat", "Lambat", "Tenang"],
      kompatibel: ["Singa", "Macan", "Gajah"],
      tidakKompatibel: ["Monyong", "Bango", "Kuthuk"]
    },
    {
      nama: "Lemba",
      watak: "Tenang, penyabar, terkendali",
      deskripsi: "Lintang Lemba membawa ketenangan dan kesabaran. Orang dengan Lintang ini adalah penasehat yang baik.",
      sifat: ["Tenang", "Penyabar", "Terkendali", "Bijak"],
      kompatibel: ["Kedhud", "Garudha", "Kumbo Karningsih"],
      tidakKompatibel: ["Monyong", "Bango"]
    },
    {
      nama: "Kutuk",
      watak: "Mudah panas, cepat emosi",
      deskripsi: "Lintang Kutuk (Ayam Jantan) membawa emosi yang mudah berkobar. Orang dengan Lintang ini harus mengontrol amarah.",
      sifat: ["Mudah Panas", "Cepat Emosi", "Berapi", "Passionate"],
      kompatibel: ["Singa", "Macan"],
      tidakKompatibel: ["Monyong", "Bango", "Kedhud"]
    },
    {
      nama: "Gajah Mblenger",
      watak: "Besar tapi tidak berguna",
      deskripsi: "Lintang ini menunjukkan postur besar tapi tidak berguna. Orang dengan Lintang ini harus memanfaatkan potensi dengan baik.",
      sifat: ["Besar", "Tidak Berguna", "Postur", "Melulu"],
      kompatibel: [],
      tidakKompatibel: ["Singa", "Macan", "Garudha"]
    },
    {
      nama: "Jwala",
      watak: "Menerangi, petunjuk, petunjuk hidup",
      deskripsi: "Lintang Jwala adalah yang terakhir dalam siklus, membawa pencerahan dan petunjuk hidup. Orang dengan Lintang ini biasanya menjadi guru atau penasehat.",
      sifat: ["Menerangi", "Petunjuk", "Guru", "Pencerah"],
      kompatibel: ["Kumbo Karningsih", "Garudha", "Kedhud"],
      tidakKompatibel: ["Monyong", "Bango"]
    }
  ];
  
  return lintangList[siklusTahun];
};

/**
 * Mendapatkan Lintang berdasarkan tahun dalam siklus 25 tahun
 */
export const getLintangByYear = (tahun: number): LintangResult => {
  return calculateLintang(new Date(tahun, 0, 1));
};

/**
 * Daftar semua nama Lintang
 */
export const LINTANG_NAMES = [
  "Kumbo Karningsih", "Singa", "Garudha", "Kedhud", "Macan",
  "Monyong", "Gajah", "Bango", "Kuthuk", "Mundhing",
  "Gajah Maling", "Centhong", "Pithik", "Banteng", "Macan Tanpa Kuku",
  "Gajah Gadhung", "Bango Tuli", "Ayam Bere", "Munding Lari", "Jaranan",
  "Gajah Ngombe", "Lemba", "Kutuk", "Gajah Mblenger", "Jwala"
];
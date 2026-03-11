import { wetonCalculator } from '../domain/primbon/services/WetonCalculator.js';

/**
 * Siklus Rejeki (Pal Srigati) - Fluktuasi Keberuntungan
 * 
 * Dalam tradisi Jawa, siklus rejeki/fluktuasi kehidupan seseorang
 * dihitung berdasarkan weton dan dibagi dalam periode tertentu
 * (biasanya per 6 tahun dalam primbon).
 * 
 * @reference Primbon Betaljemur Adammakna, Primbon Lukmanakim
 */

export interface RejekiPoint {
  /** Usia pada titik ini */
  usia: number;
  /** Tingkat rejeki: 1-10 */
  level: number;
  /** Penjelasan kondisi */
  kondisi: string;
}

export interface SiklusRejekiResult {
  /** Weton lahir */
  weton: string;
  /** Neptu weton */
  neptu: number;
  /** Siklus dasar (0-7) */
  siklusDasar: number;
  /** Array titik-titik fluktuasi rejeki */
  grafik: RejekiPoint[];
  /** Interpretasi umum */
  interpretasi: string;
  /** Saran berdasarkan siklus */
  saran: string;
}

/**
 * Menghitung Siklus Rejeki (Pal Srigati) berdasarkan tanggal lahir.
 * Menghasilkan grafik fluktuasi keberuntungan dalam rentang usia 0-80 tahun
 * 
 * @param date - Tanggal lahir
 * @param maxUsia - Usia maksimum untuk grafik (default: 80)
 * @returns - Informasi Siklus Rejeki lengkap
 */
export const calculateSiklusRejeki = (date: Date, maxUsia: number = 80): SiklusRejekiResult => {
  const weton = wetonCalculator.calculate(date);
  const totalNeptu = weton.neptu;
  
  // Siklus dasar berdasarkan neptu modulo 8
  const siklusDasar = totalNeptu % 8;
  
  // Generate grafik fluktuasi
  const grafik: RejekiPoint[] = [];
  
  // Base pattern for rejeki fluctuation based on siklusDasar
  const basePattern = [
    [3, 5, 7, 8, 6, 4, 2, 1], // Pattern 0
    [2, 4, 6, 8, 7, 5, 3, 1], // Pattern 1
    [1, 3, 5, 7, 8, 6, 4, 2], // Pattern 2
    [4, 6, 8, 7, 5, 3, 1, 2], // Pattern 3
    [5, 7, 6, 4, 2, 1, 3, 8], // Pattern 4
    [6, 8, 5, 3, 1, 2, 4, 7], // Pattern 5
    [7, 6, 4, 2, 3, 8, 5, 1], // Pattern 6
    [8, 5, 3, 1, 4, 7, 6, 2]  // Pattern 7
  ];
  
  const pattern = basePattern[siklusDasar];
  
  // Generate points every 10 years
  for (let usia = 0; usia <= maxUsia; usia += 10) {
    const patternIndex = Math.floor(usia / 10) % 8;
    const level = pattern[patternIndex];
    
    let kondisi: string;
    if (level >= 7) {
      kondisi = "Puncak keberuntungan, rejeki melimpah";
    } else if (level >= 5) {
      kondisi = "Keberuntungan meningkat";
    } else if (level >= 3) {
      kondisi = "Keadaan stabil";
    } else {
      kondisi = "Waktu bersabar dan beribadah";
    }
    
    grafik.push({ usia, level, kondisi });
  }
  
  // Interpretasi berdasarkan siklus dasar
  const interpretasiList: Record<number, string> = {
    0: "Siklus kehidupan Anda dimulai dengan perlahan tetapi stabil. Pada usia muda Anda mungkin mengalami beberapa tantangan, namun di usia pertengahan hingga tua, keberuntungan akan bersinar dengan cerah.",
    1: "Anda memulai kehidupan dengan energi yang kuat. Masa muda adalah waktu terbaik untuk mengambil risiko dan mengejar mimpi. Namun, siapkan strategi untuk masa tua.",
    2: "Kehidupan Anda berjalan dengan ritme yang seimbang. Keseimbangan antara kerja dan rejeki akan terlihat jelas sepanjang hidup Anda.",
    3: "Anda memiliki potensi besar untuk sukses di usia muda. Namun, bijaklah dalam mengelola keberhasilan agar bertahan lama.",
    4: "Siklus Anda menunjukkan stabilitas finansial yang baik. Rejeki mengalir secara konsisten tanpa ups dan downs yang ekstrem.",
    5: "Kehidupan Anda penuh dengan kejutan. Masa muda penuh tantangan, tapi usia tua membawa kemakmuran yang manis.",
    6: "Anda memulai dengan perlahan tetapi berkembang menuju puncak di usia paruh baya. Keberhasilan Anda akan terlihat nyata di usia 40-60 tahun.",
    7: "Siklus yang unik - rejeki Anda datang dalam gelombang. Manfaatkan periode baik untuk persiapan masa depan."
  };
  
  // Saran berdasarkan siklus
  const saranList: Record<number, string> = {
    0: "Bersabarlah di masa muda, investasikan waktu untuk belajar dan berkembang. Rejeki akan mengalir di usia lebih matang.",
    1: "Manfaatkan energi muda untuk membangun fondasi yang kuat. Ambil kesempatan yang ada, tapi jangan sembrono.",
    2: "Jaga keseimbangan dalam hidup. Jangan terlalu fokus pada satu aspek saja - keseimbangan adalah kunci.",
    3: "Gunakan kesuksesan muda dengan bijak. Investasikan dan bangun kebiasaan baik sejak dini.",
    4: "Terima karunia Allah dengan syukur. Gunakan rejeki yang stabil untuk membantu orang lain juga.",
    5: "Siapkan diri untuk tantangan di masa muda. Tapi yakinkan diri bahwa masa depan penuh harapan.",
    6: "Mulai sesuatu yang berarti di usia muda. Kesuksesan sejati datang di usia paruh baya.",
    7: "Pahami pola siklus Anda. Manfaatkan periode baik dan bersiap di periode kurang baik."
  };
  
  return {
    weton: weton.toString(),
    neptu: totalNeptu,
    siklusDasar,
    grafik,
    interpretasi: interpretasiList[siklusDasar],
    saran: saranList[siklusDasar]
  };
};

/**
 * Mendapatkan level rejeki untuk usia tertentu
 * 
 * @param date - Tanggal lahir
 * @param usia - Usia yang ingin dicek
 * @returns - Level rejeki (1-10) dan kondisi
 */
export const getRejekiByUsia = (date: Date, usia: number): { level: number; kondisi: string } => {
  const result = calculateSiklusRejeki(date, 100);
  
  // Find closest point
  let closestPoint = result.grafik[0];
  let minDiff = Math.abs(usia - closestPoint.usia);
  
  for (const point of result.grafik) {
    const diff = Math.abs(usia - point.usia);
    if (diff < minDiff) {
      minDiff = diff;
      closestPoint = point;
    }
  }
  
  return {
    level: closestPoint.level,
    kondisi: closestPoint.kondisi
  };
};
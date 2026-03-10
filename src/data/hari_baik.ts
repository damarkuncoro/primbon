export interface HariBaikData {
  rekomendasi: string[];
}

export const hariBaikData: Record<string, HariBaikData> = {
  "nikah": {
    rekomendasi: ["Jumat Kliwon", "Sabtu Legi", "Rabu Pon"]
  },
  "pindah_rumah": {
    rekomendasi: ["Kamis Wage", "Senin Pahing", "Selasa Legi"]
  },
  "usaha": {
    rekomendasi: ["Rabu Wage", "Kamis Pon", "Jumat Legi"]
  }
};
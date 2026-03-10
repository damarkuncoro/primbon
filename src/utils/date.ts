/**
 * Menghitung selisih hari antara dua tanggal.
 * @param date1 - Tanggal pertama.
 * @param date2 - Tanggal kedua.
 * @returns - Selisih hari.
 */
export const diffDays = (date1: Date, date2: Date): number => {
  if (!(date1 instanceof Date) || isNaN(date1.getTime())) {
    throw new Error('Tanggal pertama tidak valid');
  }
  if (!(date2 instanceof Date) || isNaN(date2.getTime())) {
    throw new Error('Tanggal kedua tidak valid');
  }
  const oneDay = 24 * 60 * 60 * 1000;
  return Math.round(Math.abs((date1.getTime() - date2.getTime()) / oneDay));
};

/**
 * Mendapatkan nama hari masehi dalam Bahasa Indonesia.
 * @param date - Tanggal.
 * @returns - Nama hari.
 */
export const getDayName = (date: Date): string => {
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    throw new Error('Tanggal tidak valid');
  }
  const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
  return days[date.getDay()];
};

/**
 * Memastikan input adalah objek Date yang valid.
 * @param input - Input tanggal.
 * @returns - Objek Date yang valid.
 */
export const ensureDate = (input: Date | string | number): Date => {
  const date = input instanceof Date ? input : new Date(input);
  if (isNaN(date.getTime())) {
    throw new Error(`Tanggal tidak valid: ${input}`);
  }
  return date;
};

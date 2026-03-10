/**
 * Wuku Entity - Represents the 30-week Javanese calendar cycle
 */
export class Wuku {
  constructor(
    public readonly nama: string,
    public readonly watak: string
  ) {
    if (!nama) {
      throw new Error('Nama Wuku tidak boleh kosong');
    }
  }

  equals(other: Wuku): boolean {
    return this.nama === other.nama;
  }
}

/**
 * Wuku List - All 30 wuku cycles
 */
export const WUKU_LIST = [
  'Sinta', 'Landep', 'Wukir', 'Kurantil', 'Tolu', 'Gumbreg', 'Wariga', 'Warigagung',
  'Julungwangi', 'Sungsang', 'Galungan', 'Kuningan', 'Langkir', 'Mandasiya', 'Juli',
  'Pahang', 'Kuruwelut', 'Marakeh', 'Tambir', 'Medangkungan', 'Maktal', 'Wuye',
  'Manahil', 'Prangbakat', 'Bala', 'Wugu', 'Wayang', 'Kulawu', 'Dukut', 'Watugunung'
] as const;

export type WukuName = typeof WUKU_LIST[number];

/**
 * Selapan Entity - Represents the 35-day cycle in Javanese calendar
 */
export class Selapan {
  constructor(
    public readonly jumlahSelapan: number,
    public readonly hariKe: number,
    public readonly sisaHari: number
  ) {}

  get isFirstDay(): boolean {
    return this.hariKe === 1;
  }

  get isLastDay(): boolean {
    return this.sisaHari === 0;
  }
}
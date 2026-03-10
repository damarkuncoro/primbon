/**
 * PranataMangsa Entity - Represents the Javanese seasonal calendar (Agricultural calendar)
 */
export class PranataMangsa {
  constructor(
    public readonly id: string,
    public readonly nama: string,
    public readonly mulai: string,  // MM-DD format
    public readonly akhir: string,   // MM-DD format
    public readonly candra: string,
    public readonly sifat: string,
    public readonly kesehatan: string,
    public readonly karir: string,
    public readonly rejeki: string,
    public readonly jodoh?: string,
    public readonly batuPermata?: string,
    public readonly warna?: string,
    public readonly bunga?: string
  ) {}

  getMulaiTanggal(bulan: number, tanggal: number): Date {
    const [m, d] = this.mulai.split('-').map(Number);
    return new Date(bulan - 1, d);
  }

  equals(other: PranataMangsa): boolean {
    return this.id === other.id && this.nama === other.nama;
  }
}

/**
 * PranataMangsa Types/Enum
 */
export const PRANATA_MANGSAS = [
  'Kasa', 'Karo', 'Katelu', 'Kapat', 'Kalima', 'Kanem', 
  'Kapitu', 'Kasanga', 'Kasadasa', 'Desta', 'Sanga', 'Ndaha'
] as const;

export type PranataMangsaType = typeof PRANATA_MANGSAS[number];
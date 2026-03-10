/**
 * TanggalJawa Entity - Represents a Javanese calendar date
 */
export class TanggalJawa {
  constructor(
    public readonly tanggal: number,
    public readonly bulan: string,
    public readonly tahun: number,
    public readonly namaTahun: string
  ) {
    if (tanggal < 1 || tanggal > 30) {
      throw new Error('Tanggal Jawa harus antara 1-30');
    }
    if (tahun < 0) {
      throw new Error('Tahun Jawa tidak boleh negatif');
    }
  }

  equals(other: TanggalJawa): boolean {
    return (
      this.tanggal === other.tanggal &&
      this.bulan === other.bulan &&
      this.tahun === other.tahun
    );
  }

  toString(): string {
    return `${this.tanggal} ${this.bulan} ${this.tahun} (${this.namaTahun})`;
  }
}
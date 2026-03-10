/**
 * Weton Value Object - Represents the Javanese day combination
 * of day of week (hari) and market day (pasaran)
 */
export class Weton {
  private _neptuKamarokam?: number;

  constructor(
    public readonly hari: string,
    public readonly pasaran: string,
    public readonly neptu: number,
    neptuKamarokam?: number
  ) {
    if (!hari) {
      throw new Error('Hari tidak boleh kosong');
    }
    if (!pasaran) {
      throw new Error('Pasaran tidak boleh kosong');
    }
    // Calculate neptuKamarokam if not provided
    this._neptuKamarokam = neptuKamarokam ?? this.calculateNeptuKamarokam();
  }

  private calculateNeptuKamarokam(): number {
    // In Kamarokam, Pahing/Paing has value 3 instead of 9
    const neptuHari = Weton.getNeptuHariStatic(this.hari);
    const neptuPasaranKamarokam = Weton.getNeptuPasaranKamarokamStatic(this.pasaran);
    return neptuHari + neptuPasaranKamarokam;
  }

  private static getNeptuHariStatic(hari: string): number {
    const neptuHari: Record<string, number> = {
      'Minggu': 5,
      'Senin': 4,
      'Selasa': 3,
      'Rabu': 7,
      'Kamis': 8,
      'Jumat': 6,
      'Sabtu': 9
    };
    return neptuHari[hari] || 0;
  }

  private static getNeptuPasaranKamarokamStatic(pasaran: string): number {
    const neptuPasaranKamarokam: Record<string, number> = {
      'Legi': 5,
      'Pahing': 3,
      'Pon': 7,
      'Wage': 4,
      'Kliwon': 8
    };
    return neptuPasaranKamarokam[pasaran] || 0;
  }

  get neptuKamarokam(): number {
    return this._neptuKamarokam ?? this.neptu;
  }

  get nilai(): number {
    return this.neptu;
  }

  get nilaiKamarokam(): number {
    return this.neptuKamarokam;
  }

  toString(): string {
    return `${this.hari} ${this.pasaran}`;
  }

  equals(other: Weton): boolean {
    return this.hari === other.hari && this.pasaran === other.pasaran;
  }
}

/**
 * WetonHari - Value Object for day of week neptu
 */
export class WetonHari {
  public static readonly MINGGU = new Weton('Minggu', 'Minggu', 5);
  public static readonly SENIN = new Weton('Senin', 'Senin', 4);
  public static readonly SELASA = new Weton('Selasa', 'Selasa', 3);
  public static readonly RABU = new Weton('Rabu', 'Rabu', 7);
  public static readonly KAMIS = new Weton('Kamis', 'Kamis', 8);
  public static readonly JUMAT = new Weton('Jumat', 'Jumat', 6);
  public static readonly SABTU = new Weton('Sabtu', 'Sabtu', 9);

  public static readonly ALL: Weton[] = [
    WetonHari.MINGGU,
    WetonHari.SENIN,
    WetonHari.SELASA,
    WetonHari.RABU,
    WetonHari.KAMIS,
    WetonHari.JUMAT,
    WetonHari.SABTU
  ];

  public static fromNama(nama: string): Weton | null {
    return WetonHari.ALL.find(h => h.hari === nama) || null;
  }
}

/**
 * Pasaran Value Object for Javanese market day neptu
 */
export class Pasaran {
  public static readonly LEGI = new Weton('Legi', 'Legi', 5);
  public static readonly PAHING = new Weton('Pahing', 'Pahing', 9);
  public static readonly PON = new Weton('Pon', 'Pon', 7);
  public static readonly WAGE = new Weton('Wage', 'Wage', 4);
  public static readonly KLIWON = new Weton('Kliwon', 'Kliwon', 8);

  public static readonly ALL: Weton[] = [
    Pasaran.LEGI,
    Pasaran.PAHING,
    Pasaran.PON,
    Pasaran.WAGE,
    Pasaran.KLIWON
  ];

  public static readonly NAMES = ['Legi', 'Pahing', 'Pon', 'Wage', 'Kliwon'];

  public static fromNama(nama: string): Weton | null {
    return Pasaran.ALL.find(p => p.pasaran === nama) || null;
  }
}
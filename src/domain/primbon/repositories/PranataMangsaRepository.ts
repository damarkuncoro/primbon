/**
 * PranataMangsaRepository Interface - Domain contract for accessing pranata mangsa data
 */
export interface PranataMangsaRepository {
  /**
   * Get all pranata mangsa data
   */
  getAll(): PranataMangsaData[];

  /**
   * Get pranata mangsa by id
   */
  getById(id: string): PranataMangsaData | null;
}

export interface PranataMangsaData {
  id: string;
  nama: string;
  mulai: string;
  akhir: string;
  candra: string;
  sifat: string;
  kesehatan: string;
  karir: string;
  rejeki: string;
  jodoh?: string;
  batu_permata?: string;
  warna?: string;
  bunga?: string;
}
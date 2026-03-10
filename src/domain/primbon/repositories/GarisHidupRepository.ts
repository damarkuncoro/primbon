/**
 * GarisHidupRepository Interface - Domain contract for accessing garis hidup (life path) data
 */
export interface GarisHidupRepository {
  /**
   * Get garis hidup karakter by angka (1-9)
   */
  getGarisHidupByAngka(angka: number): GarisHidupData | null;
}

export interface GarisHidupData {
  karakter: string;
}
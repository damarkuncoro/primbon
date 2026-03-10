/**
 * WukuRepository Interface - Domain contract for accessing wuku data
 */
export interface WukuRepository {
  /**
   * Get wuku watak by nama wuku
   */
  getWatakByWuku(nama: string): string | null;
}
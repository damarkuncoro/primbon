/**
 * HariBaikRepository Interface - Domain contract for accessing hari baik (auspicious day) data
 */
export interface HariBaikRepository {
  /**
   * Get hari baik recommendations by keperluan (purpose)
   */
  getHariBaikByKeperluan(keperluan: string): HariBaikData | null;
}

export interface HariBaikData {
  keperluan: string;
  rekomendasi: string[];
}
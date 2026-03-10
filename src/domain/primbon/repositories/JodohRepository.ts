/**
 * JodohRepository Interface - Domain contract for accessing jodoh (compatibility) data
 */
export interface JodohRepository {
  /**
   * Get jodoh result by sisa (modulo 8)
   */
  getJodohBySisa(sisa: number): JodohResultData | null;
}

export interface JodohResultData {
  kategori: string;
  arti: string;
}
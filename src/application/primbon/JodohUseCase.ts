import { JodohCalculator } from '../../domain/primbon/services/JodohCalculator.js';
import type { JodohRepository, JodohResultData } from '../../domain/primbon/repositories/index.js';
import { Weton } from '../../domain/primbon/entities/Weton.js';

export interface JodohResult {
  personA: {
    hari: string;
    pasaran: string;
    weton: string;
    neptu: number;
  };
  personB: {
    hari: string;
    pasaran: string;
    weton: string;
    neptu: number;
  };
  totalNeptu: number;
  sisa: number;
  kategori: string;
  arti: string;
}

/**
 * JodohUseCase - Application Service for jodoh (compatibility) calculations
 */
export class JodohUseCase {
  private jodohCalculator: JodohCalculator;
  private jodohRepository: JodohRepository;

  constructor(jodohRepository: JodohRepository) {
    this.jodohCalculator = new JodohCalculator();
    this.jodohRepository = jodohRepository;
  }

  /**
   * Calculate compatibility between two birth dates
   */
  calculate(dateA: Date, dateB: Date): JodohResult {
    const result = this.jodohCalculator.calculate(dateA, dateB);
    const jodohData = this.jodohRepository.getJodohBySisa(result.sisa);

    return {
      personA: this.wetonToPlain(result.personA),
      personB: this.wetonToPlain(result.personB),
      totalNeptu: result.totalNeptu,
      sisa: result.sisa,
      kategori: jodohData?.kategori || 'Tidak diketahui',
      arti: jodohData?.arti || 'Belum ada data untuk hasil ini.'
    };
  }

  private wetonToPlain(weton: Weton): { hari: string; pasaran: string; weton: string; neptu: number } {
    return {
      hari: weton.hari,
      pasaran: weton.pasaran,
      weton: weton.toString(),
      neptu: weton.neptu
    };
  }
}
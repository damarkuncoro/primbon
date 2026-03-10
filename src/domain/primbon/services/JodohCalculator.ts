import { Weton } from '../entities/Weton.js';
import { WetonCalculator } from './WetonCalculator.js';

/**
 * JodohCalculator - Domain Service for calculating compatibility between two people
 */
export class JodohCalculator {
  private static readonly SISA_MODULO = 8;

  private wetonCalculator: WetonCalculator;

  constructor(wetonCalculator: WetonCalculator = new WetonCalculator()) {
    this.wetonCalculator = wetonCalculator;
  }

  /**
   * Calculate compatibility between two birth dates
   */
  calculate(dateA: Date, dateB: Date): JodohResult {
    const wetonA = this.wetonCalculator.calculate(dateA);
    const wetonB = this.wetonCalculator.calculate(dateB);

    const totalNeptu = wetonA.neptu + wetonB.neptu;
    const sisa = totalNeptu % JodohCalculator.SISA_MODULO;

    return new JodohResult(wetonA, wetonB, totalNeptu, sisa);
  }
}

/**
 * JodohResult - Value Object representing the compatibility result
 */
export class JodohResult {
  constructor(
    public readonly personA: Weton,
    public readonly personB: Weton,
    public readonly totalNeptu: number,
    public readonly sisa: number
  ) {}

  get totalNeptuValue(): number {
    return this.totalNeptu;
  }

  get sisaValue(): number {
    return this.sisa;
  }
}

export const jodohCalculator = new JodohCalculator();
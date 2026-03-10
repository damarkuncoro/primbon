/**
 * GarisHidupCalculator - Domain Service for calculating life path number (Numerology)
 */
export class GarisHidupCalculator {
  private static readonly REDUCTION_TARGET = 9;

  /**
   * Calculate Garis Hidup number from birth date
   */
  calculateNumber(date: Date): number {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const fullNumStr = `${day}${month}${year}`;
    let total = 0;
    for (const char of fullNumStr) {
      total += parseInt(char, 10);
    }

    return this.reduceToSingleDigit(total);
  }

  /**
   * Reduce number to single digit (1-9)
   */
  private reduceToSingleDigit(n: number): number {
    let num = n;
    let sum = 0;
    while (num > 0 || sum > GarisHidupCalculator.REDUCTION_TARGET) {
      if (num === 0) {
        num = sum;
        sum = 0;
      }
      sum += num % 10;
      num = Math.floor(num / 10);
    }
    return sum;
  }
}

export const garisHidupCalculator = new GarisHidupCalculator();
/**
 * Base Types for Siklus Calculations
 * 
 * DRY Principle: Shared interfaces for siklus calculations
 * SOLID Principle: ISP - Specific interfaces for each siklus type
 */

/**
 * Base interface for all Siklus results
 */
export interface SiklusResult {
  nama: string;
  namaJawa: string;
  neptu: number;
  watak: string;
  deskripsi: string;
}

/**
 * Configuration for siklus calculation
 */
export interface SiklusConfig {
  /** Number of elements in the siklus cycle */
  siklusLength: number;
  /** Calculate index from date */
  calculateIndex: (neptu: number, date: Date) => number;
}

/**
 * Factory function to create siklus calculator
 * Follows DRY - eliminates duplicate calculation logic
 */
export const createSiklusCalculator = (
  data: SiklusResult[],
  calculateIndex: (neptu: number) => number
) => {
  return (date: Date): SiklusResult => {
    const { wetonCalculator } = require('../domain/primbon/services/WetonCalculator.js');
    const weton = wetonCalculator.calculate(date);
    const index = calculateIndex(weton.neptu);
    return data[index % data.length];
  };
};

/**
 * Constants for siklus calculations
 */
export const PASARAN_INDEX: Record<string, number> = {
  'Legi': 0,
  'Pahing': 1,
  'Pon': 2,
  'Wage': 3,
  'Kliwon': 4
};
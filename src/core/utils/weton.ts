/**
 * Weton Calculator Utility
 *
 * DRY Principle: Centralized weton calculation
 * SOLID Principle: Single Responsibility - only handles weton calculations
 */

import { wetonCalculator } from '../../domain/primbon/services/WetonCalculator.js';

/**
 * Get weton data for a given date
 */
export const getWetonData = (date: Date) => {
  return wetonCalculator.calculate(date);
};

/**
 * Get neptu for a given date
 */
export const getNeptu = (date: Date): number => {
  return getWetonData(date).neptu;
};

/**
 * Get weton string for a given date (e.g., "Jumat Pahing")
 */
export const getWetonString = (date: Date): string => {
  return getWetonData(date).toString();
};

/**
 * Get pasaran for a given date
 */
export const getPasaran = (date: Date): string => {
  return getWetonData(date).pasaran;
};

/**
 * Get hari for a given date
 */
export const getHari = (date: Date): string => {
  return getWetonData(date).hari;
};
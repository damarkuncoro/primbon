/**
 * PrimbonFactory - Factory for creating use cases with dependency injection
 * 
 * This factory provides an easy way to create use cases with all dependencies
 * automatically wired up. It uses the JSON repository implementations by default.
 */

import { WatakUseCase } from './primbon/WatakUseCase.js';
import { JodohUseCase } from './primbon/JodohUseCase.js';
import { HariBaikUseCase } from './primbon/HariBaikUseCase.js';
import { GarisHidupUseCase } from './primbon/GarisHidupUseCase.js';
import { WukuUseCase } from './pawukon/WukuUseCase.js';
import { SelapanUseCase } from './pawukon/SelapanUseCase.js';

import { 
  JsonWatakRepository, 
  JsonJodohRepository, 
  JsonHariBaikRepository, 
  JsonGarisHidupRepository, 
  JsonWukuRepository,
  JsonPranataMangsaRepository 
} from '../infrastructure/repositories/JsonDataRepository.js';

export class PrimbonFactory {
  private static watakRepository: JsonWatakRepository | null = null;
  private static jodohRepository: JsonJodohRepository | null = null;
  private static hariBaikRepository: JsonHariBaikRepository | null = null;
  private static garisHidupRepository: JsonGarisHidupRepository | null = null;
  private static wukuRepository: JsonWukuRepository | null = null;
  private static pranataMangsaRepository: JsonPranataMangsaRepository | null = null;

  /**
   * Get or create WatakRepository instance
   */
  static getWatakRepository(): JsonWatakRepository {
    if (!this.watakRepository) {
      this.watakRepository = new JsonWatakRepository();
    }
    return this.watakRepository;
  }

  /**
   * Get or create JodohRepository instance
   */
  static getJodohRepository(): JsonJodohRepository {
    if (!this.jodohRepository) {
      this.jodohRepository = new JsonJodohRepository();
    }
    return this.jodohRepository;
  }

  /**
   * Get or create HariBaikRepository instance
   */
  static getHariBaikRepository(): JsonHariBaikRepository {
    if (!this.hariBaikRepository) {
      this.hariBaikRepository = new JsonHariBaikRepository();
    }
    return this.hariBaikRepository;
  }

  /**
   * Get or create GarisHidupRepository instance
   */
  static getGarisHidupRepository(): JsonGarisHidupRepository {
    if (!this.garisHidupRepository) {
      this.garisHidupRepository = new JsonGarisHidupRepository();
    }
    return this.garisHidupRepository;
  }

  /**
   * Get or create WukuRepository instance
   */
  static getWukuRepository(): JsonWukuRepository {
    if (!this.wukuRepository) {
      this.wukuRepository = new JsonWukuRepository();
    }
    return this.wukuRepository;
  }

  /**
   * Get or create PranataMangsaRepository instance
   */
  static getPranataMangsaRepository(): JsonPranataMangsaRepository {
    if (!this.pranataMangsaRepository) {
      this.pranataMangsaRepository = new JsonPranataMangsaRepository();
    }
    return this.pranataMangsaRepository;
  }

  /**
   * Create WatakUseCase with dependencies
   */
  static createWatakUseCase(): WatakUseCase {
    return new WatakUseCase(this.getWatakRepository());
  }

  /**
   * Create JodohUseCase with dependencies
   */
  static createJodohUseCase(): JodohUseCase {
    return new JodohUseCase(this.getJodohRepository());
  }

  /**
   * Create HariBaikUseCase with dependencies
   */
  static createHariBaikUseCase(): HariBaikUseCase {
    return new HariBaikUseCase(this.getHariBaikRepository());
  }

  /**
   * Create GarisHidupUseCase with dependencies
   */
  static createGarisHidupUseCase(): GarisHidupUseCase {
    return new GarisHidupUseCase(this.getGarisHidupRepository());
  }

  /**
   * Create WukuUseCase with dependencies
   */
  static createWukuUseCase(): WukuUseCase {
    return new WukuUseCase(this.getWukuRepository());
  }

  /**
   * Create SelapanUseCase with dependencies
   */
  static createSelapanUseCase(): SelapanUseCase {
    return new SelapanUseCase();
  }
}

// Convenience instances for common use cases
export const watakUseCase = PrimbonFactory.createWatakUseCase();
export const jodohUseCase = PrimbonFactory.createJodohUseCase();
export const hariBaikUseCase = PrimbonFactory.createHariBaikUseCase();
export const garisHidupUseCase = PrimbonFactory.createGarisHidupUseCase();
export const wukuUseCase = PrimbonFactory.createWukuUseCase();
export const selapanUseCaseFactory = PrimbonFactory.createSelapanUseCase();
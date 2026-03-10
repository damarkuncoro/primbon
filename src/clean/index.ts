/**
 * Clean Architecture API
 *
 * This module provides a unified API for the Clean Architecture implementation.
 * All layers are exported here for easy access.
 */

// Domain Layer - Entities & Services (no dependencies)
export { Weton, WetonHari, Pasaran, TanggalJawa, PranataMangsa } from '../domain/primbon/entities/index.js';
export { Wuku, Selapan, WUKU_LIST } from '../domain/pawukon/entities/index.js';

export { WetonCalculator, wetonCalculator, KalenderJawaCalculator, kalenderJawaCalculator, JodohCalculator, JodohResult, jodohCalculator, GarisHidupCalculator, garisHidupCalculator } from '../domain/primbon/services/index.js';
export { WukuCalculator, wukuCalculator, SelapanCalculator, selapanCalculator } from '../domain/pawukon/services/index.js';

// Application Layer - Use Cases & Factory
export { WatakUseCase, JodohUseCase, HariBaikUseCase, GarisHidupUseCase } from '../application/primbon/index.js';
export { WukuUseCase, SelapanUseCase, selapanUseCase } from '../application/pawukon/index.js';
export { PrimbonFactory, watakUseCase, jodohUseCase, hariBaikUseCase, garisHidupUseCase, wukuUseCase, selapanUseCaseFactory } from '../application/index.js';

// Infrastructure Layer - Repository Implementations
export { JsonWatakRepository, JsonJodohRepository, JsonHariBaikRepository, JsonGarisHidupRepository, JsonWukuRepository, JsonPranataMangsaRepository, watakRepository, jodohRepository, hariBaikRepository, garisHidupRepository, wukuRepository, pranataMangsaRepository } from '../infrastructure/repositories/index.js';
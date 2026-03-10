import { describe, it, expect } from 'vitest';
import { PrimbonFactory } from '../../src/application/PrimbonFactory';

describe('PrimbonFactory', () => {
  describe('createWatakUseCase', () => {
    it('should create WatakUseCase instance', () => {
      const useCase = PrimbonFactory.createWatakUseCase();
      expect(useCase).toBeDefined();
      expect(useCase.getWatak).toBeDefined();
      expect(typeof useCase.getWatak).toBe('function');
    });
  });

  describe('createJodohUseCase', () => {
    it('should create JodohUseCase instance', () => {
      const useCase = PrimbonFactory.createJodohUseCase();
      expect(useCase).toBeDefined();
      expect(useCase.calculate).toBeDefined();
      expect(typeof useCase.calculate).toBe('function');
    });
  });

  describe('createHariBaikUseCase', () => {
    it('should create HariBaikUseCase instance', () => {
      const useCase = PrimbonFactory.createHariBaikUseCase();
      expect(useCase).toBeDefined();
      expect(useCase.getHariBaik).toBeDefined();
      expect(typeof useCase.getHariBaik).toBe('function');
    });
  });

  describe('createGarisHidupUseCase', () => {
    it('should create GarisHidupUseCase instance', () => {
      const useCase = PrimbonFactory.createGarisHidupUseCase();
      expect(useCase).toBeDefined();
      expect(useCase.getGarisHidup).toBeDefined();
      expect(typeof useCase.getGarisHidup).toBe('function');
    });
  });

  describe('createWukuUseCase', () => {
    it('should create WukuUseCase instance', () => {
      const useCase = PrimbonFactory.createWukuUseCase();
      expect(useCase).toBeDefined();
      expect(useCase.getWuku).toBeDefined();
      expect(typeof useCase.getWuku).toBe('function');
    });
  });

  describe('createSelapanUseCase', () => {
    it('should create SelapanUseCase instance', () => {
      const useCase = PrimbonFactory.createSelapanUseCase();
      expect(useCase).toBeDefined();
      expect(useCase.getSelapan).toBeDefined();
      expect(typeof useCase.getSelapan).toBe('function');
    });
  });

  describe('Singleton repositories', () => {
    it('should return same repository instance', () => {
      const repo1 = PrimbonFactory.getWatakRepository();
      const repo2 = PrimbonFactory.getWatakRepository();
      
      expect(repo1).toBe(repo2);
    });

    it('should return different repository types', () => {
      const watakRepo = PrimbonFactory.getWatakRepository();
      const jodohRepo = PrimbonFactory.getJodohRepository();
      
      expect(watakRepo).not.toBe(jodohRepo);
    });
  });
});
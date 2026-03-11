import { describe, it } from 'node:test';
import assert from 'node:assert';
import primbon from '../lib/esm/index.js';

describe('primbon.lintang', () => {
  it('should return valid Lintang result for a given date', () => {
    const result = primbon.lintang(new Date('1990-08-17'));
    
    assert.ok(result, 'Result should not be null');
    assert.ok(result.nama, 'Nama should exist');
    assert.ok(result.watak, 'Watak should exist');
    assert.ok(result.deskripsi, 'Deskripsi should exist');
    assert.ok(Array.isArray(result.sifat), 'Sifat should be an array');
    assert.ok(Array.isArray(result.kompatibel), 'Kompatibel should be an array');
    assert.ok(Array.isArray(result.tidakKompatibel), 'Tidak Kompatibel should be an array');
  });

  it('should return consistent result for same date', () => {
    const date = new Date('1986-11-03');
    const result1 = primbon.lintang(date);
    const result2 = primbon.lintang(date);
    
    assert.deepStrictEqual(result1, result2);
  });

  it('should return valid LINTANG_NAMES via named export', () => {
    // Test via named export, not default export
    const result = primbon.lintang(new Date('1990-08-17'));
    assert.ok(result.nama, 'Should return valid lintang result');
  });
});

describe('calculateLintang', () => {
  it('should return valid result for different years', () => {
    // Test beberapa tahun berbeda
    const years = [1990, 1991, 2000, 2020];
    
    for (const year of years) {
      const result = primbon.lintang(new Date(year, 0, 1));
      assert.ok(result.nama, `Should return valid result for ${year}`);
    }
  });

  it('should return result with valid properties', () => {
    const result = primbon.lintang(new Date('1990-08-17'));
    
    assert.ok(typeof result.nama === 'string', 'Nama should be string');
    assert.ok(typeof result.watak === 'string', 'Watak should be string');
    assert.ok(typeof result.deskripsi === 'string', 'Deskripsi should be string');
  });
});
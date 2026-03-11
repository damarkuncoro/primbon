import { describe, it } from 'node:test';
import assert from 'node:assert';
import primbon from '../lib/esm/index.js';

describe('primbon.sadwara', () => {
  it('should return valid Sadwara result for a given date', () => {
    const result = primbon.sadwara(new Date('1990-08-17'));
    
    assert.ok(result, 'Result should not be null');
    assert.ok(result.nama, 'Nama should exist');
    assert.ok(result.namaJawa, 'NamaJawa should exist');
    assert.ok(typeof result.neptu === 'number', 'Neptu should be a number');
    assert.ok(result.watak, 'Watak should exist');
    assert.ok(result.deskripsi, 'Deskripsi should exist');
  });

  it('should return one of the valid Sadwara names', () => {
    const result = primbon.sadwara(new Date('2024-01-15'));
    
    assert.ok(result.nama, 'Should have nama');
    assert.ok(['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi', 'Manis'].includes(result.nama));
  });

  it('should return consistent result for same date', () => {
    const date = new Date('1986-11-03');
    const result1 = primbon.sadwara(date);
    const result2 = primbon.sadwara(date);
    
    assert.deepStrictEqual(result1, result2);
  });
});
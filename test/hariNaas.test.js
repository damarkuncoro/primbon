import { describe, it } from 'node:test';
import assert from 'node:assert';
import primbon from '../lib/esm/index.js';

describe('primbon.hariNaas', () => {
  it('should return valid Hari Naas result for a given date', () => {
    const result = primbon.hariNaas(new Date('1990-08-17'));
    
    assert.ok(result, 'Result should not be null');
    assert.ok(result.nama, 'Nama should exist');
    assert.ok(result.watak, 'Watak should exist');
    assert.ok(result.deskripsi, 'Deskripsi should exist');
    assert.ok(result.saran, 'Saran should exist');
  });

  it('should return consistent result for same date', () => {
    const date = new Date('1986-11-03');
    const result1 = primbon.hariNaas(date);
    const result2 = primbon.hariNaas(date);
    
    assert.deepStrictEqual(result1, result2);
  });
});

describe('primbon.getAllHariNaas', () => {
  it('should return array of all Hari Naas', () => {
    const results = primbon.getAllHariNaas();
    
    assert.ok(Array.isArray(results), 'Should return an array');
    assert.strictEqual(results.length, 7, 'Should have 7 Hari Naas');
  });
});
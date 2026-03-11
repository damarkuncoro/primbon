import { describe, it } from 'node:test';
import assert from 'node:assert';
import primbon from '../lib/esm/index.js';

describe('primbon.sangawara', () => {
  it('should return valid Sangawara result for a given date', () => {
    const result = primbon.sangawara(new Date('1990-08-17'));
    
    assert.ok(result, 'Result should not be null');
    assert.ok(result.nama, 'Nama should exist');
    assert.ok(result.namaJawa, 'NamaJawa should exist');
    assert.ok(typeof result.neptu === 'number', 'Neptu should be a number');
    assert.ok(result.watak, 'Watak should exist');
    assert.ok(result.deskripsi, 'Deskripsi should exist');
  });

  it('should return consistent result for same date', () => {
    const date = new Date('1986-11-03');
    const result1 = primbon.sangawara(date);
    const result2 = primbon.sangawara(date);
    
    assert.deepStrictEqual(result1, result2);
  });
});
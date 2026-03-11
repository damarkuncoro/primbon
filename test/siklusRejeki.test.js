import { describe, it } from 'node:test';
import assert from 'node:assert';
import primbon from '../lib/esm/index.js';

describe('primbon.siklusRejeki', () => {
  it('should return valid Siklus Rejeki result for a given date', () => {
    const result = primbon.siklusRejeki(new Date('1990-08-17'));
    
    assert.ok(result, 'Result should not be null');
    assert.ok(result.weton, 'Weton should exist');
    assert.ok(typeof result.neptu === 'number', 'Neptu should be a number');
    assert.ok(typeof result.siklusDasar === 'number', 'Siklus Dasar should be a number');
    assert.ok(Array.isArray(result.grafik), 'Grafik should be an array');
    assert.ok(result.interpretasi, 'Interpretasi should exist');
    assert.ok(result.saran, 'Saran should exist');
  });

  it('should return grafik with correct number of points', () => {
    const result = primbon.siklusRejeki(new Date('1990-08-17'));
    
    // Default maxUsia is 80, points at 0, 10, 20, 30, 40, 50, 60, 70, 80 = 9 points
    assert.strictEqual(result.grafik.length, 9, 'Should have 9 grafik points');
  });

  it('should return consistent result for same date', () => {
    const date = new Date('1986-11-03');
    const result1 = primbon.siklusRejeki(date);
    const result2 = primbon.siklusRejeki(date);
    
    assert.deepStrictEqual(result1, result2);
  });
});

describe('primbon.rejekiByUsia', () => {
  it('should return valid result for given usia', () => {
    const result = primbon.rejekiByUsia(new Date('1990-08-17'), 25);
    
    assert.ok(result, 'Result should not be null');
    assert.ok(typeof result.level === 'number', 'Level should be a number');
    assert.ok(result.level >= 1 && result.level <= 10, 'Level should be between 1 and 10');
    assert.ok(result.kondisi, 'Kondisi should exist');
  });

  it('should return consistent result for same inputs', () => {
    const result1 = primbon.rejekiByUsia(new Date('1990-08-17'), 25);
    const result2 = primbon.rejekiByUsia(new Date('1990-08-17'), 25);
    
    assert.deepStrictEqual(result1, result2);
  });
});
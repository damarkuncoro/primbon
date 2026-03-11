import { describe, it } from 'node:test';
import assert from 'node:assert';
import { calculateSadwara, SADWARA_NAMES } from '../src/core/sadwara.js';

describe('calculateSadwara', () => {
  it('should return valid Sadwara result for a given date', () => {
    const result = calculateSadwara(new Date('1990-08-17'));
    
    assert.ok(result, 'Result should not be null');
    assert.ok(result.nama, 'Nama should exist');
    assert.ok(result.namaJawa, 'NamaJawa should exist');
    assert.ok(typeof result.neptu === 'number', 'Neptu should be a number');
    assert.ok(result.watak, 'Watak should exist');
    assert.ok(result.deskripsi, 'Deskripsi should exist');
  });

  it('should return one of the valid Sadwara names', () => {
    const result = calculateSadwara(new Date('2024-01-15'));
    
    assert.ok(
      SADWARA_NAMES.includes(result.nama),
      `Result nama "${result.nama}" should be in SADWARA_NAMES`
    );
  });

  it('should return consistent result for same date', () => {
    const date = new Date('1986-11-03');
    const result1 = calculateSadwara(date);
    const result2 = calculateSadwara(date);
    
    assert.deepStrictEqual(result1, result2);
  });

  it('should handle different dates and return valid results', () => {
    const dates = [
      new Date('2024-01-01'),
      new Date('2024-01-15'),
      new Date('2024-06-20'),
      new Date('2024-12-31')
    ];
    
    for (const date of dates) {
      const result = calculateSadwara(date);
      assert.ok(result.nama, `Should return valid result for ${date}`);
      assert.ok(SADWARA_NAMES.includes(result.nama), `Nama should be valid for ${date}`);
    }
  });
});

describe('SADWARA_NAMES', () => {
  it('should have 6 elements', () => {
    assert.strictEqual(SADWARA_NAMES.length, 6, 'Should have 6 Sadwara names');
  });

  it('should contain expected names', () => {
    const expected = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi', 'Manis'];
    assert.deepStrictEqual(SADWARA_NAMES.sort(), expected.sort());
  });
});
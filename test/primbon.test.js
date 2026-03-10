import test from 'node:test';
import assert from 'node:assert';
import primbon from '../lib/esm/index.js';

test('primbon.weton should return correct weton for 1990-08-17', () => {
  const result = primbon.weton('1990-08-17');
  // 1990-08-17 was Friday Pahing
  assert.strictEqual(result.hari, 'Jumat');
  assert.strictEqual(result.pasaran, 'Pahing');
  assert.strictEqual(result.weton, 'Jumat Pahing');
  assert.strictEqual(result.neptu, 15);
});

test('primbon.kalenderJawa should return 1 Mulud 1919 for 1986-11-03', () => {
  const result = primbon.kalenderJawa('1986-11-03');
  assert.strictEqual(result.tanggal, 1);
  assert.strictEqual(result.bulan, 'Mulud');
  assert.strictEqual(result.tahun, 1919);
  assert.strictEqual(result.namaTahun, 'Dal');
});

test('primbon.pranataMangsa should return Kalima for 1986-11-03', () => {
  const result = primbon.pranataMangsa('1986-11-03');
  assert.strictEqual(result.nama, 'Kalima');
  assert.strictEqual(result.candra, 'Pancuran Emas Sumawur Ing Jagad');
});

test('primbon.pasaran should return Pahing for 1990-08-17', () => {
  const result = primbon.pasaran('1990-08-17');
  assert.strictEqual(result, 'Pahing');
});

test('primbon.neptu should return 14 for Jumat Kliwon', () => {
  const result = primbon.neptu('Jumat', 'Kliwon');
  assert.strictEqual(result, 14);
});

test('primbon.watak should return detailed traits for Jumat Pahing', () => {
  const result = primbon.watak('1990-08-17');
  assert.strictEqual(result.weton, 'Jumat Pahing');
  assert.ok(Array.isArray(result.sifat));
  assert.ok(result.sifat.includes('berani'));
  
  // Verify detailed component traits
  assert.strictEqual(result.detail.hari.nama, 'Jumat');
  assert.strictEqual(result.detail.hari.peredaran, 'Bintang');
  assert.ok(result.detail.hari.sifat.includes('Suka menasehati'));
  
  assert.strictEqual(result.detail.pasaran.nama, 'Pahing');
  assert.strictEqual(result.detail.pasaran.gambaran, 'Cendana');
  assert.ok(result.detail.pasaran.binatang[0].watak.includes('Selalu pergi jauh'));
});

test('primbon.watak should return detailed description for Senin Wage', () => {
  const result = primbon.watak('1986-11-03');
  assert.strictEqual(result.weton, 'Senin Wage');
  assert.ok(result.deskripsi.includes('Jarang terjebak'));
});

test('primbon.watakTanggalJawa should return correct trait', () => {
  const result = primbon.watakTanggalJawa(1);
  assert.ok(result.includes('Angkuh'));
});

test('primbon.watakBulanJawa should return correct trait', () => {
  const result = primbon.watakBulanJawa('Sura');
  assert.strictEqual(result.neptu, 7);
  assert.ok(result.watak.includes('Pendiam'));
});

test('primbon.garisHidup should return correct number and character', () => {
  // 03-11-1986
  // 3 + 1+1 + 1+9+8+6 = 29 -> 11 -> 2
  const result = primbon.garisHidup('1986-11-03');
  assert.strictEqual(result.angka, 2);
  assert.ok(result.karakter.includes('Kepekaan'));
});

test('primbon.jodoh should return correct category', () => {
  // 1990-08-17 (Jumat Pahing = 6 + 9 = 15)
  // 1995-01-10 (Selasa Wage = 3 + 4 = 7)
  // Total = 22. 22 % 8 = 6 -> Padu
  const result = primbon.jodoh('1990-08-17', '1995-01-10');
  assert.strictEqual(result.totalNeptu, 22);
  assert.strictEqual(result.sisa, 6);
  assert.strictEqual(result.kategori, 'Padu');
});

test('primbon.hariBaik should return recommendations', () => {
  const result = primbon.hariBaik('nikah');
  assert.ok(result.hasOwnProperty('rekomendasi'));
  assert.ok(Array.isArray(result.rekomendasi));
  assert.ok(result.rekomendasi.includes('Jumat Kliwon'));
  assert.strictEqual(result.keperluan, 'nikah');
});

test('primbon.hariBaik should throw error for invalid keperluan', () => {
  assert.throws(() => primbon.hariBaik('invalid'), /Keperluan tidak valid/);
});

test('primbon.wuku should return correct wuku', () => {
  const result = primbon.wuku('1986-11-03');
  assert.strictEqual(result.nama, 'Mandasiya');
  assert.ok(result.watak.includes('Brahma'));
});

test('primbon.selapan should return correct calculation', () => {
  const tglLahir = '1990-08-17';
  const tglSekarang = '1990-09-21'; // Tepat 35 hari setelahnya
  const result = primbon.selapan(tglLahir, tglSekarang);
  assert.strictEqual(result.jumlahSelapan, 1);
  assert.strictEqual(result.sisaHari, 0);
});

test('primbon should throw error for invalid date', () => {
  assert.throws(() => primbon.weton('invalid-date'), /Tanggal tidak valid/);
});

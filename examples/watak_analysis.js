import primbon from '../src/index.js';

const tglLahir = '1986-11-03';

console.log('--- Analisis Watak ---');

// 1. Watak Berdasarkan Weton (Hari & Pasaran)
const watakWeton = primbon.watak(tglLahir);
console.log('Watak Weton:');
console.log(`Weton: ${watakWeton.weton}`);
console.log(`Sifat Umum: ${watakWeton.sifat.join(', ')}`);
console.log(`Deskripsi: ${watakWeton.deskripsi}`);
console.log(`Detail Hari (${watakWeton.detail.hari.nama}):`);
console.log(`  Peredaran: ${watakWeton.detail.hari.peredaran}`);
console.log(`  Karakteristik: ${watakWeton.detail.hari.sifat.join(', ')}`);
console.log(`Detail Pasaran (${watakWeton.detail.pasaran.nama}):`);
console.log(`  Gambaran: ${watakWeton.detail.pasaran.gambaran}`);
console.log(`  Binatang Pelambang: ${watakWeton.detail.pasaran.binatang.map(b => b.nama).join(', ')}`);
console.log(`  Watak Binatang: ${watakWeton.detail.pasaran.binatang[0].watak}`);

// 2. Watak Berdasarkan Tanggal Jawa (1-30)
// Misal kita asumsikan tanggal Jawa-nya adalah 1
const watakTanggal = primbon.watakTanggalJawa(1);
console.log('\nWatak Berdasarkan Tanggal Jawa (1):');
console.log(watakTanggal);

// 3. Watak Berdasarkan Bulan Jawa
const watakBulan = primbon.watakBulanJawa('Sura');
console.log('\nWatak Berdasarkan Bulan Jawa (Sura):');
console.log(`Neptu Bulan: ${watakBulan.neptu}`);
console.log(`Watak: ${watakBulan.watak}`);

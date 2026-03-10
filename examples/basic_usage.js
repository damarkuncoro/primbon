import primbon from '../src/index.js';

// Contoh penggunaan dasar untuk mendapatkan weton dan neptu
const tanggal = '1986-11-03';
const result = primbon.weton(tanggal);

console.log('--- Penggunaan Dasar ---');
console.log(`Tanggal: ${tanggal}`);
console.log(`Hari: ${result.hari}`);
console.log(`Pasaran: ${result.pasaran}`);
console.log(`Weton: ${result.weton}`);
console.log(`Total Neptu: ${result.neptu}`);

// Mendapatkan tanggal Jawa lengkap
const jawa = primbon.kalenderJawa(tanggal);
console.log('\n--- Kalender Jawa ---');
console.log(`Tanggal Jawa: ${jawa.tanggal} ${jawa.bulan} ${jawa.tahun} (${jawa.namaTahun})`);

// Hanya mendapatkan pasaran
const pasaran = primbon.pasaran(tanggal);
console.log(`Pasaran saja: ${pasaran}`);

// Menghitung neptu dari hari dan pasaran secara manual
const neptuManual = primbon.neptu('Senin', 'Pon');
console.log(`Neptu Senin Pon: ${neptuManual}`);

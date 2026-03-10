import primbon from '../src/index.js';

// Contoh penghitungan kecocokan jodoh antara dua orang
const tglLahirA = '1986-11-03'; // Senin Pon (4 + 7 = 11)
const tglLahirB = '1986-02-22'; // Jumat Pahing (6 + 9 = 15)

const jodoh = primbon.jodoh(tglLahirA, tglLahirB);

console.log('--- Kecocokan Jodoh ---');
console.log(`Orang Pertama: ${jodoh.personA.weton} (Neptu: ${jodoh.personA.neptu})`);
console.log(`Orang Kedua: ${jodoh.personB.weton} (Neptu: ${jodoh.personB.neptu})`);
console.log(`Total Neptu: ${jodoh.totalNeptu}`);
console.log(`Sisa Neptu: ${jodoh.sisa}`);
console.log(`Kategori: ${jodoh.kategori}`);
console.log(`Arti: ${jodoh.arti}`);

// Menampilkan hari baik untuk menikah
const hariNikah = primbon.hariBaik('nikah');
console.log('\nRekomendasi Hari Baik untuk Menikah:');
console.log(hariNikah.join(', '));

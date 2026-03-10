import primbon from '../src/index.js';

// Contoh penggunaan wuku dan selapan
const tglLahir = '1986-11-03';
const tglSekarang = '2026-03-10'; // Tanggal hari ini dalam simulasi

console.log('--- Pawukon & Siklus 35 Hari ---');

// 1. Menentukan Wuku (Siklus 210 Hari)
const wuku = primbon.wuku(tglLahir);
console.log(`Wuku untuk ${tglLahir}: ${wuku.nama}`);
console.log(`Watak Wuku: ${wuku.watak}`);

// 2. Menentukan Selapan (Ulang Tahun Weton)
const selapan = primbon.selapan(tglLahir, tglSekarang);
console.log('\nSiklus 35 Hari (Selapan):');
console.log(`Jumlah Selapan yang Telah Dilalui: ${selapan.jumlahSelapan} kali`);
console.log(`Posisi Hari Ini: Hari ke-${selapan.hariKe} dari siklus 35 hari`);
console.log(`Sisa Hari Menuju Selapan Berikutnya: ${35 - selapan.sisaHari} hari`);

// Menampilkan hari baik untuk pindah rumah
const hariPindahRumah = primbon.hariBaik('pindah_rumah');
console.log('\nRekomendasi Hari Baik untuk Pindah Rumah:');
console.log(hariPindahRumah.join(', '));

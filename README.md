# @damarkuncoro/primbon

[![npm version](https://img.shields.io/npm/v/@damarkuncoro/primbon.svg)](https://www.npmjs.com/package/@damarkuncoro/primbon)
[![Build Status](https://img.shields.io/github/actions/workflow/status/damarkuncoro/primbon/test.yml?branch=main)](https://github.com/damarkuncoro/primbon/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Pustaka JavaScript modern, andal, dan tanpa dependensi untuk semua kebutuhan perhitungan Primbon Jawa. Bekerja secara offline dengan akurasi yang teruji.

## Mengapa Memilih `@damarkuncoro/primbon`?

Ada banyak library primbon di luar sana, namun `@damarkuncoro/primbon` dirancang untuk menjadi pilihan profesional yang stabil dan dapat diandalkan.

*   ✅ **Bekerja 100% Offline**: Tidak ada panggilan ke server eksternal. Semua perhitungan dan data sudah termasuk di dalam paket, menjamin kecepatan, privasi, dan keandalan bahkan tanpa koneksi internet.
*   ✅ **API Modern & Fleksibel**: Mendukung penuh TypeScript, ES Modules (`import`), dan CommonJS (`require`) secara *native*. Dapatkan *auto-completion* dan keamanan tipe di editor Anda.
*   ✅ **Stabil dan Teruji**: Dilengkapi dengan puluhan *unit test* untuk memastikan setiap fungsi memberikan hasil yang akurat dan konsisten.
*   ✅ **Fitur Paling Komprehensif**: Menyediakan perhitungan inti primbon Jawa yang tidak ditemukan di library lain, mulai dari Weton, Kalender Jawa, hingga Pranata Mangsa dan Garis Hidup.
*   ✅ **Tanpa Dependensi**: Ukuran paket kecil dan tidak akan menambah beban dependensi pada proyek Anda.
*   ✅ **Clean Architecture**: Arsitektur berlapis dengan Domain-Driven Design untuk fleksibilitas dan testability maksimal.

## Instalasi

```bash
npm install @damarkuncoro/primbon
```

## Fitur Utama

| Fitur | Deskripsi |
| :--- | :--- |
| **Weton** | Menghitung hari, pasaran, weton, dan neptu dari tanggal Masehi. |
| **Kalender Jawa** | Mengonversi tanggal Masehi ke tanggal, bulan, dan tahun Jawa. |
| **Pranata Mangsa** | Menentukan Mangsa (kalender musim) berdasarkan tanggal. |
| **Watak** | Menganalisis karakter berdasarkan weton, tanggal, dan bulan Jawa. |
| **Jodoh** | Menghitung kecocokan jodoh berdasarkan wetun kedua pasangan. |
| **Hari Baik** | Menentukan rekomendasi hari baik untuk berbagai keperluan. |
| **Garis Hidup** | Menghitung angka numerologi (garis hidup) dari tanggal lahir. |
| **Wuku** | Menentukan Wuku dalam siklus 210 hari Pawukon. |
| **Selapan** | Menghitung siklus 35 harian (Selapanan). |
| **Pasaran & Neptu** | Fungsi utilitas untuk menghitung pasaran atau neptu secara terpisah. |

## Contoh Penggunaan

### ES Modules (`import`)

```javascript
import primbon from '@damarkuncoro/primbon';

// Menghitung Weton
const weton = primbon.weton('1990-08-17');
console.log(weton);
// Output: { hari: 'Jumat', pasaran: 'Pahing', weton: 'Jumat Pahing', neptu: 15 }

// Menghitung kecocokan jodoh
const jodoh = primbon.jodoh('1990-08-17', '1995-01-10');
console.log(jodoh.kategori, ':', jodoh.arti);
// Output: Padu : Sering mengalami pertengkaran, namun tidak sampai bercerai.
```

### CommonJS (`require`)

```javascript
const primbon = require('@damarkuncoro/primbon').default;

// Mengonversi ke Kalender Jawa
const kalender = primbon.kalenderJawa('1986-11-03');
console.log(kalender);
// Output: { tanggal: 1, bulan: 'Mulud', tahun: 1919, namaTahun: 'Dal' }
```

## Clean Architecture API (Advanced)

Untuk penggunaan yang lebih fleksibel dan dapat diuji, Anda dapat menggunakan API Clean Architecture:

```javascript
import {
  // Domain - Entity & Services (tanpa dependensi eksternal)
  Weton,
  WetonCalculator,
  wetonCalculator,
  
  // Application - Use Cases
  WatakUseCase,
  JodohUseCase,
  
  // Infrastructure - Implementasi Repository
  JsonWatakRepository,
  JsonJodohRepository
} from '@damarkuncoro/primbon/clean';

// Gunakan langsung tanpa dependensi (paling sederhana)
const weton = wetonCalculator.calculate(new Date('1990-08-17'));
console.log(weton.toString()); // "Jumat Pahing"

// Atau gunakan Use Cases dengan Dependency Injection
const watakRepo = new JsonWatakRepository();
const jodohRepo = new JsonJodohRepository();

const watakUseCase = new WatakUseCase(watakRepo);
const jodohUseCase = new JodohUseCase(jodohRepo);

const watak = watakUseCase.getWatak(new Date('1990-08-17'));
const jodoh = jodohUseCase.calculate(new Date('1990-08-17'), new Date('1995-01-10'));
```

Lihat [docs/CLEAN_ARCHITECTURE.md](docs/CLEAN_ARCHITECTURE.md) untuk dokumentasi lengkap.

## Rencana Pengembangan (Roadmap)

Proyek ini dikelola secara aktif. Beberapa rencana untuk masa depan:
*   [x] Implementasi Clean Architecture dan DDD
*   [ ] Melengkapi data deskripsi watak untuk semua kombinasi weton.
*   [ ] Menambahkan fungsi untuk menghasilkan representasi visual dari siklus Pawukon.
*   [ ] Dukungan internasionalisasi (i18n) untuk output dalam Bahasa Inggris.

## Lisensi

Proyek ini dilisensikan di bawah [Lisensi MIT](LICENSE).

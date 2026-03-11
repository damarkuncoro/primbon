# @damarkuncoro/primbon

[![npm version](https://img.shields.io/npm/v/@damarkuncoro/primbon.svg)](https://www.npmjs.com/package/@damarkuncoro/primbon)
[![Build Status](https://img.shields.io/github/actions/workflow/status/damarkuncoro/primbon/test.yml?branch=main)](https://github.com/damarkuncoro/primbon/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Pustaka JavaScript modern, andal, dan tanpa dependensi untuk semua kebutuhan perhitungan Primbon Jawa. Bekerja secara offline dengan akurasi yang teruji berdasarkan referensi kitab klasik seperti *Betaljemur Adammakna*.

## Mengapa Memilih `@damarkuncoro/primbon`?

Ada banyak library primbon di luar sana, namun `@damarkuncoro/primbon` dirancang untuk menjadi pilihan profesional yang stabil dan dapat diandalkan.

*   ✅ **Bekerja 100% Offline**: Tidak ada panggilan ke server eksternal. Semua perhitungan dan data sudah termasuk di dalam paket.
*   ✅ **Dukungan Multi-Bahasa (i18n)**: Output tersedia dalam Bahasa Indonesia (id), Jawa (jv), dan Inggris (en).
*   ✅ **API Modern & Fleksibel**: Mendukung penuh TypeScript, ES Modules (`import`), dan CommonJS (`require`).
*   ✅ **Stabil dan Teruji**: Dilengkapi dengan puluhan *unit test* untuk memastikan akurasi data.
*   ✅ **Fitur Terlengkap**: Menyediakan siklus Paringkelan (Sadwara), Padewan (Asatawara), Padangon (Sangawara), hingga Pawukon.
*   ✅ **Referensi Terpercaya**: Data divalidasi berdasarkan kitab *Betaljemur Adammakna* dan tradisi Jawa yang pakem.

## Instalasi

```bash
npm install @damarkuncoro/primbon
```

## Fitur Utama

| Fitur | Deskripsi |
| :--- | :--- |
| **Weton** | Hari, pasaran, weton, dan neptu lengkap. |
| **Kalender Jawa** | Konversi Masehi ke tanggal, bulan, tahun Jawa, dan nama tahun (Dal, Be, dsb). |
| **Pranata Mangsa** | Kalender musim Jawa (Kasa, Karo, Katelu, dsb) beserta ciri-cirinya. |
| **Siklus Lanjutan** | Mendukung Sadwara (6 harian), Asatawara (8 harian), dan Sangawara (9 harian). |
| **Pawukon** | Perhitungan Wuku (30 wuku) dan siklus Selapan (35 harian). |
| **Watak & Jodoh** | Analisis karakter berdasarkan weton dan perhitungan kecocokan pasangan. |
| **Garis Hidup** | Numerologi Jawa berdasarkan tanggal lahir. |
| **Hari Baik** | Rekomendasi hari untuk hajat tertentu (nikah, pindah rumah, usaha). |
| **i18n** | Dukungan lokalisasi untuk semua output teks. |

## Contoh Penggunaan

### Perhitungan Weton & Kalender Jawa

```javascript
import primbon from '@damarkuncoro/primbon';

// 1. Mendapatkan Weton
const weton = primbon.weton('1945-08-17');
console.log(weton);
// Output: { hari: 'Jumat', pasaran: 'Legi', weton: 'Jumat Legi', neptu: 11 }

// 2. Konversi ke Kalender Jawa
const jawa = primbon.kalenderJawa('1945-08-17');
console.log(jawa);
// Output: { tanggal: 9, bulan: 'Pasa', tahun: 1876, namaTahun: 'Alip' }
```

### Siklus Paringkelan, Padewan, & Padangon

```javascript
const tgl = '2024-03-11';

// Sadwara (Paringkelan - 6 harian)
const sadwara = primbon.sadwara(tgl);
console.log(`Sadwara: ${sadwara.nama} (${sadwara.watak})`);

// Asatawara (Padewan - 8 harian)
const asatawara = primbon.asatawara(tgl);
console.log(`Asatawara: ${asatawara.nama}`);

// Sangawara (Padangon - 9 harian)
const sangawara = primbon.sangawara(tgl);
console.log(`Sangawara: ${sangawara.nama}`);
```

### Internasionalisasi (i18n)

```javascript
import primbon from '@damarkuncoro/primbon';

// Set ke Bahasa Jawa
primbon.setLocale('jv');
const wetonJawa = primbon.weton('2024-03-11');
console.log(wetonJawa.hari); // "Senen"

// Set ke Bahasa Inggris
primbon.setLocale('en');
console.log(primbon.weton('2024-03-11').hari); // "Monday"
```

### Kecocokan Jodoh

```javascript
const hasilJodoh = primbon.jodoh('1990-01-01', '1992-05-20');
console.log(`Kategori: ${hasilJodoh.kategori}`);
console.log(`Arti: ${hasilJodoh.arti}`);
```

## Clean Architecture API (Advanced)

Untuk integrasi yang lebih mendalam atau pengujian unit, Anda dapat mengakses komponen internal:

```javascript
import { 
  WetonCalculator, 
  JsonWatakRepository, 
  WatakUseCase 
} from '@damarkuncoro/primbon/clean';

const watakRepo = new JsonWatakRepository();
const watakUseCase = new WatakUseCase(watakRepo);

const watak = watakUseCase.getWatak(new Date());
console.log(watak.sifat);
```

## Referensi Kitab

Library ini merujuk pada sumber-sumber otoritatif:
- **Kitab Betaljemur Adammakna** (KPH Tjakraningrat)
- **Kitab Primbon Lukmanakim**
- **Kitab Japa Mantra**

Gunakan `primbon.getKitabInfo('betaljemur')` untuk melihat detail referensi yang digunakan.

## Lisensi

[MIT License](LICENSE) © 2024 Damar Kuncoro


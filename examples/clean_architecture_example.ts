/**
 * Example: Using Clean Architecture API
 * 
 * This demonstrates how to use the new layered architecture
 * for maximum flexibility and testability.
 */

import {
  // Direct Domain usage (no dependencies)
  Weton,
  WetonCalculator,
  wetonCalculator,
  
  // Application Layer with Dependency Injection
  WatakUseCase,
  JodohUseCase,
  WukuUseCase,
  HariBaikUseCase,
  
  // Infrastructure (implementations)
  JsonWatakRepository,
  JsonJodohRepository,
  JsonWukuRepository,
  JsonHariBaikRepository,
  watakRepository,
  jodohRepository,
  wukuRepository,
  hariBaikRepository,
  
  // Utilities
  ensureDate
} from '../src/clean/index.js';

// ============================================
// APPROACH 1: Direct Domain usage (simplest)
// ============================================

// Using singleton calculator
const date = new Date('1990-05-15');
const weton = wetonCalculator.calculate(date);
console.log('Weton:', weton.toString());
console.log('Neptu:', weton.neptu);

// Creating instances for custom behavior
const calculator = new WetonCalculator();
const customWeton = calculator.calculate(new Date());
console.log('Custom Weton:', customWeton.toString());

// ============================================
// APPROACH 2: Using Use Cases (recommended for features)
// ============================================

// Create repository instances (could be swapped for different implementations)
const myWatakRepo = new JsonWatakRepository();
const myJodohRepo = new JsonJodohRepository();
const myWukuRepo = new JsonWukuRepository();
const myHariBaikRepo = new JsonHariBaikRepository();

// Create use cases with dependencies
const watakUseCase = new WatakUseCase(myWatakRepo);
const jodohUseCase = new JodohUseCase(myJodohRepo);
const wukuUseCase = new WukuUseCase(myWukuRepo);
const hariBaikUseCase = new HariBaikUseCase(myHariBaikRepo);

// Use the features
const birthDate = ensureDate('1995-03-20');
const myWatak = watakUseCase.getWatak(birthDate);
console.log('\nWatak:', myWatak.weton);
console.log('Sifat:', myWatak.sifat);

// Jodoh compatibility
const partner1 = ensureDate('1993-08-10');
const partner2 = ensureDate('1995-02-15');
const compatibility = jodohUseCase.calculate(partner1, partner2);
console.log('\nCompatibility:', compatibility.kategori);
console.log('Arti:', compatibility.arti);

// Wuku
const today = new Date();
const todayWuku = wukuUseCase.getWuku(today);
console.log('\nWuku today:', todayWuku.nama);
console.log('Watak Wuku:', todayWuku.watak);

// Hari Baik
const goodDay = hariBaikUseCase.getHariBaik('nikah', 'Sura');
console.log('\nHari baik untuk nikah:', goodDay.rekomendasi);

// ============================================
// APPROACH 3: Using singletons (easiest)
// ============================================

// Using pre-configured singletons
const quickWatak = watakUseCase.getWatak(new Date());
const quickJodoh = jodohUseCase.calculate(new Date(), new Date('2000-01-01'));
const quickWuku = wukuUseCase.getWuku(new Date());
const quickHariBaik = hariBaikUseCase.getHariBaik('usaha');

console.log('\n--- Quick Results ---');
console.log('Watak:', quickWatak.weton);
console.log('Jodoh:', quickJodoh.kategori);
console.log('Wuku:', quickWuku.nama);
console.log('Hari Baik:', quickHariBaik.rekomendasi);

// ============================================
// ADVANCED: Testing with mock repositories
// ============================================

/*
// Create a mock repository for testing
class MockWatakRepository {
  getWatakByWeton(weton: string) {
    return { sifat: ['Test sifat'], deskripsi: 'Test description' };
  }
  getWatakByHari(hari: string) {
    return { sifat: ['Hari test'] };
  }
  getWatakByPasaran(pasaran: string) {
    return { sifat: ['Pasaran test'] };
  }
  getWatakByTanggalJawa(tanggal: number | string) {
    return 'Test watak';
  }
  getWatakByBulanJawa(bulan: string) {
    return { neptu: 5, watak: 'Test bulan' };
  }
}

// Use mock in test
const testWatakUseCase = new WatakUseCase(new MockWatakRepository());
const testResult = testWatakUseCase.getWatak(new Date());
console.log('Test result:', testResult);
*/
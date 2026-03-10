import primbon from '../src/index.js';

// Contoh penggunaan numerologi garis hidup (life path number)
const tglLahir = '1986-11-03';
const garisHidup = primbon.garisHidup(tglLahir);

console.log('--- Numerologi Garis Hidup ---');
console.log(`Tanggal Lahir: ${tglLahir}`);
console.log(`Angka Garis Hidup: ${garisHidup.angka}`);
console.log(`Karakteristik: ${garisHidup.karakter}`);

// Contoh lain: Angka Garis Hidup 1
const garisHidupLain = primbon.garisHidup('1990-01-01');
console.log(`\nAngka Garis Hidup (1990-01-01): ${garisHidupLain.angka}`);
console.log(`Karakteristik: ${garisHidupLain.karakter}`);

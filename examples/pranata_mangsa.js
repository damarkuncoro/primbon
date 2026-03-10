import primbon from '../src/index.js';

const tanggal = '1986-11-03';
const result = primbon.pranataMangsa(tanggal);

console.log('--- Pranata Mangsa (Kalender Musim Jawa) ---');
console.log(`Tanggal: ${tanggal}`);
console.log(`Mangsa: ${result.nama}`);
console.log(`Candra: ${result.candra}`);
console.log(`Rentang: ${result.mulai} s/d ${result.akhir}`);
console.log('\nAnalisis:');
console.log(`- Sifat: ${result.sifat}`);
console.log(`- Kesehatan: ${result.kesehatan}`);
console.log(`- Karir: ${result.karir}`);
console.log(`- Rejeki: ${result.rejeki}`);

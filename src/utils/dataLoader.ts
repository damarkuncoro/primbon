import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Cache untuk menyimpan data JSON yang sudah di-load
const dataCache = new Map<string, any>();

/**
 * Load dan cache data dari file JSON.
 * @param relativePath - Path relatif ke file data.
 * @returns - Data JSON yang sudah di-parse.
 */
const loadData = (relativePath: string): any => {
  if (dataCache.has(relativePath)) {
    return dataCache.get(relativePath);
  }

  // Coba cari di src/data (saat dev/test via src) atau ../data (saat build di lib/esm atau lib/cjs)
  let dataPath = path.resolve(__dirname, '..', 'data', relativePath);
  
  if (!fs.existsSync(dataPath)) {
    // Jika tidak ketemu (misal saat dijalankan dari lib/esm/index.js)
    dataPath = path.resolve(__dirname, '..', '..', 'src', 'data', relativePath);
  }

  try {
    const rawData = fs.readFileSync(dataPath, 'utf8');
    const parsedData = JSON.parse(rawData);
    dataCache.set(relativePath, parsedData);
    return parsedData;
  } catch (error: any) {
    if (error.code === 'ENOENT') {
      throw new Error(`Data file tidak ditemukan: ${relativePath}`);
    }
    throw error;
  }
};

export const preloadAllData = () => {
  const dataFiles = [
    'watak.json', 'dino_watak.json', 'pasaran_watak.json',
    'tanggal_jawa_watak.json', 'bulan_jawa_watak.json', 'jodoh.json',
    'hari_baik.json', 'garis_hidup.json', 'wuku_watak.json', 'pranata_mangsa.json'
  ];
  dataFiles.forEach(file => loadData(file));
  return dataCache;
};

export const getWatakData = () => loadData('watak.json');
export const getDinoWatakData = () => loadData('dino_watak.json');
export const getPasaranWatakData = () => loadData('pasaran_watak.json');
export const getTanggalJawaWatakData = () => loadData('tanggal_jawa_watak.json');
export const getBulanJawaWatakData = () => loadData('bulan_jawa_watak.json');
export const getJodohData = () => loadData('jodoh.json');
export const getHariBaikData = () => loadData('hari_baik.json');
export const getGarisHidupData = () => loadData('garis_hidup.json');
export const getWukuWatakData = () => loadData('wuku_watak.json');
export const getPranataMangsaData = () => loadData('pranata_mangsa.json');

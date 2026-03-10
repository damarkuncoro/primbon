import { watakData } from '../data/watak.js';
import { dinoWatakData } from '../data/dino_watak.js';
import { pasaranWatakData } from '../data/pasaran_watak.js';
import { tanggalJawaWatakData } from '../data/tanggal_jawa_watak.js';
import { bulanJawaWatakData } from '../data/bulan_jawa_watak.js';
import { jodohData } from '../data/jodoh.js';
import { hariBaikData } from '../data/hari_baik.js';
import { garisHidupData } from '../data/garis_hidup.js';
import { wukuWatakData } from '../data/wuku_watak.js';
import { pranataMangsaData } from '../data/pranata_mangsa.js';

// Re-export for convenience
export { watakData, dinoWatakData, pasaranWatakData, tanggalJawaWatakData, bulanJawaWatakData, jodohData, hariBaikData, garisHidupData, wukuWatakData, pranataMangsaData };

// For backward compatibility, create a preload function
export const preloadAllData = () => {
  // Data is already loaded via imports above
  return {
    watak: watakData,
    dinoWatak: dinoWatakData,
    pasaranWatak: pasaranWatakData,
    tanggalJawaWatak: tanggalJawaWatakData,
    bulanJawaWatak: bulanJawaWatakData,
    jodoh: jodohData,
    hariBaik: hariBaikData,
    garisHidup: garisHidupData,
    wukuWatak: wukuWatakData,
    pranataMangsa: pranataMangsaData
  };
};

export const getWatakData = () => watakData;
export const getDinoWatakData = () => dinoWatakData;
export const getPasaranWatakData = () => pasaranWatakData;
export const getTanggalJawaWatakData = () => tanggalJawaWatakData;
export const getBulanJawaWatakData = () => bulanJawaWatakData;
export const getJodohData = () => jodohData;
export const getHariBaikData = () => hariBaikData;
export const getGarisHidupData = () => garisHidupData;
export const getWukuWatakData = () => wukuWatakData;
export const getPranataMangsaData = () => pranataMangsaData;

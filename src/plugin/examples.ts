/**
 * Example: Custom Plugin for Primbon
 * 
 * Shows how to create custom plugins to extend primbon functionality
 */

import { createPlugin, type PrimbonPlugin, type DateInput } from './index.js';

/**
 * Example: Chi/Ou/Jejul Plugin
 * Traditional Javanese day classification system
 */
export const createChiOuJejulPlugin = (): PrimbonPlugin => {
  return createPlugin(
    'primbon-chi-ou-jejul',
    'Chi/Ou/Jejul',
    '1.0.0',
    (date: Date) => {
      const day = date.getDay();
      const month = date.getMonth();
      
      // Chi/Ou/Jejul cycle based on day of week and month
      const chiOuJejul = ['Chi', 'Ou', 'Jejul'];
      const index = (day + month) % 3;
      
      return {
        nama: chiOuJejul[index],
        deskripsi: getDeskripsi(chiOuJejul[index]),
        hari: date.toLocaleDateString('id-ID', { weekday: 'long' })
      };
    },
    {
      description: 'Plugin untuk menghitung hari Chi, Ou, atau Jejul dalam tradisi Jawa',
      validate: (input: DateInput) => {
        if (input instanceof Date) return !isNaN(input.getTime());
        if (typeof input === 'string' || typeof input === 'number') return true;
        return false;
      }
    }
  );
};

function getDeskripsi(tipe: string): string {
  const deskripsi: Record<string, string> = {
    'Chi': 'Hari yang membawa energi Yin (dingin, pasif). Cocok untuk meditasi dan refleksi.',
    'Ou': 'Hari yang membawa energi Yang (panas, aktif). Cocok untuk memulai aktivitas dan pekerjaan.',
    'Jejul': 'Hari netral yang membawa keseimbangan. Cocok untuk pengambilan keputusan penting.'
  };
  return deskripsi[tipe] || '';
}

/**
 * Example: Pasaran Cycle Plugin
 * Extended информации about Pasaran cycle
 */
export const createPasaranCyclePlugin = (): PrimbonPlugin => {
  return createPlugin(
    'primbon-pasaran-cycle',
    'Pasaran Cycle',
    '1.0.0',
    (date: Date) => {
      const weton = calculatePasaran(date);
      const cycle = (date.getTime() - new Date(1900, 0, 1).getTime()) / (1000 * 60 * 60 * 24 * 35);
      
      return {
        ...weton,
        siklus: Math.floor(cycle) + 1,
        posisiDalamSiklus: Math.floor((cycle % 1) * 35) + 1
      };
    },
    {
      description: 'Plugin untuk menghitung siklus pasaran lengkap'
    }
  );
};

function calculatePasaran(date: Date): { legi: number; pahing: number; pon: number; wage: number; kliwon: number } {
  const days = Math.floor((date.getTime() - new Date(1900, 0, 1).getTime()) / (1000 * 60 * 60 * 24));
  const pasaran = days % 5;
  
  return {
    legi: pasaran === 0 ? 1 : 0,
    pahing: pasaran === 1 ? 1 : 0,
    pon: pasaran === 2 ? 1 : 0,
    wage: pasaran === 3 ? 1 : 0,
    kliwon: pasaran === 4 ? 1 : 0
  };
}

export default {
  createChiOuJejulPlugin,
  createPasaranCyclePlugin
};
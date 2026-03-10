import { WetonCalculator } from '../../domain/primbon/services/WetonCalculator.js';
import type { WatakRepository, WatakData, DinoWatakData, PasaranWatakData, BulanWatakData } from '../../domain/primbon/repositories/index.js';

export interface WatakResult {
  weton: string;
  sifat: string[];
  deskripsi: string;
  detail: {
    hari: {
      nama: string;
      beredar?: string;
      sifat: string[];
    };
    pasaran: {
      nama: string;
      gambaran?: string;
      binatang?: any[];
      sifat: string[];
    };
  };
}

/**
 * WatakUseCase - Application Service for watak (character) calculations
 */
export class WatakUseCase {
  private wetonCalculator: WetonCalculator;
  private watakRepository: WatakRepository;

  constructor(watakRepository: WatakRepository) {
    this.wetonCalculator = new WetonCalculator();
    this.watakRepository = watakRepository;
  }

  /**
   * Get watak based on birth date
   */
  getWatak(date: Date): WatakResult {
    const wetonInfo = this.wetonCalculator.calculate(date);
    const watakData = this.watakRepository.getWatakByWeton(wetonInfo.toString());
    const dinoWatak = this.watakRepository.getWatakByHari(wetonInfo.hari);
    const pasaranWatak = this.watakRepository.getWatakByPasaran(wetonInfo.pasaran);
    
    const info: any = watakData || { sifat: ['Belum ada data'] };
    const dinoInfo: any = dinoWatak || { sifat: [] };
    const psrnInfo: any = pasaranWatak || { sifat: [] };

    return {
      weton: wetonInfo.toString(),
      sifat: info.sifat,
      deskripsi: info.deskripsi || 'Belum ada deskripsi mendalam.',
      detail: {
        hari: {
          nama: wetonInfo.hari,
          beredar: dinoInfo.pereroon || dinoInfo.pereredaran,
          sifat: dinoInfo.sifat
        },
        pasaran: {
          nama: wetonInfo.pasaran,
          gambaran: psrnInfo.gambaran,
          binomial: psrnInfo.binatang,
          sifat: psrnInfo.sifat
        }
      }
    };
  }

  /**
   * Get watak based on tanggal jawa (1-30)
   */
  getWatakTanggalJawa(tanggal: number | string): string {
    return this.watakRepository.getWatakByTanggalJawa(tanggal);
  }

  /**
   * Get watak based on bulan jawa
   */
  getWatakBulanJawa(bulan: string): BulanWatakData | null {
    return this.watakRepository.getWatakByBulanJawa(bulan);
  }
}
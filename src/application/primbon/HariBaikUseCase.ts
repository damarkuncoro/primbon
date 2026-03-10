import type { HariBaikRepository } from '../../domain/primbon/repositories/index.js';

export interface HariBaikResult {
  keperluan: string;
  bulan: string | null;
  rekomendasi: string[];
}

const VALID_KEPERLUAN = ['nikah', 'pindah_rumah', 'usaha', 'pernikahan', 'membuka_usaha'];
const VALID_BULAN_JAWA = [
  'Sura', 'Sapar', 'Mulud', 'Bakda Mulud', 'Jumadil Awal', 'Jumadil Akhir',
  'Rejeb', 'Ruwah', 'Pasa', 'Sawal', 'Sela', 'Besar'
];

/**
 * HariBaikUseCase - Application Service for determining auspicious days
 */
export class HariBaikUseCase {
  private hariBaikRepository: HariBaikRepository;

  constructor(hariBaikRepository: HariBaikRepository) {
    this.hariBaikRepository = hariBaikRepository;
  }

  /**
   * Determine auspicious days for a given purpose
   */
  getHariBaik(keperluan: string, bulan?: string): HariBaikResult {
    const normalizedKeperluan = keperluan?.toLowerCase().trim();
    if (!VALID_KEPERLUAN.includes(normalizedKeperluan)) {
      throw new Error(
        `Keperluan tidak valid: "${keperluan}". Gunakan: ${VALID_KEPERLUAN.join(', ')}`
      );
    }

    if (bulan && !VALID_BULAN_JAWA.includes(bulan)) {
      throw new Error(
        `Bulan Jawa tidak valid: "${bulan}". Gunakan: ${VALID_BULAN_JAWA.join(', ')}`
      );
    }

    const data = this.hariBaikRepository.getHariBaikByKeperluan(normalizedKeperluan);
    
    return {
      keperluan: normalizedKeperluan,
      bulan: bulan || null,
      rekomendasi: data?.rekomendasi || []
    };
  }
}
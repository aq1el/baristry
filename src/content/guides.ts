export type CoffeeGuides = {
  guides: {
    milk_frothing: GuideEntry;
    tamping: GuideEntry;
    gramasi: GuideEntry;
    cleaning_equipment: GuideEntry;
  };
};

export type GuideEntry = {
  title: string;
  objective?: string;
  equipment?: string[];
  steps?: string[];
  common_mistakes?: string[];
  ideal_temperature_celsius?: number;
  recommended_pressure_kg?: number;
  standard_dose?: {
    single_shot_grams?: string;
    double_shot_grams?: string;
    output_single_ml?: string;
    output_double_ml?: string;
  };
  brew_ratio?: string;
  examples?: Array<{ input_grams: number; output_ml: number }>;
  tips?: string[];
  daily_cleaning?: string[];
  weekly_cleaning?: string[];
  monthly_cleaning?: string[];
  warnings?: string[];
};

// Import JSON sebagai modul (Vite/TS mendukung import JSON)
import raw from '@/assets/content/guides.json';

const data = raw as CoffeeGuides;

// Pemetaan ke array display dan link ke course terkait (opsional)
export const guideList = [
  {
    key: 'milk_frothing',
    image: '/images/guide/guide-milk-frothing.jpg',
    cta: 'Belajar Sekarang',
    to: { name: 'course-detail', params: { id: 'latte-art' } },
    detail: data.guides.milk_frothing
  },
  {
    key: 'gramasi',
    image: '/images/guide/gramasi.jpg',
    cta: 'Belajar Sekarang',
    to: { name: 'course-detail', params: { id: 'espresso-basics' } },
    detail: data.guides.gramasi
  },
  {
    key: 'tamping',
    image: '/images/guide/tamping.jpg',
    cta: 'Belajar Sekarang',
    to: { name: 'course-detail', params: { id: 'espresso-basics' } },
    detail: data.guides.tamping
  },
  {
    key: 'cleaning_equipment',
    image: '/images/guide/cleaning-equipment.jpg',
    cta: 'Belajar Sekarang',
    to: { name: 'course-detail', params: { id: 'pro-barista' } },
    detail: data.guides.cleaning_equipment
  }
] as const;

export type GuideItem = (typeof guideList)[number];
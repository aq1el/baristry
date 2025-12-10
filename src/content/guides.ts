export type CoffeeGuides = {
  guides: Record<string, GuideEntry>;
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

import raw from '@/assets/content/guides.json';
export const guidesData = raw as CoffeeGuides;

export function getGuide(key: string): GuideEntry | null {
  return (guidesData.guides[key] ?? null) as GuideEntry | null;
}
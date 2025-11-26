export interface Course {
  id: string;
  title: string;
  level: 'basic' | 'intermediate' | 'advanced';
  isPremium: boolean;
  shortDesc: string;
  category: 'espresso' | 'latte_art' | 'roasting' | 'business';
}

export const courses: Course[] = [
  {
    id: 'espresso-dasar',
    title: 'Dasar Espresso',
    level: 'basic',
    isPremium: false,
    shortDesc: 'Memahami ekstraksi espresso, rasio, dan grind size.',
    category: 'espresso'
  },
  {
    id: 'latte-art-dasar',
    title: 'Latte Art Dasar',
    level: 'basic',
    isPremium: false,
    shortDesc: 'Belajar microfoam dan pola sederhana.',
    category: 'latte_art'
  },
  {
    id: 'latte-art-lanjutan',
    title: 'Latte Art Lanjutan',
    level: 'intermediate',
    isPremium: true,
    shortDesc: 'Pola rosetta & tulip kompleks.',
    category: 'latte_art'
  },
  {
    id: 'roasting-pemula',
    title: 'Roasting Pemula',
    level: 'intermediate',
    isPremium: true,
    shortDesc: 'Tahapan roasting light ke medium.',
    category: 'roasting'
  },
  {
    id: 'manajemen-kedai',
    title: 'Manajemen Kedai Kopi',
    level: 'advanced',
    isPremium: true,
    shortDesc: 'Inventori, workflow bar & pelayanan.',
    category: 'business'
  }
];
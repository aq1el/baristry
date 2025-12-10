export type Course = {
  id: string;
  title: string;
  shortDesc: string;
  image: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  category: 'espresso' | 'brew' | 'latte_art' | 'pro';
  isPremium: boolean;
};

export const courses: Course[] = [
  {
    id: 'espresso-basics',
    title: 'Dasar-Dasar Barista',
    shortDesc: 'Mulai dari ekstraksi espresso dan alat dasar.',
    image: '/images/programs/espresso-basics.jpg',
    level: 'beginner',
    category: 'espresso',
    isPremium: false
  },
  {
    id: 'latte-art',
    title: 'Espresso & Latte Art',
    shortDesc: 'Kuasai microfoam dan teknik latte art.',
    image: '/images/programs/latte-art.jpg',
    level: 'intermediate',
    category: 'latte_art',
    isPremium: false
  },
  {
    id: 'pro-barista',
    title: 'Barista Profesional',
    shortDesc: 'Materi lanjutan untuk dunia kerja.',
    image: '/images/programs/pro-barista.jpg',
    level: 'advanced',
    category: 'pro',
    isPremium: true
  }
];
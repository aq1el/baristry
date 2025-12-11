export type Recipe = {
  id: string;
  title: string;
  desc: string;
  image: string;
  ingredients: string[];
  steps: string[];
  notes?: string;
  cta?: string;
  to?: any;
};

export const recipeList: Recipe[] = [
  {
    id: 'latte',
    title: 'Cafe Latte',
    desc: 'Espresso + susu panas ber-foam tipis.',
    image: '/images/recipes/recipe-latte.jpg',
    ingredients: [
      '18 g kopi (double shot)',
      '200 ml susu segar',
      'Alat: espresso machine, steam pitcher'
    ],
    steps: [
      'Giling kopi sesuai grind espresso dan dosis 18 g.',
      'Tamping rata, ekstrak double shot (±36 ml).',
      'Steam susu hingga microfoam, suhu 60–65°C.',
      'Tuang espresso, kemudian tambah susu steam perlahan sambil membentuk microfoam.'
    ],
    notes: 'Gunakan susu cair dingin dan pitcher yang bersih. Latihan pouring untuk membentuk latte art.',
    cta: 'Lihat Resep',
    to: { name: 'recipe-detail', params: { id: 'latte' } }
  },
  {
    id: 'cappuccino',
    title: 'Cappuccino',
    desc: 'Espresso dengan foam lebih tebal dan tekstur creamy.',
    image: '/images/recipes/recipe-cappuccino.jpg',
    ingredients: [
      '18 g kopi (double shot)',
      '120 ml susu segar',
      'Alat: espresso machine, steam pitcher'
    ],
    steps: [
      'Ekstrak double shot espresso.',
      'Steam susu dengan sedikit lebih banyak udara untuk foam tebal.',
      'Tuang espresso dan tambahkan foam tebal di atasnya.'
    ],
    notes: 'Perbandingan susu lebih sedikit daripada latte; foam harus creamy dan kering di bagian atas.',
    cta: 'Lihat Resep',
    to: { name: 'recipe-detail', params: { id: 'cappuccino' } }
  },
  {
    id: 'v60',
    title: 'Filter Coffee (V60)',
    desc: 'Rasa bersih, ringan, dan aromatik (pour over).',
    image: '/images/recipes/recipe-v60.jpg',
    ingredients: [
      '15 g kopi (medium grind)',
      '250 ml air panas 92–96°C',
      'Alat: V60, paper filter, kettle, timbangan'
    ],
    steps: [
      'Bilas filter dengan air panas.',
      'Masukkan kopi, lakukan bloom dengan 30–40 ml air selama 30–40 detik.',
      'Tuang sisa air secara melingkar hingga total 250 ml. Total extraction ~2:30–3:00 menit.'
    ],
    notes: 'Sesuaikan grind dan kecepatan tuang untuk mencapai ekstraksi yang seimbang.',
    cta: 'Lihat Resep',
    to: { name: 'recipe-detail', params: { id: 'v60' } }
  },
  {
    id: 'macchiato',
    title: 'Macchiato',
    desc: 'Espresso dengan sedikit susu/foam untuk aksen rasa.',
    image: '/images/recipes/recipe-macchiato.jpg',
    ingredients: ['18 g kopi (single/double sesuai selera)', 'sedikit susu/foam'],
    steps: [
      'Ekstrak espresso.',
      'Tambahkan sedikit susu panas atau foam di atas espresso (spot of milk).'
    ],
    notes: 'Macchiato tradisional sangat sedikit susu — lebih menonjolkan espresso.',
    cta: 'Lihat Resep',
    to: { name: 'recipe-detail', params: { id: 'macchiato' } }
  }
];
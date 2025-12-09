export type FaqItem = {
  q: string;
  a: string;
  keywords?: string[];
};

export const FAQ: FaqItem[] = [
  {
    q: 'Bagaimana cara upgrade ke Premium?',
    a: 'Masuk (Login) terlebih dahulu, lalu klik tombol "Upgrade" di Navbar atau di halaman course premium.'
  },
  {
    q: 'Apakah ada kursus gratis?',
    a: 'Ada. Filter daftar kursus ke "Gratis" di halaman Courses untuk melihat semua course free.',
    keywords: ['free', 'gratis', 'tanpa bayar']
  },
  {
    q: 'Metode pembayaran apa yang didukung?',
    a: 'Saat ini simulasi saja (tidak ada pembayaran asli). Di produksi, kami mendukung kartu dan e-wallet.'
  },
  {
    q: 'Apakah materi bisa diunduh?',
    a: 'Untuk saat ini belum. Kamu bisa mengakses ulang kapan pun selama akun aktif.',
    keywords: ['download', 'unduh', 'materi']
  },
  {
    q: 'Bagaimana cara menghubungi support?',
    a: 'Gunakan halaman Contact untuk mengirim pesan. Tim kami akan membalas via email.',
    keywords: ['contact', 'support', 'bantuan', 'cs']
  }
];

/** Rule-based matching sederhana */
export function findAnswer(input: string): string {
  const text = input.toLowerCase().trim();
  if (!text) return 'Tulis pertanyaanmu ya 🙂';

  const direct = FAQ.find(item => text.includes(item.q.toLowerCase()));
  if (direct) return direct.a;

  for (const item of FAQ) {
    if (item.keywords?.some(k => text.includes(k.toLowerCase()))) {
      return item.a;
    }
  }

  if (text.includes('premium')) return 'Untuk upgrade Premium: login dulu, lalu klik "Upgrade" di Navbar atau di halaman course.';
  if (text.includes('gratis') || text.includes('free')) return 'Ada course gratis. Buka halaman Courses lalu pilih filter "Gratis".';
  if (text.includes('contact') || text.includes('support')) return 'Buka halaman Contact untuk menghubungi tim support kami.';
  if (text.includes('download') || text.includes('unduh')) return 'Saat ini materi belum bisa diunduh, tapi bisa diakses kapan pun.';

  return 'Maaf, aku belum punya jawabannya. Coba pertanyaan lain atau kirim pesan lewat halaman Contact.';
}
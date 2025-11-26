# BarisTry — Platform Belajar Barista (Vue 3 + Tailwind)

Website pembelajaran barista untuk semua orang. Tersedia kursus gratis dan premium (simulasi), serta fitur chat FAQ seputar kopi. Dibuat untuk memenuhi tugas besar Desain Web dan Implementasi & Pengujian Perangkat Lunak.

Live Demo: (akan diisi setelah deploy)
Repo: (akan diisi setelah dibuat)

## Tujuan Proyek
- Menyajikan situs modern dengan Vue 3 (Composition API) dan Tailwind CSS.
- Memenuhi persyaratan: routing minimal 5 halaman, ≥8 komponen, responsif, interaktif, dan penggunaan aset visual.
- Menunjukkan praktik implementasi dan pengujian perangkat lunak dasar (unit, integration, e2e sederhana).

## Fitur Utama
- Daftar kursus (Gratis & Premium simulasi).
- Halaman detail kursus (dynamic route `/courses/:id`).
- Auth simulasi (login sederhana, role user/premium via localStorage).
- Gating premium: modal muncul bila belum premium.
- Chat FAQ kopi (mode lokal, siap di-upgrade ke API AI).
- Form kontak + validasi.
- i18n dasar: Indonesia (lengkap), Inggris (placeholder).
- Layout responsif (mobile–desktop), minimal 3 gambar aset.

## Teknologi
- Vue 3 + Vite
- Vue Router
- Pinia (state)
- Tailwind CSS
- vue-i18n
- Vitest (+ Testing Library) untuk unit/integration
- Playwright (opsional) untuk e2e
- (Opsional) Icon: Font Awesome / Heroicons

## Struktur Halaman (Routes)
- `/` — Home (hero, CTA)
- `/about` — Tentang
- `/courses` — Daftar kursus (v-for + filter)
- `/courses/:id` — Detail kursus (dynamic)
- `/contact` — Form kontak
- `/login` — Login simulasi
- `/chat` — Chat FAQ kopi

## Komponen (≥8)
- BaseNavbar, BaseFooter
- CourseCard, CourseList, PremiumBadge
- FilterBar, Modal
- AuthForm, ContactForm
- ChatPanel, LocaleSwitcher
- LoadingSpinner (opsional)

## Struktur Folder
```
src/
 ├─ assets/
 ├─ components/
 ├─ pages/
 ├─ router/
 ├─ store/
 ├─ services/
 ├─ locales/
 ├─ styles/
 ├─ App.vue
 └─ main.ts
```

## Data & Mode Premium
- `services/mockData.ts` menyimpan daftar kursus dan FAQ.
- Premium: tombol “Upgrade Premium” mengubah `user.role` jadi `premium` (simulasi, tanpa pembayaran).

## Persiapan Lingkungan
- Node.js 18+ (disarankan LTS)
- NPM atau PNPM

## Cara Menjalankan
(ikuti langkah yang sudah dijelaskan sebelumnya: init Vite + Vue, install Tailwind, router, pinia, i18n, dll)

## Testing (Ringkas)
- Unit, Integration, dan E2E sesuai rencana sebelumnya.

## Deployment
- Netlify (drag-and-drop dist) atau Vercel (GitHub integration). Pilih salah satu.

## Roadmap
- Integrasi AI nyata, progress belajar, payment gateway, bilingual penuh.

## Lisensi
MIT

## Kredit
Dibuat oleh tim BarisTry untuk keperluan pembelajaran.

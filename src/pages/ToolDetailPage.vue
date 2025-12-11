<template>
  <div class="min-h-screen bg-slate-50 pb-16">
    <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between gap-4 pt-8">
        <nav class="text-xs text-slate-500">
          <RouterLink to="/" class="hover:text-slate-700">Beranda</RouterLink>
          <span class="mx-1">/</span>
          <RouterLink to="/tools" class="hover:text-slate-700">Peralatan</RouterLink>
          <span class="mx-1">/</span>
          <span class="font-medium text-slate-800">{{ tool?.name ?? 'Tidak ditemukan' }}</span>
        </nav>

        <button
          type="button"
          @click="goBack"
          class="inline-flex items-center rounded-full border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-100"
        >
          ← Kembali
        </button>
      </div>

      <!-- Kalau alat tidak ditemukan -->
      <div v-if="!tool" class="mt-16 text-center">
        <h1 class="text-2xl font-semibold text-slate-900">
          Peralatan tidak ditemukan
        </h1>
        <p class="mt-2 text-sm text-slate-600">
          Pastikan kamu mengakses halaman dari daftar peralatan yang tersedia.
        </p>
        <RouterLink
          to="/tools"
          class="mt-6 inline-flex rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white hover:bg-slate-800"
        >
          Kembali ke daftar peralatan
        </RouterLink>
      </div>

      <!-- Konten utama -->
      <div v-else class="mt-10 grid gap-10 lg:grid-cols-[1.4fr,1fr] lg:items-start">
        <!-- Info + gambar -->
        <section>
          <div class="overflow-hidden rounded-2xl bg-amber-50">
            <div class="grid gap-6 p-6 sm:p-8 md:grid-cols-[1.4fr,1fr] md:items-center">
              <div>
                <p class="text-xs font-semibold uppercase tracking-wide text-amber-700">
                  {{ tool.category }}
                </p>
                <h1 class="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">
                  {{ tool.name }}
                </h1>
                <p class="mt-3 text-sm leading-relaxed text-slate-700">
                  {{ tool.subtitle }}
                </p>

                <dl class="mt-5 flex flex-wrap gap-4 text-xs text-slate-700">
                  <div class="rounded-full bg-white/80 px-3 py-1 shadow-sm">
                    <span class="font-semibold text-slate-900">Peran: </span>{{ tool.role }}
                  </div>
                  <div class="rounded-full bg-white/80 px-3 py-1 shadow-sm">
                    <span class="font-semibold text-slate-900">Level: </span>{{ tool.level }}
                  </div>
                  <div class="rounded-full bg-white/80 px-3 py-1 shadow-sm">
                    <span class="font-semibold text-slate-900">Fokus: </span>{{ tool.focus }}
                  </div>
                </dl>
              </div>

              <div class="flex justify-end">
                <img
                  :src="tool.image"
                  :alt="tool.name"
                  class="h-44 w-full max-w-xs rounded-xl object-cover shadow-md"
                />
              </div>
            </div>
          </div>

          <!-- Fungsi & langkah penggunaan -->
          <div class="mt-10 space-y-8">
            <section class="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
              <h2 class="text-sm font-semibold text-slate-900">
                Fungsi Utama
              </h2>
              <p class="mt-2 text-sm text-slate-700">
                {{ tool.purpose }}
              </p>

              <div v-if="tool.keyPoints?.length" class="mt-4">
                <h3 class="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Hal yang perlu diperhatikan
                </h3>
                <ul class="mt-2 list-disc space-y-1 text-sm text-slate-700 pl-5">
                  <li v-for="point in tool.keyPoints" :key="point">
                    {{ point }}
                  </li>
                </ul>
              </div>
            </section>

            <section class="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
              <h2 class="text-sm font-semibold text-slate-900">
                Cara Penggunaan
              </h2>

              <p class="mt-2 text-sm text-slate-700">
                Ikuti langkah-langkah di bawah ini saat menggunakan {{ tool.name.toLowerCase() }}:
              </p>

              <ol class="mt-4 space-y-2 text-sm text-slate-700">
                <li
                  v-for="(step, index) in tool.usageSteps"
                  :key="step"
                  class="flex gap-2"
                >
                  <span
                    class="mt-0.5 inline-flex h-5 w-5 flex-none items-center justify-center rounded-full bg-slate-900 text-[11px] font-semibold text-white"
                  >
                    {{ index + 1 }}
                  </span>
                  <span class="leading-relaxed">{{ step }}</span>
                </li>
              </ol>
            </section>
          </div>
        </section>

        <!-- Sidebar tips -->
        <aside class="space-y-6">
          <section class="rounded-2xl bg-slate-900 p-5 text-slate-50 shadow-md">
            <h2 class="text-sm font-semibold text-amber-200">
              Tips Perawatan
            </h2>
            <p class="mt-2 text-xs text-slate-200">
              Rawat alat dengan baik supaya rasa kopi tetap konsisten dan umur alat lebih panjang.
            </p>
            <ul class="mt-3 list-disc space-y-1 text-xs text-slate-100 pl-4">
              <li
                v-for="tip in tool.maintenance"
                :key="tip"
              >
                {{ tip }}
              </li>
            </ul>
          </section>

          <section
            v-if="tool.notes?.length"
            class="rounded-2xl bg-white p-5 text-sm shadow-sm ring-1 ring-slate-100"
          >
            <h2 class="text-sm font-semibold text-slate-900">
              Catatan Praktis
            </h2>
            <ul class="mt-3 list-disc space-y-1 text-xs text-slate-700 pl-4">
              <li v-for="note in tool.notes" :key="note">
                {{ note }}
              </li>
            </ul>
          </section>

          <section class="rounded-2xl bg-amber-50 p-5 text-xs text-slate-800">
            <p class="font-semibold text-slate-900">
              Lanjutkan latihanmu
            </p>
            <p class="mt-1">
              Setelah memahami {{ tool.name.toLowerCase() }}, coba gabungkan dengan modul lain
              seperti gramasi kopi dan tamping untuk hasil espresso yang stabil.
            </p>
            <RouterLink
              to="/guide"
              class="mt-3 inline-flex rounded-full bg-slate-900 px-4 py-1.5 text-xs font-semibold text-white hover:bg-slate-800"
            >
              Buka panduan praktik
            </RouterLink>
          </section>
        </aside>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const toolKey = computed(() => route.params.toolKey as string);

/**
 * Data detail peralatan.
 * Sesuaikan path image dengan folder /public/images/tools punyamu.
 */
const toolsDetail = {
  'espresso-machine': {
    key: 'espresso-machine',
    name: 'Espresso Machine',
    category: 'Peralatan Utama',
    subtitle: 'Mesin inti untuk mengekstraksi espresso dengan tekanan tinggi.',
    role: 'Jantung bar kopi',
    level: 'Beginner–Intermediate',
    focus: 'Konsistensi ekstraksi',
    image: '/images/tools/tool-espresso-machine.jpg',
    purpose:
      'Espresso machine digunakan untuk mengekstraksi espresso dengan tekanan dan temperatur stabil sehingga rasa kopi lebih konsisten dan seimbang.',
    keyPoints: [
      'Pastikan boiler sudah mencapai temperatur kerja sebelum brew.',
      'Gunakan grind size yang sesuai untuk mencegah under/over extraction.',
      'Perhatikan tekanan dan durasi ekstraksi (umumnya 25–30 detik).',
    ],
    usageSteps: [
      'Panaskan mesin dan lakukan flushing singkat pada group head.',
      'Siapkan portafilter berisi bubuk kopi yang sudah di-tamp dengan rata.',
      'Kunci portafilter ke group head hingga terasa mantap.',
      'Mulai ekstraksi dan amati aliran espresso hingga mencapai yield yang diinginkan.',
      'Segera hentikan ekstraksi dan sajikan espresso atau jadikan base untuk minuman lain.',
    ],
    maintenance: [
      'Lakukan backflush rutin dengan blind filter dan cairan pembersih khusus.',
      'Bersihkan shower screen dan group head dari sisa kopi.',
      'Kosongkan drip tray dan bersihkan permukaan mesin setiap shift.',
      'Lakukan descaling berkala sesuai kualitas air yang digunakan.',
    ],
    notes: [
      'Gunakan air dengan kualitas baik untuk menjaga rasa dan umur boiler.',
      'Catat parameter brew (dose, yield, time) untuk setiap resep yang dipakai.',
    ],
  },

  grinder: {
    key: 'grinder',
    name: 'Grinder',
    category: 'Peralatan Pendukung',
    subtitle: 'Penggiling biji kopi untuk menghasilkan ukuran partikel yang konsisten.',
    role: 'Menentukan kecepatan ekstraksi',
    level: 'Beginner–Intermediate',
    focus: 'Grinding konsisten',
    image: '/images/tools/tool-grinder.jpg',
    purpose:
      'Grinder mengubah biji kopi menjadi bubuk dengan ukuran tertentu. Ukuran partikel yang konsisten membantu ekstraksi berjalan stabil.',
    keyPoints: [
      'Gunakan grind size halus untuk espresso, lebih kasar untuk metode manual brew.',
      'Selalu giling kopi sesaat sebelum digunakan untuk menjaga kesegaran.',
    ],
    usageSteps: [
      'Atur setting grind size sesuai metode seduh yang digunakan.',
      'Timbang biji kopi sesuai gramasi resep.',
      'Masukkan biji kopi ke hopper atau chamber grinder.',
      'Giling kopi hingga habis dan pastikan tidak ada sisa di chute.',
      'Ratakan bubuk kopi di portafilter atau dripper sebelum proses seduh.',
    ],
    maintenance: [
      'Bersihkan sisa kopi di burr dan chute setiap hari untuk menghindari rancid.',
      'Gunakan brush kecil untuk sudut-sudut yang sulit dijangkau.',
      'Lakukan pembersihan mendalam (deep clean) secara berkala sesuai intensitas penggunaan.',
    ],
    notes: [
      'Perubahan kecil di grind size dapat sangat memengaruhi rasa; lakukan penyesuaian bertahap.',
      'Jangan ubah setting grind saat grinder sedang berputar kecuali modelmu memang mendukung.',
    ],
  },

  tamper: {
    key: 'tamper',
    name: 'Tamper',
    category: 'Peralatan Espresso',
    subtitle: 'Alat untuk memadatkan bubuk kopi di portafilter secara merata.',
    role: 'Mengontrol resistansi aliran air',
    level: 'Beginner',
    focus: 'Tekanan & kerataan tamping',
    image: '/images/tools/tool-tamper.jpg',
    purpose:
      'Tamper digunakan untuk memadatkan bubuk kopi agar air melewati puck secara merata, bukan hanya di satu sisi.',
    keyPoints: [
      'Pegang tamper dengan posisi pergelangan lurus untuk menghindari channeling.',
      'Tekanan tamping yang konsisten lebih penting daripada angka pastinya.',
    ],
    usageSteps: [
      'Isi portafilter dengan bubuk kopi sesuai gramasi yang ditentukan.',
      'Ratakan permukaan kopi dengan distribusi (finger swipe atau distributor tool).',
      'Posisikan portafilter di permukaan rata atau tamping mat.',
      'Pegang tamper seperti memegang gagang pintu, lalu tekan lurus ke bawah.',
      'Lepaskan tekanan secara perlahan dan pastikan permukaan puck rata.',
    ],
    maintenance: [
      'Lap tamper setelah digunakan agar tetap bersih dari sisa kopi dan minyak.',
      'Simpan di tempat kering untuk menghindari karat (terutama bila ada bagian logam).',
    ],
    notes: [
      'Gunakan tinggi meja yang nyaman agar posisi punggung dan bahu tetap aman saat tamping.',
      'Banyak barista modern memilih tekanan sekitar 15–20 kg, namun konsistensi lebih utama.',
    ],
  },

  'milk-pitcher': {
    key: 'milk-pitcher',
    name: 'Milk Pitcher',
    category: 'Peralatan Latte Art',
    subtitle: 'Wadah untuk frothing susu dan menuang latte art.',
    role: 'Mengatur tekstur dan aliran susu',
    level: 'Beginner–Intermediate',
    focus: 'Tekstur microfoam & pouring',
    image: '/images/tools/tool-milk-pitcher.jpg',
    purpose:
      'Milk pitcher digunakan sebagai wadah frothing susu hingga menjadi microfoam halus dan sebagai alat menuang pola latte art.',
    keyPoints: [
      'Gunakan ukuran pitcher yang sesuai dengan volume susu yang akan dibuat.',
      'Posisi spout dan pegangan memengaruhi kontrol saat menuang latte art.',
    ],
    usageSteps: [
      'Tuang susu dingin ke dalam pitcher hingga sekitar sepertiga sampai setengah volume.',
      'Tempatkan steam wand sedikit di bawah permukaan susu untuk membuat foam (stretching).',
      'Setelah volume susu naik, turunkan posisi pitcher untuk memanaskan susu (rolling).',
      'Matikan steam ketika pitcher terasa hangat-panas (sekitar 60–65°C).',
      'Ketuk ringan dan swirl pitcher untuk menghilangkan bubble besar, lalu tuangkan ke espresso.',
    ],
    maintenance: [
      'Bilas pitcher segera setelah digunakan agar susu tidak mengering di dinding.',
      'Gunakan cairan pembersih khusus susu secara berkala untuk menghilangkan noda bandel.',
      'Jangan lupa membersihkan bagian luar pitcher untuk menjaga tampilan bar tetap rapi.',
    ],
    notes: [
      'Latihan menuang dengan air dan sedikit sabun bisa membantu sebelum memakai susu sungguhan.',
      'Pitcher dengan spout runcing lebih mudah untuk membuat detail latte art.',
    ],
  },
} as const;

type ToolKey = keyof typeof toolsDetail;

const tool = computed(() => {
  const key = toolKey.value as ToolKey;
  return toolsDetail[key];
});

const goBack = () => {
  if (window.history.length > 1) {
    router.back();
  } else {
    router.push('/tools');
  }
};
</script>

<template>
  <div class="min-h-screen bg-slate-50 pb-16">
    <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <!-- Hero / Intro -->
      <section class="pt-10 sm:pt-16">
        <div class="grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <p
              class="inline-flex items-center rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-700"
            >
              Panduan untuk barista pemula
            </p>
            <h1
              class="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl"
            >
              Tentang <span class="text-amber-700">BarisTry</span>
            </h1>
            <p class="mt-4 text-base leading-relaxed text-slate-600">
              BarisTry adalah panduan belajar barista berbasis web yang
              membantu kamu memahami dunia kopi dari nol. Mulai dari
              pengenalan alat, resep minuman klasik, hingga teknik lanjutan,
              semuanya disusun secara terstruktur agar mudah diikuti.
            </p>
            <p class="mt-3 text-base leading-relaxed text-slate-600">
              Fokus BarisTry adalah barista rumahan dan pemula yang ingin
              belajar dengan cara yang rapi, jelas, dan praktis tanpa harus
              langsung kursus mahal di coffee shop.
            </p>

            <dl class="mt-6 grid grid-cols-3 gap-4 text-sm text-slate-700">
              <div>
                <dt class="font-semibold text-slate-900">Pendekatan</dt>
                <dd>Kursus terstruktur &amp; panduan langkah demi langkah</dd>
              </div>
              <div>
                <dt class="font-semibold text-slate-900">Konten</dt>
                <dd>Resep, panduan alat, &amp; program belajar</dd>
              </div>
              <div>
                <dt class="font-semibold text-slate-900">Level</dt>
                <dd>Pemula hingga siap kerja</dd>
              </div>
            </dl>
          </div>

          <div class="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
            <h2 class="text-base font-semibold text-slate-900">
              Visi &amp; Misi BarisTry
            </h2>
            <p class="mt-2 text-sm text-slate-600">
              BarisTry hadir sebagai jembatan antara rasa penasaran terhadap
              kopi dengan praktik barista yang nyata.
            </p>

            <div class="mt-4 space-y-4 text-sm text-slate-700">
              <div class="flex gap-3">
                <div
                  class="mt-1 flex h-7 w-7 items-center justify-center rounded-full bg-amber-100 text-amber-700"
                >
                  🎯
                </div>
                <div>
                  <h3 class="font-semibold text-slate-900">Visi</h3>
                  <p>
                    Menjadi platform belajar barista berbahasa Indonesia yang
                    paling ramah pemula, praktis, dan mudah diakses siapa pun.
                  </p>
                </div>
              </div>

              <div class="flex gap-3">
                <div
                  class="mt-1 flex h-7 w-7 items-center justify-center rounded-full bg-amber-100 text-amber-700"
                >
                  ☕
                </div>
                <div>
                  <h3 class="font-semibold text-slate-900">Misi</h3>
                  <ul class="mt-1 list-disc space-y-1 pl-4">
                    <li>
                      Menyusun materi kopi yang runtut: dari dasar, teknik,
                      hingga praktik di bar.
                    </li>
                    <li>
                      Memberikan panduan alat dan resep yang realistis untuk
                      peralatan rumahan maupun kafe kecil.
                    </li>
                    <li>
                      Membantu pemula membangun rasa percaya diri sebelum
                      terjun ke dunia kerja barista.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="mt-16">
        <h2
          class="text-center text-2xl font-semibold tracking-tight text-slate-900"
        >
          Untuk Siapa BarisTry Dibuat?
        </h2>
        <p class="mt-3 text-center text-sm text-slate-600 max-w-2xl mx-auto">
          Konten BarisTry dirancang untuk berbagai profil pembelajar yang
          berbeda, tapi punya satu tujuan sama: makin dekat dengan kopi
          berkualitas.
        </p>

        <div
          class="mt-8 grid gap-6 md:grid-cols-3"
        >
          <div
            v-for="audience in audiences"
            :key="audience.title"
            class="flex flex-col rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100"
          >
            <div class="text-2xl">{{ audience.icon }}</div>
            <h3 class="mt-3 text-sm font-semibold text-slate-900">
              {{ audience.title }}
            </h3>
            <p class="mt-2 text-sm text-slate-600">
              {{ audience.description }}
            </p>
          </div>
        </div>
      </section>

      <section class="mt-16">
        <div class="grid gap-10 lg:grid-cols-[1.2fr,1fr] lg:items-start">
          <div>
            <h2
              class="text-2xl font-semibold tracking-tight text-slate-900"
            >
              Metode Belajar di BarisTry
            </h2>
            <p class="mt-3 text-sm text-slate-600">
              Setiap konten di BarisTry disusun seperti modul singkat yang
              bisa kamu ulang kapan saja. Tidak harus langsung hafal; yang
              penting kamu paham konsep dan terbiasa mempraktikkannya.
            </p>

            <div class="mt-6 space-y-4">
              <div
                v-for="method in methods"
                :key="method.title"
                class="flex gap-3 rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-100"
              >
                <div
                  class="mt-1 flex h-8 w-8 flex-none items-center justify-center rounded-full bg-amber-100 text-lg"
                >
                  {{ method.icon }}
                </div>
                <div>
                  <h3 class="text-sm font-semibold text-slate-900">
                    {{ method.title }}
                  </h3>
                  <p class="mt-1 text-sm text-slate-600">
                    {{ method.description }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div
            class="rounded-2xl bg-slate-900 p-5 text-slate-50 shadow-md lg:sticky lg:top-20"
          >
            <p class="text-xs font-semibold uppercase tracking-wide text-amber-200">
              Jalur Pembelajaran
            </p>
            <h3 class="mt-2 text-lg font-semibold">
              Dari kopi pertama sampai siap barista
            </h3>
            <p class="mt-2 text-xs text-slate-200">
              Ikuti lintasan belajar berikut untuk mendapatkan alur yang
              jelas. Kamu bisa memulai dari level mana saja, tapi kami
              sarankan urut dari Basic.
            </p>

            <ol class="mt-4 space-y-4 text-sm">
              <li
                v-for="(step, index) in learningPath"
                :key="step.title"
                class="relative pl-7"
              >
                <div
                  class="absolute left-0 top-1.5 flex h-5 w-5 items-center justify-center rounded-full border border-amber-300 bg-slate-900 text-[10px] font-semibold text-amber-200"
                >
                  {{ index + 1 }}
                </div>
                <p class="font-semibold text-amber-100">
                  {{ step.title }}
                </p>
                <p class="text-xs text-slate-200">
                  {{ step.description }}
                </p>
              </li>
            </ol>

            <div class="mt-5 rounded-xl bg-slate-800/60 p-3 text-xs">
              <p class="font-semibold text-amber-200">
                Tips:
              </p>
              <p class="mt-1 text-slate-200">
                Gabungkan teori dari BarisTry dengan praktik kopi harianmu.
                Sedikit demi sedikit, rasa dan konsistensi ekstraksi akan
                ikut membaik.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section class="mt-16 border-t border-slate-200 pt-10">
        <div
          class="flex flex-col items-center justify-between gap-6 text-center sm:flex-row sm:text-left"
        >
          <div>
            <h2 class="text-lg font-semibold text-slate-900">
              Siap mulai perjalananmu sebagai barista?
            </h2>
            <p class="mt-1 text-sm text-slate-600 max-w-xl">
              Jelajahi panduan, resep, dan alat pada menu di atas, lalu
              lanjut ke program kursus untuk belajar secara lebih terarah.
            </p>
          </div>
          <RouterLink
            to="/courses"
            class="inline-flex items-center justify-center rounded-full bg-amber-600 px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-amber-700"
          >
            Lihat Program Belajar
          </RouterLink>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
const audiences = [
  {
    icon: "🏠",
    title: "Home brewer & pecinta kopi rumahan",
    description:
      "Ingin bikin kopi enak di rumah dengan alat sederhana seperti V60, moka pot, atau French press.",
  },
  {
    icon: "🪑",
    title: "Calon barista & part-time di coffee shop",
    description:
      "Sedang bersiap melamar kerja di kafe, ingin memahami istilah dasar dan alur kerja barista.",
  },
  {
    icon: "🧑‍💻",
    title: "Mahasiswa & pekerja kreatif",
    description:
      "Butuh hobi baru dan ingin mengerti kopi secara lebih teknis tanpa harus ikut kelas tatap muka dulu.",
  },
];

const methods = [
  {
    icon: "📚",
    title: "Materi terstruktur",
    description:
      "Konten dibagi menjadi modul singkat: pengenalan, alat, teknik, dan latihan. Kamu bisa mengulang kapan saja.",
  },
  {
    icon: "🧪",
    title: "Berbasis praktik",
    description:
      "Setiap panduan dan resep dibuat dengan langkah-langkah jelas yang bisa langsung kamu praktikkan di rumah atau di bar.",
  },
  {
    icon: "💬",
    title: "Belajar dengan konteks nyata",
    description:
      "Tips dan catatan kecil di setiap bagian membantu kamu memahami situasi yang sering terjadi di coffee bar.",
  },
];

const learningPath = [
  {
    title: "Basic: Kenalan dengan kopi & alat",
    description:
      "Pahami jenis biji, grind size, serta fungsi alat-alat penting seperti grinder, tamper, dan milk pitcher.",
  },
  {
    title: "Intermediate: Teknik ekstraksi & resep klasik",
    description:
      "Pelajari espresso basic, latte art dasar, dan resep minuman populer seperti cappuccino, latte, dan V60.",
  },
  {
    title: "Pro: Konsistensi & workflow barista",
    description:
      "Fokus pada kecepatan kerja, konsistensi rasa, dan service, sehingga siap terjun di coffee shop sungguhan.",
  },
];
</script>

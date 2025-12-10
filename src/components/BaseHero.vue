<template>
  <section class="bg-gradient-to-r from-amber-100 to-stone-100">
    <div class="container mx-auto px-4 py-10 grid md:grid-cols-2 gap-6 items-center">
      <div>
        <h1 class="text-3xl md:text-4xl font-extrabold mb-3">
          Kuasai Seni Barista Profesional
        </h1>
        <p class="text-stone-700 mb-5">
          Pelajari teknik terbaik yang terbukti, dengan mentor berpengalaman dan materi terstruktur.
        </p>
        <div class="flex gap-3">
          <router-link
            to="/courses"
            class="px-5 py-3 rounded bg-amber-700 text-white hover:bg-amber-800"
          >
            Mulai Belajar
          </router-link>
          <router-link
            to="/about"
            class="px-5 py-3 rounded border border-stone-300 hover:bg-stone-100"
          >
            Pelajari Lebih Lanjut
          </router-link>
        </div>
        <div class="mt-6 flex gap-6 text-stone-700">
          <div class="flex flex-col"><span class="text-2xl font-bold">500+</span><span>Kursus</span></div>
          <div class="flex flex-col"><span class="text-2xl font-bold">1000+</span><span>Peserta</span></div>
          <div class="flex flex-col"><span class="text-2xl font-bold">4.9</span><span>Rating</span></div>
        </div>
      </div>
      <div class="rounded overflow-hidden shadow-lg">
        <img :src="image" alt="Hero" class="w-full h-full object-cover" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{ image: string }>();
</script>
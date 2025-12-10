<template>
  <section class="container mx-auto px-4 py-10">
    <h2 class="text-xl font-bold mb-2 text-center">Mengapa Memilih BarisTry?</h2>
    <p class="text-stone-600 text-center mb-6">Materi terstruktur, mentor berpengalaman, dan sertifikasi dasar.</p>
    <div class="grid md:grid-cols-3 gap-4">
      <article v-for="f in items" :key="f.title" class="bg-white border rounded-lg p-5 shadow-sm">
        <div class="text-2xl mb-2">{{ f.icon }}</div>
        <h3 class="font-semibold mb-1">{{ f.title }}</h3>
        <p class="text-stone-700 text-sm">{{ f.desc }}</p>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
type Feature = { icon: string; title: string; desc: string };
defineProps<{ items: Feature[] }>();
</script>
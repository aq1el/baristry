<template>
  <section class="bg-gradient-to-r from-amber-100 to-stone-100">
    <div class="container mx-auto px-4 py-10">
      <h2 class="text-2xl font-bold mb-2">Panduan untuk menjadi Barista</h2>
      <p class="text-stone-700 mb-6">Langkah-langkah untuk menjadi barista yang hebat</p>
      <div class="grid md:grid-cols-2 gap-4">
        <GuideCard v-for="g in guides" :key="g.title" v-bind="g" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import GuideCard from '@/components/GuideCard.vue';

const guides = [
  { title: 'Milk Frothing', desc: 'Proses membuat foam susu lembut.', image: '/images/guide-milk.jpg', cta: 'Belajar Sekarang', to: '/courses/latte-art' },
  { title: 'Gramasi', desc: 'Menentukan takaran kopi yang konsisten.', image: '/images/guide-gramasi.jpg', cta: 'Belajar Sekarang', to: '/courses/espresso-basics' },
  { title: 'Tamping', desc: 'Memadatkan bubuk kopi sebelum ekstraksi.', image: '/images/guide-tamping.jpg', cta: 'Belajar Sekarang', to: '/courses/espresso-basics' },
  { title: 'Pembersihan Alat', desc: 'Menjaga kebersihan alat untuk rasa optimal.', image: '/images/guide-clean.jpg', cta: 'Belajar Sekarang', to: '/courses/pro-barista' }
];
</script>
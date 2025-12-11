<template>
  <section class="bg-gradient-to-r from-amber-100 to-stone-100">
    <div class="container mx-auto px-4 py-10">
      <h2 class="text-2xl font-bold mb-2">Peralatan</h2>
      <p class="text-stone-700 mb-6">Kenali alat-alat penting untuk barista.</p>
      <div class="grid md:grid-cols-2 gap-4">
        <GuideCard v-for="t in tools" :key="t.title" v-bind="t" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import GuideCard from '@/components/GuideCard.vue';

const tools = [
  {
    title: 'Espresso Machine',
    desc: 'Mesin inti untuk ekstraksi espresso.',
    image: '/images/tools/tool-espresso-machine.jpg',
    cta: 'Lihat Detail',
    to: { name: 'tool-detail', params: { toolKey: 'espresso-machine' } },
  },
  {
    title: 'Grinder',
    desc: 'Penggiling biji kopi presisi.',
    image: '/images/tools/tool-grinder.jpg',
    cta: 'Lihat Detail',
    to: { name: 'tool-detail', params: { toolKey: 'grinder' } },
  },
  {
    title: 'Tamper',
    desc: 'Memadatkan kopi di portafilter.',
    image: '/images/tools/tool-tamper.jpg',
    cta: 'Lihat Detail',
    to: { name: 'tool-detail', params: { toolKey: 'tamper' } },
  },
  {
    title: 'Milk Pitcher',
    desc: 'Wadah frothing susu.',
    image: '/images/tools/tool-milk-pitcher.jpg',
    cta: 'Lihat Detail',
    to: { name: 'tool-detail', params: { toolKey: 'milk-pitcher' } },
  },
];
</script>

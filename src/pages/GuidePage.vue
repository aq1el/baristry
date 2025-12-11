<template>
  <section class="bg-gradient-to-r from-amber-100 to-stone-100">
    <div class="container mx-auto px-4 py-10">
      <h2 class="text-2xl font-bold mb-2">Panduan untuk menjadi Barista</h2>
      <p class="text-stone-700 mb-6">Langkah-langkah untuk menjadi barista yang hebat</p>

      <div class="grid md:grid-cols-2 gap-4">
        <GuideCard
          v-for="g in guides"
          :key="g.key"
          :title="g.detail.title"
          :desc="g.detail.objective || 'Panduan praktis seputar barista.'"
          :image="g.image"
          :cta="g.cta"
          :to="g.to"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import GuideCard from '@/components/GuideCard.vue';
import { guideList as guides } from '@/content/guides';
</script>



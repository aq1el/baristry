<template>
  <section class="bg-gradient-to-r from-amber-100 to-stone-100">
    <div class="container mx-auto px-4 py-10">
      <h2 class="text-2xl font-bold mb-2">Resep dengan Rasa yang Mendunia</h2>
      <p class="text-stone-700 mb-6">Ikuti resep-resep ini untuk memulai journey barista kamu.</p>
      <div class="grid md:grid-cols-2 gap-4">
        <GuideCard v-for="r in recipes" :key="r.id" v-bind="r" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import GuideCard from '@/components/GuideCard.vue';
import { recipeList as recipes } from '@/content/recipes';
</script>
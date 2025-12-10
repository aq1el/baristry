<template>
  <section class="container mx-auto px-4 py-10" v-if="entry">
    <h1 class="text-3xl font-bold mb-3">{{ entry.title }}</h1>
    <p v-if="entry.objective" class="text-stone-700 mb-4">{{ entry.objective }}</p>

    <div class="grid md:grid-cols-2 gap-6">
      <div class="space-y-4">
        <div v-if="entry.equipment?.length">
          <h2 class="text-xl font-semibold mb-2">Peralatan</h2>
          <ul class="list-disc pl-5 text-stone-700">
            <li v-for="it in entry.equipment" :key="it">{{ it }}</li>
          </ul>
        </div>

        <div v-if="entry.steps?.length">
          <h2 class="text-xl font-semibold mb-2">Langkah</h2>
          <ol class="list-decimal pl-5 text-stone-700 space-y-1">
            <li v-for="(s, i) in entry.steps" :key="i">{{ s }}</li>
          </ol>
        </div>

        <div v-if="entry.tips?.length">
          <h2 class="text-xl font-semibold mb-2">Tips</h2>
          <ul class="list-disc pl-5 text-stone-700">
            <li v-for="t in entry.tips" :key="t">{{ t }}</li>
          </ul>
        </div>
      </div>

      <div class="space-y-4">
        <div v-if="entry.common_mistakes?.length">
          <h2 class="text-xl font-semibold mb-2">Kesalahan Umum</h2>
          <ul class="list-disc pl-5 text-stone-700">
            <li v-for="m in entry.common_mistakes" :key="m">{{ m }}</li>
          </ul>
        </div>

        <div v-if="entry.daily_cleaning?.length || entry.weekly_cleaning?.length || entry.monthly_cleaning?.length">
          <h2 class="text-xl font-semibold mb-2">Pembersihan</h2>
          <div v-if="entry.daily_cleaning?.length">
            <h3 class="font-medium">Harian</h3>
            <ul class="list-disc pl-5 text-stone-700">
              <li v-for="d in entry.daily_cleaning" :key="d">{{ d }}</li>
            </ul>
          </div>
          <div v-if="entry.weekly_cleaning?.length">
            <h3 class="font-medium">Mingguan</h3>
            <ul class="list-disc pl-5 text-stone-700">
              <li v-for="w in entry.weekly_cleaning" :key="w">{{ w }}</li>
            </ul>
          </div>
          <div v-if="entry.monthly_cleaning?.length">
            <h3 class="font-medium">Bulanan</h3>
            <ul class="list-disc pl-5 text-stone-700">
              <li v-for="m in entry.monthly_cleaning" :key="m">{{ m }}</li>
            </ul>
          </div>
        </div>

        <div v-if="entry.standard_dose || entry.brew_ratio || entry.examples?.length">
          <h2 class="text-xl font-semibold mb-2">Gramasi dan Rasio</h2>
          <p v-if="entry.brew_ratio">Rasio seduh: {{ entry.brew_ratio }}</p>
          <div v-if="entry.standard_dose" class="text-sm text-stone-700">
            <p>Single: {{ entry.standard_dose.single_shot_grams }} g → {{ entry.standard_dose.output_single_ml }} ml</p>
            <p>Double: {{ entry.standard_dose.double_shot_grams }} g → {{ entry.standard_dose.output_double_ml }} ml</p>
          </div>
          <ul v-if="entry.examples?.length" class="list-disc pl-5 text-stone-700">
            <li v-for="(ex, i) in entry.examples" :key="i">
              Input {{ ex.input_grams }} g → Output {{ ex.output_ml }} ml
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="mt-6">
      <router-link to="/guide" class="px-4 py-2 rounded border hover:bg-stone-100">Kembali</router-link>
    </div>
  </section>

  <section v-else class="container mx-auto px-4 py-10">
    <p>Panduan tidak ditemukan.</p>
    <router-link to="/guide" class="underline">Kembali ke daftar panduan</router-link>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import raw from '@/assets/content/guides.json';
import type { CoffeeGuides, GuideEntry } from '@/content/guides.ts';

const route = useRoute();
const data = raw as CoffeeGuides;

const entry = computed<GuideEntry | null>(() => {
  const key = route.params.key as keyof CoffeeGuides['guides'];
  return (data.guides[key] ?? null) as GuideEntry | null;
});
</script>
<template>
  <section class="container mx-auto px-4 py-10" v-if="recipe">
    <div class="grid md:grid-cols-3 gap-6">
      <div class="md:col-span-2">
        <img :src="recipe.image" alt="" loading="lazy" class="rounded-lg h-64 w-full object-cover mb-4" />
        <h1 class="text-3xl font-bold mb-2">{{ recipe.title }}</h1>
        <p class="text-stone-700 mb-4">{{ recipe.desc }}</p>

        <h2 class="text-xl font-semibold mb-2">Bahan</h2>
        <ul class="list-disc pl-5 text-stone-700 mb-6">
          <li v-for="(ing, i) in recipe.ingredients" :key="i">{{ ing }}</li>
        </ul>

        <h2 class="text-xl font-semibold mb-2">Langkah</h2>
        <ol class="list-decimal pl-5 text-stone-700 space-y-2 mb-6">
          <li v-for="(s, i) in recipe.steps" :key="i">{{ s }}</li>
        </ol>

        <div v-if="recipe.notes" class="bg-stone-50 border rounded p-3 text-sm text-stone-700">
          <strong>Catatan:</strong> {{ recipe.notes }}
        </div>

        <div class="mt-6">
          <router-link to="/recipes" class="px-4 py-2 rounded border hover:bg-stone-100">Kembali ke Resep</router-link>
        </div>
      </div>

      <aside class="bg-white border rounded-lg p-4 shadow-sm">
        <h3 class="font-semibold mb-2">Quick tips</h3>
        <p class="text-sm text-stone-700">Tips singkat: cek catatan pada resep. Untuk tips lebih lengkap, kunjungi panduan terkait di halaman Panduan.</p>
        <div class="mt-4">
          <router-link to="/guide" class="text-sm underline">Lihat Panduan Lengkap</router-link>
        </div>
      </aside>
    </div>
  </section>

  <section v-else class="container mx-auto px-4 py-10">
    <p>Resep tidak ditemukan.</p>
    <router-link to="/recipes" class="underline">Kembali ke daftar resep</router-link>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { recipeList } from '@/content/recipes';

const route = useRoute();
const recipe = computed(() => {
  const id = route.params.id as string;
  return recipeList.find(r => r.id === id) ?? null;
});
</script>
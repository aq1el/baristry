<template>
  <section class="container mx-auto px-4 py-10">
    <h2 class="text-2xl font-bold mb-4">Kursus</h2>

    <div class="mb-4 flex gap-2">
      <button class="px-3 py-1 border rounded" :class="btnClass('all')" @click="filter='all'">Semua</button>
      <button class="px-3 py-1 border rounded" :class="btnClass('free')" @click="filter='free'">Gratis</button>
      <button class="px-3 py-1 border rounded" :class="btnClass('premium')" @click="filter='premium'">Premium</button>
    </div>

    <!-- Skeleton saat loading -->
    <div v-if="loading" class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <div v-for="i in 6" :key="i" class="border rounded-lg p-4 bg-white animate-pulse">
        <div class="h-36 bg-stone-200 rounded mb-3"></div>
        <div class="h-4 bg-stone-200 rounded w-2/3 mb-2"></div>
        <div class="h-3 bg-stone-200 rounded w-3/4 mb-1"></div>
        <div class="h-3 bg-stone-200 rounded w-1/2"></div>
      </div>
    </div>

    <template v-else-if="filtered.length">
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <CourseCard v-for="c in filtered" :key="c.id" :course="c" />
      </div>
    </template>

    <template v-else>
      <div class="text-center text-stone-600 py-16">
        <div class="mx-auto w-20 h-20 rounded-full bg-stone-100 flex items-center justify-center mb-4">
          <span class="text-2xl">☕</span>
        </div>
        <p class="mb-3">Tidak ada kursus ditemukan untuk filter ini.</p>
        <button class="px-3 py-1 border rounded" @click="filter='all'">Reset Filter</button>
      </div>
    </template>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { courses } from '@/services/mockData';
import CourseCard from '@/components/CourseCard.vue';

const loading = ref(true);
const filter = ref<'all'|'free'|'premium'>('all');

onMounted(async () => {
  // Simulasi loading kecil biar skeleton terlihat
  await new Promise(r => setTimeout(r, 300));
  loading.value = false;
});

const filtered = computed(() => {
  switch (filter.value) {
    case 'free': return courses.filter(c => !c.isPremium);
    case 'premium': return courses.filter(c => c.isPremium);
    default: return courses;
  }
});

function btnClass(name: 'all'|'free'|'premium') {
  const active = filter.value === name;
  return active ? 'bg-stone-900 text-white' : 'hover:bg-stone-100';
}
</script>
<template>
  <section>
    <h2 class="text-2xl font-bold mb-4">Courses</h2>

    <div class="mb-4 flex gap-2">
      <button class="px-3 py-1 border rounded" @click="filter='all'">Semua</button>
      <button class="px-3 py-1 border rounded" @click="filter='free'">Gratis</button>
      <button class="px-3 py-1 border rounded" @click="filter='premium'">Premium</button>
    </div>

    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <CourseCard v-for="c in filtered" :key="c.id" :course="c" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { courses } from '@/services/mockData';
import CourseCard from '@/components/CourseCard.vue';

const filter = ref<'all'|'free'|'premium'>('all');
const filtered = computed(() => {
  switch (filter.value) {
    case 'free':
      return courses.filter(c => !c.isPremium);
    case 'premium':
      return courses.filter(c => c.isPremium);
    default:
      return courses;
  }
});
</script>
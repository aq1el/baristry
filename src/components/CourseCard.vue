<template>
  <article class="border rounded-lg p-4 bg-white shadow-sm flex flex-col gap-2">
    <img :src="course.image" alt="" loading="lazy" class="rounded mb-2 h-36 object-cover" />
    <div class="flex items-center justify-between">
      <h3 class="font-semibold text-lg">{{ course.title }}</h3>
      <span
        class="text-xs px-2 py-1 rounded"
        :class="course.isPremium ? 'bg-amber-200 text-amber-900' : 'bg-green-200 text-green-900'"
      >
        {{ course.isPremium ? 'Premium' : 'Gratis' }}
      </span>
    </div>
    <p class="text-sm text-stone-600">{{ course.shortDesc }}</p>

    <div class="flex items-center gap-2 text-xs text-stone-600">
      <span class="px-2 py-0.5 rounded bg-stone-100 uppercase tracking-wide">{{ course.level }}</span>
      <span class="px-2 py-0.5 rounded bg-stone-100 capitalize">{{ course.category.replace('_',' ') }}</span>
    </div>

    <router-link
      :to="`/courses/${course.id}`"
      class="inline-block mt-2 px-3 py-2 bg-stone-900 text-white text-sm rounded hover:bg-stone-700"
    >
      Detail
    </router-link>
  </article>
</template>

<script setup lang="ts">
import type { Course } from '@/services/mockData';
defineProps<{ course: Course }>();
</script>
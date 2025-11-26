<template>
  <article class="border rounded p-4 bg-white shadow-sm flex flex-col gap-2">
    <h3 class="font-semibold text-lg">
      {{ course.title }}
      <span
        class="ml-2 text-xs px-2 py-1 rounded"
        :class="course.isPremium ? 'bg-amber-200 text-amber-900' : 'bg-green-200 text-green-900'"
      >
        {{ course.isPremium ? 'Premium' : 'Free' }}
      </span>
    </h3>
    <p class="text-sm text-stone-600">{{ course.shortDesc }}</p>
    <div class="text-xs flex justify-between">
      <span class="uppercase tracking-wide">{{ course.level }}</span>
      <span class="capitalize">{{ course.category.replace('_',' ') }}</span>
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
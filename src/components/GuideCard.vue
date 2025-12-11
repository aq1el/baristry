<template>
  <article class="bg-[#D9E087] rounded-xl p-4 shadow-md flex gap-4 items-start">
    <img :src="image" alt="" loading="lazy" class="w-16 h-16 rounded-full object-cover" />
    <div class="flex-1">
      <h3 class="font-semibold mb-1">{{ title }}</h3>
      <p class="text-stone-700 text-sm mb-3">{{ desc }}</p>

      <!-- If 'to' provided, use router-link. Otherwise, a simple button (no handler). -->
      <router-link
        v-if="to"
        :to="to"
        class="px-3 py-1 rounded-full bg-stone-900 text-white text-sm hover:bg-stone-700 inline-block"
      >
        {{ cta ?? 'Lihat' }}
      </router-link>

      <button
        v-else
        type="button"
        class="px-3 py-1 rounded-full bg-stone-900 text-white text-sm hover:bg-stone-700 inline-block"
      >
        {{ cta ?? 'Lihat' }}
      </button>
    </div>
  </article>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  desc: string;
  image: string;
  cta?: string;
  to?: string | Record<string, any>;
}>();
</script>A
<template>
  <section class="container mx-auto px-4 py-10">
    <h2 class="text-xl font-bold mb-2 text-center">Kata Mereka Tentang BarisTry</h2>
    <div class="grid md:grid-cols-3 gap-4">
      <article v-for="t in items" :key="t.name" class="bg-white border rounded-lg p-4 shadow-sm">
        <div class="flex items-center gap-3 mb-2">
          <img :src="t.avatar" alt="" class="w-10 h-10 rounded-full object-cover" />
          <div>
            <div class="font-medium">{{ t.name }}</div>
            <div class="text-xs text-stone-500">{{ t.role }}</div>
          </div>
        </div>
        <p class="text-stone-700 text-sm">“{{ t.text }}”</p>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
type Testi = { name: string; role: string; text: string; avatar: string };
defineProps<{ items: Testi[] }>();
</script>
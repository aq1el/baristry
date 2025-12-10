<template>
  <section class="container mx-auto px-4 py-10">
    <h2 class="text-xl font-bold mb-2 text-center">Program Pembelajaran</h2>
    <p class="text-stone-600 text-center mb-6">Pilih program yang sesuai dengan tujuanmu: dari basic hingga pro.</p>
    <div class="grid md:grid-cols-3 gap-4">
      <article v-for="p in programs" :key="p.title" class="bg-white border rounded-lg p-4 shadow-sm flex flex-col">
        <img :src="p.image" alt="" class="rounded mb-3 h-36 object-cover" />
        <div class="flex-1">
          <h3 class="font-semibold mb-1">
            {{ p.title }}
            <span
              class="ml-2 text-xs px-2 py-1 rounded"
              :class="p.isPremium ? 'bg-amber-200 text-amber-900' : 'bg-green-200 text-green-900'"
            >
              {{ p.isPremium ? 'Premium' : 'Gratis' }}
            </span>
          </h3>
          <p class="text-stone-600 text-sm mb-3">{{ p.desc }}</p>
        </div>
        <router-link
          :to="p.to"
          class="mt-auto inline-block px-3 py-2 bg-stone-900 text-white text-sm rounded hover:bg-stone-700"
        >
          Lihat Detail
        </router-link>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
type ProgramCard = { title: string; desc: string; image: string; isPremium?: boolean; to: string };
defineProps<{ programs: ProgramCard[] }>();
</script>
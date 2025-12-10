<template>
  <section class="container mx-auto px-4 py-10" v-if="course">
    <div class="grid md:grid-cols-3 gap-6">
      <div class="md:col-span-2">
        <img :src="course.image" alt="" class="rounded-lg h-64 w-full object-cover mb-4" />
        <h1 class="text-3xl font-bold mb-2">{{ course.title }}</h1>
        <p class="text-stone-700 mb-4">{{ course.shortDesc }}</p>

        <div class="flex items-center gap-2 text-xs text-stone-600 mb-6">
          <span class="px-2 py-0.5 rounded bg-stone-100 uppercase tracking-wide">{{ course.level }}</span>
          <span class="px-2 py-0.5 rounded bg-stone-100 capitalize">{{ course.category.replace('_',' ') }}</span>
          <span class="px-2 py-0.5 rounded bg-stone-100">Durasi: ~3 jam</span>
        </div>

        <h2 class="text-xl font-semibold mb-2">Outline Materi</h2>
        <ul class="list-disc pl-5 space-y-1 text-stone-700 mb-6">
          <li>Pengenalan alat dan keselamatan kerja</li>
          <li>Dasar ekstraksi espresso (rasio, grind size, waktu)</li>
          <li>Teknik steaming dan microfoam</li>
          <li>Latte art dasar: heart, tulip</li>
          <li>Perawatan mesin dan kebersihan</li>
        </ul>

        <div class="flex gap-3">
          <button class="px-4 py-2 rounded bg-stone-900 text-white hover:bg-stone-700">Mulai</button>
          <router-link to="/courses" class="px-4 py-2 rounded border hover:bg-stone-100">Kembali</router-link>
        </div>
      </div>

      <aside class="bg-white border rounded-lg p-4 shadow-sm">
        <div class="flex items-center justify-between mb-2">
          <span class="text-sm text-stone-600">Akses</span>
          <span
            class="text-xs px-2 py-1 rounded"
            :class="course.isPremium ? 'bg-amber-200 text-amber-900' : 'bg-green-200 text-green-900'"
          >
            {{ course.isPremium ? 'Premium' : 'Gratis' }}
          </span>
        </div>
        <p class="text-stone-700 text-sm mb-4">
          {{ course.isPremium
            ? 'Kursus ini memerlukan akun Premium untuk mengakses materi penuh.'
            : 'Kursus ini gratis. Kamu bisa mulai belajar sekarang.' }}
        </p>
        <div v-if="needGate" class="bg-stone-50 border rounded p-3">
          <p class="text-sm mb-2">Akses dibatasi. Silakan login atau upgrade Premium.</p>
          <div class="flex gap-2">
            <button class="px-3 py-2 rounded border hover:bg-stone-100" @click="goLogin">Login</button>
            <button class="px-3 py-2 rounded bg-amber-600 text-white hover:bg-amber-700" @click="upgrade">Upgrade</button>
          </div>
        </div>
      </aside>
    </div>
  </section>
  <section v-else class="container mx-auto px-4 py-10">
    <p>Course tidak ditemukan.</p>
    <router-link to="/courses" class="underline">Kembali ke daftar</router-link>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { courses } from '@/services/mockData';
import { useAuthStore } from '@/stores/auth';
import { useUiStore } from '@/stores/ui';

const route = useRoute();
const auth = useAuthStore();
const ui = useUiStore();

const course = computed(() => courses.find(c => c.id === route.params.id));
const needGate = computed(() => course.value?.isPremium && !(auth.isLoggedIn && auth.isPremium));

function goLogin() {
  ui.openLogin(route.fullPath);
}
function upgrade() {
  if (!auth.isLoggedIn) {
    ui.openLogin(route.fullPath);
    return;
  }
  auth.upgrade();
}
</script>
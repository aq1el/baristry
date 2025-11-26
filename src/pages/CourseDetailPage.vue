<template>
  <section v-if="course">
    <h2 class="text-2xl font-bold mb-2">{{ course.title }}</h2>
    <p class="text-stone-600 mb-4">{{ course.shortDesc }}</p>

    <div class="relative">
      <!-- Konten course (dummy) -->
      <div :class="needGate ? 'blur-sm select-none pointer-events-none' : ''">
        <p class="mb-2">Level: {{ course.level }}</p>
        <p class="mb-4">Kategori: {{ course.category }}</p>
        <div class="aspect-video bg-stone-200 flex items-center justify-center rounded">
          <span class="text-stone-600">Video/Material Course</span>
        </div>
      </div>

      <!-- Gate modal overlay -->
      <div
        v-if="needGate"
        class="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center rounded"
      >
        <div class="bg-white border rounded p-5 max-w-sm text-center">
          <p class="font-medium mb-2">Konten Premium</p>
          <p class="text-sm text-stone-600 mb-4">
            {{ auth.isLoggedIn ? 'Upgrade ke Premium untuk membuka materi ini.' : 'Silakan login terlebih dahulu.' }}
          </p>
          <div class="flex gap-2 justify-center">
            <button
              v-if="!auth.isLoggedIn"
              class="px-3 py-2 border rounded"
              @click="goLogin"
            >
              Login
            </button>
            <button
              v-if="auth.isLoggedIn && !auth.isPremium"
              class="px-3 py-2 bg-amber-500 text-white rounded hover:bg-amber-600"
              @click="auth.upgrade()"
            >
              Upgrade Premium
            </button>
            <router-link to="/courses" class="px-3 py-2 border rounded">Kembali</router-link>
          </div>
        </div>
      </div>
    </div>

    <router-link to="/courses" class="inline-block mt-4 text-sm text-blue-600 underline">Kembali ke daftar</router-link>
  </section>

  <section v-else>
    <p>Course tidak ditemukan.</p>
    <router-link to="/courses" class="text-sm text-blue-600 underline">Kembali ke daftar</router-link>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { courses } from '@/services/mockData';
import { useAuthStore } from '@/stores/auth';

const route = useRoute();
const router = useRouter();
const auth = useAuthStore();

const course = computed(() => courses.find(c => c.id === route.params.id));
const needGate = computed(() => course.value?.isPremium && !auth.isPremium);

function goLogin() {
  router.push({ name: 'login', query: { redirect: route.fullPath } });
}
</script>
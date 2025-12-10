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

    <div v-if="course.lessons?.length" class="mt-8">
      <h2 class="text-xl font-semibold mb-3">Modul yang Dipelajari</h2>
      <div class="space-y-4">
        <div
          v-for="ls in course.lessons"
          :key="ls.key"
          class="border rounded-lg p-4 bg-white shadow-sm"
        >
          <div class="flex items-center justify-between mb-1">
            <h3 class="font-semibold">{{ ls.title }}</h3>
            <router-link
              :to="{ name: 'guide-detail', params: { key: ls.key } }"
              class="text-sm underline text-blue-600"
            >
              Lihat detail
            </router-link>
          </div>
          <p v-if="guide(ls.key)?.objective" class="text-stone-700 text-sm">
            {{ guide(ls.key)?.objective }}
          </p>

          <div class="mt-2 grid md:grid-cols-2 gap-4">
            <div v-if="guide(ls.key)?.steps?.length">
              <h4 class="font-medium text-sm mb-1">Langkah inti</h4>
              <ol class="list-decimal pl-5 text-sm text-stone-700 space-y-1">
                <li v-for="(s,i) in (guide(ls.key)?.steps || []).slice(0,4)" :key="i">{{ s }}</li>
              </ol>
            </div>
            <div v-if="guide(ls.key)?.equipment?.length">
              <h4 class="font-medium text-sm mb-1">Peralatan</h4>
              <ul class="list-disc pl-5 text-sm text-stone-700">
                <li v-for="it in (guide(ls.key)?.equipment || [])" :key="it">{{ it }}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
      </div>
      <div class="md:col-span-1">
        <div class="border rounded-lg p-6 bg-white shadow-md sticky top-20">
          <div class="mb-4">
            <span class="text-2xl font-bold text-green-600" v-if="course.isPremium">Premium Course</span>
            <span class="text-2xl font-bold text-stone-800" v-else>Free Course</span>
          </div>
          <button
            v-if="needGate"
            @click="course.isPremium ? upgrade() : goLogin()"
            class="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
          >
            {{ course.isPremium ? (auth.isLoggedIn ? 'Upgrade to Premium' : 'Login to Upgrade') : 'Start Course' }}
          </button>
          <router-link
            v-else
            v-if="course.lessons?.length"
            :to="{ name: 'guide-detail', params: { key: course.lessons[0].key } }"
            class="w-full block text-center bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition"
          >
            Mulai Course
          </router-link>
        </div>
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
import { getGuide as guide } from '@/content/guides';

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
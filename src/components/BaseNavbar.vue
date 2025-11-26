<template>
  <header class="border-b bg-white">
    <nav class="container mx-auto px-4 py-3 flex items-center justify-between">
      <router-link to="/" class="font-bold">BarisTry</router-link>
      <ul class="flex items-center gap-4">
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/about">About</router-link></li>
        <li><router-link to="/courses">Courses</router-link></li>
        <li><router-link to="/chat">Chat</router-link></li>
        <li><router-link to="/contact">Contact</router-link></li>

        <li class="ml-2 h-5 w-px bg-stone-300" />

        <template v-if="auth.isLoggedIn">
          <li class="text-sm text-stone-700">
            Hi, <span class="font-medium">{{ auth.user?.name }}</span>
            <span
              class="ml-2 px-2 py-0.5 rounded text-xs"
              :class="auth.isPremium ? 'bg-amber-200 text-amber-900' : 'bg-stone-200 text-stone-700'"
            >
              {{ auth.isPremium ? 'Premium' : 'Free' }}
            </span>
          </li>
          <li v-if="!auth.isPremium">
            <button
              class="px-3 py-1 rounded bg-amber-500 text-white hover:bg-amber-600 text-sm"
              @click="onUpgrade"
            >
              Upgrade
            </button>
          </li>
          <li>
            <button class="text-sm underline text-stone-600" @click="auth.logout()">Logout</button>
          </li>
        </template>
        <template v-else>
          <li><router-link to="/login">Login</router-link></li>
        </template>
      </ul>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';

const auth = useAuthStore();
const router = useRouter();

function onUpgrade() {
  if (!auth.isLoggedIn) {
    router.push({ name: 'login', query: { redirect: router.currentRoute.value.fullPath } });
    return;
  }
  auth.upgrade();
}
</script>
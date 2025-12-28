<template>
  <header class="bg-white border-b">
    <nav class="container mx-auto px-4 py-3 flex items-center justify-between">
      <router-link to="/" class="font-bold text-lg">BarisTry</router-link>
      <ul class="flex items-center gap-4">
        <li><router-link to="/">Beranda</router-link></li>
        <li><router-link to="/guide">Panduan</router-link></li>
        <li><router-link to="/recipes">Resep</router-link></li>
        <li><router-link to="/tools">Peralatan</router-link></li>
        <li><router-link to="/courses">Kursus</router-link></li>

        <li class="ml-2 h-5 w-px bg-stone-300" />
        <li>
          <router-link to="/courses" class="px-3 py-1 rounded bg-amber-700 text-white hover:bg-amber-800">
            Mulai Belajar
          </router-link>
        </li>

        <li class="ml-2 h-5 w-px bg-stone-300" />
        <template v-if="!auth.isLoggedIn">
          <li><button class="text-sm underline text-stone-600" @click="ui.openLogin()">Login</button></li>
          <li><button class="text-sm underline text-stone-600" @click="ui.openRegister()">Sign Up</button></li>
        </template>
        <template v-else>
          <li class="text-sm text-stone-700">
            Hi, <span class="font-medium">{{ auth.profile?.name || auth.user?.email }}</span>
            <span class="ml-2 px-2 py-0.5 rounded text-xs" :class="auth.isPremium ? 'bg-amber-200 text-amber-900' : 'bg-stone-200 text-stone-700'">
              {{ auth.isPremium ? 'Premium' : 'Free' }}
              <span v-if="auth.isPremium" class="badge-premium">⭐ Premium </span>
              <button v-else class="px-3 py-1 rounded bg-amber-500 text-white hover:bg-amber-600 text-sm" @click="openUpgrade"> Upgrade Premium </button>
                <button class="text-sm underline text-stone-600" @click="auth.signOut()">Logout</button>
            </span>
          </li>
          <li v-if="!auth.isPremium">
            <button class="px-3 py-1 rounded bg-amber-500 text-white hover:bg-amber-600 text-sm" @click="onUpgrade">Upgrade</button>
          </li>
          <li><button class="text-sm underline text-stone-600" @click="auth.signOut()">Logout</button></li>
        </template>
      </ul>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';
import { useUiStore } from '@/stores/ui';

const auth = useAuthStore();
const router = useRouter();
const ui = useUiStore();

function openLogin() {
  ui.openLogin(router.currentRoute.value.fullPath);
}
function openRegister() {
  ui.openRegister(router.currentRoute.value.fullPath);
}
function onUpgrade() {
  if (!auth.isLoggedIn) {
    ui.openLogin(router.currentRoute.value.fullPath);
    return;
  }
  auth.upgrade();
}
</script>
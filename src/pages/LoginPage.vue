<template>
  <section class="max-w-md mx-auto">
    <h2 class="text-2xl font-bold mb-4">Login</h2>
    <form @submit.prevent="submit" class="space-y-3">
      <div>
        <label class="block text-sm mb-1">Nama</label>
        <input
          v-model="name"
          type="text"
          class="w-full border rounded px-3 py-2"
          placeholder="Tulis nama"
          required
        />
      </div>
      <button class="px-4 py-2 bg-stone-900 text-white rounded hover:bg-stone-700">Masuk</button>
    </form>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useRoute, useRouter } from 'vue-router';

const name = ref('');
const auth = useAuthStore();
const route = useRoute();
const router = useRouter();

function submit() {
  auth.login(name.value.trim());
  const redirect = (route.query.redirect as string) || '/';
  router.push(redirect);
}
</script>
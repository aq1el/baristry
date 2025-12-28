<template>
  <div class="min-h-screen flex flex-col">
    <BaseNavbar />
    <main class="container mx-auto px-4 py-6 flex-1">
      <router-view />
    </main>
    <BaseFooter />
    <AuthModal />
  </div>
</template>

<script setup lang="ts">
import BaseNavbar from '@/components/BaseNavbar.vue';
import BaseFooter from '@/components/BaseFooter.vue';
import AuthModal from '@/components/AuthModal.vue';
import { onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth';

const auth = useAuthStore();

onMounted(() => {
  auth.hydrate();
});
</script>
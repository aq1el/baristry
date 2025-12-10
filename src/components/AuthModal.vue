<template>
  <Teleport to="body">
    <div
      v-if="ui.authModal.open"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      @click.self="close"
      @keydown.esc="close"
    >
      <div class="bg-white rounded-2xl shadow-xl w-[92%] max-w-md p-6 relative">
        <div class="flex flex-col items-center mb-4">
          <div class="w-14 h-14 rounded-full bg-[#8B4D20] flex items-center justify-center text-white text-2xl">☕</div>
          <div class="mt-2 text-stone-800 font-medium">BarisTry</div>
        </div>

        <h2 class="text-3xl font-bold text-center mb-6">
          {{ ui.authModal.mode === 'login' ? 'Login' : 'Sign Up' }}
        </h2>

        <form class="space-y-4" @submit.prevent="submit">
          <div>
            <label class="block text-sm mb-1">username or email</label>
            <div class="bg-[#8B4D20] rounded-full p-2">
              <input
                v-model.trim="username"
                type="text"
                class="w-full rounded-full px-4 py-2 outline-none"
                placeholder="Please enter your username"
              />
            </div>
            <p v-if="errors.username" class="text-red-600 text-sm mt-1">{{ errors.username }}</p>
          </div>

          <div>
            <label class="block text-sm mb-1">password</label>
            <div class="bg-[#8B4D20] rounded-full p-2">
              <input
                v-model.trim="password"
                type="password"
                class="w-full rounded-full px-4 py-2 outline-none"
                placeholder="Please enter your password"
              />
            </div>
            <p v-if="errors.password" class="text-red-600 text-sm mt-1">{{ errors.password }}</p>
          </div>

          <label class="flex items-center gap-2 text-sm text-stone-700">
            <input type="checkbox" v-model="remember" />
            Remember me
          </label>

          <button
            class="w-full mt-2 px-4 py-2 rounded-full bg-[#8B4D20] text-white hover:brightness-95 disabled:opacity-60"
            :disabled="submitting"
          >
            {{ submitting ? 'Processing...' : (ui.authModal.mode === 'login' ? 'Login' : 'Sign Up') }}
          </button>
        </form>

        <p class="mt-3 text-center text-stone-700">
          <template v-if="ui.authModal.mode === 'login'">
            Don’t have an account?
            <button class="text-blue-600 underline" @click="ui.openRegister(ui.authModal.redirect || undefined)">Sign up</button>
          </template>
          <template v-else>
            Already have an account?
            <button class="text-blue-600 underline" @click="ui.openLogin(ui.authModal.redirect || undefined)">Login</button>
          </template>
        </p>

        <button
          class="absolute top-3 right-3 text-stone-500 hover:text-stone-700"
          @click="close"
          aria-label="Close"
        >
          ✕
        </button>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useUiStore } from '@/stores/ui';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';

const ui = useUiStore();
const auth = useAuthStore();
const router = useRouter();

const username = ref('');
const password = ref('');
const submitting = ref(false);
const remember = ref(true);
const errors = ref<{ username?: string; password?: string }>({});

function validate() {
  errors.value = {};
  if (!username.value) errors.value.username = 'Username/email wajib diisi.';
  if (!password.value) errors.value.password = 'Password wajib diisi.';
  return !errors.value.username && !errors.value.password;
}

async function submit() {
  if (!validate()) return;
  submitting.value = true;
  await new Promise(r => setTimeout(r, 400));

  const displayName = username.value.includes('@') ? username.value.split('@')[0] : username.value;
  auth.login(displayName);

  try {
    localStorage.setItem('baristry_auth_remember', remember.value ? '1' : '0');
  } catch {}

  submitting.value = false;
  const redirect = ui.authModal.redirect || '/';
  ui.closeAuth();

  // Guard: only navigate if target differs
  const current = router.currentRoute.value.fullPath;
  if (redirect && redirect !== current) {
    router.push(redirect);
  }
}
function close() {
  ui.closeAuth();
}
</script>
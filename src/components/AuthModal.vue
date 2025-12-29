<template>
  <Teleport to="body">
    <div
      v-if="ui.authModal.open"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      @click.self="close"
    >
      <div
        class="bg-white rounded-2xl shadow-xl w-[92%] max-w-md p-6 relative outline-none"
        tabindex="0"
        @keydown.esc="close"
      >
        <div class="flex flex-col items-center mb-4">
          <div class="w-14 h-14 rounded-full bg-[#8B4D20] flex items-center justify-center text-white text-2xl">☕</div>
          <div class="mt-2 text-stone-800 font-medium">BarisTry</div>
        </div>

        <h2 class="text-3xl font-bold text-center mb-2">
          {{ ui.authModal.mode === 'login' ? 'Login' : 'Sign Up' }}
        </h2>
        <p class="text-center text-stone-600 text-sm mb-6">
          {{ ui.authModal.mode === 'login' ? 'Masuk untuk melanjutkan belajar.' : 'Buat akun baru untuk mulai belajar.' }}
        </p>

        <form class="space-y-4" @submit.prevent="submit">
          <!-- Nama (hanya register) -->
          <div v-if="ui.authModal.mode === 'register'">
            <label class="block text-sm font-medium text-stone-700">Nama</label>
            <input
              v-model="name"
              type="text"
              class="mt-1 w-full rounded-xl border border-stone-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#8B4D20]/40"
              placeholder="Nama lengkap"
              autocomplete="name"
            />
            <p v-if="errors.name" class="mt-1 text-xs text-red-600">{{ errors.name }}</p>
          </div>

          <!-- Email -->
          <div>
            <label class="block text-sm font-medium text-stone-700">Email</label>
            <input
              v-model="email"
              type="email"
              class="mt-1 w-full rounded-xl border border-stone-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#8B4D20]/40"
              placeholder="contoh@email.com"
              autocomplete="email"
            />
            <p v-if="errors.email" class="mt-1 text-xs text-red-600">{{ errors.email }}</p>
          </div>

          <!-- Password -->
          <div>
            <label class="block text-sm font-medium text-stone-700">Password</label>
            <input
              v-model="password"
              type="password"
              class="mt-1 w-full rounded-xl border border-stone-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#8B4D20]/40"
              placeholder="Minimal 6 karakter"
              :autocomplete="ui.authModal.mode === 'login' ? 'current-password' : 'new-password'"
            />
            <p v-if="errors.password" class="mt-1 text-xs text-red-600">{{ errors.password }}</p>
          </div>

          <!-- Notice error/success -->
          <p v-if="notice" class="text-center text-sm" :class="noticeType === 'ok' ? 'text-green-700' : 'text-red-600'">
            {{ notice }}
          </p>

          <button
            type="submit"
            :disabled="submitting"
            class="w-full rounded-xl bg-[#8B4D20] px-4 py-2 text-sm font-semibold text-white hover:opacity-95 disabled:opacity-60"
          >
            {{ submitting ? 'Memproses...' : (ui.authModal.mode === 'login' ? 'Login' : 'Buat Akun') }}
          </button>
        </form>

        <div class="mt-5 text-center text-sm text-stone-700">
          <span v-if="ui.authModal.mode === 'login'">
            Belum punya akun?
            <button class="font-semibold text-[#8B4D20] hover:underline" type="button" @click="ui.switchMode()">
              Sign Up
            </button>
          </span>
          <span v-else>
            Sudah punya akun?
            <button class="font-semibold text-[#8B4D20] hover:underline" type="button" @click="ui.switchMode()">
              Login
            </button>
          </span>
        </div>

        <button
          class="absolute top-3 right-3 w-9 h-9 rounded-full hover:bg-stone-100 flex items-center justify-center text-stone-700"
          @click="close"
          aria-label="Close"
          type="button"
        >
          ✕
        </button>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useUiStore } from '@/stores/ui';
import { useAuthStore } from '@/stores/auth';

const ui = useUiStore();
const auth = useAuthStore();
const router = useRouter();

const name = ref('');
const email = ref('');
const password = ref('');
const submitting = ref(false);

const notice = ref<string | null>(null);
const noticeType = ref<'ok' | 'err'>('err');

const errors = reactive<{ name?: string; email?: string; password?: string }>({});

function resetForm() {
  name.value = '';
  email.value = '';
  password.value = '';
  notice.value = null;
  noticeType.value = 'err';
  errors.name = undefined;
  errors.email = undefined;
  errors.password = undefined;
}

// reset setiap modal dibuka
watch(
  () => ui.authModal.open,
  (open) => {
    if (open) resetForm();
  }
);

function validate() {
  errors.name = undefined;
  errors.email = undefined;
  errors.password = undefined;

  if (ui.authModal.mode === 'register') {
    if (!name.value.trim()) errors.name = 'Nama wajib diisi.';
  }

  const e = email.value.trim().toLowerCase();
  if (!e) errors.email = 'Email wajib diisi.';
  else if (!e.includes('@')) errors.email = 'Email tidak valid.';

  if (!password.value) errors.password = 'Password wajib diisi.';
  else if (password.value.length < 6) errors.password = 'Password minimal 6 karakter.';

  return !errors.name && !errors.email && !errors.password;
}

async function submit() {
  if (!validate()) return;

  submitting.value = true;
  notice.value = null;
  noticeType.value = 'err';

  try {
    await auth.hydrate();

    const e = email.value.trim().toLowerCase();
    const p = password.value;

    if (ui.authModal.mode === 'login') {
      await auth.signIn(e, p);
      notice.value = 'Login berhasil.';
      noticeType.value = 'ok';
    } else {
      const res = await auth.signUp(e, p, name.value.trim());
      // Kalau email confirmation aktif, session bisa null sampai verifikasi
      if (!res?.session) {
        notice.value = 'Akun berhasil dibuat. Silakan cek email untuk verifikasi, lalu login.';
        noticeType.value = 'ok';
        submitting.value = false;
        return; // jangan auto close dulu
      }
      notice.value = 'Akun berhasil dibuat.';
      noticeType.value = 'ok';
    }

    const redirect = ui.authModal.redirect || '/';
    ui.closeAuth();

    const current = router.currentRoute.value.fullPath;
    if (redirect && redirect !== current) {
      router.push(redirect);
    }
  } catch (e: any) {
    notice.value = e?.message || 'Gagal memproses autentikasi.';
    noticeType.value = 'err';
  } finally {
    submitting.value = false;
  }
}

function close() {
  ui.closeAuth();
}
</script>

<template>
  <section class="max-w-xl mx-auto">
    <h2 class="text-2xl font-bold mb-4">Contact</h2>
    <p class="text-stone-600 mb-6">
      Kirim pertanyaan atau masukan kamu lewat form berikut. Data tidak benar-benar dikirim (simulasi).
    </p>

    <form class="space-y-4" @submit.prevent="onSubmit">
      <div>
        <label class="block text-sm mb-1">Nama</label>
        <input
          v-model.trim="form.name"
          type="text"
          class="w-full border rounded px-3 py-2"
          placeholder="Nama lengkap"
        />
        <p v-if="errors.name" class="text-red-600 text-sm mt-1">{{ errors.name }}</p>
      </div>

      <div>
        <label class="block text-sm mb-1">Email</label>
        <input
          v-model.trim="form.email"
          type="email"
          class="w-full border rounded px-3 py-2"
          placeholder="nama@contoh.com"
        />
        <p v-if="errors.email" class="text-red-600 text-sm mt-1">{{ errors.email }}</p>
      </div>

      <div>
        <label class="block text-sm mb-1">Pesan</label>
        <textarea
          v-model.trim="form.message"
          rows="5"
          class="w-full border rounded px-3 py-2"
          placeholder="Tulis pesanmu..."
        />
        <p v-if="errors.message" class="text-red-600 text-sm mt-1">{{ errors.message }}</p>
      </div>

      <div class="flex items-center justify-between">
        <button
          class="px-4 py-2 bg-stone-900 text-white rounded hover:bg-stone-700 disabled:opacity-60"
          :disabled="submitting"
        >
          {{ submitting ? 'Mengirim...' : 'Kirim Pesan' }}
        </button>
        <button type="button" class="px-3 py-2 border rounded" @click="clearDraft">Bersihkan</button>
      </div>
    </form>

    <div
      v-if="toast"
      class="mt-4 p-3 rounded border"
      :class="toast.type === 'success' ? 'bg-green-50 border-green-200 text-green-800' : 'bg-red-50 border-red-200 text-red-800'"
    >
      {{ toast.message }}
    </div>
  </section>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from 'vue';
import { isValidEmail } from '@/services/validators';

type ContactForm = { name: string; email: string; message: string };
type Errors = Partial<Record<keyof ContactForm, string>>;
type Toast = { type: 'success' | 'error'; message: string } | null;

const STORAGE_KEY = 'baristry_contact_draft_v1';

const form = reactive<ContactForm>(loadDraft());
const errors = reactive<Errors>({});
const submitting = ref(false);
const toast = ref<Toast>(null);

  function saveDraft() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(form));
    } catch {}
  }

  function loadDraft(): ContactForm {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as ContactForm;
  } catch {}
  return { name: '', email: '', message: '' };
}

function clearDraft() {
  form.name = '';
  form.email = '';
  form.message = '';
  saveDraft();
  toast.value = { type: 'success', message: 'Draft dibersihkan.' };
}

watch(form, saveDraft, { deep: true });

function validate(): boolean {
  errors.name = !form.name ? 'Nama wajib diisi.' : '';
  errors.email = !form.email
    ? 'Email wajib diisi.'
    : !isValidEmail(form.email)
      ? 'Format email tidak valid.'
      : '';
  errors.message = !form.message ? 'Pesan wajib diisi.' : '';

  return !errors.name && !errors.email && !errors.message;
}

async function onSubmit() {
  toast.value = null;

  if (!validate()) {
    toast.value = { type: 'error', message: 'Periksa kembali input yang belum valid.' };
    return;
  }

  submitting.value = true;

  // Simulasi submit ke server
  await new Promise((r) => setTimeout(r, 600));

  submitting.value = false;
  clearDraft();
  toast.value = { type: 'success', message: 'Pesan berhasil dikirim. Terima kasih!' };
}
</script>
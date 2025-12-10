<template>
  <section class="max-w-xl mx-auto">
    <h2 class="text-2xl font-bold mb-4">Contact</h2>
    <p class="text-stone-600 mb-6">
      Kirim pertanyaan atau masukan kamu lewat form berikut. Data tidak benar-benar dikirim (simulasi).
    </p>

    <form class="space-y-4" @submit.prevent="onSubmit" novalidate>
      <div>
        <label class="block text-sm mb-1" for="name">Nama</label>
        <input
          id="name"
          v-model.trim="form.name"
          type="text"
          class="w-full border rounded px-3 py-2"
          placeholder="Nama lengkap"
          autocomplete="name"
          :aria-invalid="!!errors.name"
          :aria-errormessage="errors.name ? 'err-name' : undefined"
          ref="nameRef"
        />
        <p v-if="errors.name" id="err-name" class="text-red-600 text-sm mt-1">{{ errors.name }}</p>
      </div>

      <div>
        <label class="block text-sm mb-1" for="email">Email</label>
        <input
          id="email"
          v-model.trim="form.email"
          type="email"
          class="w-full border rounded px-3 py-2"
          placeholder="nama@contoh.com"
          autocomplete="email"
          :aria-invalid="!!errors.email"
          :aria-errormessage="errors.email ? 'err-email' : undefined"
        />
        <p v-if="errors.email" id="err-email" class="text-red-600 text-sm mt-1">{{ errors.email }}</p>
      </div>

      <div>
        <label class="block text-sm mb-1" for="subject">Subjek</label>
        <input
          id="subject"
          v-model.trim="form.subject"
          type="text"
          class="w-full border rounded px-3 py-2"
          placeholder="Misal: Pertanyaan kursus premium"
          :aria-invalid="!!errors.subject"
          :aria-errormessage="errors.subject ? 'err-subject' : undefined"
          autocomplete="off"
        />
        <p v-if="errors.subject" id="err-subject" class="text-red-600 text-sm mt-1">{{ errors.subject }}</p>
      </div>

      <div>
        <label class="block text-sm mb-1" for="message">Pesan</label>
        <textarea
          id="message"
          v-model.trim="form.message"
          rows="5"
          class="w-full border rounded px-3 py-2"
          placeholder="Tulis pesanmu..."
          :aria-invalid="!!errors.message"
          :aria-errormessage="errors.message ? 'err-message' : undefined"
        />
        <p v-if="errors.message" id="err-message" class="text-red-600 text-sm mt-1">{{ errors.message }}</p>
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

    <!-- Success Modal -->
    <div
      v-if="modal.open"
      class="fixed inset-0 bg-black/30 flex items-center justify-center z-50"
      @keydown.esc="closeModal"
    >
      <div
        class="bg-white rounded shadow-lg max-w-md w-[92%] p-5"
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-success-title"
      >
        <h3 id="contact-success-title" class="text-lg font-semibold mb-2">Pesan Terkirim</h3>
        <p class="text-stone-700 mb-4">
          Terima kasih! Pesan kamu telah kami terima. Kami akan membalas via email.
        </p>
        <div class="flex gap-2 justify-end">
          <button class="px-3 py-2 border rounded" @click="closeModal">Tutup</button>
          <router-link to="/" class="px-3 py-2 bg-stone-900 text-white rounded hover:bg-stone-700">Kembali ke Home</router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { reactive, ref, watch, nextTick } from 'vue';
import { isValidEmail } from '@/services/validators';

type ContactForm = { name: string; email: string; subject: string; message: string };
type Errors = Partial<Record<keyof ContactForm, string>>;
type Toast = { type: 'success' | 'error'; message: string } | null;

const STORAGE_KEY = 'baristry_contact_draft_v2';

const nameRef = ref<HTMLInputElement | null>(null);

const form = reactive<ContactForm>(loadDraft());
const errors = reactive<Errors>({});
const submitting = ref(false);
const toast = ref<Toast>(null); // tetap ada kalau mau menampilkan notifikasi non-modal di masa depan

const modal = reactive({ open: false });

function loadDraft(): ContactForm {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as ContactForm;
  } catch {}
  return { name: '', email: '', subject: '', message: '' };
}

function saveDraft() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(form));
  } catch {}
}

function clearDraft() {
  form.name = '';
  form.email = '';
  form.subject = '';
  form.message = '';
  saveDraft();
  toast.value = { type: 'success', message: 'Draft dibersihkan.' };
}

watch(form, saveDraft, { deep: true });

// Autofocus name saat pertama render
nextTick(() => {
  nameRef.value?.focus();
});

function validate(): boolean {
  errors.name = !form.name ? 'Nama wajib diisi.' : '';
  errors.email = !form.email
    ? 'Email wajib diisi.'
    : !isValidEmail(form.email)
      ? 'Format email tidak valid.'
      : '';
  errors.subject = !form.subject ? 'Subjek wajib diisi.' : '';
  errors.message = !form.message ? 'Pesan wajib diisi.' : '';

  return !errors.name && !errors.email && !errors.subject && !errors.message;
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
  modal.open = true; // tampilkan modal sukses
  clearDraft();
}

function closeModal() {
  modal.open = false;
}
</script>
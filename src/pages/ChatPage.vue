<template>
  <section class="max-w-2xl mx-auto">
    <h2 class="text-2xl font-bold mb-4">Chat FAQ</h2>
    <p class="text-stone-600 mb-4">
      Tanyakan hal tentang BarisTry (upgrade, kursus gratis, contact, dll). Chat akan disimpan lokal di browser.
    </p>

    <div class="border rounded overflow-hidden">
      <!-- Messages -->
      <div class="h-[50vh] p-4 overflow-y-auto flex flex-col gap-3 bg-white">
        <ChatMessage
          v-for="m in messages"
          :key="m.id"
          :text="m.text"
          :isUser="m.role === 'user'"
          :time="m.time"
        />
      </div>

      <!-- Input -->
      <form class="p-3 border-t bg-stone-50 flex gap-2" @submit.prevent="send">
        <input
          v-model="input"
          type="text"
          class="flex-1 border rounded px-3 py-2"
          placeholder="Tulis pertanyaanmu..."
        />
        <button
          class="px-4 py-2 rounded bg-stone-900 text-white hover:bg-stone-700"
          :disabled="sending"
        >
          {{ sending ? 'Mengirim...' : 'Kirim' }}
        </button>
        <button
          type="button"
          class="px-3 py-2 border rounded"
          @click="clearChat"
        >
          Bersihkan
        </button>
      </form>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ChatMessage from '@/components/ChatMessage.vue';
import { findAnswer } from '@/services/faq';

type ChatItem = {
  id: string;
  role: 'user' | 'bot';
  text: string;
  time: string;
};

const STORAGE_KEY = 'baristry_chat_v1';

const messages = ref<ChatItem[]>(load());
const input = ref('');
const sending = ref(false);

function formatTime(date = new Date()) {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function uid() {
  return Math.random().toString(36).slice(2, 9);
}

function load(): ChatItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as ChatItem[];
  } catch {}
  // pesan awal
  return [
    {
      id: uid(),
      role: 'bot',
      text: 'Halo! Aku bot FAQ BarisTry. Tanyakan apa saja tentang kursus, premium, atau contact.',
      time: formatTime()
    }
  ];
}

function save() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages.value));
  } catch {}
}

async function send() {
  const text = input.value.trim();
  if (!text) return;

  sending.value = true;

  // push pesan user
  messages.value.push({
    id: uid(),
    role: 'user',
    text,
    time: formatTime()
  });
  save();
  input.value = '';

  // simulasi jeda bot
  await new Promise(r => setTimeout(r, 300));

  const answer = findAnswer(text);

  messages.value.push({
    id: uid(),
    role: 'bot',
    text: answer,
    time: formatTime()
  });
  save();

  sending.value = false;
}

function clearChat() {
  messages.value = [
    {
      id: uid(),
      role: 'bot',
      text: 'Chat dibersihkan. Silakan mulai lagi dengan pertanyaanmu.',
      time: formatTime()
    }
  ];
  save();
}
</script>
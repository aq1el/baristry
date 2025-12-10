<template>
  <section class="max-w-2xl mx-auto">
    <h2 class="text-2xl font-bold mb-2">Chat FAQ</h2>
    <p class="text-stone-600 mb-4">
      Klik pertanyaan cepat di bawah atau ketik pertanyaanmu. Chat disimpan lokal di browser.
    </p>

    <!-- FAQ Chips -->
    <div class="flex flex-wrap gap-2 mb-3">
      <button
        v-for="f in FAQ"
        :key="f.q"
        class="px-3 py-1 rounded border text-sm hover:bg-stone-100"
        @click="quickAsk(f.q)"
      >
        {{ f.q }}
      </button>
    </div>

    <div class="border rounded overflow-hidden">
      <!-- Messages -->
      <div ref="listRef" class="h-[50vh] p-4 overflow-y-auto flex flex-col gap-3 bg-white">
        <ChatMessage
          v-for="m in messages"
          :key="m.id"
          :text="m.text"
          :isUser="m.role === 'user'"
          :time="m.time"
        />
        <!-- typing indicator -->
        <div v-if="typing" class="flex items-center gap-2 text-stone-500 text-sm">
          <span class="inline-block w-2 h-2 rounded-full bg-stone-300 animate-bounce"></span>
          <span class="inline-block w-2 h-2 rounded-full bg-stone-300 animate-bounce [animation-delay:.1s]"></span>
          <span class="inline-block w-2 h-2 rounded-full bg-stone-300 animate-bounce [animation-delay:.2s]"></span>
          Bot sedang mengetik...
        </div>
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
          class="px-4 py-2 rounded bg-stone-900 text-white hover:bg-stone-700 disabled:opacity-60"
          :disabled="sending || !input.trim()"
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
import { ref, nextTick } from 'vue';
import ChatMessage from '@/components/ChatMessage.vue';
import { FAQ } from '@/services/faq';
import { chatEngine, type ChatHistoryItem } from '@/services/chatEngine';

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
const typing = ref(false);
const listRef = ref<HTMLDivElement | null>(null);

function scrollToBottom() {
  nextTick(() => {
    const el = listRef.value;
    if (el) el.scrollTop = el.scrollHeight;
  });
}

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
  return [
    {
      id: uid(),
      role: 'bot',
      text: 'Halo! Aku bot FAQ BarisTry. Klik pertanyaan di atas atau ketik pertanyaanmu.',
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

  // user message
  messages.value.push({
    id: uid(),
    role: 'user',
    text,
    time: formatTime()
  });
  save();
  input.value = '';
  scrollToBottom();

  // simulate delay + show typing
  typing.value = true;
  await new Promise(r => setTimeout(r, 350));

  // get answer via adapter
  const history: ChatHistoryItem[] = messages.value.map(m => ({ role: m.role, text: m.text }));
  const answer = await chatEngine.answer(text, history);

  messages.value.push({
    id: uid(),
    role: 'bot',
    text: answer,
    time: formatTime()
  });
  save();
  typing.value = false;
  sending.value = false;
  scrollToBottom();
}

function quickAsk(text: string) {
  input.value = text;
  void send();
}

function clearChat() {
  messages.value = [
    {
      id: uid(),
      role: 'bot',
      text: 'Chat dibersihkan. Mulai lagi dengan Klik FAQ atau ketik pertanyaanmu.',
      time: formatTime()
    }
  ];
  save();
  scrollToBottom();
}
</script>
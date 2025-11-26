<template>
  <div
    class="flex items-start gap-3"
    :class="isUser ? 'justify-end' : 'justify-start'"
  >
    <div
      class="max-w-[70%] rounded px-3 py-2 text-sm"
      :class="isUser ? 'bg-stone-900 text-white' : 'bg-stone-100 text-stone-800'"
    >
      <p class="whitespace-pre-wrap">{{ text }}</p>
      <div class="mt-1 text-[11px] opacity-70">
        {{ isUser ? 'You' : 'Bot' }} • {{ time }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  text: string;
  isUser?: boolean;
  time: string;
}>();
</script>
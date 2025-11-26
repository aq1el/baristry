<template>
  <div>
    <h2 class="text-2xl font-bold mb-3">Course Detail</h2>
    <p class="mb-2">ID: {{ $route.params.id }}</p>
    <router-link to="/courses" class="text-sm text-blue-600 underline">Kembali ke daftar</router-link>
  </div>
</template>
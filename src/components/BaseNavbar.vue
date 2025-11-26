<template>
  <header class="border-b bg-white">
    <nav class="container mx-auto px-4 py-3 flex items-center justify-between">
      <router-link to="/" class="font-bold">BarisTry</router-link>
      <ul class="flex gap-4">
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/about">About</router-link></li>
        <li><router-link to="/courses">Courses</router-link></li>
        <li><router-link to="/chat">Chat</router-link></li>
        <li><router-link to="/contact">Contact</router-link></li>
        <li><router-link to="/login">Login</router-link></li>
      </ul>
    </nav>
  </header>
</template>
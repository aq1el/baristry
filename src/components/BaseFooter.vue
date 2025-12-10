<template>
  <footer class="bg-stone-950 text-stone-200">
    <div class="container mx-auto px-4 py-10 grid md:grid-cols-4 gap-6">
      <div>
        <div class="font-bold mb-2">BarisTry</div>
        <p class="text-stone-400 text-sm">Platform pembelajaran barista di Indonesia dengan metode yang terbukti efektif.</p>
      </div>
      <div>
        <div class="font-semibold mb-2">Program</div>
        <ul class="space-y-1 text-sm">
          <li><router-link to="/courses">Dasar-Dasar Barista</router-link></li>
          <li><router-link to="/courses">Espresso & Latte Art</router-link></li>
          <li><router-link to="/courses">Barista Profesional</router-link></li>
          <li><router-link to="/courses">Sertifikasi</router-link></li>
        </ul>
      </div>
      <div>
        <div class="font-semibold mb-2">Sumber Daya</div>
        <ul class="space-y-1 text-sm">
          <li><router-link to="/guide">Panduan</router-link></li>
          <li><router-link to="/recipes">Resep</router-link></li>
          <li><router-link to="/tools">Peralatan</router-link></li>
          <li><router-link to="/chat">FAQ</router-link></li>
        </ul>
      </div>
      <div>
        <div class="font-semibold mb-2">Kontak</div>
        <ul class="space-y-1 text-sm">
          <li>info@baristry.com</li>
          <li>+62 821 1234 5678</li>
          <li>Jakarta, Indonesia</li>
        </ul>
      </div>
    </div>
    <div class="border-t border-stone-800 px-4 py-4 text-center text-stone-500 text-sm">
      © 2025 BarisTry. All rights reserved.
    </div>
  </footer>
</template>
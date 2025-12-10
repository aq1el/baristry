<template>
  <BaseHero image="/images/hero-coffee.jpg" />
  <FeatureCards :items="features" />
  <ProgramCards :programs="programs" />
  <Testimonials :items="testimonials" />
  <BigCTA />
</template>

<script setup lang="ts">
import BaseHero from '@/components/BaseHero.vue';
import FeatureCards from '@/components/FeatureCards.vue';
import ProgramCards from '@/components/ProgramCards.vue';
import Testimonials from '@/components/Testimonials.vue';
import BigCTA from '@/components/BigCTA.vue';

const features = [
  { icon: '📚', title: 'Pembelajaran Terstruktur', desc: 'Materi berurutan dari dasar ke lanjutan.' },
  { icon: '👨‍🏫', title: 'Mentor Berpengalaman', desc: 'Dibimbing praktisi barista profesional.' },
  { icon: '🎓', title: 'Sertifikasi Dasar', desc: 'Bukti kompetensi untuk karier barista.' }
];

const programs = [
  { title: 'Dasar-Dasar Barista', desc: 'Mulai dari teknik dasar espresso.', image: '/images/program1.jpg', to: '/courses', isPremium: false },
  { title: 'Espresso & Latte Art', desc: 'Kuasai microfoam dan latte art.', image: '/images/program2.jpg', to: '/courses', isPremium: false },
  { title: 'Barista Profesional', desc: 'Materi lanjutan untuk dunia kerja.', image: '/images/program3.jpg', to: '/courses', isPremium: true }
];

const testimonials = [
  { name: 'Andi', role: 'Barista', text: 'Materinya lengkap dan mudah diikuti.', avatar: '/images/avatar1.jpg' },
  { name: 'Sari', role: 'Coffee Enthusiast', text: 'Latte art saya naik level!', avatar: '/images/avatar2.jpg' },
  { name: 'Budi', role: 'Owner Coffee Shop', text: 'Tim saya jadi lebih kompeten.', avatar: '/images/avatar3.jpg' }
];
</script>
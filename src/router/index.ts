import HomePage from '@/pages/HomePage.vue';
import AboutPage from '@/pages/AboutPage.vue';
import CoursesPage from '@/pages/CoursesPage.vue';
import CourseDetailPage from '@/pages/CourseDetailPage.vue';
import ContactPage from '@/pages/ContactPage.vue';
import LoginPage from '@/pages/LoginPage.vue';
import ChatPage from '@/pages/ChatPage.vue';

import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: HomePage },
    { path: '/about', name: 'about', component: AboutPage },
    { path: '/courses', name: 'courses', component: CoursesPage },
    { path: '/courses/:id', name: 'course-detail', component: CourseDetailPage, props: true },
    { path: '/contact', name: 'contact', component: ContactPage },
    { path: '/login', name: 'login', component: LoginPage },
    { path: '/chat', name: 'chat', component: ChatPage }
  ]
});

export default router;
import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/pages/HomePage.vue';
import AboutPage from '@/pages/AboutPage.vue';
import GuidePage from '@/pages/GuidePage.vue';
import RecipesPage from '@/pages/RecipesPage.vue';
import ToolsPage from '@/pages/ToolsPage.vue';
import CoursesPage from '@/pages/CoursesPage.vue';
import CourseDetailPage from '@/pages/CourseDetailPage.vue';
import ContactPage from '@/pages/ContactPage.vue';
import ChatPage from '@/pages/ChatPage.vue';
// … import halaman lain yang sudah ada

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: HomePage },
    { path: '/about', name: 'about', component: AboutPage },
    { path: '/guide', name: 'guide', component: GuidePage },
    { path: '/recipes', name: 'recipes', component: RecipesPage },
    { path: '/tools', name: 'tools', component: ToolsPage },
    { path: '/courses', name: 'courses', component: CoursesPage },
    { path: '/courses/:id', name: 'course-detail', component: CourseDetailPage, props: true },
    { path: '/contact', name: 'contact', component: ContactPage },
    { path: '/chat', name: 'chat', component: ChatPage }
    // … existing: courses, course-detail, chat, contact, login
  ]
});
import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/pages/HomePage.vue';
import AboutPage from '@/pages/AboutPage.vue';
import GuidePage from '@/pages/GuidePage.vue';
import RecipesPage from '@/pages/RecipesPage.vue';
import ToolsPage from '@/pages/ToolsPage.vue';
import ToolDetailPage from '../pages/ToolDetailPage.vue';
import CoursesPage from '@/pages/CoursesPage.vue';
import CourseDetailPage from '@/pages/CourseDetailPage.vue';
import ContactPage from '@/pages/ContactPage.vue';
import ChatPage from '@/pages/ChatPage.vue';
import GuideDetailPage from '@/pages/GuideDetailPage.vue';
import RecipeDetailPage from '@/pages/RecipeDetailPage.vue'; // <-- added

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: HomePage },
    { path: '/about', name: 'about', component: AboutPage },
    { path: '/guide', name: 'guide', component: GuidePage },
    { path: '/recipes', name: 'recipes', component: RecipesPage },
    { path: '/recipes/:id', name: 'recipe-detail', component: RecipeDetailPage }, // <-- added
    { path: '/tools', name: 'tools', component: ToolsPage },
    { path: '/tools/:toolKey', name: 'tool-detail', component: ToolDetailPage, props: true,},
    { path: '/courses', name: 'courses', component: CoursesPage },
    { path: '/courses/:id', name: 'course-detail', component: CourseDetailPage, props: true },
    { path: '/contact', name: 'contact', component: ContactPage },
    { path: '/chat', name: 'chat', component: ChatPage },
    { path: '/guide/:key', name: 'guide-detail', component: GuideDetailPage }
  ]
});
import { createRouter, createWebHistory } from 'vue-router';

import HomePage from '@/pages/HomePage.vue';
import AboutPage from '@/pages/AboutPage.vue';
import GuidePage from '@/pages/GuidePage.vue';
import GuideDetailPage from '@/pages/GuideDetailPage.vue';

import RecipesPage from '@/pages/RecipesPage.vue';
import RecipeDetailPage from '@/pages/RecipeDetailPage.vue';

import ToolsPage from '@/pages/ToolsPage.vue';
import ToolDetailPage from '@/pages/ToolDetailPage.vue';

import CoursesPage from '@/pages/CoursesPage.vue';
import CourseDetailPage from '@/pages/CourseDetailPage.vue';

import ContactPage from '@/pages/ContactPage.vue';
import ChatPage from '@/pages/ChatPage.vue';

import { useAuthStore } from '@/stores/auth';
import { useUiStore } from '@/stores/ui';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: HomePage },
    { path: '/about', name: 'about', component: AboutPage },

    { path: '/guide', name: 'guide', component: GuidePage },
    { path: '/guide/:key', name: 'guide-detail', component: GuideDetailPage },

    { path: '/recipes', name: 'recipes', component: RecipesPage },
    { path: '/recipes/:id', name: 'recipe-detail', component: RecipeDetailPage, props: true },

    { path: '/tools', name: 'tools', component: ToolsPage },
    { path: '/tools/:toolKey', name: 'tool-detail', component: ToolDetailPage, props: true },

    { path: '/courses', name: 'courses', component: CoursesPage },
    { path: '/courses/:id', name: 'course-detail', component: CourseDetailPage, props: true },

    { path: '/contact', name: 'contact', component: ContactPage },

    { path: '/chat', name: 'chat', component: ChatPage, meta: { requiresAuth: true } },
  ],
});

router.beforeEach(async (to) => {
  const auth = useAuthStore();
  const ui = useUiStore();
  await auth.hydrate();

  if (to.meta.requiresAuth && !auth.isLoggedIn) {
    ui.openLogin(to.fullPath);
    return false;
  }

  if (to.meta.requiresPremium && !auth.isPremium) {
    alert('Fitur ini hanya untuk pengguna Premium.');
    return false;
  }
});

export default router;

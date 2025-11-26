import { defineStore } from 'pinia';

type User = {
  name: string;
  isPremium: boolean;
};

type AuthState = {
  user: User | null;
};

const STORAGE_KEY = 'baristry_auth_v1';

function loadState(): AuthState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as AuthState;
  } catch {}
  return { user: null };
}

function saveState(state: AuthState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {}
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => loadState(),
  getters: {
    isLoggedIn: (s) => !!s.user,
    isPremium: (s) => !!s.user?.isPremium
  },
  actions: {
    login(name: string) {
      this.user = { name, isPremium: false };
      saveState(this.$state);
    },
    logout() {
      this.user = null;
      saveState(this.$state);
    },
    upgrade() {
      if (!this.user) return;
      this.user.isPremium = true;
      saveState(this.$state);
    }
  }
});
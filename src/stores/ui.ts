import { defineStore } from 'pinia';

type AuthMode = 'login' | 'register';

type UiState = {
  authModal: {
    open: boolean;
    mode: AuthMode;
    redirect: string | null;
  };
};

export const useUiStore = defineStore('ui', {
  state: (): UiState => ({
    authModal: {
      open: false,
      mode: 'login',
      redirect: null,
    },
  }),

  actions: {
    openLogin(redirect?: string) {
      this.authModal.open = true;
      this.authModal.mode = 'login';
      this.authModal.redirect = redirect ?? null;
    },

    openRegister(redirect?: string) {
      this.authModal.open = true;
      this.authModal.mode = 'register';
      this.authModal.redirect = redirect ?? null;
    },

    closeAuth() {
      this.authModal.open = false;
      this.authModal.redirect = null;
      this.authModal.mode = 'login';
    },

    switchMode() {
      this.authModal.mode = this.authModal.mode === 'login' ? 'register' : 'login';
    },
  },
});

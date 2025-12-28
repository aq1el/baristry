import { defineStore } from 'pinia';
import { supabase } from '@/lib/supabase';
import type { Session, User } from '@supabase/supabase-js';

type AuthState = {
  session: Session | null;
  user: User | null;
  hydrated: boolean;
};

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    session: null,
    user: null,
    hydrated: false,
  }),

  getters: {
    isLoggedIn: (s) => !!s.user,
  },

  actions: {
    async hydrate() {
      if (this.hydrated) return;

      const { data } = await supabase.auth.getSession();
      this.session = data.session ?? null;
      this.user = data.session?.user ?? null;
      this.hydrated = true;

      // sinkron kalau ada perubahan auth (login/logout)
      supabase.auth.onAuthStateChange((_event, session) => {
        this.session = session ?? null;
        this.user = session?.user ?? null;
      });
      // event listener ini memang cara standar Supabase untuk memantau state auth.
    },

    async signUp(email: string, password: string, name?: string) {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { name: name ?? '' }, // user_metadata
        },
      });

      // Jika Confirm email aktif, session biasanya null sampai user verifikasi email.
      if (error) throw error;

      return data;
    },

    async signIn(email: string, password: string) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      this.session = data.session;
      this.user = data.user;
      return data;
    },

    async signOut() {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      this.session = null;
      this.user = null;
      // signOut akan membersihkan session di storage Supabase client.
    },
  },
});

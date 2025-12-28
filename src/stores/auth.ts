import { defineStore } from 'pinia';
import { supabase } from '@/lib/supabase';
import type { Session, User } from '@supabase/supabase-js';

type Profile = {
  id: string;
  name: string | null;
  role: 'free' | 'premium' | 'admin';
};

type AuthState = {
  session: Session | null;
  user: User | null;
  profile: Profile | null;
  hydrated: boolean;
};

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    session: null,
    user: null,
    profile: null,
    hydrated: false,
  }),

  getters: {
    isLoggedIn: (s) => !!s.user,
    isPremium: (s) => s.profile?.role === 'premium' || s.profile?.role === 'admin',
    isAdmin: (s) => s.profile?.role === 'admin',
  },

  actions: {
    async hydrate() {
      if (this.hydrated) return;

      const { data } = await supabase.auth.getSession();
      this.session = data.session ?? null;
      this.user = data.session?.user ?? null;

      if (this.user) {
        await this.fetchProfile();
      }

      supabase.auth.onAuthStateChange(async (_event, session) => {
        this.session = session ?? null;
        this.user = session?.user ?? null;
        this.profile = null;

        if (this.user) {
          await this.fetchProfile();
        }
      });

      this.hydrated = true;
    },

    async fetchProfile() {
      if (!this.user) return;

      const { data, error } = await supabase
        .from('profiles')
        .select('id, name, role')
        .eq('id', this.user.id)
        .single();

      if (error) {
        console.error('Failed to load profile:', error.message);
        this.profile = null;
        return;
      }

      this.profile = data;
    },

    async signIn(email: string, password: string) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;

      this.session = data.session;
      this.user = data.user;
      await this.fetchProfile();
    },

    async signUp(email: string, password: string, name?: string) {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { name: name ?? '' } },
      });
      if (error) throw error;

      // profile akan dibuat otomatis oleh trigger
      return data;
    },

    async signOut() {
      await supabase.auth.signOut();
      this.session = null;
      this.user = null;
      this.profile = null;
    },
  },
});

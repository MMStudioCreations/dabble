import { useCallback, useEffect, useState } from 'react';
import type { Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import type { AuthUser, Profile } from '../types';
import { toUserId } from '../types';

interface AuthState {
  session: Session | null;
  user: AuthUser | null;
  loading: boolean;
}

export function useAuth() {
  const [state, setState] = useState<AuthState>({
    session: null,
    user: null,
    loading: true,
  });

  const fetchProfile = useCallback(async (userId: string, email: string) => {
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    setState((prev: Partial<AuthState>): AuthState => ({
      session: prev.session ?? null,
      user: {
        id: toUserId(userId),
        email,
        profile: profile as Profile | null,
      },
      loading: prev.loading ?? false,
    }));
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setState((prev: Partial<AuthState>): AuthState => ({
        session,
        user: prev.user ?? null,
        loading: false,
      }));
      if (session) void fetchProfile(session.user.id, session.user.email ?? '');
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setState((prev: Partial<AuthState>): AuthState => ({
          session,
          user: prev.user ?? null,
          loading: prev.loading ?? false,
        }));
        if (session) {
          void fetchProfile(session.user.id, session.user.email ?? '');
        } else {
          setState((prev: Partial<AuthState>): AuthState => ({
            session: prev.session ?? null,
            user: null,
            loading: prev.loading ?? false,
          }));
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [fetchProfile]);

  const signIn = useCallback(async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
  }, []);

  const signUp = useCallback(async (email: string, password: string, fullName: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName } },
    });
    if (error) throw error;
  }, []);

  const signOut = useCallback(async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  }, []);

  return {
    ...state,
    signIn,
    signUp,
    signOut,
    isAuthenticated: !!state.session,
  };
}

'use client';

import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuthContext } from '@/components/AuthProvider';
import { Button } from '@/components/Button';
import { LoginSchema } from '@/lib/validation';

const INPUT_CLASS =
  'w-full bg-[#2A2A3E] border border-[#3A3A5E] rounded-xl h-13 px-4 text-white ' +
  'placeholder-[#8A8A9A] focus:outline-none focus:border-brand-orange transition-colors text-base';

export default function LoginPage() {
  const router = useRouter();
  const { signIn, isAuthenticated, loading } = useAuthContext();

  const [email,     setEmail]     = useState('');
  const [password,  setPassword]  = useState('');
  const [error,     setError]     = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && isAuthenticated) router.replace('/events');
  }, [isAuthenticated, loading, router]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const result = LoginSchema.safeParse({ email, password });
    if (!result.success) {
      setError(result.error.errors[0]?.message ?? 'Invalid input');
      return;
    }
    setSubmitting(true);
    try {
      await signIn(result.data.email, result.data.password);
      router.replace('/events');
    } catch {
      setError('Invalid credentials. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }, [email, password, signIn, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-navy flex items-center justify-center">
        <span className="w-8 h-8 border-2 border-brand-orange border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-navy flex flex-col items-center justify-center px-6 py-12">
      <div className="w-full max-w-sm">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-black text-brand-orange tracking-[6px]">DABBLE</h1>
          <p className="text-brand-gray mt-2 tracking-wide text-base">Do things. With people.</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          {error && (
            <div className="bg-red-700 rounded-xl p-3" role="alert">
              <p className="text-white text-sm font-semibold">{error}</p>
            </div>
          )}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            autoComplete="email"
            required
            className={INPUT_CLASS}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            autoComplete="current-password"
            required
            className={INPUT_CLASS}
          />

          <div className="mt-2">
            <Button label="Sign In" type="submit" loading={submitting} />
          </div>
        </form>

        <p className="text-center text-brand-gray text-sm mt-6">
          Don&apos;t have an account?{' '}
          <Link href="/signup" className="text-brand-orange font-semibold">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}

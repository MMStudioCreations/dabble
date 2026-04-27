'use client';

import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuthContext } from '@/components/AuthProvider';
import { Button } from '@/components/Button';
import { SignupSchema } from '@/lib/validation';

const INPUT_CLASS =
  'w-full bg-[#2A2A3E] border border-[#3A3A5E] rounded-xl h-13 px-4 text-white ' +
  'placeholder-[#8A8A9A] focus:outline-none focus:border-brand-orange transition-colors text-base';

export default function SignupPage() {
  const router = useRouter();
  const { signUp, isAuthenticated, loading } = useAuthContext();

  const [fullName,  setFullName]  = useState('');
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

    const result = SignupSchema.safeParse({ email, password, full_name: fullName });
    if (!result.success) {
      setError(result.error.errors[0]?.message ?? 'Invalid input');
      return;
    }
    setSubmitting(true);
    try {
      await signUp(result.data.email, result.data.password, result.data.full_name);
      router.replace('/events');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not create account. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }, [email, password, fullName, signUp, router]);

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
          <p className="text-brand-gray mt-2 tracking-wide text-base">Create your account</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          {error && (
            <div className="bg-red-700 rounded-xl p-3" role="alert">
              <p className="text-white text-sm font-semibold">{error}</p>
            </div>
          )}

          <input
            type="text"
            placeholder="Full name"
            value={fullName}
            onChange={e => setFullName(e.target.value)}
            autoComplete="name"
            required
            className={INPUT_CLASS}
          />

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
            placeholder="Password (8+ chars, uppercase + number)"
            value={password}
            onChange={e => setPassword(e.target.value)}
            autoComplete="new-password"
            required
            className={INPUT_CLASS}
          />

          <div className="mt-2">
            <Button label="Create Account" type="submit" loading={submitting} />
          </div>
        </form>

        <p className="text-center text-brand-gray text-sm mt-6">
          Already have an account?{' '}
          <Link href="/login" className="text-brand-orange font-semibold">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

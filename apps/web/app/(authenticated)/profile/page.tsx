'use client';

import { useCallback } from 'react';
import Link from 'next/link';
import { useAuthContext } from '@/components/AuthProvider';
import { Button } from '@/components/Button';

export default function ProfilePage() {
  const { user, signOut } = useAuthContext();

  const handleSignOut = useCallback(async () => {
    try { await signOut(); } catch { /* no-op */ }
  }, [signOut]);

  const initials = user?.profile?.full_name
    ?.split(' ')
    .map((n: string) => n[0] ?? '')
    .join('')
    .toUpperCase()
    .slice(0, 2) ?? '?';

  return (
    <div className="min-h-screen bg-brand-cream px-8 pt-16 pb-8 flex flex-col items-center">
      {/* Avatar */}
      <div className="w-24 h-24 rounded-full bg-brand-navy flex items-center justify-center mb-4">
        <span className="text-brand-orange text-4xl font-black">{initials}</span>
      </div>

      <h2 className="text-2xl font-extrabold text-brand-navy mb-1">
        {user?.profile?.full_name ?? 'Dabbler'}
      </h2>
      <p className="text-sm text-brand-gray mb-2">{user?.email}</p>

      {user?.profile?.neighborhood && (
        <p className="text-sm text-brand-orange font-semibold mb-4">
          {user.profile.neighborhood}, Staten Island
        </p>
      )}

      {user?.profile?.bio && (
        <p className="text-base text-brand-dark text-center leading-relaxed max-w-xs mb-4">
          {user.profile.bio}
        </p>
      )}

      {user?.profile?.interests && user.profile.interests.length > 0 && (
        <div className="flex flex-wrap gap-2 justify-center mb-6 max-w-xs">
          {user.profile.interests.map(interest => (
            <span
              key={interest}
              className="bg-white text-brand-navy text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm"
            >
              {interest}
            </span>
          ))}
        </div>
      )}

      <div className="w-full max-w-xs mt-auto pt-8 flex flex-col gap-3">
        <Link
          href="/settings"
          className="block text-center py-3 text-sm font-semibold text-brand-gray hover:text-brand-navy transition-colors"
        >
          Settings
        </Link>
        <Button label="Sign Out" onPress={handleSignOut} variant="ghost" />
      </div>
    </div>
  );
}

'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useAuthContext } from '@/components/AuthProvider';

function CalendarIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

export default function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, loading } = useAuthContext();
  const router   = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !isAuthenticated) router.replace('/');
  }, [isAuthenticated, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-cream flex items-center justify-center">
        <span className="w-8 h-8 border-2 border-brand-orange border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) return null;

  const navItems = [
    { href: '/events',  label: 'Events',  Icon: CalendarIcon,  active: pathname === '/events' || pathname.startsWith('/events/') },
    { href: '/profile', label: 'Profile', Icon: UserIcon,       active: pathname === '/profile' },
  ] as const;

  return (
    <div className="min-h-screen bg-brand-cream flex flex-col">
      <main className="flex-1 pb-16">
        {children}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 flex safe-area-bottom">
        {navItems.map(({ href, label, Icon, active }) => (
          <Link
            key={href}
            href={href}
            className={`flex-1 flex flex-col items-center py-2 gap-0.5 transition-colors ${
              active ? 'text-brand-orange' : 'text-brand-gray hover:text-brand-navy'
            }`}
          >
            <Icon />
            <span className="text-xs font-semibold">{label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}

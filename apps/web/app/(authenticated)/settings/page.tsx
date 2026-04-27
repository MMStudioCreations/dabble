'use client';

import Link from 'next/link';

interface SettingsRow {
  label: string;
  href?: string;
  value?: string;
}

const rows: SettingsRow[] = [
  { label: 'Profile', href: '/profile' },
  { label: 'Version',  value: '1.0.0' },
];

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-brand-cream px-6 pt-16 pb-8">
      <h1 className="text-2xl font-black text-brand-navy mb-8">Settings</h1>

      <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
        {rows.map((row, i) => (
          <div
            key={row.label}
            className={`px-4 py-4 ${i < rows.length - 1 ? 'border-b border-gray-100' : ''}`}
          >
            {row.href ? (
              <Link
                href={row.href}
                className="flex items-center justify-between hover:opacity-70 transition-opacity"
              >
                <span className="text-brand-navy font-semibold">{row.label}</span>
                <span className="text-brand-gray text-lg">›</span>
              </Link>
            ) : (
              <div className="flex items-center justify-between">
                <span className="text-brand-navy font-semibold">{row.label}</span>
                <span className="text-brand-gray text-sm">{row.value}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

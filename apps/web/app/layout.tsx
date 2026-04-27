import type { Metadata, Viewport } from 'next';
import './globals.css';
import { AuthProvider } from '@/components/AuthProvider';
import { ServiceWorker } from '@/components/ServiceWorker';

export const metadata: Metadata = {
  title: 'Dabble',
  description: 'Connect. Discover. Experience.',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Dabble',
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor:   '#E8572A',
  width:         'device-width',
  initialScale:  1,
  maximumScale:  1,
  userScalable:  false,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <AuthProvider>{children}</AuthProvider>
        <ServiceWorker />
      </body>
    </html>
  );
}

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
// import { MainLayout } from '@/components/layout/main-layout';
import { generateMetadata } from '@/lib/metadata';
import AppProviders from '@/components/providers/AppProviders';
import '@/styles/layout/layout.scss';
import '@/styles/components/index.scss';
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
});

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#000000',
};

export const metadata: Metadata = generateMetadata({
  title: 'D-Admin - Website Builder & Management Platform',
  description: 'Professional website builder and management platform. Create, deploy, and manage websites with advanced features, templates, and analytics.',
  keywords: 'website builder, web development, website management, templates, portfolio, SEO, analytics, drag and drop, responsive design',
  canonical: '/',
  ogType: 'website',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/svg+xml" href="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxOTIgMTkyIiB3aWR0aD0iMTkyIiBoZWlnaHQ9IjE5MiI+PHJlY3Qgd2lkdGg9IjE5MiIgaGVpZ2h0PSIxOTIiIGZpbGw9IiM0RjQ2RTUiLz48Y2lyY2xlIGN4PSI5NiIgY3k9Ijk2IiByPSI4MCIgZmlsbD0id2hpdGUiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXdlaWdodD0iYm9sZCIgZm9udC1zaXplPSI4MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iIGZpbGw9IiM0RjQ2RTUiPkE8L3RleHQ+PC9zdmc+" />
        <link rel="apple-touch-icon" href="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxOTIgMTkyIiB3aWR0aD0iMTkyIiBoZWlnaHQ9IjE5MiI+PHJlY3Qgd2lkdGg9IjE5MiIgaGVpZ2h0PSIxOTIiIGZpbGw9IiM0RjQ2RTUiLz48Y2lyY2xlIGN4PSI5NiIgY3k9Ijk2IiByPSI4MCIgZmlsbD0id2hpdGUiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXdlaWdodD0iYm9sZCIgZm9udC1zaXplPSI4MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iIGZpbGw9IiM0RjQ2RTUiPkE8L3RleHQ+PC9zdmc+" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link
          id="theme-css"
          href={`/themes/d-admin-dark/theme.css`}
          rel="stylesheet"
        />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        {/* <MainLayout> */}
        <AppProviders>
          {children}
        </AppProviders>
        {/* </MainLayout> */}
      </body>
    </html>
  );
}
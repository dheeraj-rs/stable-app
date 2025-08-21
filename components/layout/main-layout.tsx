'use client';

import { useAppStore } from '@/lib/stores/app-store';
import { Sidebar } from './sidebar';
import { Topbar } from './topbar';
import { useEffect } from 'react';
import '../../styles/globals.scss';

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const { theme } = useAppStore();

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return (
    <div className="app-container">
      <Sidebar />

      <div className="main-content">
        <Topbar />

        <main className="content-area">
          <div className="container">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
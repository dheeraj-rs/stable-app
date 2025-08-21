'use client';

type User = {
  name?: string;
  email?: string;
  // Add other user properties as needed
};

import { useAppStore } from '@/lib/stores/app-store';
import { Menu, Sun, Moon } from 'lucide-react';
import { useUserData } from '@/hooks/use-data';
import '../../styles/globals.scss';

export function Topbar() {
  const { sidebarOpen, setSidebarOpen, theme, setTheme } = useAppStore();
  const { user, isLoading } = useUserData() as { user?: User; isLoading: boolean; error?: Error };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <header className="topbar">
      <div className="topbar-left">
        <button
          className="menu-button"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <Menu size={20} />
        </button>

        <div className="welcome-text">
          <h2>Welcome back!</h2>
          <p>{isLoading ? 'Loading...' : `Hello, ${user?.name || user?.email || 'User'}`}</p>
        </div>
      </div>

      <div className="topbar-right">
        <button
          className="theme-button"
          onClick={toggleTheme}
        >
          {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
        </button>

        <div className="user-avatar"></div>
      </div>
    </header>
  );
}
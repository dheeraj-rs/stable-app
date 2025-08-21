'use client';

import { useAppStore } from '@/lib/stores/app-store';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  MessageSquare,
  Settings,
  User,
  ChevronLeft,
  Plus,
  History
} from 'lucide-react';
import '../../styles/sidebar.scss';

const navigation = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'Chat', href: '/chat', icon: MessageSquare },
  { name: 'History', href: '/history', icon: History },
  { name: 'Profile', href: '/profile', icon: User },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export function Sidebar() {
  const { sidebarOpen, setSidebarOpen } = useAppStore();
  const pathname = usePathname();

  return (
    <>
      {/* Mobile backdrop */}
      {sidebarOpen && (
        <div
          className="sidebar-backdrop"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? 'mobile-open' : ''}`}>
        <div className="sidebar-header">
          <h1 className="logo">StableApp</h1>
          <button
            className="close-button"
            onClick={() => setSidebarOpen(false)}
          >
            <ChevronLeft size={20} />
          </button>
        </div>

        <div className="new-chat-section">
          <button className="new-chat-button">
            <Plus size={16} />
            <span>New Chat</span>
          </button>
        </div>

        <nav className="sidebar-nav">
          <ul className="nav-list">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.name} className="nav-item">
                  <Link
                    href={item.href}
                    className={`nav-link ${isActive ? 'active' : ''}`}
                  >
                    <item.icon className="nav-icon" />
                    <span className="nav-text">{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="sidebar-footer">
          <div className="user-profile">
            <div className="user-avatar"></div>
            <div className="user-info">
              <div className="user-name">John Doe</div>
              <div className="user-email">john@example.com</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
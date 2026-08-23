import React, { useState, useEffect } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Moon, Sun, User, LogOut } from 'lucide-react';

const CustomerLayout: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    // Check local storage or system preference on mount
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(prefersDark ? 'dark' : 'light');
      document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <div className="customer-layout">
      <header className="navbar">
        <div className="container flex items-center justify-between">
          <Link to="/" className="font-bold text-2xl" style={{ color: 'var(--color-primary)' }}>
            FPMS
          </Link>
          
          <nav className="flex items-center gap-6">
            <Link to="/" className="font-semibold">Trang Chủ</Link>
            <Link to="/book-pitch" className="font-semibold">Đặt Sân</Link>
            <Link to="/my-bookings" className="font-semibold">Đơn Của Tôi</Link>
            
            <div className="flex items-center gap-4">
              <button onClick={toggleTheme} className="btn btn-secondary" style={{ padding: '0.5rem', borderRadius: '50%' }}>
                {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
              </button>
              
              <Link to="/profile" className="btn btn-secondary" style={{ padding: '0.5rem', borderRadius: '50%' }}>
                <User size={20} />
              </Link>
              
              <Link to="/login" className="btn btn-primary">
                Đăng xuất
              </Link>
            </div>
          </nav>
        </div>
      </header>

      <main className="customer-main">
        <div className="animate-fade-in">
          <Outlet />
        </div>
      </main>

      <footer className="footer">
        <div className="container text-muted text-sm">
          &copy; {new Date().getFullYear()} FPMS - Hệ thống quản lý sân bóng trực tuyến. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default CustomerLayout;

import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Moon, Sun, User, LogOut, Menu, X } from 'lucide-react';

const CustomerLayout: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Close mobile menu when route changes
    setIsMobileMenuOpen(false);
  }, [location]);

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
            Soccer88
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
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
              
              <Link to="/register" className="btn btn-secondary font-semibold" style={{ padding: '0.5rem 1.2rem' }}>
                Đăng ký
              </Link>
              <Link to="/login" className="btn btn-primary font-semibold" style={{ padding: '0.5rem 1.2rem' }}>
                Đăng nhập
              </Link>
            </div>
          </nav>

          {/* Mobile Menu Toggle Button */}
          <div className="flex md:hidden items-center gap-4">
            <button onClick={toggleTheme} className="btn btn-secondary" style={{ padding: '0.5rem', borderRadius: '50%' }}>
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            <button className="btn btn-secondary" style={{ padding: '0.5rem' }} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Sidebar/Drawer Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t" style={{ borderTopColor: 'var(--color-border)', backgroundColor: 'var(--color-bg-surface)' }}>
            <div className="flex flex-col p-4 gap-4">
              <Link to="/" className="font-semibold text-lg py-2 border-b" style={{ borderBottomColor: 'var(--color-border)' }}>Trang Chủ</Link>
              <Link to="/book-pitch" className="font-semibold text-lg py-2 border-b" style={{ borderBottomColor: 'var(--color-border)' }}>Đặt Sân</Link>
              <Link to="/my-bookings" className="font-semibold text-lg py-2 border-b" style={{ borderBottomColor: 'var(--color-border)' }}>Đơn Của Tôi</Link>
              <Link to="/profile" className="font-semibold text-lg py-2 border-b" style={{ borderBottomColor: 'var(--color-border)' }}>Hồ Sơ Của Tôi</Link>
              
              <div className="flex flex-col gap-3 mt-4">
                <Link to="/login" className="btn btn-primary font-semibold w-full">
                  Đăng nhập
                </Link>
                <Link to="/register" className="btn btn-secondary font-semibold w-full">
                  Đăng ký
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      <main className="customer-main">
        <div className="animate-fade-in">
          <Outlet />
        </div>
      </main>

      <footer className="modern-footer">
        <div className="container text-sm text-muted">
          <div className="flex items-center gap-2 font-bold" style={{ color: 'var(--color-primary)' }}>
            [ Footer ]
          </div>
          <div className="text-center md:text-left font-medium">
            __________________________
          </div>
          <div className="flex items-center gap-6 font-medium">
            <Link to="/terms">________</Link>
            <Link to="/privacy">________</Link>
            <Link to="/contact">________</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CustomerLayout;

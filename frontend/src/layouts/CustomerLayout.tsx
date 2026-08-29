import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { Moon, Sun, User, LogOut, Menu, X } from 'lucide-react';

const CustomerLayout: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isProfilePage = location.pathname === '/profile';
  const isAuthRequiredPage = location.pathname.startsWith('/checkout') || location.pathname === '/my-bookings' || location.pathname === '/profile';

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem('isLoggedIn') === 'true' || isAuthRequiredPage;
  });

  const showUserMenu = isLoggedIn || isAuthRequiredPage;

  useEffect(() => {
    // Close mobile menu when route changes
    setIsMobileMenuOpen(false);
  }, [location]);

  useEffect(() => {
    if (isAuthRequiredPage) {
      setIsLoggedIn(true);
      localStorage.setItem('isLoggedIn', 'true');
    }
  }, [location.pathname, isAuthRequiredPage]);

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

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
    navigate('/login');
  };

  return (
    <div className="customer-layout">
      <header className="navbar">
        <div className="container flex items-center justify-between">
          <Link to="/" className="font-bold text-2xl" style={{ color: 'var(--color-primary)' }}>
            Soccer365
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="font-semibold">Trang Chủ</Link>
            <Link to="/book-pitch" className="font-semibold">Đặt Sân</Link>
            <Link to="/my-bookings" className="font-semibold">Đơn Của Tôi</Link>
            
            <div className="flex items-center gap-4">
              <button onClick={toggleTheme} className="btn btn-secondary" style={{ padding: '0.5rem', borderRadius: '50%' }} title="Chuyển đổi giao diện">
                {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
              </button>
              
              {showUserMenu ? (
                <>
                  <Link 
                    to="/profile" 
                    className={`btn ${isProfilePage ? 'btn-primary' : 'btn-secondary'} flex items-center gap-2 font-semibold`} 
                    style={{ padding: '0 1rem', height: '40px', justifyContent: 'center' }}
                  >
                    <User size={18} />
                    <span>Hồ Sơ</span>
                  </Link>
                  <button 
                    onClick={handleLogout} 
                    className="btn btn-secondary flex items-center gap-1.5 font-semibold" 
                    style={{ padding: '0 1rem', height: '40px', justifyContent: 'center', color: 'var(--color-danger)' }}
                    title="Đăng xuất"
                  >
                    <LogOut size={18} />
                    <span>Đăng xuất</span>
                  </button>
                </>
              ) : (
                <>
                  <Link to="/register" className="btn btn-secondary font-semibold" style={{ padding: '0.5rem 1.2rem' }}>
                    Đăng ký
                  </Link>
                  <Link to="/login" className="btn btn-primary font-semibold" style={{ padding: '0.5rem 1.2rem' }}>
                    Đăng nhập
                  </Link>
                </>
              )}
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <button onClick={toggleTheme} className="btn btn-secondary" style={{ padding: '0.5rem', borderRadius: '50%' }}>
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </button>
            <button 
              className="btn btn-secondary" 
              style={{ padding: '0.5rem' }} 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-bg-surface)' }}>
            <div className="container flex flex-col gap-3 py-4">
              <Link to="/" className="font-semibold py-2">Trang Chủ</Link>
              <Link to="/book-pitch" className="font-semibold py-2">Đặt Sân</Link>
              <Link to="/my-bookings" className="font-semibold py-2">Đơn Của Tôi</Link>
              {showUserMenu && <Link to="/profile" className="font-semibold py-2">Hồ Sơ Của Tôi</Link>}
              
              <div className="pt-2 border-t flex flex-col gap-2" style={{ borderColor: 'var(--color-border)' }}>
                {showUserMenu ? (
                  <button 
                    onClick={handleLogout} 
                    className="btn btn-secondary font-semibold w-full flex items-center justify-center gap-2"
                    style={{ color: 'var(--color-danger)', padding: '0.75rem' }}
                  >
                    <LogOut size={20} />
                    <span>Đăng xuất</span>
                  </button>
                ) : (
                  <>
                    <Link to="/login" className="btn btn-primary font-semibold w-full">
                      Đăng nhập
                    </Link>
                    <Link to="/register" className="btn btn-secondary font-semibold w-full">
                      Đăng ký
                    </Link>
                  </>
                )}
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
            Soccer365 © {new Date().getFullYear()}
          </div>
          <div className="text-center md:text-left font-medium">
            Hệ thống Quản lý và Đặt sân bóng đá trực tuyến
          </div>
          <div className="flex items-center gap-6 font-medium">
            <Link to="/terms">Điều khoản</Link>
            <Link to="/privacy">Bảo mật</Link>
            <Link to="/contact">Liên hệ</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CustomerLayout;

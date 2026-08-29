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
    <div className="flex flex-col min-h-screen">
      <header className="bg-bg-surface border-b border-border py-4 sticky top-0 z-50">
        <div className="max-w-[1200px] mx-auto px-4 w-full flex items-center justify-between">
          <Link to="/" className="font-bold text-2xl text-primary">
            Soccer365
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="font-semibold">Trang Chủ</Link>
            <Link to="/book-pitch" className="font-semibold">Đặt Sân</Link>
            <Link to="/my-bookings" className="font-semibold">Đơn Của Tôi</Link>
            
            <div className="flex items-center gap-4">
              <button onClick={toggleTheme} className="btn btn-secondary p-2 rounded-full" title="Chuyển đổi giao diện">
                {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
              </button>
              
              {showUserMenu ? (
                <>
                  <Link 
                    to="/profile" 
                    className={`btn ${isProfilePage ? 'btn-primary' : 'btn-secondary'} flex items-center gap-2 font-semibold px-4 h-[40px] justify-center`} 
                  >
                    <User size={18} />
                    <span>Hồ Sơ</span>
                  </Link>
                  <button 
                    onClick={handleLogout} 
                    className="btn btn-secondary flex items-center gap-1.5 font-semibold px-4 h-[40px] justify-center text-danger" 
                    title="Đăng xuất"
                  >
                    <LogOut size={18} />
                    <span>Đăng xuất</span>
                  </button>
                </>
              ) : (
                <>
                  <Link to="/register" className="btn btn-secondary font-semibold px-5 py-2">
                    Đăng ký
                  </Link>
                  <Link to="/login" className="btn btn-primary font-semibold px-5 py-2">
                    Đăng nhập
                  </Link>
                </>
              )}
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <button onClick={toggleTheme} className="btn btn-secondary p-2 rounded-full">
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </button>
            <button 
              className="btn btn-secondary p-2 rounded-md" 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-bg-surface">
            <div className="max-w-[1200px] mx-auto px-4 w-full flex flex-col gap-3 py-4">
              <Link to="/" className="font-semibold py-2">Trang Chủ</Link>
              <Link to="/book-pitch" className="font-semibold py-2">Đặt Sân</Link>
              <Link to="/my-bookings" className="font-semibold py-2">Đơn Của Tôi</Link>
              {showUserMenu && <Link to="/profile" className="font-semibold py-2">Hồ Sơ Của Tôi</Link>}
              
              <div className="pt-2 border-t border-border flex flex-col gap-2">
                {showUserMenu ? (
                  <button 
                    onClick={handleLogout} 
                    className="btn btn-secondary font-semibold w-full flex items-center justify-center gap-2 text-danger p-3"
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

      <main className="flex-grow py-8">
        <div className="animate-fade-in">
          <Outlet />
        </div>
      </main>

      <footer className="modern-footer">
        <div className="max-w-[1200px] mx-auto px-4 w-full text-sm text-text-muted flex flex-col md:flex-row items-center md:justify-between gap-4">
          <div className="flex items-center gap-2 font-bold text-primary">
            Soccer365 © {new Date().getFullYear()}
          </div>
          <div className="text-center md:text-left font-medium">
            Hệ thống Quản lý và Đặt sân bóng đá trực tuyến
          </div>
          <div className="flex items-center gap-6 font-medium">
            <Link to="/terms" className="hover:text-primary transition-colors">Điều khoản</Link>
            <Link to="/privacy" className="hover:text-primary transition-colors">Bảo mật</Link>
            <Link to="/contact" className="hover:text-primary transition-colors">Liên hệ</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CustomerLayout;

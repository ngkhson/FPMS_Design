import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Calendar, CreditCard, LayoutDashboard, Settings, Users, LogOut, Sun, Moon } from 'lucide-react';

const AdminLayout: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const location = useLocation();

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const menuItems = [
    { path: '/admin', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { path: '/admin/timeline', icon: <Calendar size={20} />, label: 'Timeline Sân' },
    { path: '/admin/bookings', icon: <CreditCard size={20} />, label: 'Quản lý Đơn' },
    { path: '/admin/transactions', icon: <CreditCard size={20} />, label: 'Giao dịch' },
    { path: '/admin/users', icon: <Users size={20} />, label: 'Người dùng' },
    { path: '/admin/pitches', icon: <Settings size={20} />, label: 'Quản lý Sân' },
    { path: '/admin/timeslots', icon: <Calendar size={20} />, label: 'Khung giờ' },
    { path: '/admin/pricing', icon: <CreditCard size={20} />, label: 'Bảng giá & Lễ' },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--color-bg-base)' }}>
      {/* Sidebar */}
      <aside style={{ width: '250px', backgroundColor: 'var(--color-bg-surface)', borderRight: '1px solid var(--color-border)', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--color-border)' }}>
          <h2 className="text-2xl font-bold" style={{ color: 'var(--color-primary)' }}>FPMS Admin</h2>
          <p className="text-muted text-sm mt-1">Phần mềm quản lý sân bóng</p>
        </div>
        
        <nav style={{ padding: '1rem 0', flexGrow: 1 }}>
          {menuItems.map(item => {
            const isActive = location.pathname === item.path || (item.path !== '/admin' && location.pathname.startsWith(item.path));
            return (
              <Link 
                key={item.path} 
                to={item.path}
                style={{ 
                  display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1.5rem',
                  backgroundColor: isActive ? 'var(--color-primary-light)' : 'transparent',
                  color: isActive ? 'var(--color-primary)' : 'var(--color-text-base)',
                  borderRight: isActive ? '3px solid var(--color-primary)' : '3px solid transparent',
                  fontWeight: isActive ? 600 : 500,
                  transition: 'all var(--transition-fast)'
                }}
              >
                {item.icon} {item.label}
              </Link>
            );
          })}
        </nav>
        
        <div style={{ padding: '1rem', borderTop: '1px solid var(--color-border)' }}>
          <Link to="/" className="btn w-full" style={{ justifyContent: 'flex-start', color: 'var(--color-danger)' }}>
            <LogOut size={20} /> Đăng xuất
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Topbar */}
        <header style={{ height: '64px', backgroundColor: 'var(--color-bg-surface)', borderBottom: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 2rem' }}>
          <div>
            <span className="badge badge-success">Đang trong ca trực: Nguyễn Thu Ngân</span>
          </div>
          
          <div className="flex items-center gap-4">
            <button onClick={toggleTheme} className="btn btn-secondary" style={{ padding: '0.5rem', borderRadius: '50%' }}>
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'var(--color-primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
              AD
            </div>
          </div>
        </header>
        
        {/* Page Content */}
        <main style={{ padding: '2rem', flexGrow: 1, overflowY: 'auto' }}>
          <div className="animate-fade-in max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;

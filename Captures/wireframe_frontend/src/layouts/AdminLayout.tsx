import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Calendar, CreditCard, Settings, Users, LogOut, Sun, Moon, BarChart3, Menu, X } from 'lucide-react';

const AdminLayout: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [sidebarOpen, setSidebarOpen] = useState(false);
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
    { path: '/admin', icon: <BarChart3 size={20} />, label: 'Thống kê' },
    { path: '/admin/timeline', icon: <Calendar size={20} />, label: 'Quản lý Ca Đá' },
    { path: '/admin/bookings', icon: <CreditCard size={20} />, label: 'Quản lý Đơn' },
    { path: '/admin/transactions', icon: <CreditCard size={20} />, label: 'Giao dịch' },
    { path: '/admin/users', icon: <Users size={20} />, label: 'Người dùng' },
    { path: '/admin/pitches', icon: <Settings size={20} />, label: 'Quản lý Sân' },
    { path: '/admin/timeslots', icon: <Calendar size={20} />, label: 'Khung giờ' },
    { path: '/admin/pricing', icon: <CreditCard size={20} />, label: 'Bảng giá sân' },
  ];

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', backgroundColor: 'var(--color-bg-base)' }}>
      {/* Sidebar Overlay (Mobile/Tablet) */}
      {sidebarOpen && (
        <div className="admin-sidebar-overlay" onClick={() => setSidebarOpen(false)}></div>
      )}

      {/* Sidebar */}
      <aside className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`} style={{ width: '250px', flexShrink: 0, backgroundColor: 'var(--color-bg-surface)', borderRight: '1px solid var(--color-border)', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2 className="text-2xl font-bold" style={{ color: 'var(--color-primary)' }}>FPMS Admin</h2>
            <p className="text-muted text-sm mt-1">Phần mềm quản lý sân bóng</p>
          </div>
          <button className="menu-toggle-btn text-muted" onClick={() => setSidebarOpen(false)}>
            <X size={24} />
          </button>
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
                onClick={() => setSidebarOpen(false)}
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
      <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', minWidth: 0, height: '100vh' }}>
        {/* Topbar */}
        <header className="admin-header" style={{ height: '64px', flexShrink: 0, backgroundColor: 'var(--color-bg-surface)', borderBottom: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 2rem' }}>
          <div className="flex items-center gap-4">
            <button className="menu-toggle-btn btn btn-secondary" style={{ padding: '0.5rem', borderRadius: 'var(--radius-sm)' }} onClick={() => setSidebarOpen(true)}>
              <Menu size={20} />
            </button>
            {/* Can put Breadcrumbs or Page Title here in the future */}
          </div>

          <div className="flex items-center gap-6">
            <button onClick={toggleTheme} className="btn btn-secondary" style={{ padding: '0.5rem', borderRadius: '50%' }} title="Đổi giao diện">
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            
            <div style={{ width: '1px', height: '24px', backgroundColor: 'var(--color-border)' }}></div>

            <Link to="/admin/profile" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                <span className="font-bold text-sm" style={{ color: 'var(--color-text-base)' }}>[ Tên nhân viên ]</span>
                <span className="text-xs text-muted font-medium">[ Vai trò ]</span>
              </div>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'var(--color-primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                AD
              </div>
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <main className="admin-main-content" style={{ padding: '2rem', flexGrow: 1, overflowY: 'auto' }}>
          <div className="animate-fade-in max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;

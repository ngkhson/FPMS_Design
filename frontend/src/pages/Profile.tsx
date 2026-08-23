import React, { useState } from 'react';
import { User, Key, Save, Bell } from 'lucide-react';

const Profile: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'info' | 'security' | 'notifications'>('info');

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Hồ sơ cá nhân</h1>
      
      <div className="grid grid-cols-auto gap-8" style={{ gridTemplateColumns: '250px 1fr' }}>
        {/* Sidebar */}
        <div className="card h-fit">
          <div className="flex flex-col gap-2">
            <button 
              className={`flex items-center gap-3 p-3 rounded-md transition ${activeTab === 'info' ? 'bg-primary text-white font-semibold' : 'hover:bg-base text-muted'}`}
              style={{ backgroundColor: activeTab === 'info' ? 'var(--color-primary)' : 'transparent', color: activeTab === 'info' ? 'white' : 'var(--color-text-base)' }}
              onClick={() => setActiveTab('info')}
            >
              <User size={18} /> Thông tin chung
            </button>
            <button 
              className={`flex items-center gap-3 p-3 rounded-md transition ${activeTab === 'security' ? 'bg-primary text-white font-semibold' : 'hover:bg-base text-muted'}`}
              style={{ backgroundColor: activeTab === 'security' ? 'var(--color-primary)' : 'transparent', color: activeTab === 'security' ? 'white' : 'var(--color-text-base)' }}
              onClick={() => setActiveTab('security')}
            >
              <Key size={18} /> Bảo mật
            </button>
            <button 
              className={`flex items-center gap-3 p-3 rounded-md transition ${activeTab === 'notifications' ? 'bg-primary text-white font-semibold' : 'hover:bg-base text-muted'}`}
              style={{ backgroundColor: activeTab === 'notifications' ? 'var(--color-primary)' : 'transparent', color: activeTab === 'notifications' ? 'white' : 'var(--color-text-base)' }}
              onClick={() => setActiveTab('notifications')}
            >
              <Bell size={18} /> Thông báo
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="card">
          {activeTab === 'info' && (
            <div className="animate-fade-in">
              <h2 className="text-xl font-semibold mb-6">Thông tin liên hệ</h2>
              
              <div className="flex items-center gap-6 mb-8">
                <div style={{ width: 80, height: 80, borderRadius: '50%', backgroundColor: 'var(--color-primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary)', fontSize: '2rem', fontWeight: 'bold' }}>
                  A
                </div>
                <div>
                  <button className="btn btn-secondary text-sm">Thay đổi ảnh đại diện</button>
                  <p className="text-sm text-muted mt-2">JPG, GIF hoặc PNG tối đa 2MB.</p>
                </div>
              </div>
              
              <form className="flex flex-col gap-4">
                <div className="grid gap-4" style={{ gridTemplateColumns: '1fr 1fr' }}>
                  <div>
                    <label className="font-semibold text-sm">Họ và tên</label>
                    <input type="text" className="mt-2 w-full" style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg-base)', color: 'var(--color-text-base)' }} defaultValue="Nguyễn Văn A" />
                  </div>
                  <div>
                    <label className="font-semibold text-sm">Số điện thoại</label>
                    <input type="text" className="mt-2 w-full" style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg-base)', color: 'var(--color-text-base)' }} defaultValue="0987654321" />
                  </div>
                </div>
                
                <div>
                  <label className="font-semibold text-sm">Email</label>
                  <input type="email" className="mt-2 w-full" style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg-base)', color: 'var(--color-text-base)' }} defaultValue="nguyenvana@example.com" disabled />
                  <p className="text-xs text-muted mt-1">Email không thể thay đổi sau khi đăng ký.</p>
                </div>
                
                <div className="mt-4">
                  <button type="button" className="btn btn-primary">
                    <Save size={18} /> Lưu thay đổi
                  </button>
                </div>
              </form>
            </div>
          )}
          
          {activeTab === 'security' && (
            <div className="animate-fade-in">
              <h2 className="text-xl font-semibold mb-6">Đổi mật khẩu</h2>
              
              <form className="flex flex-col gap-4">
                <div>
                  <label className="font-semibold text-sm">Mật khẩu hiện tại</label>
                  <input type="password" className="mt-2 w-full max-w-md block" style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg-base)', color: 'var(--color-text-base)' }} />
                </div>
                <div>
                  <label className="font-semibold text-sm">Mật khẩu mới</label>
                  <input type="password" className="mt-2 w-full max-w-md block" style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg-base)', color: 'var(--color-text-base)' }} />
                </div>
                <div>
                  <label className="font-semibold text-sm">Xác nhận mật khẩu mới</label>
                  <input type="password" className="mt-2 w-full max-w-md block" style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg-base)', color: 'var(--color-text-base)' }} />
                </div>
                
                <div className="mt-4">
                  <button type="button" className="btn btn-primary">Cập nhật mật khẩu</button>
                </div>
              </form>
            </div>
          )}
          
          {activeTab === 'notifications' && (
            <div className="animate-fade-in text-muted">
              Cài đặt thông báo đang được phát triển...
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;

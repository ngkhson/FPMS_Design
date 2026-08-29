import React from 'react';
import { Save, User } from 'lucide-react';

const Profile: React.FC = () => {
  return (
    <div className="max-w-[1400px] mx-auto pt-8 px-4 flex flex-col gap-6 pb-12">
      <div 
        className="shadow-lg relative overflow-hidden"
        style={{ 
          borderRadius: '1rem',
          background: 'linear-gradient(135deg, rgba(5,150,105,0.9) 0%, rgba(16,185,129,0.85) 50%, rgba(6,182,212,0.9) 100%), url("https://images.unsplash.com/photo-1518605368461-1ee7e53f0b2f?q=80&w=2070&auto=format&fit=crop") center/cover no-repeat',
          color: 'white',
          padding: '3rem 2rem',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <h1 className="text-4xl font-bold mb-3 flex items-center justify-center gap-3 text-white">
          <User size={36} />
          <span>Hồ sơ cá nhân</span>
        </h1>
        <p className="text-lg" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>Quản lý thông tin và cài đặt bảo mật của bạn.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Contact Info Card */}
        <div className="card h-full">
          <h2 className="text-xl font-semibold mb-6 pb-2" style={{ borderBottom: '1px solid var(--color-border)' }}>Thông tin liên hệ</h2>
          
          <form className="flex flex-col gap-4 h-full">
            <div className="flex flex-col gap-4">
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
              <div className="flex items-center gap-2">
                <label className="font-semibold text-sm">Email</label>
                <span className="text-xs text-muted font-normal">(Không thể thay đổi sau khi đăng ký)</span>
              </div>
              <input type="email" className="mt-2 w-full" style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg-base)', color: 'var(--color-text-base)' }} defaultValue="nguyenvana@example.com" disabled />
            </div>
            
            <div className="mt-auto pt-4 flex justify-end">
              <button type="button" className="btn btn-primary" style={{ padding: '0.6rem 1.5rem' }}>
                <Save size={18} className="mr-2 inline" /> Lưu thông tin
              </button>
            </div>
          </form>
        </div>
        
        {/* Change Password Card */}
        <div className="card h-full">
          <h2 className="text-xl font-semibold mb-6 pb-2" style={{ borderBottom: '1px solid var(--color-border)' }}>Đổi mật khẩu</h2>
          
          <form className="flex flex-col gap-4 h-full">
            <div>
              <label className="font-semibold text-sm">Mật khẩu hiện tại</label>
              <input type="password" className="mt-2 w-full block" style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg-base)', color: 'var(--color-text-base)' }} />
            </div>
            <div>
              <label className="font-semibold text-sm">Mật khẩu mới</label>
              <input type="password" className="mt-2 w-full block" style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg-base)', color: 'var(--color-text-base)' }} />
            </div>
            <div>
              <label className="font-semibold text-sm">Xác nhận mật khẩu mới</label>
              <input type="password" className="mt-2 w-full block" style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg-base)', color: 'var(--color-text-base)' }} />
            </div>
            
            <div className="mt-auto pt-4 flex justify-end">
              <button type="button" className="btn btn-secondary" style={{ padding: '0.6rem 1.5rem' }}>
                Cập nhật mật khẩu
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;

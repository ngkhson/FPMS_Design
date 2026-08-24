import React from 'react';
import { Save, User } from 'lucide-react';

const Profile: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto pt-8 px-4 flex flex-col gap-6 pb-12">
      <div 
        className="shadow-lg relative overflow-hidden"
        style={{ 
          borderRadius: '1rem',
          background: 'var(--color-bg-elevated)',
          border: '1px solid var(--color-border)',
          color: 'var(--color-text-base)',
          padding: '3rem 2rem',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <h1 className="text-4xl font-bold mb-3 flex items-center justify-center gap-3">
          <User size={36} />
          <span>Hồ sơ cá nhân</span>
        </h1>
        <p className="text-lg text-muted">[ Đoạn mô tả phụ ]</p>
      </div>
      
      {/* Contact Info Card */}
      <div className="card">
        <h2 className="text-xl font-semibold mb-6 pb-2" style={{ borderBottom: '1px solid var(--color-border)' }}>Thông tin liên hệ</h2>
        
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
            <p className="text-xs text-muted mt-1">[ Ghi chú phụ ]</p>
          </div>
          
          <div className="mt-4 flex justify-end">
            <button type="button" className="btn btn-primary" style={{ padding: '0.6rem 1.5rem' }}>
              <Save size={18} className="mr-2 inline" /> Lưu thông tin
            </button>
          </div>
        </form>
      </div>
      
      {/* Change Password Card */}
      <div className="card">
        <h2 className="text-xl font-semibold mb-6 pb-2" style={{ borderBottom: '1px solid var(--color-border)' }}>Đổi mật khẩu</h2>
        
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
          
          <div className="mt-4 flex justify-start">
            <button type="button" className="btn btn-secondary" style={{ padding: '0.6rem 1.5rem' }}>
              Cập nhật mật khẩu
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;

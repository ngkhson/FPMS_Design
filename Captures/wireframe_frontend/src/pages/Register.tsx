import React from 'react';
import { Link } from 'react-router-dom';

const Register: React.FC = () => {
  return (
    <div className="flex justify-center items-start pt-4">
      <div className="card" style={{ width: '100%', maxWidth: '500px' }}>
        <h2 className="text-2xl font-bold text-center mb-6">Đăng ký tài khoản</h2>
        
        <form className="flex flex-col gap-4">
          <div className="grid gap-4" style={{ gridTemplateColumns: '1fr 1fr' }}>
            <div>
              <label className="font-semibold text-sm">Họ và tên</label>
              <input 
                type="text" 
                className="mt-2 w-full" 
                style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg-base)', color: 'var(--color-text-base)' }}
                placeholder="VD: Nguyễn Văn A"
              />
            </div>
            <div>
              <label className="font-semibold text-sm">Số điện thoại</label>
              <input 
                type="text" 
                className="mt-2 w-full" 
                style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg-base)', color: 'var(--color-text-base)' }}
                placeholder="VD: 0912345678"
              />
            </div>
          </div>

          <div>
            <label className="font-semibold text-sm">Email</label>
            <input 
              type="email" 
              className="mt-2 w-full" 
              style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg-base)', color: 'var(--color-text-base)' }}
              placeholder="Nhập email..."
            />
          </div>
          
          <div>
            <label className="font-semibold text-sm">Mật khẩu</label>
            <input 
              type="password" 
              className="mt-2 w-full" 
              style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg-base)', color: 'var(--color-text-base)' }}
              placeholder="••••••••"
            />
          </div>

          <div>
            <label className="font-semibold text-sm">Xác nhận mật khẩu</label>
            <input 
              type="password" 
              className="mt-2 w-full" 
              style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg-base)', color: 'var(--color-text-base)' }}
              placeholder="••••••••"
            />
          </div>
          
          <div className="flex items-center text-sm mt-2">
            <label className="flex items-center gap-2 text-muted">
              <input type="checkbox" /> Tôi đồng ý với các Điều khoản & Chính sách bảo mật của hệ thống.
            </label>
          </div>
          
          <button type="button" className="btn btn-primary mt-4" style={{ padding: '0.75rem' }}>
            Đăng ký ngay
          </button>
          
          <div className="text-center text-sm mt-4">
            Đã có tài khoản? <Link to="/login" className="font-semibold" style={{ color: 'var(--color-primary)' }}>Đăng nhập</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;

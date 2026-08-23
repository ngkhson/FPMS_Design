import React from 'react';
import { Link } from 'react-router-dom';

const Login: React.FC = () => {
  return (
    <div className="flex justify-center items-center" style={{ minHeight: '60vh' }}>
      <div className="card" style={{ width: '100%', maxWidth: '400px' }}>
        <h2 className="text-2xl font-bold text-center mb-6">Đăng nhập FPMS</h2>
        
        <form className="flex flex-col gap-4">
          <div>
            <label className="font-semibold text-sm">Email hoặc Số điện thoại</label>
            <input 
              type="text" 
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
          
          <div className="flex justify-between items-center text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" /> Ghi nhớ
            </label>
            <Link to="/forgot-password" style={{ color: 'var(--color-primary)' }}>Quên mật khẩu?</Link>
          </div>
          
          <button type="button" className="btn btn-primary mt-4" style={{ padding: '0.75rem' }}>
            Đăng nhập
          </button>
          
          <div className="text-center text-sm mt-4">
            Chưa có tài khoản? <Link to="/register" className="font-semibold" style={{ color: 'var(--color-primary)' }}>Đăng ký ngay</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

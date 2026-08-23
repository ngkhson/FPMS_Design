import React from 'react';
import { Link } from 'react-router-dom';

const ForgotPassword: React.FC = () => {
  return (
    <div className="flex justify-center items-center" style={{ minHeight: '50vh', padding: '2rem 0' }}>
      <div className="card" style={{ width: '100%', maxWidth: '400px' }}>
        <h2 className="text-2xl font-bold text-center mb-2">Quên mật khẩu?</h2>
        <p className="text-center text-muted text-sm mb-6">Nhập email của bạn và chúng tôi sẽ gửi mã OTP để đặt lại mật khẩu.</p>
        
        <form className="flex flex-col gap-4">
          <div>
            <label className="font-semibold text-sm">Email đăng ký</label>
            <input 
              type="email" 
              className="mt-2 w-full" 
              style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg-base)', color: 'var(--color-text-base)' }}
              placeholder="name@example.com"
            />
          </div>
          
          <button type="button" className="btn btn-primary mt-4" style={{ padding: '0.75rem' }}>
            Gửi mã xác nhận
          </button>
          
          <div className="text-center text-sm mt-4">
            <Link to="/login" className="font-semibold text-muted hover:text-primary transition">Quay lại đăng nhập</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;

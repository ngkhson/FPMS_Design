import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ForgotPassword: React.FC = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-start pt-4">
      <div className="card" style={{ width: '100%', maxWidth: '400px' }}>
        <h2 className="text-2xl font-bold text-center mb-2">
          {step === 1 ? 'Quên mật khẩu?' : 'Tạo mật khẩu mới'}
        </h2>
        <p className="text-center text-muted text-sm mb-6">
          {step === 1 
            ? 'Nhập email của bạn và chúng tôi sẽ gửi mã OTP để đặt lại mật khẩu.' 
            : 'Mã OTP đã được gửi đến email của bạn. Vui lòng kiểm tra và thiết lập lại mật khẩu.'}
        </p>
        
        <form className="flex flex-col gap-4">
          {step === 1 ? (
            <div>
              <label className="font-semibold text-sm">Email đăng ký</label>
              <input 
                type="email" 
                className="mt-2 w-full" 
                style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg-base)', color: 'var(--color-text-base)' }}
                placeholder="name@example.com"
              />
            </div>
          ) : (
            <>
              <div>
                <label className="font-semibold text-sm">Mã OTP</label>
                <input 
                  type="text" 
                  className="mt-2 w-full" 
                  style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg-base)', color: 'var(--color-text-base)', letterSpacing: '4px', textAlign: 'center', fontSize: '1.25rem', fontWeight: 'bold' }}
                  placeholder="------"
                  maxLength={6}
                />
              </div>
              
              <div>
                <label className="font-semibold text-sm">Mật khẩu mới</label>
                <input 
                  type="password" 
                  className="mt-2 w-full" 
                  style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg-base)', color: 'var(--color-text-base)' }}
                  placeholder="••••••••"
                />
              </div>

              <div>
                <label className="font-semibold text-sm">Xác nhận mật khẩu mới</label>
                <input 
                  type="password" 
                  className="mt-2 w-full" 
                  style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg-base)', color: 'var(--color-text-base)' }}
                  placeholder="••••••••"
                />
              </div>
            </>
          )}
          
          {step === 1 ? (
            <button 
              type="button" 
              className="btn btn-primary mt-2" 
              style={{ padding: '0.75rem' }}
              onClick={() => setStep(2)}
            >
              Gửi mã xác nhận
            </button>
          ) : (
            <button 
              type="button" 
              className="btn btn-primary mt-2" 
              style={{ padding: '0.75rem' }}
              onClick={() => navigate('/login')}
            >
              Đặt lại mật khẩu
            </button>
          )}
          
          <div className="text-center text-sm mt-2">
            <Link to="/login" className="font-semibold text-muted hover:text-primary transition">Quay lại đăng nhập</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;

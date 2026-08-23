import React from 'react';
import { Calendar, CreditCard, Ticket, Search, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="animate-fade-in">
      {/* 1. Hero Section */}
      <section className="hero-section" style={{ minHeight: '65vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginBottom: '4rem', background: 'linear-gradient(135deg, rgba(16,185,129,0.9) 0%, rgba(5,150,105,0.95) 100%), url("https://images.unsplash.com/photo-1518605368461-1ee7e53f0b2f?q=80&w=2070&auto=format&fit=crop") center/cover no-repeat' }}>
        <div className="container">
          <div className="inline-block mb-6 px-4 py-1.5 rounded-full" style={{ backgroundColor: 'rgba(255, 255, 255, 0.15)', border: '1px solid rgba(255, 255, 255, 0.2)', fontSize: '0.875rem' }}>
            ⚡ Đặt sân — Thanh toán — Nhận vé QR chỉ trong 2 phút
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Đặt sân bóng đá<br/>trực tuyến dễ dàng
          </h1>
          
          <p className="text-lg md:text-xl opacity-90 mb-12 max-w-2xl mx-auto">
            Tìm sân trống, chọn giờ, thanh toán tiền cọc online và nhận vé QR điện tử ngay tức thì.
          </p>
          
          <button 
            className="btn btn-primary shadow-lg hover:shadow-xl transition-shadow text-lg px-8 py-4 rounded-full"
            style={{ backgroundColor: 'white', color: 'var(--color-primary-hover)', border: 'none' }}
            onClick={() => navigate('/book-pitch')}
          >
            <Search size={20} className="mr-2" /> Đặt sân ngay
          </button>
        </div>
      </section>

      <div className="container">
        {/* Stats */}
        <div className="flex justify-center gap-12 text-center mb-16">
          <div>
            <div className="text-3xl font-bold" style={{ color: 'var(--color-primary)' }}>24+</div>
            <div className="text-sm text-muted font-medium">Sân bóng</div>
          </div>
          <div>
            <div className="text-3xl font-bold" style={{ color: 'var(--color-primary)' }}>2.8K+</div>
            <div className="text-sm text-muted font-medium">Lượt đặt</div>
          </div>
          <div>
            <div className="text-3xl font-bold flex items-center justify-center gap-1" style={{ color: 'var(--color-primary)' }}>
              4.9<Star size={24} className="fill-warning text-warning" />
            </div>
            <div className="text-sm text-muted font-medium">Đánh giá</div>
          </div>
        </div>
      </div>

      {/* 2. Features Section */}
      <section className="container mb-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Tại sao chọn FPMS?</h2>
          <p className="text-muted">Giải pháp đặt sân bóng số 1, được hàng nghìn team tin dùng</p>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <Calendar size={48} />
            </div>
            <h3 className="text-xl font-bold mb-3">Đặt lịch trực quan</h3>
            <p className="text-sm text-muted leading-relaxed">
              Chọn sân bằng bảng trực quan theo thời gian. Thấy ngay slot nào còn trống, click là đặt.
            </p>
          </div>
          
          <div className="feature-card highlight" style={{ backgroundColor: 'var(--color-primary-light)', borderColor: 'var(--color-primary)' }}>
            <div className="feature-icon-wrapper">
              <CreditCard size={48} />
            </div>
            <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--color-primary-hover)' }}>Thanh toán VNPAY</h3>
            <p className="text-sm text-muted leading-relaxed">
              Đặt cọc 30% qua VNPAY QR an toàn. Xác nhận tức thì, nhận vé ngay mà không cần chờ đợi.
            </p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <Ticket size={48} />
            </div>
            <h3 className="text-xl font-bold mb-3">Vé QR điện tử</h3>
            <p className="text-sm text-muted leading-relaxed">
              Mỗi đơn đặt có mã QR riêng. Nhân viên quét mã nhận sân trong vài giây, không cần giấy tờ.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

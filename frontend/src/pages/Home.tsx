import React, { useState } from 'react';
import { Calendar, CreditCard, Smartphone, Search, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [pitchType, setPitchType] = useState('all');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const handleSearch = () => {
    navigate(`/book-pitch?type=${pitchType}&date=${date}`);
  };

  return (
    <div className="animate-fade-in -mt-8">
      {/* 1. Hero Section */}
      <section className="text-white text-center rounded-none mb-0 pt-24 px-4 pb-32 relative overflow-hidden flex flex-col items-center justify-center min-h-[65vh]" style={{ marginBottom: '4rem', background: 'linear-gradient(135deg, rgba(5,150,105,0.9) 0%, rgba(16,185,129,0.85) 50%, rgba(6,182,212,0.9) 100%), url("https://images.unsplash.com/photo-1518605368461-1ee7e53f0b2f?q=80&w=2070&auto=format&fit=crop") center/cover no-repeat' }}>
        <div className="max-w-[1200px] mx-auto px-4 w-full">
          <div className="inline-block mb-6 px-4 py-1.5 rounded-full text-sm" style={{ backgroundColor: 'rgba(255, 255, 255, 0.15)', border: '1px solid rgba(255, 255, 255, 0.2)' }}>
            ⚡ Đặt sân — Thanh toán — Xác nhận đơn chỉ trong 2 phút
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 mt-4 md:mt-0 px-2 leading-tight">
            Đặt sân bóng đá<br className="hidden md:block" /> trực tuyến dễ dàng
          </h1>

          <p className="text-lg md:text-xl opacity-90 mb-12 max-w-2xl mx-auto">
            Tìm sân trống, chọn giờ, thanh toán tiền cọc online và nhận thông báo xác nhận ngay tức thì.
          </p>

          <div className="flex flex-col md:flex-row bg-white max-w-[850px] mx-auto shadow-lg text-text-base rounded-xl md:rounded-full md:p-2">
            {/* Pitch Type */}
            <div
              className="flex-1 flex justify-between md:justify-center items-center py-4 px-6 md:py-3 cursor-pointer hover:bg-bg-base transition-colors md:min-w-[260px] border-b md:border-b-0 md:border-r border-border rounded-t-xl md:rounded-none md:rounded-l-full"
              onClick={() => {
                const select = document.getElementById('home-pitch-type') as HTMLSelectElement;
                if (select) select.focus();
              }}
            >
              <label className="text-sm font-medium text-text-muted whitespace-nowrap cursor-pointer">Loại sân:</label>
              <select
                id="home-pitch-type"
                value={pitchType}
                onChange={e => setPitchType(e.target.value)}
                className="flex-1 bg-transparent border-none outline-none text-right md:text-center font-bold text-base text-text-base cursor-pointer appearance-none ml-2"
                style={{ textAlignLast: 'center' }}
              >
                <option value="all">Tìm tất cả các sân</option>
                <option value="5">Sân 5 người</option>
                <option value="7">Sân 7 người</option>
              </select>
            </div>

            {/* Date */}
            <div
              className="flex-1 flex justify-between md:justify-center items-center py-4 px-6 md:py-3 cursor-pointer hover:bg-bg-base transition-colors md:min-w-[260px]"
              onClick={() => {
                const input = document.getElementById('home-date-picker') as HTMLInputElement;
                if (input && 'showPicker' in HTMLInputElement.prototype) {
                  try { input.showPicker(); } catch (e) { }
                }
              }}
            >
              <label className="text-sm font-medium text-text-muted whitespace-nowrap cursor-pointer">Ngày đá:</label>
              <input
                id="home-date-picker"
                type="date"
                value={date}
                onChange={e => setDate(e.target.value)}
                className="flex-1 bg-transparent border-none outline-none text-right md:text-center font-bold text-base text-text-base cursor-pointer ml-2 appearance-none [&::-webkit-calendar-picker-indicator]:hidden"
                onClick={(e) => {
                  if ('showPicker' in HTMLInputElement.prototype) {
                    try { (e.target as HTMLInputElement).showPicker(); } catch (err) { }
                  }
                }}
              />
            </div>

            {/* Submit Button */}
            <button
              className="btn btn-primary flex justify-center items-center py-4 px-10 text-lg rounded-b-xl md:rounded-full w-full md:w-auto md:ml-2 shadow-md hover:shadow-lg transition-all"
              onClick={handleSearch}
            >
              <Search size={20} className="mr-2" /> Tìm sân
            </button>
          </div>
        </div>
      </section>

      <div className="max-w-[1200px] mx-auto px-4 w-full">
        {/* Stats */}
        <div className="flex justify-center items-center gap-4 md:gap-12 text-center mb-16 px-2">
          <div className="flex-1">
            <div className="text-2xl md:text-3xl font-bold text-primary">24+</div>
            <div className="text-xs md:text-sm text-slate-500 font-medium">Sân bóng</div>
          </div>
          <div className="flex-1">
            <div className="text-2xl md:text-3xl font-bold text-primary">2.8K+</div>
            <div className="text-xs md:text-sm text-slate-500 font-medium">Lượt đặt</div>
          </div>
          <div className="flex-1">
            <div className="text-2xl md:text-3xl font-bold text-primary">4.9/5</div>
            <div className="text-xs md:text-sm text-slate-500 font-medium">Đánh giá</div>
          </div>
        </div>
      </div>

      {/* 2. Features Section */}
      <section className="max-w-[1200px] mx-auto px-4 w-full mb-24">
        {/* Features */}
        <div className="mb-24">
          <h2 className="text-3xl font-bold text-center mb-12">Tại sao chọn Soccer365?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center p-10 text-center bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all">
              <div className="flex justify-center items-center text-primary mb-6">
                <Calendar size={48} strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-bold mb-3">Đặt Sân Nhanh Chóng</h3>
              <p className="text-slate-500">Xem lịch trống theo thời gian thực và đặt sân chỉ với vài cú click chuột.</p>
            </div>
            
            <div className="flex flex-col items-center p-10 text-center bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all">
              <div className="flex justify-center items-center text-primary mb-6">
                <CreditCard size={48} strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-bold mb-3">Thanh Toán Dễ Dàng</h3>
              <p className="text-slate-500">Hỗ trợ thanh toán online an toàn qua chuyển khoản ngân hàng hoặc ví điện tử.</p>
            </div>
            
            <div className="flex flex-col items-center p-10 text-center bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all">
              <div className="flex justify-center items-center text-primary mb-6">
                <Smartphone size={48} strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-bold mb-3">Quản Lý Tiện Lợi</h3>
              <p className="text-slate-500">Theo dõi đơn đặt sân, nhận thông báo nhắc nhở trực tiếp trên điện thoại của bạn.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

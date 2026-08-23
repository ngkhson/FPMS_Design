import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockPitches, mockTimeSlots } from '../mocks/mockData';
import { CreditCard, CheckCircle, ArrowLeft } from 'lucide-react';

const Checkout: React.FC = () => {
  const { pitchId, timeSlotId } = useParams<{ pitchId: string, timeSlotId: string }>();
  const navigate = useNavigate();

  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const pitch = mockPitches.find(p => p.id === pitchId);
  const slot = mockTimeSlots.find(t => t.id === timeSlotId);

  if (!pitch || !slot) {
    return <div className="text-center mt-8 text-danger">Không tìm thấy thông tin sân hoặc khung giờ!</div>;
  }

  const depositRatio = 0.3; // 30% cọc
  const depositAmount = slot.basePrice * depositRatio;
  const remainingAmount = slot.basePrice - depositAmount;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const handlePayment = () => {
    setIsProcessing(true);
    // Giả lập gọi API thanh toán
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
    }, 1500);
  };

  if (isSuccess) {
    return (
      <div className="flex justify-center mt-8">
        <div className="card text-center" style={{ maxWidth: 500, width: '100%' }}>
          <CheckCircle size={64} className="text-success mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Thanh toán thành công!</h2>
          <p className="text-muted mb-6">Đơn đặt sân của bạn đã được xác nhận (CONFIRMED).</p>
          <div className="p-4 mb-6 text-left" style={{ backgroundColor: 'var(--color-bg-base)', borderRadius: 'var(--radius-md)' }}>
            <div className="flex justify-between mb-2">
              <span className="text-muted">Sân:</span>
              <span className="font-semibold">{pitch.name}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-muted">Khung giờ:</span>
              <span className="font-semibold">{slot.startTime} - {slot.endTime}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">Đã cọc:</span>
              <span className="font-semibold text-primary">{formatPrice(depositAmount)}</span>
            </div>
          </div>
          <button className="btn btn-primary w-full" onClick={() => navigate('/my-bookings')}>
            Xem Đơn Đặt Sân Của Tôi
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto pt-8 px-4 pb-12">
      <button 
        className="flex items-center gap-2 text-muted hover:text-primary transition-all mb-4" 
        onClick={() => navigate(-1)}
        style={{ fontWeight: 500 }}
      >
        <ArrowLeft size={18} /> Quay lại
      </button>

      <div 
        className="mb-8 shadow-lg relative overflow-hidden"
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
          <CheckCircle size={36} />
          <span>Xác nhận đặt sân</span>
        </h1>
        <p className="text-lg" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>Vui lòng kiểm tra kỹ thông tin và tiến hành thanh toán.</p>
      </div>

      <div className="grid grid-cols-auto gap-8" style={{ gridTemplateColumns: '1fr 400px' }}>
        {/* Cột trái: Form thông tin người đặt */}
        <div className="card flex flex-col">
          <h2 className="text-xl font-semibold mb-4 pb-2" style={{ borderBottom: '1px solid var(--color-border)' }}>Thông tin người đặt</h2>
          <form className="flex flex-col gap-4 flex-grow">
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
            <div className="flex-grow flex flex-col">
              <label className="font-semibold text-sm">Ghi chú (Tùy chọn)</label>
              <textarea className="mt-2 w-full flex-grow mb-4" style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg-base)', color: 'var(--color-text-base)', minHeight: '120px' }} placeholder="Yêu cầu thêm (VD: thuê bóng, áo bib, nước suối...)" />
            </div>

            <div className="p-4 rounded-lg text-sm mb-4" style={{ backgroundColor: 'var(--color-bg-base)', border: '1px dashed var(--color-border)' }}>
              <strong style={{ color: 'var(--color-primary)' }}>Lưu ý:</strong> Bạn có thể hủy đặt sân miễn phí trước 24h so với giờ bắt đầu để được hoàn lại 100% tiền cọc.
            </div>

            <button
              type="button"
              className="btn btn-primary w-full flex items-center justify-center gap-2 mt-auto"
              style={{ padding: '1rem', fontSize: '1rem' }}
              onClick={handlePayment}
              disabled={isProcessing}
            >
              {isProcessing ? 'Đang xử lý...' : <><CreditCard size={20} /> Thanh toán {formatPrice(depositAmount)}</>}
            </button>

            <p className="text-xs text-center text-muted">
              Bằng việc bấm Thanh toán, bạn đồng ý với Điều khoản đặt sân của chúng tôi.
            </p>
          </form>
        </div>

        {/* Cột phải: Hóa đơn & Thanh toán */}
        <div className="card flex flex-col justify-between">
          <h2 className="text-xl font-semibold mb-4 pb-2" style={{ borderBottom: '1px solid var(--color-border)' }}>Chi tiết đơn đặt sân</h2>

          <div className="flex flex-col gap-2 mb-6 p-4 rounded-lg" style={{ backgroundColor: 'var(--color-bg-base)' }}>
            <h3 className="font-bold text-lg" style={{ color: 'var(--color-primary)' }}>{pitch.name}</h3>
          </div>

          <div className="flex justify-between mb-3 text-sm items-center">
            <span className="text-muted">Ngày đá:</span>
            <span className="font-semibold px-2 py-1 bg-base rounded">Hôm nay</span>
          </div>
          <div className="flex justify-between mb-3 text-sm items-center">
            <span className="text-muted">Khung giờ:</span>
            <span className="font-bold">{slot.startTime} - {slot.endTime}</span>
          </div>
          <div className="flex justify-between mb-3 text-sm items-center">
            <span className="text-muted">Loại sân:</span>
            <span className="font-semibold">{pitch.type}</span>
          </div>

          <hr style={{ borderColor: 'var(--color-border)', margin: '1.5rem 0' }} />

          <div className="flex justify-between mb-3 text-sm">
            <span className="text-muted">Tiền thuê sân:</span>
            <span className="font-semibold">{formatPrice(slot.basePrice)}</span>
          </div>

          {slot.isPeak && (
            <div className="flex justify-between mb-3 text-sm">
              <span className="text-muted">Phụ phí giờ vàng:</span>
              <span className="badge badge-warning">Đã bao gồm</span>
            </div>
          )}

          <div className="flex justify-between mt-4 mb-2 p-4 rounded-lg" style={{ backgroundColor: 'var(--color-primary-light)' }}>
            <span className="font-semibold" style={{ color: 'var(--color-primary)' }}>Cần đặt cọc (30%):</span>
            <span className="font-bold text-lg" style={{ color: 'var(--color-primary)' }}>{formatPrice(depositAmount)}</span>
          </div>
          <div className="flex justify-between mt-4 mb-2 px-2 text-sm">
            <span className="text-muted">Còn lại thanh toán tại sân:</span>
            <span className="font-semibold text-warning">{formatPrice(remainingAmount)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

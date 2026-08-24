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
        <h1 className="text-2xl md:text-4xl font-bold mb-3 flex items-center justify-center gap-2 md:gap-3">
          <CheckCircle size={32} />
          <span>Xác nhận đặt sân</span>
        </h1>
        <p className="text-base md:text-lg text-muted">[ Đoạn mô tả phụ ]</p>
      </div>

      <div className="checkout-grid gap-6 md:gap-8">
        {/* Cột trái: Hóa đơn & Thanh toán */}
        <div className="card flex flex-col justify-between checkout-invoice">
          <h2 className="text-xl font-semibold mb-4 pb-2" style={{ borderBottom: '1px solid var(--color-border)' }}>Chi tiết đơn đặt sân</h2>

          <div className="flex flex-col gap-2 mb-6 p-4 rounded-lg" style={{ backgroundColor: 'var(--color-bg-base)' }}>
            <h3 className="font-bold text-lg" style={{ color: 'var(--color-primary)' }}>[ Tên sân ]</h3>
          </div>

          <div className="flex justify-between mb-3 text-sm items-center">
            <span className="text-muted">Ngày đá:</span>
            <span className="font-semibold px-2 py-1 bg-base rounded">[ Ngày ]</span>
          </div>
          <div className="flex justify-between mb-3 text-sm items-center">
            <span className="text-muted">Khung giờ:</span>
            <span className="font-bold">[ Khung giờ ]</span>
          </div>
          <div className="flex justify-between mb-3 text-sm items-center">
            <span className="text-muted">Loại sân:</span>
            <span className="font-semibold">[ Loại sân ]</span>
          </div>

          <hr style={{ borderColor: 'var(--color-border)', margin: '1.5rem 0' }} />

          <div className="flex justify-between mb-3 text-sm">
            <span className="text-muted">Tiền thuê sân:</span>
            <span className="font-semibold">[ Số tiền ]</span>
          </div>

          {slot.isPeak && (
            <div className="flex justify-between mb-3 text-sm">
              <span className="text-muted">Phụ phí giờ vàng:</span>
              <span className="badge badge-warning">Đã bao gồm</span>
            </div>
          )}

          <div className="flex justify-between mt-4 mb-2 p-4 rounded-lg" style={{ backgroundColor: 'var(--color-primary-light)' }}>
            <span className="font-semibold" style={{ color: 'var(--color-primary)' }}>Cần đặt cọc (30%):</span>
            <span className="font-bold text-lg" style={{ color: 'var(--color-primary)' }}>[ Số tiền ]</span>
          </div>
          <div className="flex justify-between mt-4 mb-2 px-2 text-sm">
            <span className="text-muted">Còn lại thanh toán tại sân:</span>
            <span className="font-semibold text-warning">[ Số tiền ]</span>
          </div>
        </div>

        {/* Cột phải: Form thông tin người đặt */}
        <div className="card flex flex-col checkout-form">
          <h2 className="text-xl font-semibold mb-4 pb-2" style={{ borderBottom: '1px solid var(--color-border)' }}>Thông tin người đặt</h2>
          <form className="flex flex-col gap-4 flex-grow">
            <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
              <div>
                <label className="font-semibold text-sm">Họ và tên</label>
                <input type="text" className="mt-2 w-full" style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg-base)', color: 'var(--color-text-base)' }} placeholder="[ Nhập họ tên... ]" />
              </div>
              <div>
                <label className="font-semibold text-sm">Số điện thoại</label>
                <input type="text" className="mt-2 w-full" style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg-base)', color: 'var(--color-text-base)' }} placeholder="[ Nhập số điện thoại... ]" />
              </div>
            </div>
            <div className="flex-grow flex flex-col">
              <label className="font-semibold text-sm">Ghi chú (Tùy chọn)</label>
              <textarea className="mt-2 w-full flex-grow mb-4" style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg-base)', color: 'var(--color-text-base)', minHeight: '120px' }} placeholder="Yêu cầu thêm (VD: thuê bóng, áo bib, nước suối...)" />
            </div>

            <div className="p-4 rounded-lg text-sm mb-4" style={{ backgroundColor: 'var(--color-bg-base)', border: '1px dashed var(--color-border)' }}>
              <strong style={{ color: 'var(--color-primary)' }}>Lưu ý:</strong> [ Ghi chú/Lưu ý phụ ]
            </div>

            <button
              type="button"
              className="btn btn-primary w-full flex items-center justify-center gap-2 mt-auto"
              style={{ padding: '1rem', fontSize: '1rem' }}
              onClick={handlePayment}
              disabled={isProcessing}
            >
              {isProcessing ? 'Đang xử lý...' : <><CreditCard size={20} /> Thanh toán [ Số tiền ]</>}
            </button>

            <p className="text-xs text-center text-muted">
              [ Văn bản thông báo nhỏ ]
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

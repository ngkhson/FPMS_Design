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
    <div className="max-w-3xl mx-auto mt-4">
      <button className="btn btn-secondary mb-6" onClick={() => navigate(-1)}>
        <ArrowLeft size={18} /> Quay lại
      </button>
      
      <div className="grid grid-cols-auto gap-6" style={{ gridTemplateColumns: '1fr 350px' }}>
        {/* Cột trái: Form thông tin người đặt */}
        <div className="card">
          <h2 className="text-xl font-semibold mb-6">Thông tin người đặt</h2>
          <form className="flex flex-col gap-4">
            <div>
              <label className="font-semibold text-sm">Họ và tên</label>
              <input type="text" className="mt-2 w-full" style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg-base)', color: 'var(--color-text-base)' }} defaultValue="Nguyễn Văn A" />
            </div>
            <div>
              <label className="font-semibold text-sm">Số điện thoại</label>
              <input type="text" className="mt-2 w-full" style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg-base)', color: 'var(--color-text-base)' }} defaultValue="0987654321" />
            </div>
            <div>
              <label className="font-semibold text-sm">Ghi chú (Tùy chọn)</label>
              <textarea className="mt-2 w-full" style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg-base)', color: 'var(--color-text-base)' }} rows={3} placeholder="Yêu cầu thêm (VD: thuê bóng, áo bib...)" />
            </div>
          </form>
        </div>
        
        {/* Cột phải: Hóa đơn & Thanh toán */}
        <div className="card h-fit">
          <h2 className="text-xl font-semibold mb-6">Chi tiết đơn</h2>
          
          <div className="flex justify-between mb-3 text-sm">
            <span className="text-muted">Sân bóng:</span>
            <span className="font-semibold">{pitch.name}</span>
          </div>
          <div className="flex justify-between mb-3 text-sm">
            <span className="text-muted">Khung giờ:</span>
            <span className="font-semibold">{slot.startTime} - {slot.endTime}</span>
          </div>
          {slot.isPeak && (
            <div className="flex justify-between mb-3 text-sm">
              <span className="text-muted">Phụ phí:</span>
              <span className="badge badge-warning">Giờ vàng</span>
            </div>
          )}
          
          <hr style={{ borderColor: 'var(--color-border)', margin: '1rem 0' }} />
          
          <div className="flex justify-between mb-3 text-sm">
            <span className="text-muted">Tổng tiền sân:</span>
            <span className="font-semibold">{formatPrice(slot.basePrice)}</span>
          </div>
          <div className="flex justify-between mb-3 text-sm">
            <span className="text-muted">Cần thanh toán cọc (30%):</span>
            <span className="font-bold text-lg text-primary">{formatPrice(depositAmount)}</span>
          </div>
          <div className="flex justify-between mb-6 text-sm">
            <span className="text-muted">Thanh toán tại sân:</span>
            <span className="font-semibold text-warning">{formatPrice(remainingAmount)}</span>
          </div>
          
          <button 
            className="btn btn-primary w-full py-3" 
            style={{ padding: '1rem', fontSize: '1rem' }}
            onClick={handlePayment}
            disabled={isProcessing}
          >
            {isProcessing ? 'Đang xử lý...' : <><CreditCard size={20} /> Thanh toán VNPAY</>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

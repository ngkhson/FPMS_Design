import React, { useState } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { mockPitches, mockTimeSlots } from '../mocks/mockData';
import { CreditCard, CheckCircle, ArrowLeft, XCircle, AlertTriangle, RefreshCw } from 'lucide-react';

const Checkout: React.FC = () => {
  const { pitchId, timeSlotId } = useParams<{ pitchId: string, timeSlotId: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [paymentStatus, setPaymentStatus] = useState<'IDLE' | 'SUCCESS' | 'FAILED'>(() => {
    const statusParam = searchParams.get('status');
    if (statusParam === 'failed' || statusParam === 'error') return 'FAILED';
    if (statusParam === 'success') return 'SUCCESS';
    return 'IDLE';
  });
  const [isProcessing, setIsProcessing] = useState(false);

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

  const handlePaymentSuccess = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentStatus('SUCCESS');
    }, 1200);
  };

  const handlePaymentFailed = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentStatus('FAILED');
    }, 1200);
  };

  // 1. Màn hình Thanh toán thành công (CONFIRMED)
  if (paymentStatus === 'SUCCESS') {
    return (
      <div className="flex justify-center mt-8 px-4">
        <div className="card text-center shadow-xl animate-fade-in" style={{ maxWidth: 520, width: '100%', border: '1.5px solid var(--color-border)' }}>
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: 'rgba(34, 197, 94, 0.12)', color: 'var(--color-success)' }}>
            <CheckCircle size={40} />
          </div>
          <h2 className="text-2xl font-bold mb-2">Thanh toán cọc thành công!</h2>
          <p className="text-muted mb-6">Đơn đặt sân của bạn đã được xác nhận vào hệ thống (CONFIRMED).</p>

          <div className="p-4 mb-6 text-left" style={{ backgroundColor: 'var(--color-bg-base)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
            <div className="flex justify-between mb-2">
              <span className="text-muted">Sân bóng:</span>
              <span className="font-semibold">{pitch.name} ({pitch.type} người)</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-muted">Khung giờ:</span>
              <span className="font-semibold">{slot.startTime} - {slot.endTime}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-muted">Tiền cọc đã thanh toán (30%):</span>
              <span className="font-bold text-primary">{formatPrice(depositAmount)}</span>
            </div>
            <div className="flex justify-between pt-2 border-t" style={{ borderColor: 'var(--color-border)' }}>
              <span className="text-muted">Số tiền còn lại (trả tại sân):</span>
              <span className="font-semibold text-warning">{formatPrice(remainingAmount)}</span>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <button className="btn btn-primary w-full py-3" onClick={() => navigate('/my-bookings')}>
              Xem Đơn Đặt Sân Của Tôi
            </button>
            <button className="btn btn-secondary w-full" onClick={() => navigate('/book-pitch')}>
              Đặt thêm sân khác
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 2. Màn hình Thanh toán thất bại / Lỗi thanh toán
  if (paymentStatus === 'FAILED') {
    return (
      <div className="flex justify-center mt-8 px-4">
        <div className="card text-center shadow-xl animate-fade-in" style={{ maxWidth: 520, width: '100%', border: '1.5px solid var(--color-danger)' }}>
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: 'rgba(239, 68, 68, 0.12)', color: 'var(--color-danger)' }}>
            <XCircle size={40} />
          </div>
          <h2 className="text-2xl font-bold mb-2 text-danger">Thanh toán không thành công!</h2>
          <p className="text-muted mb-6">Giao dịch thanh toán tiền cọc chưa được hoàn tất hoặc đã bị hủy.</p>

          <div className="p-4 mb-6 text-left" style={{ backgroundColor: 'var(--color-bg-base)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
            <div className="flex justify-between mb-2">
              <span className="text-muted">Sân bóng:</span>
              <span className="font-semibold">{pitch.name}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-muted">Khung giờ:</span>
              <span className="font-semibold">{slot.startTime} - {slot.endTime}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-muted">Tiền cọc cần thanh toán:</span>
              <span className="font-bold text-danger">{formatPrice(depositAmount)}</span>
            </div>
            <div className="flex justify-between pt-2 border-t text-sm" style={{ borderColor: 'var(--color-border)' }}>
              <span className="text-muted">Lý do thất bại:</span>
              <span className="font-medium text-danger">Giao dịch bị từ chối / Hết thời gian chờ thanh toán</span>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <button className="btn btn-primary w-full py-3 flex items-center justify-center gap-2" onClick={() => setPaymentStatus('IDLE')}>
              <RefreshCw size={18} /> Thử thanh toán lại
            </button>
            <button className="btn btn-secondary w-full" onClick={() => navigate('/')}>
              Đặt sân khác
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 3. Màn hình chính: Xác nhận thông tin & Thanh toán
  return (
    <div className="max-w-[1400px] mx-auto pt-8 px-4 pb-12">
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
        <h1 className="text-2xl md:text-4xl font-bold mb-3 flex items-center justify-center gap-2 md:gap-3 text-white">
          <CheckCircle size={32} />
          <span>Xác nhận đặt sân</span>
        </h1>
        <p className="text-base md:text-lg" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>Vui lòng kiểm tra kỹ thông tin đơn đặt và tiến hành đặt cọc giữ sân.</p>
      </div>

      <div className="checkout-grid gap-6 md:gap-8">
        {/* Cột trái: Hóa đơn & Thanh toán */}
        <div className="card flex flex-col justify-between checkout-invoice">
          <h2 className="text-xl font-semibold mb-4 pb-2" style={{ borderBottom: '1px solid var(--color-border)' }}>Chi tiết đơn đặt sân</h2>

          <div className="flex flex-col gap-2 mb-6 p-4 rounded-lg" style={{ backgroundColor: 'var(--color-bg-base)' }}>
            <h3 className="font-bold text-lg" style={{ color: 'var(--color-primary)' }}>{pitch.name}</h3>
            <span className="text-muted text-sm">{pitch.type === '7' ? 'Sân 7 người tiêu chuẩn' : 'Sân 5 người cỏ nhân tạo cao cấp'}</span>
          </div>

          <div className="flex justify-between mb-3 text-sm items-center">
            <span className="text-muted">Ngày đá:</span>
            <span className="font-semibold px-2 py-1 bg-base rounded">{new Date().toISOString().split('T')[0]}</span>
          </div>
          <div className="flex justify-between mb-3 text-sm items-center">
            <span className="text-muted">Khung giờ:</span>
            <span className="font-bold">{slot.startTime} - {slot.endTime}</span>
          </div>
          <div className="flex justify-between mb-3 text-sm items-center">
            <span className="text-muted">Loại sân:</span>
            <span className="font-semibold">{pitch.type} người</span>
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

          <div className="flex justify-between mt-4 mb-2 p-4 rounded-lg" style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
            <span className="font-semibold" style={{ color: 'var(--color-primary)' }}>Cần đặt cọc (30%):</span>
            <span className="font-bold text-xl" style={{ color: 'var(--color-primary)' }}>{formatPrice(depositAmount)}</span>
          </div>
          <div className="flex justify-between mt-4 mb-2 px-2 text-sm">
            <span className="text-muted">Còn lại thanh toán tại sân:</span>
            <span className="font-semibold text-warning">{formatPrice(remainingAmount)}</span>
          </div>
        </div>

        {/* Cột phải: Form thông tin người đặt */}
        <div className="card flex flex-col checkout-form">
          <h2 className="text-xl font-semibold mb-4 pb-2" style={{ borderBottom: '1px solid var(--color-border)' }}>Thông tin người đặt</h2>
          <form className="flex flex-col gap-4 flex-grow">
            <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
              <div>
                <label className="font-semibold text-sm">Họ và tên (*)</label>
                <input type="text" className="mt-2 w-full" defaultValue="Nguyễn Văn A" style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg-base)', color: 'var(--color-text-base)' }} placeholder="Nhập họ tên..." />
              </div>
              <div>
                <label className="font-semibold text-sm">Số điện thoại (*)</label>
                <input type="text" className="mt-2 w-full" defaultValue="0987654321" style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg-base)', color: 'var(--color-text-base)' }} placeholder="Nhập số điện thoại..." />
              </div>
            </div>
            <div className="flex-grow flex flex-col">
              <label className="font-semibold text-sm">Ghi chú (Tùy chọn)</label>
              <textarea className="mt-2 w-full flex-grow mb-4" style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg-base)', color: 'var(--color-text-base)', minHeight: '100px' }} placeholder="Yêu cầu thêm (VD: thuê bóng, áo bib, nước suối...)" />
            </div>

            <div className="p-4 rounded-lg text-sm mb-4" style={{ backgroundColor: 'rgba(59, 130, 246, 0.05)', border: '1px dashed var(--color-border)' }}>
              <strong style={{ color: 'var(--color-primary)' }}>Lưu ý:</strong> Vui lòng hoàn tất thanh toán cọc trong vòng 10 phút để giữ khung giờ sân.
            </div>

            <div className="flex flex-col gap-2 mt-auto">
              <button
                type="button"
                className="btn btn-primary w-full flex items-center justify-center gap-2"
                style={{ padding: '1rem', fontSize: '1rem' }}
                onClick={handlePaymentSuccess}
                disabled={isProcessing}
              >
                {isProcessing ? 'Đang kết nối cổng thanh toán...' : <><CreditCard size={20} /> Thanh toán cọc {formatPrice(depositAmount)}</>}
              </button>

              <button
                type="button"
                className="btn btn-secondary w-full text-xs py-2"
                onClick={handlePaymentFailed}
                disabled={isProcessing}
                title="Mô phỏng trường hợp cổng thanh toán trả về lỗi"
              >
                [ Mô phỏng: Thanh toán thất bại / Lỗi ]
              </button>
            </div>

            <p className="text-xs text-center text-muted mt-1">
              Bằng việc nhấn Thanh toán, bạn đồng ý với Điều khoản đặt sân của Soccer365.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

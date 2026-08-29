import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { mockBookings as initialBookings, mockPitches, mockTimeSlots, type Booking } from '../mocks/mockData';
import { Search, X, AlertTriangle, CheckCircle, CreditCard, Clock, AlertCircle, Info, ShieldAlert, Check } from 'lucide-react';

const MyBookings: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);
  const [activeTab, setActiveTab] = useState('ALL'); // ALL, UPCOMING, HISTORY
  const [searchTerm, setSearchTerm] = useState('');

  // Modal states
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  // Cancellation form states (UC010.3)
  const [cancelReason, setCancelReason] = useState('');
  const [cancelError, setCancelError] = useState<string | null>(null);
  const [successToast, setSuccessToast] = useState<{ id: string; message: string } | null>(null);

  // Quick reason chips for fast selection
  const quickReasons = [
    'Bận việc đột xuất',
    'Thời tiết xấu / Mưa bão',
    'Đổi lịch thi đấu với đối thủ',
    'Không đủ thành viên tham gia',
    'Đặt nhầm sân / khung giờ'
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'PENDING':
        return <span className="badge badge-secondary" style={{ backgroundColor: 'rgba(100, 116, 139, 0.1)', color: 'var(--color-text-base)' }}>Chờ xác nhận</span>;
      case 'CONFIRMED':
        return <span className="badge badge-success">Đã xác nhận</span>;
      case 'IN_PROGRESS':
        return <span className="badge badge-warning">Đang sử dụng sân</span>;
      case 'COMPLETED':
        return <span className="badge badge-success" style={{ backgroundColor: 'rgba(59, 130, 246, 0.15)', color: 'var(--color-secondary)' }}>Hoàn thành</span>;
      case 'PENDING_CANCEL':
        return <span className="badge badge-warning" style={{ backgroundColor: 'rgba(245, 158, 11, 0.15)', color: 'var(--color-warning)' }}>Chờ xác nhận hủy</span>;
      case 'CANCELLED':
        return <span className="badge badge-danger">Đã hủy</span>;
      default:
        return <span className="badge">Chưa rõ</span>;
    }
  };

  // Helper: Check if booking is within cancellation deadline (BR1: Cancellation must be before 24h)
  const checkCancellationEligibility = (booking: Booking): { eligible: boolean; reason?: string } => {
    // BR2: Only CONFIRMED and PENDING bookings can be cancelled
    if (booking.status !== 'CONFIRMED' && booking.status !== 'PENDING') {
      return { eligible: false, reason: 'Đơn không ở trạng thái hợp lệ (Chỉ áp dụng cho đơn Đã xác nhận hoặc Chờ xác nhận).' };
    }

    return { eligible: true };
  };

  const filteredBookings = bookings.filter(b => {
    if (activeTab === 'UPCOMING' && b.status !== 'CONFIRMED' && b.status !== 'IN_PROGRESS' && b.status !== 'PENDING_CANCEL' && b.status !== 'PENDING') return false;
    if (activeTab === 'HISTORY' && b.status !== 'COMPLETED' && b.status !== 'CANCELLED') return false;

    if (searchTerm) {
      if (!b.id.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    }
    return true;
  });

  // 1. Khách hàng nhấn "Hủy đơn"
  const openCancelModal = (booking: Booking) => {
    const eligibility = checkCancellationEligibility(booking);
    if (!eligibility.eligible) {
      alert(eligibility.reason);
      return;
    }
    setSelectedBooking(booking);
    setCancelReason('');
    setCancelError(null);
    setIsCancelModalOpen(true);
  };

  // 3a. Khách hàng nhấn "Hủy bỏ" / đóng form -> Dừng quy trình, giữ nguyên trạng thái
  const closeCancelModal = () => {
    setIsCancelModalOpen(false);
    setSelectedBooking(null);
    setCancelReason('');
    setCancelError(null);
  };

  // 3 & 4 & 5 & 6 & 7: Xử lý Xác nhận hủy đơn
  const handleConfirmCancel = () => {
    if (!selectedBooking) return;

    // 4a. Kiểm tra trạng thái đơn
    if (selectedBooking.status !== 'CONFIRMED') {
      setCancelError('Đơn không ở trạng thái hợp lệ để yêu cầu hủy.');
      return;
    }

    // 3b. Kiểm tra lý do bị để trống (BR3: Bắt buộc nhập lý do hủy)
    if (!cancelReason.trim()) {
      setCancelError('Vui lòng nhập lý do hủy đơn đặt sân.');
      return;
    }

    // 5. Cập nhật trạng thái đơn thành "Chờ xác nhận hủy" (PENDING_CANCEL) và lưu lý do
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')} Hôm nay`;

    setBookings(prev =>
      prev.map(b =>
        b.id === selectedBooking.id
          ? {
              ...b,
              status: 'PENDING_CANCEL',
              cancelReason: cancelReason.trim(),
              cancelRequestedAt: timeStr
            }
          : b
      )
    );

    // 6 & 7. Gửi thông báo đến nhân viên & Hiển thị thông báo gửi yêu cầu thành công
    const cancelledId = selectedBooking.id.toUpperCase();
    closeCancelModal();

    setSuccessToast({
      id: cancelledId,
      message: `Yêu cầu hủy đơn #${cancelledId} đã được gửi thành công đến ban quản lý và đang chờ nhân viên xét duyệt hoàn tiền!`
    });

    // Auto dismiss toast after 6 seconds
    setTimeout(() => {
      setSuccessToast(null);
    }, 6000);
  };

  const openPaymentModal = (booking: Booking) => {
    setSelectedBooking(booking);
    setIsPaymentModalOpen(true);
  };

  const openDetailsModal = (booking: Booking) => {
    setSelectedBooking(booking);
    setIsDetailsModalOpen(true);
  };

  return (
    <div className="max-w-[1400px] mx-auto pt-8 px-4 pb-12">
      {/* Banner */}
      <div
        className="mb-8 shadow-lg"
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
        <h1 className="text-2xl md:text-4xl font-bold mb-3 text-white">
          Quản lý đơn đặt sân
        </h1>
        <p className="text-base md:text-lg" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
          Theo dõi, thanh toán và gửi yêu cầu hủy các lịch đá bóng của bạn.
        </p>
      </div>

      {/* Success Notification Toast (Step 7) */}
      {successToast && (
        <div
          className="mb-6 p-4 rounded-lg flex items-start justify-between animate-fade-in shadow-md"
          style={{
            backgroundColor: 'rgba(16, 185, 129, 0.12)',
            border: '1.5px solid var(--color-success)',
            color: 'var(--color-text-base)'
          }}
        >
          <div className="flex items-start gap-3">
            <div
              className="p-1 rounded-full text-white mt-0.5 flex-shrink-0"
              style={{ backgroundColor: 'var(--color-success)' }}
            >
              <Check size={16} />
            </div>
            <div>
              <h4 className="font-bold text-sm" style={{ color: 'var(--color-success)' }}>
                Gửi yêu cầu hủy đơn thành công!
              </h4>
              <p className="text-sm mt-0.5 text-muted">{successToast.message}</p>
            </div>
          </div>
          <button
            onClick={() => setSuccessToast(null)}
            className="text-muted hover:text-base p-1 transition"
            title="Đóng thông báo"
          >
            <X size={18} />
          </button>
        </div>
      )}

      {/* Main Card */}
      <div className="card mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-4">
          <div className="flex gap-4">
            <button
              className={`font-semibold text-lg px-4 py-2 ${activeTab === 'ALL' ? '' : 'text-muted hover:text-base transition'}`}
              style={activeTab === 'ALL' ? { borderBottom: '2px solid var(--color-primary)', color: 'var(--color-primary)' } : {}}
              onClick={() => setActiveTab('ALL')}
            >
              Tất cả
            </button>
            <button
              className={`font-semibold text-lg px-4 py-2 ${activeTab === 'UPCOMING' ? '' : 'text-muted hover:text-base transition'}`}
              style={activeTab === 'UPCOMING' ? { borderBottom: '2px solid var(--color-primary)', color: 'var(--color-primary)' } : {}}
              onClick={() => setActiveTab('UPCOMING')}
            >
              Sắp tới
            </button>
            <button
              className={`font-semibold text-lg px-4 py-2 ${activeTab === 'HISTORY' ? '' : 'text-muted hover:text-base transition'}`}
              style={activeTab === 'HISTORY' ? { borderBottom: '2px solid var(--color-primary)', color: 'var(--color-primary)' } : {}}
              onClick={() => setActiveTab('HISTORY')}
            >
              Lịch sử
            </button>
          </div>

          <div className="flex items-center gap-2" style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--color-bg-base)', padding: '0.6rem 1rem' }}>
            <Search size={16} className="text-muted" />
            <input
              type="text"
              placeholder="Tìm theo mã đơn..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ background: 'transparent', border: 'none', outline: 'none', color: 'var(--color-text-base)', fontFamily: 'inherit', width: '200px' }}
            />
          </div>
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block" style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                <th className="p-4 font-semibold text-center">Mã đơn</th>
                <th className="p-4 font-semibold text-center">Ngày đá</th>
                <th className="p-4 font-semibold text-center">Sân / Khung giờ</th>
                <th className="p-4 font-semibold text-center">Trạng thái</th>
                <th className="p-4 font-semibold text-center">Tổng tiền</th>
                <th className="p-4 font-semibold text-center">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-muted">
                    Không tìm thấy đơn đặt sân nào phù hợp.
                  </td>
                </tr>
              ) : (
                filteredBookings.map((booking) => {
                  const pitch = mockPitches.find(p => p.id === booking.pitchId);
                  const slot = mockTimeSlots.find(t => t.id === booking.timeSlotId);

                  return (
                    <tr key={booking.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                      <td className="p-4 font-semibold text-center">#{booking.id.toUpperCase()}</td>
                      <td className="p-4 text-center">{booking.date}</td>
                      <td className="p-4 text-center">
                        <div className="font-semibold">{pitch?.name}</div>
                        <div className="text-sm text-muted">{slot?.startTime} - {slot?.endTime}</div>
                      </td>
                      <td className="p-4 text-center">
                        <div className="flex justify-center">{getStatusBadge(booking.status)}</div>
                      </td>
                      <td className="p-4 font-semibold text-center">{formatPrice(slot?.basePrice || 0)}</td>
                      <td className="p-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          {(booking.status === 'CONFIRMED' || booking.status === 'PENDING') && (
                            <button
                              className="btn btn-secondary text-sm hover:border-danger hover:text-danger transition"
                              style={{ borderColor: 'rgba(239, 68, 68, 0.4)' }}
                              onClick={() => openCancelModal(booking)}
                            >
                              Hủy đơn
                            </button>
                          )}
                          {booking.status === 'COMPLETED' && (
                            <button
                              className="btn btn-primary text-sm"
                              style={{ backgroundColor: 'var(--color-secondary)' }}
                              onClick={() => openPaymentModal(booking)}
                            >
                              Thanh toán nốt
                            </button>
                          )}
                          <button
                            className="btn btn-secondary text-sm"
                            onClick={() => openDetailsModal(booking)}
                          >
                            Xem chi tiết
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden flex flex-col gap-4 mt-4">
          {filteredBookings.length === 0 && (
            <div className="text-center p-8 text-muted">Không có đơn đặt sân nào.</div>
          )}
          {filteredBookings.map((booking) => {
            const pitch = mockPitches.find(p => p.id === booking.pitchId);
            const slot = mockTimeSlots.find(t => t.id === booking.timeSlotId);

            return (
              <div
                key={`mobile-${booking.id}`}
                className="flex flex-col gap-3 p-4"
                style={{
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--color-bg-surface)',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                <div className="flex justify-between items-center border-b pb-3" style={{ borderBottomColor: 'var(--color-border)' }}>
                  <span className="font-bold text-lg">#{booking.id.toUpperCase()}</span>
                  {getStatusBadge(booking.status)}
                </div>

                <div className="flex flex-col gap-2 text-sm mt-2">
                  <div className="flex justify-between">
                    <span className="text-muted">Sân bóng:</span>
                    <span className="font-semibold">{pitch?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted">Ngày đá:</span>
                    <span className="font-medium">{booking.date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted">Khung giờ:</span>
                    <span className="font-medium">{slot?.startTime} - {slot?.endTime}</span>
                  </div>
                  <div className="flex justify-between mt-2 pt-3 border-t" style={{ borderTopColor: 'var(--color-border)' }}>
                    <span className="font-semibold text-muted">Tổng tiền:</span>
                    <span className="font-bold text-lg" style={{ color: 'var(--color-primary)' }}>
                      {formatPrice(slot?.basePrice || 0)}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2 mt-4">
                  {(booking.status === 'CONFIRMED' || booking.status === 'PENDING') && (
                    <button
                      className="btn btn-secondary text-sm flex-1 justify-center py-2 hover:border-danger hover:text-danger"
                      style={{ borderColor: 'rgba(239, 68, 68, 0.4)' }}
                      onClick={() => openCancelModal(booking)}
                    >
                      Hủy đơn
                    </button>
                  )}
                  {booking.status === 'COMPLETED' && (
                    <button
                      className="btn btn-primary text-sm flex-1 justify-center py-2"
                      style={{ backgroundColor: 'var(--color-secondary)' }}
                      onClick={() => openPaymentModal(booking)}
                    >
                      Thanh toán nốt
                    </button>
                  )}
                  <button
                    className="btn btn-secondary text-sm flex-1 justify-center py-2"
                    onClick={() => openDetailsModal(booking)}
                  >
                    Xem chi tiết
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. MODAL YÊU CẦU HỦY ĐƠN ĐẶT SÂN (UC010.3) */}
      {/* ========================================================================= */}
      {isCancelModalOpen && selectedBooking && createPortal(
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1000,
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem'
          }}
        >
          <div
            className="card animate-fade-in relative shadow-2xl"
            style={{
              width: '100%',
              maxWidth: '520px',
              maxHeight: '90vh',
              overflowY: 'auto',
              border: '1.5px solid var(--color-border)'
            }}
          >
            {/* Nút đóng (3a) */}
            <button
              className="text-muted hover:text-danger transition"
              onClick={closeCancelModal}
              style={{ position: 'absolute', top: '1.25rem', right: '1.25rem' }}
              title="Đóng"
            >
              <X size={22} />
            </button>

            {/* Header Modal */}
            <div className="flex items-center gap-2 mb-4">
              <div
                className="rounded-full flex items-center justify-center flex-shrink-0"
                style={{ width: '3rem', height: '3rem', backgroundColor: 'rgba(239, 68, 68, 0.12)', color: 'var(--color-danger)' }}
              >
                <AlertTriangle size={24} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-base">Yêu cầu hủy đơn đặt sân</h2>
                <p className="text-xs text-muted">Mã đơn: #{selectedBooking.id.toUpperCase()}</p>
              </div>
            </div>

            {/* Tóm tắt thông tin đơn cần hủy */}
            {(() => {
              const pitch = mockPitches.find(p => p.id === selectedBooking.pitchId);
              const slot = mockTimeSlots.find(t => t.id === selectedBooking.timeSlotId);
              const deposit = (slot?.basePrice || 0) * 0.3;

              return (
                <div
                  className="mb-4 rounded-lg text-sm"
                  style={{
                    backgroundColor: 'var(--color-bg-base)',
                    border: '1px solid var(--color-border)',
                    padding: '0.875rem'
                  }}
                >
                  <div className="flex justify-between py-1">
                    <span className="text-muted">Sân bóng:</span>
                    <span className="font-semibold">{pitch?.name}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-muted">Khung giờ:</span>
                    <span className="font-medium">{selectedBooking.date} ({slot?.startTime} - {slot?.endTime})</span>
                  </div>
                  <div className="flex justify-between py-1 border-t mt-1 pt-1.5" style={{ borderColor: 'var(--color-border)' }}>
                    <span className="text-muted">Tiền cọc đã thanh toán:</span>
                    <span className="font-bold text-danger">{formatPrice(deposit)}</span>
                  </div>
                </div>
              );
            })()}

            {/* Quy tắc nghiệp vụ cảnh báo (BR1 & BR4) */}
            <div
              className="mb-4 rounded-lg text-xs leading-relaxed"
              style={{
                backgroundColor: 'rgba(245, 158, 11, 0.08)',
                border: '1px solid rgba(245, 158, 11, 0.3)',
                color: 'var(--color-text-base)',
                padding: '0.875rem'
              }}
            >
              <div className="flex items-center gap-1.5 font-bold mb-1" style={{ color: 'var(--color-warning)' }}>
                <ShieldAlert size={14} />
                <span>Quy định hủy sân (Chính sách hoàn cọc)</span>
              </div>
              <ul className="list-disc space-y-1 text-muted" style={{ paddingLeft: '1.25rem' }}>
                <li><strong>Thời hạn:</strong> Chỉ hỗ trợ hoàn cọc khi hủy trước ít nhất <strong>24 giờ</strong> so với giờ đá.</li>
                <li><strong>Xét duyệt:</strong> Đơn sẽ chuyển sang <em>"Chờ xác nhận hủy"</em> và được nhân viên kiểm tra, xét duyệt hoàn tiền cọc.</li>
              </ul>
            </div>

            {/* Form nhập lý do hủy (Step 3 & BR3) */}
            <div className="mb-5">
              <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--color-text-base)' }}>
                Lý do hủy đơn <span className="text-danger">(*)</span>
              </label>

              {/* Quick Chips */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.625rem' }}>
                {quickReasons.map((chip, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setCancelReason(chip);
                      setCancelError(null);
                    }}
                    className="text-xs rounded-full transition"
                    style={{
                      padding: '0.375rem 0.875rem',
                      backgroundColor: cancelReason === chip ? 'var(--color-primary)' : 'var(--color-bg-base)',
                      color: cancelReason === chip ? '#ffffff' : 'var(--color-text-base)',
                      border: '1px solid var(--color-border)',
                      cursor: 'pointer',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {chip}
                  </button>
                ))}
              </div>

              <textarea
                rows={3}
                className="w-full rounded-lg text-sm"
                placeholder="Nhập chi tiết lý do bạn muốn hủy đơn đặt sân này (bắt buộc)..."
                value={cancelReason}
                onChange={(e) => {
                  setCancelReason(e.target.value);
                  if (cancelError) setCancelError(null);
                }}
                style={{
                  padding: '0.75rem',
                  backgroundColor: 'var(--color-bg-base)',
                  border: cancelError ? '1.5px solid var(--color-danger)' : '1px solid var(--color-border)',
                  color: 'var(--color-text-base)',
                  outline: 'none',
                  fontFamily: 'inherit',
                  resize: 'none'
                }}
              />

              {/* Thông báo lỗi Luồng 3b & 4a */}
              {cancelError && (
                <div className="flex items-center gap-1.5 text-xs text-danger mt-1.5 font-medium animate-fade-in">
                  <AlertCircle size={14} />
                  <span>{cancelError}</span>
                </div>
              )}
            </div>

            {/* Nút hành động: 3a (Hủy bỏ) & 3 (Xác nhận) */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
              <button
                type="button"
                className="btn btn-secondary"
                style={{ padding: '0.625rem 1.5rem', fontSize: '1rem', borderRadius: 'var(--radius-md)' }}
                onClick={closeCancelModal}
              >
                Hủy bỏ
              </button>
              <button
                type="button"
                className="btn btn-primary"
                style={{ backgroundColor: 'var(--color-danger)', borderColor: 'var(--color-danger)', padding: '0.625rem 1.5rem', fontSize: '1rem', borderRadius: 'var(--radius-md)' }}
                onClick={handleConfirmCancel}
              >
                Xác nhận hủy đơn
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* ========================================================================= */}
      {/* MODAL THANH TOÁN TIỀN NỐT */}
      {/* ========================================================================= */}
      {isPaymentModalOpen && selectedBooking && createPortal(
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1000, backgroundColor: 'rgba(0, 0, 0, 0.6)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div className="card animate-fade-in relative" style={{ width: '100%', maxWidth: '520px', padding: '2rem' }}>
            <button className="text-muted hover:text-danger" onClick={() => setIsPaymentModalOpen(false)} style={{ position: 'absolute', top: '1.25rem', right: '1.25rem' }}>
              <X size={22} />
            </button>
            
            <h2 className="text-2xl font-bold mb-2">Thanh toán hóa đơn</h2>
            <p className="text-sm text-muted mb-6 pb-3" style={{ borderBottom: '1px solid var(--color-border)', lineHeight: '1.6' }}>
              Đơn hàng <strong>#{selectedBooking.id.toUpperCase()}</strong> - Thanh toán phần còn lại sau trận đấu
            </p>

            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <span className="text-muted text-base">Mã đơn:</span>
                <span className="font-bold text-base">#{selectedBooking.id.toUpperCase()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted text-base">Sân bóng:</span>
                <span className="font-semibold text-base">{mockPitches.find(p => p.id === selectedBooking.pitchId)?.name}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted text-base">Ngày đá:</span>
                <span className="font-medium text-base">{selectedBooking.date}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted text-base">Khung giờ:</span>
                <span className="font-medium text-base">
                  {mockTimeSlots.find(t => t.id === selectedBooking.timeSlotId)?.startTime} - {mockTimeSlots.find(t => t.id === selectedBooking.timeSlotId)?.endTime}
                </span>
              </div>

              <hr style={{ borderColor: 'var(--color-border)', width: '100%', margin: '0.5rem 0' }} />

              <div className="flex justify-between items-center">
                <span className="text-muted text-base">Tổng tiền thuê sân:</span>
                <span className="font-semibold text-base">{formatPrice(mockTimeSlots.find(t => t.id === selectedBooking.timeSlotId)?.basePrice || 0)}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted text-base">Đã đặt cọc trước (30%):</span>
                <span className="font-semibold text-base text-primary">{formatPrice((mockTimeSlots.find(t => t.id === selectedBooking.timeSlotId)?.basePrice || 0) * 0.3)}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted text-base">Dịch vụ phát sinh:</span>
                <span className="font-semibold text-base">{formatPrice(0)}</span>
              </div>

              <div className="flex justify-between items-center p-4 mt-2 rounded-lg" style={{ backgroundColor: 'var(--color-bg-base)', border: '1.5px solid var(--color-border)' }}>
                <div>
                  <span className="font-bold block text-base">Số tiền cần thanh toán nốt:</span>
                  <span className="text-xs text-muted mt-0.5 block">70% còn lại sau khi hoàn thành</span>
                </div>
                <span className="font-bold text-2xl text-primary">
                  {formatPrice((mockTimeSlots.find(t => t.id === selectedBooking.timeSlotId)?.basePrice || 0) * 0.7)}
                </span>
              </div>
            </div>

            <div style={{ marginTop: '1.5rem' }}>
              <button
                className="btn btn-primary w-full flex justify-center items-center gap-2"
                style={{ padding: '0.85rem 1.5rem', fontSize: '1rem' }}
                onClick={() => setIsPaymentModalOpen(false)}
              >
                <CreditCard size={20} /> Thanh toán qua VNPAY
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* ========================================================================= */}
      {/* MODAL XEM CHI TIẾT ĐƠN ĐẶT SÂN */}
      {/* ========================================================================= */}
      {isDetailsModalOpen && selectedBooking && createPortal(
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1000, backgroundColor: 'rgba(0, 0, 0, 0.6)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div className="card animate-fade-in relative p-6" style={{ width: '100%', maxWidth: '500px' }}>
            <button className="text-muted hover:text-danger" onClick={() => setIsDetailsModalOpen(false)} style={{ position: 'absolute', top: '0.75rem', right: '0.75rem', padding: '0.5rem' }}>
              <X size={24} />
            </button>
            <h2 className="text-xl font-bold mb-6 pb-2" style={{ borderBottom: '1px solid var(--color-border)' }}>Chi tiết đơn đặt sân</h2>

            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <span className="text-muted">Mã đơn:</span>
                <span className="font-bold">#{selectedBooking.id.toUpperCase()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted">Sân bóng:</span>
                <span className="font-semibold">{mockPitches.find(p => p.id === selectedBooking.pitchId)?.name}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted">Ngày đá:</span>
                <span className="font-semibold">{selectedBooking.date}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted">Khung giờ:</span>
                <span className="font-semibold">
                  {mockTimeSlots.find(t => t.id === selectedBooking.timeSlotId)?.startTime} - {mockTimeSlots.find(t => t.id === selectedBooking.timeSlotId)?.endTime}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted">Trạng thái:</span>
                {getStatusBadge(selectedBooking.status)}
              </div>

              {selectedBooking.status === 'CONFIRMED' && selectedBooking.cancelRejectReason && (
                <div
                  className="rounded-lg text-sm animate-fade-in"
                  style={{
                    backgroundColor: 'rgba(239, 68, 68, 0.08)',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    padding: '0.875rem'
                  }}
                >
                  <div className="flex items-center font-bold mb-1.5" style={{ color: 'var(--color-danger)', gap: '0.375rem' }}>
                    <X size={16} />
                    <span>Yêu cầu hủy đơn đã bị từ chối</span>
                  </div>
                  <div className="text-xs text-muted mb-1">
                    <strong>Lý do từ chối:</strong> <span className="italic">"{selectedBooking.cancelRejectReason}"</span>
                  </div>
                  <div className="text-xs text-muted">
                    Lịch đá của bạn vẫn được giữ nguyên.
                  </div>
                </div>
              )}

              {/* Thông tin hủy đơn nếu có (UC010.3) */}
              {selectedBooking.status === 'PENDING_CANCEL' && (
                <div
                  className="rounded-lg text-sm animate-fade-in"
                  style={{
                    backgroundColor: 'rgba(245, 158, 11, 0.08)',
                    border: '1px solid rgba(245, 158, 11, 0.3)',
                    padding: '0.875rem'
                  }}
                >
                  <div className="flex items-center font-bold mb-1.5" style={{ color: 'var(--color-warning)', gap: '0.375rem' }}>
                    <Clock size={16} />
                    <span>Yêu cầu hủy đang chờ nhân viên xét duyệt</span>
                  </div>
                  <div className="text-xs text-muted mb-1">
                    <strong>Thời gian gửi yêu cầu:</strong> {selectedBooking.cancelRequestedAt || 'Vừa xong'}
                  </div>
                  <div className="text-xs text-muted">
                    <strong>Lý do hủy:</strong> <span className="italic">"{selectedBooking.cancelReason || 'Không có'}"</span>
                  </div>
                </div>
              )}

              {selectedBooking.status === 'CANCELLED' && selectedBooking.cancelReason && (
                <div
                  className="rounded-lg text-sm animate-fade-in"
                  style={{
                    backgroundColor: 'rgba(239, 68, 68, 0.08)',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    padding: '0.875rem'
                  }}
                >
                  <div className="flex items-center font-bold mb-1.5" style={{ color: 'var(--color-danger)', gap: '0.375rem' }}>
                    <Info size={16} />
                    <span>Đơn đã được hủy thành công</span>
                  </div>
                  <div className="text-xs text-muted">
                    <strong>Lý do hủy:</strong> <span className="italic">"{selectedBooking.cancelReason}"</span>
                  </div>
                </div>
              )}

              <hr className="my-1" style={{ borderColor: 'var(--color-border)', width: '100%' }} />

              <div className="flex justify-between items-center">
                <span className="text-muted">Tổng tiền sân:</span>
                <span className="font-semibold">{formatPrice(mockTimeSlots.find(t => t.id === selectedBooking.timeSlotId)?.basePrice || 0)}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted">Đã đặt cọc (30%):</span>
                <span className="text-primary font-semibold">{formatPrice((mockTimeSlots.find(t => t.id === selectedBooking.timeSlotId)?.basePrice || 0) * 0.3)}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted">Còn lại:</span>
                <span className="text-warning font-semibold">{formatPrice((mockTimeSlots.find(t => t.id === selectedBooking.timeSlotId)?.basePrice || 0) * 0.7)}</span>
              </div>
            </div>

            <button className="btn btn-secondary w-full mt-6" onClick={() => setIsDetailsModalOpen(false)}>
              Đóng
            </button>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

export default MyBookings;

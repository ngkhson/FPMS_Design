import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { mockBookings, mockPitches, mockTimeSlots } from '../mocks/mockData';
import { Search, X, AlertTriangle, CheckCircle, CreditCard } from 'lucide-react';

const MyBookings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('ALL'); // ALL, UPCOMING, HISTORY
  const [searchTerm, setSearchTerm] = useState('');

  // Modal states
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [cancelReason, setCancelReason] = useState('');

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'CONFIRMED': return <span className="badge">[ Trạng thái ]</span>;
      case 'IN_PROGRESS': return <span className="badge">[ Trạng thái ]</span>;
      case 'COMPLETED': return <span className="badge">[ Trạng thái ]</span>;
      case 'PENDING_CANCEL': return <span className="badge">[ Trạng thái ]</span>;
      case 'CANCELLED': return <span className="badge">[ Trạng thái ]</span>;
      case 'PENDING': return <span className="badge">[ Trạng thái ]</span>;
      default: return <span className="badge">[ Trạng thái ]</span>;
    }
  };

  const filteredBookings = mockBookings.filter(b => {
    if (activeTab === 'UPCOMING' && b.status !== 'CONFIRMED' && b.status !== 'IN_PROGRESS' && b.status !== 'PENDING_CANCEL' && b.status !== 'PENDING') return false;
    if (activeTab === 'HISTORY' && b.status !== 'COMPLETED' && b.status !== 'CANCELLED') return false;

    if (searchTerm) {
      if (!b.id.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    }
    return true;
  });

  const openCancelModal = (booking: any) => {
    setSelectedBooking(booking);
    setCancelReason('');
    setIsCancelModalOpen(true);
  };

  const openPaymentModal = (booking: any) => {
    setSelectedBooking(booking);
    setIsPaymentModalOpen(true);
  };

  const openDetailsModal = (booking: any) => {
    setSelectedBooking(booking);
    setIsDetailsModalOpen(true);
  };

  return (
    <div className="max-w-5xl mx-auto pt-8 px-4 pb-12">
      <div
        className="mb-8 shadow-lg"
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
        <h1 className="text-2xl md:text-4xl font-bold mb-3">
          Quản lý đơn đặt sân
        </h1>
        <p className="text-base md:text-lg text-muted">[ Đoạn mô tả phụ ]</p>
      </div>

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
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                <th className="p-4 font-semibold">Mã đơn</th>
                <th className="p-4 font-semibold">Ngày đá</th>
                <th className="p-4 font-semibold">Sân / Khung giờ</th>
                <th className="p-4 font-semibold">Trạng thái</th>
                <th className="p-4 font-semibold">Tổng tiền</th>
                <th className="p-4 font-semibold text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map((booking) => {
                const pitch = mockPitches.find(p => p.id === booking.pitchId);
                const slot = mockTimeSlots.find(t => t.id === booking.timeSlotId);

                return (
                  <tr key={booking.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                    <td className="p-4 font-semibold">[ Mã đơn ]</td>
                    <td className="p-4">[ Ngày ]</td>
                    <td className="p-4">
                      <div className="font-semibold">[ Tên sân ]</div>
                      <div className="text-sm text-muted">[ Khung giờ ]</div>
                    </td>
                    <td className="p-4">{getStatusBadge(booking.status)}</td>
                    <td className="p-4 font-semibold">[ Số tiền ]</td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {(booking.status === 'CONFIRMED' || booking.status === 'PENDING') && (
                          <button className="btn btn-secondary text-sm" onClick={() => openCancelModal(booking)}>Huỷ đơn</button>
                        )}
                        {booking.status === 'COMPLETED' && (
                          <button className="btn btn-primary text-sm" style={{ backgroundColor: 'var(--color-secondary)' }} onClick={() => openPaymentModal(booking)}>Thanh toán nốt</button>
                        )}
                        {(booking.status === 'IN_PROGRESS' || booking.status === 'PENDING_CANCEL' || booking.status === 'CANCELLED') && (
                          <button className="btn btn-secondary text-sm" onClick={() => openDetailsModal(booking)}>Xem chi tiết</button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden flex flex-col gap-4 mt-4">
          {filteredBookings.length === 0 && (
            <div className="text-center p-8 text-muted">[ Đoạn mô tả phụ ]</div>
          )}
          {filteredBookings.map((booking) => {
            const pitch = mockPitches.find(p => p.id === booking.pitchId);
            const slot = mockTimeSlots.find(t => t.id === booking.timeSlotId);

            return (
              <div key={`mobile-${booking.id}`} className="flex flex-col gap-3 p-4" style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--color-bg-surface)', boxShadow: 'var(--shadow-sm)' }}>
                <div className="flex justify-between items-center border-b pb-3" style={{ borderBottomColor: 'var(--color-border)' }}>
                  <span className="font-bold text-lg">[ Mã đơn ]</span>
                  {getStatusBadge(booking.status)}
                </div>

                <div className="flex flex-col gap-2 text-sm mt-2">
                  <div className="flex justify-between">
                    <span className="text-muted">Sân bóng:</span>
                    <span className="font-semibold">[ Tên sân ]</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted">Ngày đá:</span>
                    <span className="font-medium">[ Ngày ]</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted">Khung giờ:</span>
                    <span className="font-medium">[ Khung giờ ]</span>
                  </div>
                  <div className="flex justify-between mt-2 pt-3 border-t" style={{ borderTopColor: 'var(--color-border)' }}>
                    <span className="font-semibold text-muted">Tổng tiền:</span>
                    <span className="font-bold text-lg" style={{ color: 'var(--color-primary)' }}>[ Số tiền ]</span>
                  </div>
                </div>

                <div className="flex gap-2 mt-4">
                  {(booking.status === 'CONFIRMED' || booking.status === 'PENDING') && (
                    <button className="btn btn-secondary text-sm flex-1 justify-center py-2" onClick={() => openCancelModal(booking)}>Huỷ đơn</button>
                  )}
                  {booking.status === 'COMPLETED' && (
                    <button className="btn btn-primary text-sm flex-1 justify-center py-2" style={{ backgroundColor: 'var(--color-secondary)' }} onClick={() => openPaymentModal(booking)}>Thanh toán nốt</button>
                  )}
                  {(booking.status === 'IN_PROGRESS' || booking.status === 'PENDING_CANCEL' || booking.status === 'CANCELLED') && (
                    <button className="btn btn-secondary text-sm flex-1 justify-center py-2" onClick={() => openDetailsModal(booking)}>Xem chi tiết</button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Cancel Modal */}
      {isCancelModalOpen && selectedBooking && createPortal(
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 50, backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div className="card animate-fade-in relative" style={{ width: '100%', maxWidth: '450px' }}>
            <button className="absolute top-4 right-4 text-muted hover:text-danger" onClick={() => setIsCancelModalOpen(false)} style={{ position: 'absolute', top: '1rem', right: '1rem' }}>
              <X size={20} />
            </button>
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4" style={{ width: '3rem', height: '3rem', borderRadius: '50%', backgroundColor: 'rgba(239, 68, 68, 0.1)', color: 'var(--color-danger)' }}>
                <AlertTriangle size={24} />
              </div>
              <h2 className="text-xl font-bold mb-2">Yêu cầu hủy đơn</h2>
              <p className="text-muted mb-4">[ Ghi chú cảnh báo/Xác nhận về việc hủy đơn ]</p>

              <div className="w-full text-left mb-6">
                <label className="font-semibold text-sm block mb-1">Lý do hủy đơn (*)</label>
                <textarea
                  rows={3}
                  className="w-full"
                  style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg-base)', color: 'var(--color-text-base)', resize: 'none', width: '100%', outline: 'none', fontFamily: 'inherit' }}
                  placeholder="[ Nhập lý do hủy... ]"
                  value={cancelReason}
                  onChange={(e) => setCancelReason(e.target.value)}
                />
              </div>

              <div className="flex gap-4 w-full">
                <button className="btn btn-secondary flex-1" style={{ flex: 1 }} onClick={() => setIsCancelModalOpen(false)}>Không, Quay lại</button>
                <button className="btn btn-primary flex-1" style={{ flex: 1, backgroundColor: 'var(--color-danger)' }} onClick={() => setIsCancelModalOpen(false)}>Huỷ đơn</button>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* Payment Modal */}
      {isPaymentModalOpen && selectedBooking && createPortal(
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 50, backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div className="card animate-fade-in relative" style={{ width: '100%', maxWidth: '520px', padding: '2rem' }}>
            <button className="absolute top-4 right-4 text-muted hover:text-danger" onClick={() => setIsPaymentModalOpen(false)} style={{ position: 'absolute', top: '1.25rem', right: '1.25rem' }}>
              <X size={22} />
            </button>
            
            <h2 className="text-2xl font-bold mb-2">Thanh toán hóa đơn</h2>
            <p className="text-sm text-muted mb-6 pb-3" style={{ borderBottom: '1px solid var(--color-border)', lineHeight: '1.6' }}>
              [ Ghi chú/Lưu ý phụ về việc thanh toán nốt tiền sân ]
            </p>

            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <span className="text-muted text-base">Mã đơn:</span>
                <span className="font-bold text-base">[ Mã đơn ]</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted text-base">Sân bóng:</span>
                <span className="font-semibold text-base">[ Tên sân ]</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted text-base">Ngày đá:</span>
                <span className="font-medium text-base">[ Ngày ]</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted text-base">Khung giờ:</span>
                <span className="font-medium text-base">[ Khung giờ ]</span>
              </div>

              <hr style={{ borderColor: 'var(--color-border)', width: '100%', margin: '0.5rem 0' }} />

              <div className="flex justify-between items-center">
                <span className="text-muted text-base">Tổng tiền thuê sân:</span>
                <span className="font-semibold text-base">[ Số tiền ]</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted text-base">Đã đặt cọc (30%):</span>
                <span className="font-semibold text-base">[ Số tiền ]</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted text-base">Dịch vụ phát sinh / Phụ phí:</span>
                <span className="font-semibold text-base">[ Số tiền ]</span>
              </div>

              <div className="flex justify-between items-center p-4 mt-2" style={{ backgroundColor: 'var(--color-bg-base)', border: '1.5px solid var(--color-border)', borderRadius: 'var(--radius-md)' }}>
                <div>
                  <span className="font-bold block text-base">Số tiền cần thanh toán nốt:</span>
                  <span className="text-xs text-muted mt-0.5 block">[ 70% còn lại + phụ phí nếu có ]</span>
                </div>
                <span className="font-bold text-2xl" style={{ color: 'var(--color-primary)' }}>
                  [ Số tiền ]
                </span>
              </div>
            </div>

            <div className="mt-6">
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

      {/* Details Modal */}
      {isDetailsModalOpen && selectedBooking && createPortal(
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 50, backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div className="card animate-fade-in relative p-6" style={{ width: '100%', maxWidth: '500px' }}>
            <button className="absolute top-4 right-4 text-muted hover:text-danger" onClick={() => setIsDetailsModalOpen(false)} style={{ position: 'absolute', top: '1rem', right: '1rem' }}>
              <X size={20} />
            </button>
            <h2 className="text-xl font-bold mb-6 pb-2" style={{ borderBottom: '1px solid var(--color-border)' }}>Chi tiết đơn đặt sân</h2>

            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <span className="text-muted">Mã đơn:</span>
                <span className="font-bold">[ Mã đơn ]</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted">Sân bóng:</span>
                <span className="font-semibold">[ Tên sân ]</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted">Ngày đá:</span>
                <span className="font-semibold">[ Ngày ]</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted">Trạng thái:</span>
                {getStatusBadge(selectedBooking.status)}
              </div>

              <hr className="my-2" style={{ borderColor: 'var(--color-border)', width: '100%', margin: '0.5rem 0' }} />

              <div className="flex justify-between items-center">
                <span className="text-muted">Tổng tiền:</span>
                <span className="font-semibold">[ Số tiền ]</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted">Đã đặt cọc (30%):</span>
                <span className="text-primary font-semibold">[ Số tiền ]</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted">Còn lại:</span>
                <span className="text-warning font-semibold">[ Số tiền ]</span>
              </div>
            </div>

            <button className="btn btn-secondary w-full mt-8" onClick={() => setIsDetailsModalOpen(false)}>
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

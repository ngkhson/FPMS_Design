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

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'CONFIRMED': return <span className="badge badge-success">Đã xác nhận (Sắp đá)</span>;
      case 'IN_PROGRESS': return <span className="badge badge-warning">Đang sử dụng sân</span>;
      case 'COMPLETED': return <span className="badge badge-success" style={{ backgroundColor: 'rgba(59, 130, 246, 0.15)', color: 'var(--color-secondary)' }}>Hoàn thành</span>;
      case 'PENDING_CANCEL': return <span className="badge badge-warning">Chờ duyệt hủy</span>;
      case 'CANCELLED': return <span className="badge badge-danger">Đã hủy</span>;
      default: return <span className="badge">Chưa rõ</span>;
    }
  };

  const filteredBookings = mockBookings.filter(b => {
    if (activeTab === 'UPCOMING' && b.status !== 'CONFIRMED' && b.status !== 'IN_PROGRESS' && b.status !== 'PENDING_CANCEL') return false;
    if (activeTab === 'HISTORY' && b.status !== 'COMPLETED' && b.status !== 'CANCELLED') return false;

    if (searchTerm) {
      if (!b.id.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    }
    return true;
  });

  const openCancelModal = (booking: any) => {
    setSelectedBooking(booking);
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
      <div className="card mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <div>
            <h2 className="text-2xl font-bold">Quản lý đơn sân</h2>
            <p className="text-sm text-muted mt-1">Theo dõi, thanh toán và hủy các lịch đá bóng của bạn.</p>
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

        <div className="flex items-center justify-between mb-4">
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
        </div>

        <div style={{ overflowX: 'auto' }}>
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
                    <td className="p-4 font-semibold">#{booking.id.toUpperCase()}</td>
                    <td className="p-4">{booking.date}</td>
                    <td className="p-4">
                      <div className="font-semibold">{pitch?.name}</div>
                      <div className="text-sm text-muted">{slot?.startTime} - {slot?.endTime}</div>
                    </td>
                    <td className="p-4">{getStatusBadge(booking.status)}</td>
                    <td className="p-4 font-semibold">{formatPrice(slot?.basePrice || 0)}</td>
                    <td className="p-4 text-right">
                      {booking.status === 'CONFIRMED' && (
                        <button className="btn btn-secondary text-sm" onClick={() => openCancelModal(booking)}>Huỷ đơn</button>
                      )}
                      {booking.status === 'COMPLETED' && (
                        <button className="btn btn-primary text-sm" style={{ backgroundColor: 'var(--color-secondary)' }} onClick={() => openPaymentModal(booking)}>Thanh toán nốt</button>
                      )}
                      {(booking.status === 'IN_PROGRESS' || booking.status === 'PENDING_CANCEL' || booking.status === 'CANCELLED') && (
                        <button className="btn btn-secondary text-sm" onClick={() => openDetailsModal(booking)}>Xem chi tiết</button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
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
              <p className="text-muted mb-6">Bạn có chắc chắn muốn hủy đơn <strong>#{selectedBooking.id}</strong> không? Nếu hủy trước 24h, bạn sẽ được hoàn lại 100% tiền cọc.</p>

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
          <div className="card animate-fade-in relative" style={{ width: '100%', maxWidth: '450px' }}>
            <button className="absolute top-4 right-4 text-muted hover:text-danger" onClick={() => setIsPaymentModalOpen(false)} style={{ position: 'absolute', top: '1rem', right: '1rem' }}>
              <X size={20} />
            </button>
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4" style={{ width: '3rem', height: '3rem', borderRadius: '50%', backgroundColor: 'rgba(34, 197, 94, 0.1)', color: 'var(--color-success)' }}>
                <CheckCircle size={24} />
              </div>
              <h2 className="text-xl font-bold mb-2">Thanh toán hóa đơn</h2>
              <p className="text-muted mb-6">Đơn hàng <strong>#{selectedBooking.id}</strong> đang chờ thanh toán phần còn lại.</p>

              <div className="w-full bg-base p-4 rounded-lg mb-6 flex justify-between items-center" style={{ backgroundColor: 'var(--color-bg-base)' }}>
                <span className="font-semibold text-muted">Số tiền cần thanh toán:</span>
                <span className="font-bold text-lg text-primary">
                  {formatPrice((mockTimeSlots.find(t => t.id === selectedBooking.timeSlotId)?.basePrice || 0) * 0.7)}
                </span>
              </div>

              <button className="btn btn-primary w-full flex justify-center items-center gap-2" onClick={() => setIsPaymentModalOpen(false)}>
                <CreditCard size={18} /> Thanh toán qua VNPAY
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
                <span className="font-bold">#{selectedBooking.id}</span>
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
                <span className="text-muted">Trạng thái:</span>
                {getStatusBadge(selectedBooking.status)}
              </div>

              <hr className="my-2" style={{ borderColor: 'var(--color-border)', width: '100%', margin: '0.5rem 0' }} />

              <div className="flex justify-between items-center">
                <span className="text-muted">Tổng tiền:</span>
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

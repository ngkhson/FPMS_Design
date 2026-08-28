import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { mockBookings, mockPitches, mockTimeSlots } from '../../mocks/mockData';
import { Search, X } from 'lucide-react';

const ModalOverlay = ({ children, onClose }: { children: React.ReactNode, onClose: () => void }) => {
  return createPortal(
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: '1rem' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} onClick={onClose} />
      <div className="card" style={{ position: 'relative', zIndex: 10000, width: '100%', maxWidth: '500px', maxHeight: '90vh', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
        {children}
      </div>
    </div>,
    document.body
  );
};

const AdminBookings: React.FC = () => {
  const dateInputRef = React.useRef<HTMLInputElement>(null);
  const [bookings, setBookings] = useState(mockBookings);
  const [activeTab, setActiveTab] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [pitchFilter, setPitchFilter] = useState('ALL');

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [checkoutBookingId, setCheckoutBookingId] = useState<string | null>(null);
  const [cancelBookingId, setCancelBookingId] = useState<string | null>(null);
  const [approveBookingId, setApproveBookingId] = useState<string | null>(null);
  const [adminCancelBookingId, setAdminCancelBookingId] = useState<string | null>(null);
  const [adminCancelReason, setAdminCancelReason] = useState('');
  
  // States for rejecting cancellation
  const [isRejecting, setIsRejecting] = useState(false);
  const [rejectReason, setRejectReason] = useState('');

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'PENDING': return <span className="badge badge-secondary" style={{ backgroundColor: 'rgba(100, 116, 139, 0.1)', color: 'var(--color-text-base)' }}>Chờ xác nhận</span>;
      case 'CONFIRMED': return <span className="badge badge-success">Đã xác nhận</span>;
      case 'IN_PROGRESS': return <span className="badge badge-warning">Đang đá</span>;
      case 'COMPLETED': return <span className="badge" style={{ backgroundColor: 'rgba(59, 130, 246, 0.15)', color: 'var(--color-secondary)' }}>Đã hoàn thành</span>;
      case 'PENDING_CANCEL': return <span className="badge badge-danger">Yêu cầu hủy</span>;
      case 'CANCELLED': return <span className="badge badge-danger" style={{ opacity: 0.7 }}>Đã hủy</span>;
      default: return <span className="badge">{status}</span>;
    }
  };

  const filteredBookings = bookings.filter(b => {
    if (activeTab !== 'ALL' && b.status !== activeTab) return false;

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      if (!b.id.toLowerCase().includes(term) && !b.customerName.toLowerCase().includes(term)) {
        return false;
      }
    }

    if (pitchFilter !== 'ALL') {
      const pitch = mockPitches.find(p => p.id === b.pitchId);
      if (pitch?.type !== pitchFilter) return false;
    }

    return true;
  });

  const checkoutBooking = bookings.find(b => b.id === checkoutBookingId);
  const cancelBooking = bookings.find(b => b.id === cancelBookingId);

  return (
    <div style={{ height: 'calc(100vh - 140px)', display: 'flex', flexDirection: 'column' }}>
      <div className="card" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div className="flex items-center justify-between mb-6" style={{ flexShrink: 0 }}>
          <div className="flex gap-4 items-center">
            <h2 className="text-xl font-semibold mr-2">Danh sách Đơn</h2>
            <select
              className="btn btn-secondary"
              style={{ height: '42px', fontWeight: 'normal', fontFamily: 'inherit', outline: 'none', border: '1px solid var(--color-border)' }}
              value={activeTab}
              onChange={(e) => setActiveTab(e.target.value)}
            >
              <option value="ALL">Trạng thái: Tất cả</option>
              <option value="PENDING">Chờ xác nhận</option>
              <option value="CONFIRMED">Đã xác nhận</option>
              <option value="IN_PROGRESS">Đang đá (Nợ phí)</option>
              <option value="COMPLETED">Đã hoàn thành</option>
              <option value="PENDING_CANCEL">Yêu cầu hủy</option>
              <option value="CANCELLED">Đã hủy</option>
            </select>
          </div>

          <div className="flex gap-4 items-center">
            <div className="flex items-center gap-2" style={{ height: '42px', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--color-bg-base)', padding: '0 1rem' }}>
              <Search size={16} className="text-muted" />
              <input
                type="text"
                placeholder="Tìm mã đơn, tên khách..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ background: 'transparent', border: 'none', outline: 'none', color: 'var(--color-text-base)', fontFamily: 'inherit', width: '180px' }}
              />
            </div>

            <select
              className="btn btn-secondary"
              style={{ height: '42px', fontWeight: 'normal', fontFamily: 'inherit', outline: 'none', border: '1px solid var(--color-border)' }}
              value={pitchFilter}
              onChange={(e) => setPitchFilter(e.target.value)}
            >
              <option value="ALL">Loại sân: Tất cả</option>
              <option value="5">Sân 5 người</option>
              <option value="7">Sân 7 người</option>
            </select>

            <div
              className="flex items-center gap-2"
              style={{ height: '42px', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--color-bg-base)', padding: '0 1rem', cursor: 'pointer' }}
              onClick={() => {
                if (dateInputRef.current) {
                  try {
                    dateInputRef.current.showPicker();
                  } catch (e) {
                    dateInputRef.current.focus();
                  }
                }
              }}
            >
              <span className="text-muted text-sm font-medium">Ngày:</span>
              <input
                ref={dateInputRef}
                type="date"
                style={{ background: 'transparent', border: 'none', outline: 'none', color: 'var(--color-text-base)', fontFamily: 'inherit', cursor: 'pointer' }}
                onClick={(e) => e.stopPropagation()}
              />
            </div>
            <button className="btn btn-primary" style={{ height: '42px' }} onClick={() => setIsCreateModalOpen(true)}>Tạo đơn tại quầy</button>
          </div>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', overflowX: 'auto', borderTop: '1px solid var(--color-border)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead style={{ position: 'sticky', top: 0, backgroundColor: 'var(--color-bg-surface)', zIndex: 10 }}>
              <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                <th className="p-4 font-semibold text-muted text-sm">MÃ ĐƠN</th>
                <th className="p-4 font-semibold text-muted text-sm">KHÁCH HÀNG</th>
                <th className="p-4 font-semibold text-muted text-sm">SÂN / GIỜ</th>
                <th className="p-4 font-semibold text-muted text-sm">TRẠNG THÁI</th>
                <th className="p-4 font-semibold text-muted text-sm">TÀI CHÍNH</th>
                <th className="p-4 font-semibold text-muted text-sm text-right">THAO TÁC</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map((booking) => {
                const pitch = mockPitches.find(p => p.id === booking.pitchId);
                const slot = mockTimeSlots.find(t => t.id === booking.timeSlotId);
                const price = slot?.basePrice || 0;
                const deposit = price * 0.3;

                return (
                  <tr key={booking.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                    <td className="p-4 font-semibold">#{booking.id.toUpperCase()}</td>
                    <td className="p-4">
                      <div className="font-semibold">{booking.customerName}</div>
                      <div className="text-sm text-muted">0987xxx</div>
                    </td>
                    <td className="p-4">
                      <div className="font-semibold">{pitch?.name}</div>
                      <div className="text-sm text-muted">{booking.date} | {slot?.startTime} - {slot?.endTime}</div>
                    </td>
                    <td className="p-4">{getStatusBadge(booking.status)}</td>
                    <td className="p-4">
                      <div className="text-sm">Tổng: {formatPrice(price)}</div>
                      <div className="text-sm text-success">Đã cọc: {formatPrice(deposit)}</div>
                      {booking.status === 'IN_PROGRESS' && (
                        <div className="text-sm font-semibold text-danger">Còn nợ: {formatPrice(price - deposit)}</div>
                      )}
                    </td>
                    <td className="p-4 text-right flex gap-2 justify-end">
                      {booking.status === 'PENDING' && (
                        <>
                          <button className="btn btn-primary" onClick={() => setApproveBookingId(booking.id)}>Duyệt đơn</button>
                          <button className="btn btn-secondary text-danger" onClick={() => setAdminCancelBookingId(booking.id)}>Hủy & Hoàn tiền</button>
                        </>
                      )}
                      {booking.status === 'IN_PROGRESS' && (
                        <button className="btn btn-primary" style={{ backgroundColor: 'var(--color-secondary)' }} onClick={() => setCheckoutBookingId(booking.id)}>Thu tiền & Đóng ca</button>
                      )}
                      {booking.status === 'CONFIRMED' && (
                        <button className="btn btn-secondary">Nhận sân</button>
                      )}
                      {booking.status === 'PENDING_CANCEL' && (
                        <button className="btn btn-primary" style={{ backgroundColor: 'var(--color-danger)' }} onClick={() => setCancelBookingId(booking.id)}>Duyệt Hủy & Hoàn tiền</button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 1. Modal Tạo đơn tại quầy */}
      {isCreateModalOpen && (
        <ModalOverlay onClose={() => setIsCreateModalOpen(false)}>
          <div className="flex justify-between items-center mb-6" style={{ flexShrink: 0 }}>
            <h2 className="text-xl font-bold">Tạo Đơn Tại Quầy</h2>
            <button onClick={() => setIsCreateModalOpen(false)} className="text-muted hover:text-[var(--color-text-base)]"><X size={24} /></button>
          </div>

          <div className="grid gap-4 mb-6" style={{ overflowY: 'auto', paddingRight: '0.5rem' }}>
            <div>
              <label className="block text-sm font-semibold mb-2">Tên khách hàng</label>
              <input
                type="text"
                className="w-full"
                placeholder="Nhập tên khách..."
                defaultValue="Khách vãng lai"
                onFocus={(e) => {
                  if (e.target.value === 'Khách vãng lai') e.target.value = '';
                }}
                onBlur={(e) => {
                  if (e.target.value.trim() === '') e.target.value = 'Khách vãng lai';
                }}
                style={{ padding: '0.6rem 1rem', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', background: 'var(--color-bg-base)' }}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Số điện thoại</label>
              <input type="text" className="w-full" placeholder="Nhập SĐT..." style={{ padding: '0.6rem 1rem', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', background: 'var(--color-bg-base)' }} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Chọn Sân</label>
                <select className="w-full" style={{ padding: '0.6rem 1rem', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', background: 'var(--color-bg-base)' }}>
                  {mockPitches.map(p => <option key={p.id} value={p.id}>{p.name} ({p.type} người)</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Ngày đá</label>
                <input type="date" className="w-full" style={{ padding: '0.6rem 1rem', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', background: 'var(--color-bg-base)' }} defaultValue={new Date().toISOString().split('T')[0]} />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Khung giờ trống</label>
              <select className="w-full" style={{ padding: '0.6rem 1rem', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', background: 'var(--color-bg-base)' }}>
                <option>17:45 - 19:15 (400,000 đ)</option>
                <option>19:30 - 21:00 (450,000 đ)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Tiền thanh toán / Đặt cọc</label>
              <input type="text" className="w-full" placeholder="Nhập số tiền khách đưa" defaultValue="0" style={{ padding: '0.6rem 1rem', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', background: 'var(--color-bg-base)' }} />
            </div>
          </div>

          <div style={{ flexShrink: 0, paddingTop: '1rem', marginTop: 'auto', borderTop: '1px solid var(--color-border)' }}>
            <button className="btn btn-primary w-full" onClick={() => setIsCreateModalOpen(false)}>Xác nhận Tạo Đơn</button>
          </div>
        </ModalOverlay>
      )}

      {/* 2. Modal Thu tiền & Đóng ca */}
      {checkoutBookingId && checkoutBooking && (() => {
        const pitch = mockPitches.find(p => p.id === checkoutBooking.pitchId);
        const slot = mockTimeSlots.find(t => t.id === checkoutBooking.timeSlotId);
        const price = slot?.basePrice || 0;
        const deposit = price * 0.3;
        const remaining = price - deposit;

        return (
          <ModalOverlay onClose={() => setCheckoutBookingId(null)}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Thanh Toán & Đóng Ca</h2>
              <button onClick={() => setCheckoutBookingId(null)} className="text-muted hover:text-[var(--color-text-base)]"><X size={24} /></button>
            </div>

            <div style={{ background: 'var(--color-bg-base)', padding: '1rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem' }}>
              <div className="flex justify-between mb-2">
                <span className="text-muted">Đơn hàng:</span>
                <span className="font-semibold">#{checkoutBooking.id.toUpperCase()}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-muted">Khách hàng:</span>
                <span className="font-semibold">{checkoutBooking.customerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Sân / Khung giờ:</span>
                <span className="font-semibold">{pitch?.name} ({slot?.startTime} - {slot?.endTime})</span>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex justify-between mb-2 text-lg">
                <span>Tổng tiền sân:</span>
                <span className="font-semibold">{formatPrice(price)}</span>
              </div>
              <div className="flex justify-between mb-4 text-success">
                <span>Đã thanh toán (Cọc):</span>
                <span>- {formatPrice(deposit)}</span>
              </div>
              <div style={{ height: 1, backgroundColor: 'var(--color-border)', margin: '1rem 0' }}></div>
              <div className="flex justify-between text-xl font-bold text-danger mb-4">
                <span>Khách cần thanh toán:</span>
                <span>{formatPrice(remaining)}</span>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Phương thức thanh toán</label>
                <select className="w-full" style={{ padding: '0.6rem 1rem', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', background: 'var(--color-bg-base)' }}>
                  <option value="CASH">Tiền mặt</option>
                  <option value="BANK_TRANSFER">Chuyển khoản</option>
                </select>
              </div>
            </div>

            <button className="btn btn-primary w-full" style={{ backgroundColor: 'var(--color-secondary)', fontSize: '1.1rem', padding: '0.75rem' }} onClick={() => setCheckoutBookingId(null)}>Xác nhận Thu Tiền</button>
          </ModalOverlay>
        );
      })()}

      {/* 3. Modal Xử lý Hủy đơn (UC010.3 & BR4) */}
      {cancelBookingId && cancelBooking && (() => {
        const slot = mockTimeSlots.find(t => t.id === cancelBooking.timeSlotId);
        const pitch = mockPitches.find(p => p.id === cancelBooking.pitchId);
        const deposit = (slot?.basePrice || 0) * 0.3;

        return (
          <ModalOverlay onClose={() => { setCancelBookingId(null); setIsRejecting(false); setRejectReason(''); }}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Xét Duyệt Yêu Cầu Hủy Đơn</h2>
              <button onClick={() => { setCancelBookingId(null); setIsRejecting(false); setRejectReason(''); }} className="text-muted hover:text-[var(--color-text-base)]"><X size={24} /></button>
            </div>

            <div style={{ background: 'var(--color-bg-base)', padding: '1.25rem', borderRadius: 'var(--radius-md)', marginBottom: '1.25rem' }}>
              <p className="mb-2 text-sm">
                Khách hàng <strong style={{ color: 'var(--color-text-base)' }}>{cancelBooking.customerName}</strong> đã gửi yêu cầu hủy đơn <strong style={{ color: 'var(--color-text-base)' }}>#{cancelBooking.id.toUpperCase()}</strong>.
              </p>
              <div className="text-xs text-muted mb-3">
                <span>{pitch?.name} • {cancelBooking.date} ({slot?.startTime} - {slot?.endTime})</span>
                {cancelBooking.cancelRequestedAt && <div className="mt-0.5">Thời gian gửi: {cancelBooking.cancelRequestedAt}</div>}
              </div>

              {/* Box hiển thị lý do hủy từ khách (BR3, BR4) */}
              <div className="mb-3 rounded-md text-xs" style={{ padding: '0.75rem', backgroundColor: 'rgba(245, 158, 11, 0.08)', border: '1px solid rgba(245, 158, 11, 0.25)' }}>
                <span className="font-bold text-warning block mb-1">Lý do khách xin hủy (BR3):</span>
                <span className="italic" style={{ color: 'var(--color-text-base)' }}>"{cancelBooking.cancelReason || 'Bận việc đột xuất cùng công ty'}"</span>
              </div>

              <div className="flex justify-between items-center mb-4" style={{ padding: '0.75rem', border: '1px dashed var(--color-danger)', borderRadius: 'var(--radius-md)', backgroundColor: 'rgba(239, 68, 68, 0.05)' }}>
                <span className="font-semibold text-sm" style={{ color: 'var(--color-text-base)' }}>Số tiền cọc cần hoàn trả:</span>
                <span className="text-xl font-bold" style={{ color: 'var(--color-text-base)' }}>{formatPrice(deposit)}</span>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Phương thức hoàn tiền</label>
                <select className="w-full" style={{ padding: '0.6rem 1rem', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', background: 'var(--color-bg-base)' }}>
                  <option value="BANK_TRANSFER">Chuyển khoản</option>
                  <option value="CASH">Tiền mặt</option>
                </select>
              </div>
            </div>

            {isRejecting && (
              <div className="mb-4 animate-fade-in">
                <label className="block text-sm font-semibold mb-2 text-danger">Lý do từ chối hủy (Bắt buộc)</label>
                <textarea
                  className="w-full"
                  rows={3}
                  placeholder="Nhập lý do khách hàng không được phép hủy đơn..."
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  style={{ padding: '0.75rem', border: '1px solid var(--color-danger)', borderRadius: 'var(--radius-md)', background: 'var(--color-bg-base)', outline: 'none', resize: 'none' }}
                />
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1.5rem' }}>
              {isRejecting ? (
                <>
                  <button className="btn btn-secondary" onClick={() => { setIsRejecting(false); setRejectReason(''); }}>
                    Hủy bỏ
                  </button>
                  <button
                    className="btn"
                    style={{ backgroundColor: 'var(--color-warning)', color: '#fff', border: 'none', fontSize: '1rem', padding: '0.625rem 1.5rem', borderRadius: 'var(--radius-md)', opacity: rejectReason.trim() ? 1 : 0.5, cursor: rejectReason.trim() ? 'pointer' : 'not-allowed' }}
                    disabled={!rejectReason.trim()}
                    onClick={() => {
                      if (!rejectReason.trim()) return;
                      setBookings(prev => prev.map(b => b.id === cancelBooking.id ? { ...b, status: 'CONFIRMED', cancelRejectReason: rejectReason } : b));
                      setCancelBookingId(null);
                      setIsRejecting(false);
                      setRejectReason('');
                    }}
                  >
                    Xác nhận Từ chối
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="btn"
                    style={{ backgroundColor: 'var(--color-warning)', color: '#fff', border: 'none', fontSize: '1rem', padding: '0.625rem 1.5rem', borderRadius: 'var(--radius-md)' }}
                    onClick={() => setIsRejecting(true)}
                  >
                    Từ chối Hủy
                  </button>
                  <button
                    className="btn btn-primary"
                    style={{ backgroundColor: 'var(--color-danger)', fontSize: '1rem', padding: '0.625rem 1.5rem', borderRadius: 'var(--radius-md)' }}
                    onClick={() => {
                      setCancelBookingId(null);
                    }}
                  >
                    Xác nhận Hoàn Tiền
                  </button>
                </>
              )}
            </div>
          </ModalOverlay>
        );
      })()}

      {/* 4. Modal Duyệt đơn (Approve PENDING booking) */}
      {approveBookingId && (() => {
        const booking = bookings.find(b => b.id === approveBookingId);
        if (!booking) return null;
        return (
          <ModalOverlay onClose={() => setApproveBookingId(null)}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Xác Nhận Duyệt Đơn</h2>
              <button onClick={() => setApproveBookingId(null)} className="text-muted hover:text-[var(--color-text-base)]"><X size={24} /></button>
            </div>
            <div className="mb-6 text-base">
              Bạn có chắc chắn muốn duyệt đơn đặt sân của khách hàng <strong>{booking.customerName}</strong> không?
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
              <button className="btn btn-secondary" onClick={() => setApproveBookingId(null)}>Hủy bỏ</button>
              <button className="btn btn-primary" onClick={() => {
                setBookings(prev => prev.map(b => b.id === approveBookingId ? { ...b, status: 'CONFIRMED' } : b));
                setApproveBookingId(null);
              }}>Xác nhận Duyệt</button>
            </div>
          </ModalOverlay>
        );
      })()}

      {/* 5. Modal Admin tự hủy đơn (Cancel PENDING booking) */}
      {adminCancelBookingId && (() => {
        const booking = bookings.find(b => b.id === adminCancelBookingId);
        if (!booking) return null;
        
        const slot = mockTimeSlots.find(t => t.id === booking.timeSlotId);
        const deposit = (slot?.basePrice || 0) * 0.3;

        return (
          <ModalOverlay onClose={() => { setAdminCancelBookingId(null); setAdminCancelReason(''); }}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-danger">Hủy Đơn & Hoàn Tiền</h2>
              <button onClick={() => { setAdminCancelBookingId(null); setAdminCancelReason(''); }} className="text-muted hover:text-[var(--color-text-base)]"><X size={24} /></button>
            </div>
            
            <div style={{ background: 'var(--color-bg-base)', padding: '1.25rem', borderRadius: 'var(--radius-md)', marginBottom: '1.25rem' }}>
              <p className="mb-4 text-base">Hủy đơn đặt sân của khách hàng <strong>{booking.customerName}</strong>.</p>
              
              <div className="flex justify-between items-center mb-4" style={{ padding: '0.75rem', border: '1px dashed var(--color-danger)', borderRadius: 'var(--radius-md)', backgroundColor: 'rgba(239, 68, 68, 0.05)' }}>
                <span className="font-semibold text-sm" style={{ color: 'var(--color-text-base)' }}>Số tiền cọc cần hoàn trả:</span>
                <span className="text-xl font-bold" style={{ color: 'var(--color-text-base)' }}>{formatPrice(deposit)}</span>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Phương thức hoàn tiền</label>
                <select className="w-full" style={{ padding: '0.6rem 1rem', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', background: 'var(--color-bg-base)' }}>
                  <option value="BANK_TRANSFER">Chuyển khoản</option>
                  <option value="CASH">Tiền mặt</option>
                </select>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2 text-danger">Lý do hủy đơn (Bắt buộc)</label>
              <textarea
                className="w-full"
                rows={3}
                placeholder="Nhập lý do (VD: Khách gọi điện báo hủy, sân gặp sự cố...)"
                value={adminCancelReason}
                onChange={(e) => setAdminCancelReason(e.target.value)}
                style={{ padding: '0.75rem', border: '1px solid var(--color-danger)', borderRadius: 'var(--radius-md)', background: 'var(--color-bg-base)', outline: 'none', resize: 'none' }}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
              <button className="btn btn-secondary" onClick={() => { setAdminCancelBookingId(null); setAdminCancelReason(''); }}>Quay lại</button>
              <button 
                className="btn btn-primary" 
                style={{ backgroundColor: 'var(--color-danger)', opacity: adminCancelReason.trim() ? 1 : 0.5, cursor: adminCancelReason.trim() ? 'pointer' : 'not-allowed' }} 
                disabled={!adminCancelReason.trim()}
                onClick={() => {
                  if (!adminCancelReason.trim()) return;
                  setBookings(prev => prev.map(b => b.id === adminCancelBookingId ? { ...b, status: 'CANCELLED', cancelReason: adminCancelReason } : b));
                  setAdminCancelBookingId(null);
                  setAdminCancelReason('');
                }}
              >
                Xác nhận Hủy Đơn
              </button>
            </div>
          </ModalOverlay>
        );
      })()}

    </div>
  );
};

export default AdminBookings;

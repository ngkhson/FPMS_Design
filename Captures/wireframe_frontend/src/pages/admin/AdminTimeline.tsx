import React, { useState } from 'react';
import { Calendar, Search, Play, CheckCircle, X } from 'lucide-react';
import { mockPitches, mockTimeSlots, mockBookings } from '../../mocks/mockData';
import { createPortal } from 'react-dom';

const AdminTimeline: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [selectedPitchType, setSelectedPitchType] = useState<string>('all');
  const [selectedBooking, setSelectedBooking] = useState<any>(null);

  const ModalOverlay = ({ children, onClose }: { children: React.ReactNode, onClose: () => void }) => {
    return createPortal(
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: '1rem' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} onClick={onClose} />
        <div className="card animate-fade-in" style={{ position: 'relative', zIndex: 10000, width: '100%', maxWidth: '500px', maxHeight: '90vh', overflowY: 'auto' }}>
          {children}
        </div>
      </div>,
      document.body
    );
  };

  const getSlotBooking = (pitchId: string, timeSlotId: string) => {
    return mockBookings.find(
      b => b.pitchId === pitchId && b.timeSlotId === timeSlotId && b.date === selectedDate && b.status !== 'CANCELLED'
    );
  };

  const filteredPitches = mockPitches.filter(p => selectedPitchType === 'all' || p.type.toString() === selectedPitchType).slice(0, 7);

  return (
    <div>
      <div className="card" style={{ minWidth: 0 }}>
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4" style={{ minWidth: 0 }}>
          {/* Legends */}
          <div className="flex flex-wrap items-center gap-4 text-sm font-medium">
            <div className="flex items-center gap-2">
              <div style={{ width: 16, height: 16, borderRadius: 4, border: '1px solid var(--color-border)' }}></div>
              <span>Trống</span>
            </div>
            <div className="flex items-center gap-2">
              <div style={{ width: 16, height: 16, borderRadius: 4, backgroundColor: 'var(--color-bg-base)', border: '2px solid var(--color-border)' }}></div>
              <span>Đã xác nhận</span>
            </div>
            <div className="flex items-center gap-2">
              <div style={{ width: 16, height: 16, borderRadius: 4, backgroundColor: 'var(--color-border)' }}></div>
              <span>Đang đá</span>
            </div>
            <div className="flex items-center gap-2">
              <div style={{ width: 16, height: 16, borderRadius: 4, border: '1px dashed var(--color-border)' }}></div>
              <span>Chờ duyệt</span>
            </div>
          </div>
          
          {/* Filters */}
          <div className="flex flex-wrap items-center gap-4">
            <select 
              className="px-4 rounded-full border shadow-sm text-sm font-semibold cursor-pointer"
              style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-bg-base)', color: 'var(--color-text-base)', outline: 'none', height: '42px' }}
              value={selectedPitchType}
              onChange={(e) => setSelectedPitchType(e.target.value)}
            >
              <option value="all">Tất cả sân</option>
              <option value="5">Sân 5 người</option>
              <option value="7">Sân 7 người</option>
            </select>
            
            <div className="flex items-center gap-2 shadow-sm transition-all" style={{ border: '1px solid var(--color-border)', borderRadius: '999px', backgroundColor: 'var(--color-bg-base)', padding: '0 1.2rem', height: '42px' }}>
              <Calendar size={18} className="text-muted" />
              <input 
                type="date" 
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                style={{ background: 'transparent', border: 'none', outline: 'none', color: 'var(--color-text-base)', fontFamily: 'inherit', fontWeight: 'bold', cursor: 'pointer', height: '100%' }}
                onClick={(e) => {
                  if ('showPicker' in HTMLInputElement.prototype) {
                    try { (e.target as HTMLInputElement).showPicker(); } catch (err) {}
                  }
                }}
              />
            </div>
            <button className="btn btn-secondary shadow-sm font-semibold" style={{ padding: '0 1.2rem', borderRadius: '999px', height: '42px' }}>Làm mới</button>
          </div>
        </div>

        {/* Matrix Gantt */}
        <div className="matrix-container">
          <div className="matrix-header">
            <div className="matrix-cell matrix-pitch-name">Sân / Khung giờ</div>
            {mockTimeSlots.map(slot => (
              <div key={slot.id} className="matrix-cell font-semibold">
                <div>[ Khung giờ ]</div>
              </div>
            ))}
          </div>
          
          {filteredPitches.map(pitch => (
            <div key={pitch.id} className="matrix-row">
              <div className="matrix-cell matrix-pitch-name">
                <div>
                  <div>[ Tên sân ]</div>
                  <div className="text-sm text-muted font-normal mt-1">[ Loại sân ]</div>
                </div>
              </div>
              
              {mockTimeSlots.map(slot => {
                const booking = getSlotBooking(pitch.id, slot.id);
                
                if (pitch.status === 'MAINTENANCE') {
                  return <div key={slot.id} className="matrix-cell matrix-slot maintenance">Bảo trì</div>;
                }

                if (!booking) {
                  return <div key={slot.id} className="matrix-cell matrix-slot available"><span className="text-muted">Trống</span></div>;
                }

                let bgColor = '';
                let borderColor = '';
                
                if (booking.status === 'CONFIRMED') {
                  bgColor = 'var(--color-bg-base)';
                  borderColor = 'var(--color-text-base)';
                } else if (booking.status === 'IN_PROGRESS') {
                  bgColor = 'var(--color-bg-base)';
                  borderColor = 'var(--color-text-base)';
                } else if (booking.status === 'COMPLETED') {
                  bgColor = 'var(--color-bg-base)';
                  borderColor = 'var(--color-border)';
                } else if (booking.status === 'PENDING') {
                  bgColor = 'var(--color-bg-base)';
                  borderColor = 'var(--color-text-muted)';
                } else if (booking.status === 'PENDING_CANCEL') {
                  bgColor = 'var(--color-bg-base)';
                  borderColor = 'var(--color-text-muted)';
                }

                return (
                  <div 
                    key={slot.id} 
                    className="matrix-cell matrix-slot"
                    style={{ backgroundColor: bgColor, borderLeft: `3px solid ${borderColor}` }}
                  >
                    <div className="flex flex-col items-center justify-center h-full w-full">
                      {booking.status === 'CONFIRMED' && (
                        <button className="btn btn-primary" style={{ width: '80%', padding: '0.2rem', fontSize: '0.75rem', whiteSpace: 'nowrap' }} onClick={() => setSelectedBooking(booking)}>
                          [ Nút ]
                        </button>
                      )}
                      {booking.status === 'IN_PROGRESS' && (
                        <span className="badge" style={{ padding: '0.2rem 0.5rem', fontSize: '0.75rem', whiteSpace: 'nowrap' }}>[ Trạng thái ]</span>
                      )}
                      {booking.status === 'COMPLETED' && (
                        <span className="badge" style={{ padding: '0.2rem 0.5rem', fontSize: '0.75rem', whiteSpace: 'nowrap' }}>[ Trạng thái ]</span>
                      )}
                      {booking.status === 'PENDING' && (
                        <span className="badge" style={{ padding: '0.2rem 0.5rem', fontSize: '0.75rem', whiteSpace: 'nowrap' }}>[ Trạng thái ]</span>
                      )}
                      {booking.status === 'PENDING_CANCEL' && (
                        <span className="badge" style={{ padding: '0.2rem 0.5rem', fontSize: '0.75rem', whiteSpace: 'nowrap' }}>[ Trạng thái ]</span>
                      )}
                    </div>
                    
                    <div className="timeline-tooltip">
                      <div className="font-bold text-sm mb-1">{booking.customerName}</div>
                      <div className="text-xs text-muted mb-1">Mã đơn: #{booking.id.toUpperCase()}</div>
                      <div className="text-xs font-semibold" style={{ color: borderColor }}>
                         {booking.status === 'CONFIRMED' ? 'Đã xác nhận' : 
                          booking.status === 'IN_PROGRESS' ? 'Đang đá' : 
                          booking.status === 'COMPLETED' ? 'Đã xong' :
                          booking.status === 'PENDING' ? 'Chờ duyệt' : 'Yêu cầu hủy'}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {selectedBooking && (() => {
        return (
          <ModalOverlay onClose={() => setSelectedBooking(null)}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Chi Tiết Nhận Sân</h2>
              <button onClick={() => setSelectedBooking(null)} className="text-muted hover:text-[var(--color-text-base)]"><X size={24} /></button>
            </div>
            
            <div className="grid gap-4 mb-6">
              <div style={{ backgroundColor: 'var(--color-bg-base)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-muted">Mã đơn:</span>
                  <span className="font-semibold text-lg">[ Mã đơn ]</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-muted">Khách hàng:</span>
                  <span className="font-semibold">[ Tên khách hàng ]</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-muted">Sân bóng:</span>
                  <span className="font-semibold">[ Tên sân ]</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-muted">Thời gian:</span>
                  <span className="font-semibold">[ Ngày ] | [ Giờ ]</span>
                </div>
                <div className="flex justify-between items-center mt-4 pt-4 border-t" style={{ borderColor: 'var(--color-border)' }}>
                  <span className="text-sm text-muted">Đã thanh toán (Cọc):</span>
                  <span className="font-bold text-success">[ Số tiền ]</span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm text-muted">Còn lại cần thu:</span>
                  <span className="font-bold text-danger">[ Số tiền ]</span>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-4 mt-4" style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button className="btn btn-secondary font-semibold" style={{ padding: '0.75rem 1.5rem', fontSize: '1.05rem' }} onClick={() => setSelectedBooking(null)}>Đóng</button>
              <button className="btn btn-primary font-semibold flex items-center" style={{ padding: '0.75rem 1.5rem', fontSize: '1.05rem' }} onClick={() => {
                setSelectedBooking(null);
              }}>
                [ Nút ]
              </button>
            </div>
          </ModalOverlay>
        );
      })()}

    </div>
  );
};

export default AdminTimeline;

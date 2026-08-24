import React, { useState } from 'react';
import { Calendar, Search, Play, CheckCircle } from 'lucide-react';
import { mockPitches, mockTimeSlots, mockBookings } from '../../mocks/mockData';

const AdminTimeline: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [selectedPitchType, setSelectedPitchType] = useState<string>('all');

  const getSlotBooking = (pitchId: string, timeSlotId: string) => {
    return mockBookings.find(
      b => b.pitchId === pitchId && b.timeSlotId === timeSlotId && b.date === selectedDate && b.status !== 'CANCELLED'
    );
  };

  const filteredPitches = mockPitches.filter(p => selectedPitchType === 'all' || p.type.toString() === selectedPitchType);

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
              <div style={{ width: 16, height: 16, borderRadius: 4, backgroundColor: 'rgba(16, 185, 129, 0.15)', border: '1px solid var(--color-success)' }}></div>
              <span>Đã cọc</span>
            </div>
            <div className="flex items-center gap-2">
              <div style={{ width: 16, height: 16, borderRadius: 4, backgroundColor: 'rgba(245, 158, 11, 0.15)', border: '1px solid var(--color-warning)' }}></div>
              <span>Đang đá</span>
            </div>
            <div className="flex items-center gap-2">
              <div style={{ width: 16, height: 16, borderRadius: 4, backgroundColor: 'rgba(59, 130, 246, 0.15)', border: '1px solid var(--color-primary)' }}></div>
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
                <div>{slot.startTime} - {slot.endTime}</div>
              </div>
            ))}
          </div>
          
          {filteredPitches.map(pitch => (
            <div key={pitch.id} className="matrix-row">
              <div className="matrix-cell matrix-pitch-name">
                <div>
                  <div>{pitch.name}</div>
                  <div className="text-sm text-muted font-normal mt-1">{pitch.type} người</div>
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
                  bgColor = 'rgba(16, 185, 129, 0.15)';
                  borderColor = 'var(--color-success)';
                } else if (booking.status === 'IN_PROGRESS') {
                  bgColor = 'rgba(245, 158, 11, 0.15)';
                  borderColor = 'var(--color-warning)';
                } else if (booking.status === 'COMPLETED') {
                  bgColor = 'var(--color-bg-base)';
                  borderColor = 'var(--color-border)';
                } else if (booking.status === 'PENDING') {
                  bgColor = 'rgba(59, 130, 246, 0.15)'; // Blue tint
                  borderColor = 'var(--color-primary)';
                } else if (booking.status === 'PENDING_CANCEL') {
                  bgColor = 'rgba(239, 68, 68, 0.15)'; // Red tint
                  borderColor = 'var(--color-danger)';
                }

                return (
                  <div 
                    key={slot.id} 
                    className="matrix-cell matrix-slot"
                    style={{ backgroundColor: bgColor, borderLeft: `3px solid ${borderColor}` }}
                  >
                    <div className="flex flex-col items-center justify-center h-full w-full">
                      {booking.status === 'CONFIRMED' && (
                        <button className="btn btn-primary text-sm p-1" style={{ width: '100%' }}>
                          <Play size={14} /> Nhận sân
                        </button>
                      )}
                      {booking.status === 'IN_PROGRESS' && (
                        <span className="badge badge-warning">Đang đá</span>
                      )}
                      {booking.status === 'COMPLETED' && (
                        <span className="badge text-muted"><CheckCircle size={14} className="mr-1"/> Xong</span>
                      )}
                      {booking.status === 'PENDING' && (
                        <span className="badge text-primary" style={{ backgroundColor: 'var(--color-primary-light)' }}>Chờ duyệt</span>
                      )}
                      {booking.status === 'PENDING_CANCEL' && (
                        <span className="badge text-danger" style={{ backgroundColor: 'var(--color-danger-light)' }}>Yêu cầu hủy</span>
                      )}
                    </div>
                    
                    <div className="timeline-tooltip">
                      <div className="font-bold text-sm mb-1">{booking.customerName}</div>
                      <div className="text-xs text-muted mb-1">Mã đơn: #{booking.id.toUpperCase()}</div>
                      <div className="text-xs font-semibold" style={{ color: borderColor }}>
                         {booking.status === 'CONFIRMED' ? 'Đã cọc' : 
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
    </div>
  );
};

export default AdminTimeline;

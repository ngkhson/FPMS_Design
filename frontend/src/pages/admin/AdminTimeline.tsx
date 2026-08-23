import React, { useState } from 'react';
import { Calendar, Search, Play, CheckCircle } from 'lucide-react';
import { mockPitches, mockTimeSlots, mockBookings } from '../../mocks/mockData';

const AdminTimeline: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );

  const getSlotBooking = (pitchId: string, timeSlotId: string) => {
    return mockBookings.find(
      b => b.pitchId === pitchId && b.timeSlotId === timeSlotId && b.date === selectedDate
    );
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Timeline Sân Hôm Nay</h1>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-2" style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--color-bg-base)' }}>
            <Calendar size={18} className="text-muted" />
            <input 
              type="date" 
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              style={{ background: 'transparent', border: 'none', outline: 'none', color: 'var(--color-text-base)', fontFamily: 'inherit' }}
            />
          </div>
          <button className="btn btn-secondary">Làm mới</button>
        </div>
      </div>

      <div className="card">
        {/* Legends */}
        <div className="flex items-center gap-6 mb-6 text-sm">
          <div className="flex items-center gap-2">
            <div style={{ width: 16, height: 16, borderRadius: 4, border: '1px solid var(--color-border)' }}></div>
            <span>Trống</span>
          </div>
          <div className="flex items-center gap-2">
            <div style={{ width: 16, height: 16, borderRadius: 4, backgroundColor: 'rgba(16, 185, 129, 0.15)', border: '1px solid var(--color-success)' }}></div>
            <span>Sắp đá (Đã cọc)</span>
          </div>
          <div className="flex items-center gap-2">
            <div style={{ width: 16, height: 16, borderRadius: 4, backgroundColor: 'rgba(245, 158, 11, 0.15)', border: '1px solid var(--color-warning)' }}></div>
            <span>Đang đá trên sân</span>
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
          
          {mockPitches.map(pitch => (
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
                }

                return (
                  <div 
                    key={slot.id} 
                    className="matrix-cell matrix-slot"
                    style={{ backgroundColor: bgColor, borderLeft: `3px solid ${borderColor}` }}
                  >
                    <div className="flex flex-col items-center justify-center h-full">
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
                    </div>
                    
                    <div className="timeline-tooltip">
                      <div className="font-bold text-sm mb-1">{booking.customerName}</div>
                      <div className="text-xs text-muted mb-1">Mã đơn: #{booking.id.toUpperCase()}</div>
                      <div className="text-xs font-semibold" style={{ color: borderColor }}>
                         {booking.status === 'CONFIRMED' ? 'Đã cọc' : booking.status === 'IN_PROGRESS' ? 'Đang đá' : 'Đã xong'}
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

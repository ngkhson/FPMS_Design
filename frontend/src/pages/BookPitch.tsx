import React, { useState } from 'react';
import { Calendar } from 'lucide-react';
import { mockPitches, mockTimeSlots, mockBookings } from '../mocks/mockData';
import { useNavigate } from 'react-router-dom';

const BookPitch: React.FC = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const getSlotStatus = (pitchId: string, timeSlotId: string) => {
    const pitch = mockPitches.find(p => p.id === pitchId);
    if (pitch?.status === 'MAINTENANCE') return 'maintenance';
    
    const booking = mockBookings.find(
      b => b.pitchId === pitchId && b.timeSlotId === timeSlotId && b.date === selectedDate && b.status !== 'CANCELLED'
    );
    
    if (booking) return 'booked';
    return 'available';
  };

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Đặt Sân</h1>
          <p className="text-muted">Chọn ngày và sân bóng phù hợp với bạn.</p>
        </div>
        
        {/* Date Filter */}
        <div className="flex items-center gap-2 px-4 py-2 bg-surface border border-border rounded-md shadow-sm" style={{ backgroundColor: 'var(--color-bg-surface)' }}>
          <Calendar size={18} className="text-muted" />
          <input 
            type="date" 
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            style={{ background: 'transparent', border: 'none', outline: 'none', color: 'var(--color-text-base)', fontFamily: 'inherit' }}
          />
        </div>
      </div>

      <div className="card">
        {/* Legends */}
        <div className="flex items-center gap-6 mb-6 text-sm font-medium">
          <div className="flex items-center gap-2">
            <div style={{ width: 16, height: 16, borderRadius: 4, border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg-base)' }}></div>
            <span>Trống</span>
          </div>
          <div className="flex items-center gap-2">
            <div style={{ width: 16, height: 16, borderRadius: 4, backgroundColor: 'rgba(239, 68, 68, 0.15)', border: '1px solid var(--color-danger)' }}></div>
            <span>Đã đặt</span>
          </div>
          <div className="flex items-center gap-2">
            <div style={{ width: 16, height: 16, borderRadius: 4, backgroundColor: 'var(--color-bg-base)', border: '1px dashed var(--color-border)' }}></div>
            <span>Bảo trì</span>
          </div>
        </div>

        {/* Matrix Gantt for Customer */}
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
                const status = getSlotStatus(pitch.id, slot.id);
                
                if (status === 'maintenance') {
                  return <div key={slot.id} className="matrix-cell matrix-slot maintenance" style={{ borderStyle: 'dashed' }}>Bảo trì</div>;
                }

                if (status === 'booked') {
                  return (
                    <div 
                      key={slot.id} 
                      className="matrix-cell matrix-slot"
                      style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', color: 'var(--color-danger)', borderLeft: '3px solid var(--color-danger)', cursor: 'not-allowed' }}
                    >
                      <div className="flex flex-col items-center justify-center h-full font-semibold">
                        Đã đặt
                      </div>
                    </div>
                  );
                }

                // Available
                return (
                  <div 
                    key={slot.id} 
                    className="matrix-cell matrix-slot"
                    onClick={() => navigate(`/checkout/${slot.id}/${pitch.id}`)}
                    style={{ backgroundColor: 'var(--color-bg-base)', borderLeft: '3px solid var(--color-primary)' }}
                    title="Nhấn để đặt sân"
                  >
                    <div className="flex flex-col items-center justify-center h-full">
                      <span className="font-bold" style={{ color: 'var(--color-primary)' }}>{formatPrice(slot.basePrice)}</span>
                      <span className="text-xs text-muted mt-1">Trống</span>
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

export default BookPitch;

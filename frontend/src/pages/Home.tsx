import React, { useState } from 'react';
import { Calendar, Search } from 'lucide-react';
import { mockPitches, mockTimeSlots, mockBookings } from '../mocks/mockData';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  
  // Format price
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const getSlotStatus = (pitchId: string, timeSlotId: string) => {
    const pitch = mockPitches.find(p => p.id === pitchId);
    if (pitch?.status === 'MAINTENANCE') return 'maintenance';
    
    // Check if booked
    const booking = mockBookings.find(
      b => b.pitchId === pitchId && b.timeSlotId === timeSlotId && b.date === selectedDate
    );
    
    if (booking) return 'booked';
    return 'available';
  };

  return (
    <div>
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold mt-4" style={{ color: 'var(--color-primary)' }}>
          Hệ thống Đặt Sân Bóng Online
        </h1>
        <p className="text-muted mt-2">Vui lòng chọn ngày và khung giờ bạn muốn đặt</p>
      </div>

      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Timeline Sân Bóng</h2>
          
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
            
            <button className="btn btn-primary">
              <Search size={18} /> Lọc sân
            </button>
          </div>
        </div>
        
        {/* Legends */}
        <div className="flex items-center gap-6 mb-6 text-sm">
          <div className="flex items-center gap-2">
            <div style={{ width: 16, height: 16, borderRadius: 4, border: '1px solid var(--color-border)' }}></div>
            <span>Sân trống</span>
          </div>
          <div className="flex items-center gap-2">
            <div style={{ width: 16, height: 16, borderRadius: 4, backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)' }}></div>
            <span>Đã đặt</span>
          </div>
          <div className="flex items-center gap-2">
            <div style={{ width: 16, height: 16, borderRadius: 4, backgroundColor: 'var(--color-bg-base)' }}></div>
            <span>Bảo trì</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="badge badge-warning">⚡ Giờ vàng</span>
            <span>(Phụ thu)</span>
          </div>
        </div>

        {/* Matrix */}
        <div className="matrix-container">
          <div className="matrix-header">
            <div className="matrix-cell matrix-pitch-name">Sân / Khung giờ</div>
            {mockTimeSlots.map(slot => (
              <div key={slot.id} className="matrix-cell font-semibold">
                <div>{slot.startTime} - {slot.endTime}</div>
                {slot.isPeak && <div className="mt-1"><span className="badge badge-warning">Giờ vàng</span></div>}
              </div>
            ))}
          </div>
          
          {mockPitches.map(pitch => (
            <div key={pitch.id} className="matrix-row">
              <div className="matrix-cell matrix-pitch-name">
                <div>
                  <div>{pitch.name}</div>
                  <div className="text-sm text-muted font-normal mt-1">Loại sân: {pitch.type}</div>
                </div>
              </div>
              
              {mockTimeSlots.map(slot => {
                const status = getSlotStatus(pitch.id, slot.id);
                
                return (
                  <div 
                    key={`${pitch.id}-${slot.id}`} 
                    className={`matrix-cell matrix-slot ${status}`}
                    onClick={() => {
                      if (status === 'available') {
                        navigate(`/checkout/${slot.id}/${pitch.id}`);
                      }
                    }}
                  >
                    {status === 'available' && (
                      <div className="flex flex-col items-center justify-center h-full">
                        <span className="font-semibold text-primary">{formatPrice(slot.basePrice)}</span>
                        <span className="text-sm text-muted mt-1">Trống</span>
                      </div>
                    )}
                    
                    {status === 'booked' && (
                      <div className="flex flex-col items-center justify-center h-full text-danger font-semibold">
                        Đã đặt
                      </div>
                    )}
                    
                    {status === 'maintenance' && (
                      <div className="flex flex-col items-center justify-center h-full text-muted">
                        Bảo trì
                      </div>
                    )}
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

export default Home;

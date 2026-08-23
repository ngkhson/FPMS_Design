import React, { useState } from 'react';
import { Calendar } from 'lucide-react';
import { mockPitches, mockTimeSlots, mockBookings } from '../mocks/mockData';
import { useNavigate, useSearchParams } from 'react-router-dom';

const BookPitch: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [selectedDate, setSelectedDate] = useState<string>(
    searchParams.get('date') || new Date().toISOString().split('T')[0]
  );
  const [selectedPitchType, setSelectedPitchType] = useState<string>(
    searchParams.get('type') || 'all'
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
    <div className="animate-fade-in pt-8 px-4 md:px-8 mx-auto" style={{ maxWidth: '1600px' }}>
      <div>
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
          <h1 className="text-4xl font-bold mb-3 flex items-center justify-center gap-3 text-white">
            <Calendar size={36} />
            <span>Đặt Sân</span>
          </h1>
          <p className="text-lg" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>Chọn ngày và sân bóng phù hợp với bạn.</p>
        </div>

      <div className="card">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          {/* Legends */}
          <div className="flex flex-wrap items-center gap-4 md:gap-6 text-sm font-medium">
            <div className="flex items-center gap-2">
              <div style={{ width: 16, height: 16, borderRadius: 4, border: '1px solid var(--color-primary)', backgroundColor: 'var(--color-primary-light)' }}></div>
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

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-4">
            {/* Pitch Type Filter */}
            <label 
              className="flex items-center gap-2 shadow-sm transition-all" 
              style={{ backgroundColor: 'white', borderRadius: '999px', border: '1px solid var(--color-border)', cursor: 'pointer', padding: '0.6rem 1.2rem' }}
            >
              <span className="text-muted text-sm font-medium">Loại sân:</span>
              <select 
                value={selectedPitchType}
                onChange={(e) => {
                  setSelectedPitchType(e.target.value);
                  setSearchParams({ type: e.target.value, date: selectedDate }, { replace: true });
                }}
                style={{ background: 'transparent', border: 'none', outline: 'none', color: 'var(--color-text-base)', fontFamily: 'inherit', fontWeight: 'bold', cursor: 'pointer', paddingRight: '0.5rem' }}
              >
                <option value="all">Tất cả</option>
                <option value="5">Sân 5 người</option>
                <option value="7">Sân 7 người</option>
              </select>
            </label>
            
            {/* Date Filter */}
            <div 
              className="flex items-center gap-2 shadow-sm transition-all" 
              style={{ backgroundColor: 'white', borderRadius: '999px', border: '1px solid var(--color-border)', cursor: 'pointer', padding: '0.6rem 1.2rem' }}
              onClick={() => {
                const input = document.getElementById('date-picker-input') as HTMLInputElement;
                if (input && 'showPicker' in HTMLInputElement.prototype) {
                  try { input.showPicker(); } catch (e) {}
                }
              }}
            >
              <span className="text-muted text-sm font-medium">Ngày đá:</span>
              <input 
                id="date-picker-input"
                type="date" 
                value={selectedDate}
                onChange={(e) => {
                  setSelectedDate(e.target.value);
                  setSearchParams({ type: selectedPitchType, date: e.target.value }, { replace: true });
                }}
                style={{ background: 'transparent', border: 'none', outline: 'none', color: 'var(--color-text-base)', fontFamily: 'inherit', fontWeight: 'bold', cursor: 'pointer' }}
                onClick={(e) => {
                  if ('showPicker' in HTMLInputElement.prototype) {
                    try { (e.target as HTMLInputElement).showPicker(); } catch (err) {}
                  }
                }}
              />
            </div>
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
          
          {mockPitches.filter(p => selectedPitchType === 'all' || p.type.toString() === selectedPitchType).map(pitch => (
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
                  return (
                    <div key={slot.id} className="matrix-cell p-1">
                      <div className="flex flex-col items-center justify-center font-medium" style={{ height: '100%', borderRadius: '6px', backgroundColor: 'var(--color-bg-base)', border: '1px dashed var(--color-border)', color: 'var(--color-text-muted)', cursor: 'not-allowed', padding: '0.25rem' }}>
                        Bảo trì
                      </div>
                    </div>
                  );
                }

                if (status === 'booked') {
                  return (
                    <div key={slot.id} className="matrix-cell p-1">
                      <div className="flex flex-col items-center justify-center font-semibold" style={{ height: '100%', borderRadius: '6px', backgroundColor: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.2)', color: 'var(--color-danger)', cursor: 'not-allowed', padding: '0.25rem' }}>
                        Đã đặt
                      </div>
                    </div>
                  );
                }

                // Available
                return (
                  <div key={slot.id} className="matrix-cell p-1">
                    <div 
                      className="flex flex-col items-center justify-center transition-all matrix-slot-inner"
                      onClick={() => navigate(`/checkout/${slot.id}/${pitch.id}`)}
                      style={{ height: '100%', borderRadius: '6px', backgroundColor: 'var(--color-primary-light)', border: '1px solid var(--color-primary)', cursor: 'pointer', padding: '0.25rem' }}
                      title="Nhấn để đặt sân"
                      onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--color-primary)'; e.currentTarget.style.color = 'white'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'var(--color-primary-light)'; e.currentTarget.style.color = 'inherit'; }}
                    >
                      <span className="font-bold text-sm">{formatPrice(slot.basePrice)}</span>
                      <span className="text-xs mt-1 opacity-90">Trống</span>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
      </div>
    </div>
  );
};

export default BookPitch;

import React from 'react';
import { mockBookings, mockPitches, mockTimeSlots } from '../mocks/mockData';
import { Search } from 'lucide-react';

const MyBookings: React.FC = () => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'CONFIRMED': return <span className="badge badge-success">Đã xác nhận (Sắp đá)</span>;
      case 'IN_PROGRESS': return <span className="badge badge-warning">Đang sử dụng sân</span>;
      case 'COMPLETED': return <span className="badge badge-success" style={{ backgroundColor: 'rgba(59, 130, 246, 0.15)', color: 'var(--color-secondary)' }}>Hoàn thành</span>;
      case 'PENDING_CANCEL': return <span className="badge badge-warning">Chờ duyệt hủy</span>;
      case 'CANCELLED': return <span className="badge badge-danger">Đã hủy</span>;
      default: return <span className="badge">Chưa rõ</span>;
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Đơn đặt sân của tôi</h1>
      
      <div className="card mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex gap-4">
            <button className="font-semibold px-4 py-2" style={{ borderBottom: '2px solid var(--color-primary)', color: 'var(--color-primary)' }}>Tất cả</button>
            <button className="font-semibold px-4 py-2 text-muted hover:text-base transition">Sắp tới</button>
            <button className="font-semibold px-4 py-2 text-muted hover:text-base transition">Lịch sử</button>
          </div>
          
          <div className="flex items-center gap-2 px-3 py-2" style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--color-bg-base)' }}>
            <Search size={16} className="text-muted" />
            <input 
              type="text" 
              placeholder="Tìm kiếm..."
              style={{ background: 'transparent', border: 'none', outline: 'none', color: 'var(--color-text-base)', fontFamily: 'inherit' }}
            />
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
              {mockBookings.map((booking) => {
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
                        <button className="btn btn-secondary text-sm">Yêu cầu hủy</button>
                      )}
                      {booking.status === 'COMPLETED' && (
                        <button className="btn btn-primary text-sm" style={{ backgroundColor: 'var(--color-secondary)' }}>Thanh toán nốt</button>
                      )}
                      {(booking.status === 'IN_PROGRESS' || booking.status === 'PENDING_CANCEL' || booking.status === 'CANCELLED') && (
                        <button className="btn btn-secondary text-sm">Xem chi tiết</button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyBookings;

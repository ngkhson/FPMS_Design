import React, { useState } from 'react';
import { mockBookings, mockPitches, mockTimeSlots } from '../../mocks/mockData';
import { Search, Filter, Calendar } from 'lucide-react';

const AdminBookings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('ALL'); // ALL, PENDING_CANCEL, IN_PROGRESS

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'CONFIRMED': return <span className="badge badge-success">Đã cọc (Sắp đá)</span>;
      case 'IN_PROGRESS': return <span className="badge badge-warning">Đang đá</span>;
      case 'COMPLETED': return <span className="badge" style={{ backgroundColor: 'rgba(59, 130, 246, 0.15)', color: 'var(--color-secondary)' }}>Đã xong & Thanh toán</span>;
      case 'PENDING_CANCEL': return <span className="badge badge-danger">Yêu cầu hủy</span>;
      case 'CANCELLED': return <span className="badge badge-danger" style={{ opacity: 0.7 }}>Đã hủy</span>;
      default: return <span className="badge">{status}</span>;
    }
  };

  const filteredBookings = mockBookings.filter(b => {
    if (activeTab === 'ALL') return true;
    if (activeTab === 'PENDING_CANCEL') return b.status === 'PENDING_CANCEL';
    if (activeTab === 'IN_PROGRESS') return b.status === 'IN_PROGRESS';
    return true;
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Quản lý Đơn đặt sân</h1>
        <button className="btn btn-primary">Tạo đơn tại quầy</button>
      </div>

      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <div className="flex gap-2">
            <button 
              className={`btn ${activeTab === 'ALL' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setActiveTab('ALL')}
            >
              Tất cả
            </button>
            <button 
              className={`btn ${activeTab === 'IN_PROGRESS' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setActiveTab('IN_PROGRESS')}
            >
              Đang đá (Nợ phí)
            </button>
            <button 
              className={`btn ${activeTab === 'PENDING_CANCEL' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setActiveTab('PENDING_CANCEL')}
              style={activeTab === 'PENDING_CANCEL' ? { backgroundColor: 'var(--color-danger)' } : {}}
            >
              Cần xử lý hủy (1)
            </button>
          </div>
          
          <div className="flex gap-4">
            <div className="flex items-center gap-2 px-3 py-2" style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--color-bg-base)' }}>
              <Calendar size={16} className="text-muted" />
              <input type="date" style={{ background: 'transparent', border: 'none', outline: 'none', color: 'var(--color-text-base)', fontFamily: 'inherit' }} />
            </div>
            <button className="btn btn-secondary"><Filter size={18} /> Lọc</button>
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
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
                      {booking.status === 'IN_PROGRESS' && (
                        <button className="btn btn-primary" style={{ backgroundColor: 'var(--color-secondary)' }}>Thu tiền & Đóng ca</button>
                      )}
                      {booking.status === 'CONFIRMED' && (
                        <button className="btn btn-secondary">Nhận sân</button>
                      )}
                      {booking.status === 'PENDING_CANCEL' && (
                        <button className="btn btn-primary" style={{ backgroundColor: 'var(--color-danger)' }}>Duyệt Hủy & Hoàn tiền</button>
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

export default AdminBookings;

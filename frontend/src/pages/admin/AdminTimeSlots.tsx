import React from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { mockTimeSlots } from '../../mocks/mockData';

const AdminTimeSlots: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">


      <div className="card h-fit">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Danh sách Khung giờ</h2>
          <button className="btn btn-primary"><Plus size={18} /> Thêm ca mới</button>
        </div>
        <p className="text-sm text-muted mb-4">Hệ thống sẽ dựa vào khung giờ này để tạo các slot trống cho khách đặt. Việc phân loại (Thường/Vàng) sẽ quyết định giá tiền được lấy từ Bảng giá.</p>
        
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                <th className="p-4 font-semibold text-muted text-sm">KHUNG GIỜ</th>
                <th className="p-4 font-semibold text-muted text-sm">PHÂN LOẠI</th>
                <th className="p-4 font-semibold text-muted text-sm">GIÁ SÂN 5 (VNĐ)</th>
                <th className="p-4 font-semibold text-muted text-sm">GIÁ SÂN 7 (VNĐ)</th>
                <th className="p-4 font-semibold text-muted text-sm text-right">THAO TÁC</th>
              </tr>
            </thead>
            <tbody>
              {mockTimeSlots.map((slot) => (
                <tr key={slot.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td className="p-4 font-semibold text-lg">{slot.startTime} - {slot.endTime}</td>
                  <td className="p-4">
                    {slot.isPeak 
                      ? <span className="badge badge-warning">⚡ Giờ vàng</span>
                      : <span className="badge badge-success" style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', color: 'var(--color-primary)' }}>Giờ thường</span>
                    }
                  </td>
                  <td className="p-4 font-semibold text-muted">
                    {new Intl.NumberFormat('vi-VN').format(slot.basePrice)} đ
                  </td>
                  <td className="p-4 font-semibold text-muted">
                    {new Intl.NumberFormat('vi-VN').format(slot.basePrice + 100000)} đ
                  </td>
                  <td className="p-4 text-right flex gap-2 justify-end">
                    <button className="btn btn-secondary" style={{ padding: '0.5rem' }}><Edit size={16} /></button>
                    <button className="btn btn-secondary text-danger" style={{ padding: '0.5rem' }}><Trash2 size={16} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminTimeSlots;

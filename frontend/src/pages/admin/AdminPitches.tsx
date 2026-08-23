import React from 'react';
import { Search, Plus, Edit, Settings } from 'lucide-react';
import { mockPitches } from '../../mocks/mockData';

const AdminPitches: React.FC = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Quản lý Sân bóng</h1>
        <button className="btn btn-primary"><Plus size={18} /> Thêm sân mới</button>
      </div>

      <div className="card">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2 px-3 py-2" style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--color-bg-base)', width: '300px' }}>
            <Search size={16} className="text-muted" />
            <input type="text" placeholder="Tìm theo tên sân..." style={{ background: 'transparent', border: 'none', outline: 'none', color: 'var(--color-text-base)', fontFamily: 'inherit', width: '100%' }} />
          </div>
          
          <div className="flex gap-2">
            <select className="px-3 py-2" style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--color-bg-base)', color: 'var(--color-text-base)', outline: 'none' }}>
              <option>Tất cả loại sân</option>
              <option>Sân 5 người</option>
              <option>Sân 7 người</option>
            </select>
            <select className="px-3 py-2" style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--color-bg-base)', color: 'var(--color-text-base)', outline: 'none' }}>
              <option>Tất cả trạng thái</option>
              <option>Đang hoạt động (AVAILABLE)</option>
              <option>Bảo trì (MAINTENANCE)</option>
            </select>
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                <th className="p-4 font-semibold text-muted text-sm">TÊN SÂN</th>
                <th className="p-4 font-semibold text-muted text-sm">LOẠI SÂN</th>
                <th className="p-4 font-semibold text-muted text-sm">TRẠNG THÁI</th>
                <th className="p-4 font-semibold text-muted text-sm text-right">THAO TÁC</th>
              </tr>
            </thead>
            <tbody>
              {mockPitches.map((pitch) => (
                <tr key={pitch.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td className="p-4 font-semibold">
                    {pitch.name}
                    <div className="text-xs text-muted font-normal mt-1">Mã: {pitch.id}</div>
                  </td>
                  <td className="p-4">
                    <span className="badge" style={{ backgroundColor: 'var(--color-bg-base)', border: '1px solid var(--color-border)' }}>Sân {pitch.type} người</span>
                  </td>
                  <td className="p-4">
                    {pitch.status === 'AVAILABLE' 
                      ? <span className="badge badge-success">Đang hoạt động</span>
                      : <span className="badge badge-warning">Đang bảo trì</span>
                    }
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex gap-2 justify-end">
                      <button className="btn btn-secondary text-primary" style={{ padding: '0.5rem' }} title="Cài đặt bảo trì">
                        <Settings size={16} />
                      </button>
                      <button className="btn btn-secondary" style={{ padding: '0.5rem' }} title="Chỉnh sửa">
                        <Edit size={16} />
                      </button>
                    </div>
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

export default AdminPitches;

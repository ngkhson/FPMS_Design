import React, { useState } from 'react';
import { Search, Plus, Edit, Settings } from 'lucide-react';
import { mockPitches } from '../../mocks/mockData';

const AdminPitches: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const filteredPitches = mockPitches.filter(pitch => {
    if (searchTerm && !pitch.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    if (typeFilter !== 'ALL' && pitch.type !== typeFilter) return false;
    if (statusFilter !== 'ALL' && pitch.status !== statusFilter) return false;
    return true;
  });
  return (
    <div>


      <div className="card">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2" style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--color-bg-base)', width: '300px', padding: '0.6rem 1rem' }}>
            <Search size={16} className="text-muted" />
            <input type="text" placeholder="Tìm theo tên sân..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{ background: 'transparent', border: 'none', outline: 'none', color: 'var(--color-text-base)', fontFamily: 'inherit', width: '100%' }} />
          </div>
          
          <div className="flex gap-2 items-center">
            <select className="" value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--color-bg-base)', color: 'var(--color-text-base)', outline: 'none', padding: '0.6rem 1rem' }}>
              <option value="ALL">Tất cả loại sân</option>
              <option value="5">Sân 5 người</option>
              <option value="7">Sân 7 người</option>
            </select>
            <select className="" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--color-bg-base)', color: 'var(--color-text-base)', outline: 'none', padding: '0.6rem 1rem' }}>
              <option value="ALL">Tất cả trạng thái</option>
              <option value="AVAILABLE">Đang hoạt động (AVAILABLE)</option>
              <option value="MAINTENANCE">Bảo trì (MAINTENANCE)</option>
            </select>
            <button className="btn btn-primary"><Plus size={18} /> Thêm sân mới</button>
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
              {filteredPitches.map((pitch) => (
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

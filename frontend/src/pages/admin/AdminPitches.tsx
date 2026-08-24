import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { Search, Plus, Edit, Settings, X, Wrench } from 'lucide-react';
import { mockPitches } from '../../mocks/mockData';

const ModalOverlay = ({ children, onClose }: { children: React.ReactNode, onClose: () => void }) => {
  return createPortal(
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: '1rem' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} onClick={onClose} />
      <div className="card" style={{ position: 'relative', zIndex: 10000, width: '100%', maxWidth: '500px', maxHeight: '90vh', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
        {children}
      </div>
    </div>,
    document.body
  );
};

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

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editPitch, setEditPitch] = useState<any>(null);
  const [maintenancePitch, setMaintenancePitch] = useState<any>(null);

  return (
    <div style={{ height: 'calc(100vh - 140px)', display: 'flex', flexDirection: 'column' }}>
      <div className="card" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div className="flex justify-between items-center mb-6" style={{ flexShrink: 0 }}>
          <div className="flex items-center gap-2" style={{ height: '42px', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--color-bg-base)', width: '300px', padding: '0 1rem' }}>
            <Search size={16} className="text-muted" />
            <input type="text" placeholder="Tìm theo tên sân..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{ background: 'transparent', border: 'none', outline: 'none', color: 'var(--color-text-base)', fontFamily: 'inherit', width: '100%' }} />
          </div>
          
          <div className="flex gap-2 items-center">
            <select className="" value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} style={{ height: '42px', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--color-bg-base)', color: 'var(--color-text-base)', outline: 'none', padding: '0 1rem' }}>
              <option value="ALL">Tất cả loại sân</option>
              <option value="5">Sân 5 người</option>
              <option value="7">Sân 7 người</option>
            </select>
            <select className="" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} style={{ height: '42px', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--color-bg-base)', color: 'var(--color-text-base)', outline: 'none', padding: '0 1rem' }}>
              <option value="ALL">Tất cả trạng thái</option>
              <option value="AVAILABLE">Đang hoạt động</option>
              <option value="MAINTENANCE">Bảo trì</option>
            </select>
            <button className="btn btn-primary" style={{ height: '42px' }} onClick={() => setIsAddModalOpen(true)}><Plus size={18} /> Thêm sân mới</button>
          </div>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', overflowX: 'auto', borderTop: '1px solid var(--color-border)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead style={{ position: 'sticky', top: 0, backgroundColor: 'var(--color-bg-surface)', zIndex: 10 }}>
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
                      {pitch.status === 'AVAILABLE' ? (
                        <button className="btn btn-secondary text-primary" style={{ padding: '0.5rem' }} title="Cài đặt bảo trì" onClick={() => setMaintenancePitch(pitch)}>
                          <Settings size={16} />
                        </button>
                      ) : (
                        <button className="btn btn-secondary text-success" style={{ padding: '0.5rem' }} title="Mở khóa sân" onClick={() => setMaintenancePitch(pitch)}>
                          <Wrench size={16} />
                        </button>
                      )}
                      <button className="btn btn-secondary" style={{ padding: '0.5rem' }} title="Chỉnh sửa" onClick={() => setEditPitch(pitch)}>
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

      {/* Add Pitch Modal */}
      {isAddModalOpen && (
        <ModalOverlay onClose={() => setIsAddModalOpen(false)}>
          <div className="flex justify-between items-center mb-6" style={{ flexShrink: 0 }}>
            <h2 className="text-xl font-bold">Thêm Sân Bóng Mới</h2>
            <button onClick={() => setIsAddModalOpen(false)} className="text-muted hover:text-[var(--color-text-base)]"><X size={24} /></button>
          </div>
          <div className="grid gap-4 mb-6" style={{ overflowY: 'auto', paddingRight: '0.5rem' }}>
            <div>
              <label className="block text-sm font-semibold mb-2">Tên sân</label>
              <input type="text" className="w-full" placeholder="Ví dụ: Sân 5, Sân VIP..." style={{ padding: '0.6rem 1rem', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', background: 'var(--color-bg-base)' }} />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Loại sân</label>
              <select className="w-full" style={{ padding: '0.6rem 1rem', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', background: 'var(--color-bg-base)' }}>
                <option value="5">Sân 5 người</option>
                <option value="7">Sân 7 người</option>
              </select>
            </div>
          </div>
          <div style={{ flexShrink: 0, paddingTop: '1rem', marginTop: 'auto', borderTop: '1px solid var(--color-border)' }}>
            <button className="btn btn-primary w-full" onClick={() => setIsAddModalOpen(false)}>Tạo Sân Mới</button>
          </div>
        </ModalOverlay>
      )}

      {/* Edit Pitch Modal */}
      {editPitch && (
        <ModalOverlay onClose={() => setEditPitch(null)}>
          <div className="flex justify-between items-center mb-6" style={{ flexShrink: 0 }}>
            <h2 className="text-xl font-bold">Chỉnh Sửa Sân Bóng</h2>
            <button onClick={() => setEditPitch(null)} className="text-muted hover:text-[var(--color-text-base)]"><X size={24} /></button>
          </div>
          <div className="grid gap-4 mb-6" style={{ overflowY: 'auto', paddingRight: '0.5rem' }}>
            <div>
              <label className="block text-sm font-semibold mb-2">Tên sân</label>
              <input type="text" className="w-full" defaultValue={editPitch.name} style={{ padding: '0.6rem 1rem', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', background: 'var(--color-bg-base)' }} />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Loại sân</label>
              <select className="w-full" defaultValue={editPitch.type} style={{ padding: '0.6rem 1rem', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', background: 'var(--color-bg-base)' }}>
                <option value="5">Sân 5 người</option>
                <option value="7">Sân 7 người</option>
              </select>
            </div>
          </div>
          <div style={{ flexShrink: 0, paddingTop: '1rem', marginTop: 'auto', borderTop: '1px solid var(--color-border)', display: 'flex', gap: '1rem' }}>
            <button className="btn btn-secondary w-1/2" onClick={() => setEditPitch(null)}>Hủy bỏ</button>
            <button className="btn btn-primary w-1/2" onClick={() => setEditPitch(null)}>Lưu Thay Đổi</button>
          </div>
        </ModalOverlay>
      )}

      {/* Maintenance/Status Modal */}
      {maintenancePitch && (
        <ModalOverlay onClose={() => setMaintenancePitch(null)}>
          <div className="flex justify-between items-center mb-6" style={{ flexShrink: 0 }}>
            <h2 className={`text-xl font-bold ${maintenancePitch.status === 'AVAILABLE' ? 'text-warning' : 'text-success'}`}>
              {maintenancePitch.status === 'AVAILABLE' ? 'Cài Đặt Bảo Trì' : 'Mở Khóa Sân'}
            </h2>
            <button onClick={() => setMaintenancePitch(null)} className="text-muted hover:text-[var(--color-text-base)]"><X size={24} /></button>
          </div>
          <div className="mb-6">
            <p>
              Bạn có chắc chắn muốn {maintenancePitch.status === 'AVAILABLE' ? 'chuyển' : 'kết thúc bảo trì và mở khóa'} sân <strong>{maintenancePitch.name}</strong> 
              {maintenancePitch.status === 'AVAILABLE' ? ' sang trạng thái bảo trì' : ''} không?
            </p>
            {maintenancePitch.status === 'AVAILABLE' && (
              <p className="text-muted text-sm mt-2">Khách hàng sẽ không thể đặt sân này trong thời gian bảo trì.</p>
            )}
          </div>
          <div style={{ flexShrink: 0, paddingTop: '1rem', marginTop: 'auto', borderTop: '1px solid var(--color-border)', display: 'flex', gap: '1rem' }}>
            <button className="btn btn-secondary w-1/2" onClick={() => setMaintenancePitch(null)}>Hủy bỏ</button>
            <button 
              className="btn w-1/2" 
              style={{ backgroundColor: maintenancePitch.status === 'AVAILABLE' ? 'var(--color-warning)' : 'var(--color-success)', color: 'white' }} 
              onClick={() => setMaintenancePitch(null)}
            >
              Xác nhận
            </button>
          </div>
        </ModalOverlay>
      )}

    </div>
  );
};

export default AdminPitches;

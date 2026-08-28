import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { Search, MoreVertical, Shield, ShieldAlert, UserX, UserCheck, X } from 'lucide-react';

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

const AdminUsers: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [viewUser, setViewUser] = useState<any>(null);
  const [lockUser, setLockUser] = useState<any>(null);
  const users = [
    { id: 'U001', name: 'Nguyễn Văn A', email: 'nguyenvana@gmail.com', phone: '0987654321', role: 'CUSTOMER', status: 'ACTIVE' },
    { id: 'U002', name: 'Nguyễn Thu Ngân', email: 'ngan.staff@fpms.com', phone: '0909090909', role: 'STAFF', status: 'ACTIVE' },
    { id: 'U003', name: 'Phạm Minh Admin', email: 'admin@fpms.com', phone: '0888888888', role: 'ADMIN', status: 'ACTIVE' },
    { id: 'U004', name: 'Khách hàng 4', email: 'kh4@gmail.com', phone: '0911111111', role: 'CUSTOMER', status: 'LOCKED' },
    { id: 'U005', name: 'Nhân viên 5', email: 'nv5@fpms.com', phone: '0922222222', role: 'STAFF', status: 'ACTIVE' },
  ];

  const filteredUsers = users.filter(u => {
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      if (!u.name.toLowerCase().includes(term) && !u.email.toLowerCase().includes(term) && !u.phone.includes(term)) {
        return false;
      }
    }
    if (roleFilter !== 'ALL' && u.role !== roleFilter) return false;
    if (statusFilter !== 'ALL' && u.status !== statusFilter) return false;
    return true;
  });

  return (
    <div style={{ height: 'calc(100vh - 140px)', display: 'flex', flexDirection: 'column' }}>

      <div className="card" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div className="flex justify-between items-center mb-6" style={{ flexShrink: 0 }}>
          <div className="flex items-center gap-2" style={{ height: '42px', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--color-bg-base)', width: '300px', padding: '0 1rem' }}>
            <Search size={16} className="text-muted" />
            <input type="text" placeholder="Tìm theo tên, email, sđt..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{ background: 'transparent', border: 'none', outline: 'none', color: 'var(--color-text-base)', fontFamily: 'inherit', width: '100%' }} />
          </div>
          
          <div className="flex gap-4 items-center">
            <select className="" value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)} style={{ height: '42px', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--color-bg-base)', color: 'var(--color-text-base)', outline: 'none', padding: '0 1rem' }}>
              <option value="ALL">Tất cả vai trò</option>
              <option value="ADMIN">ADMIN</option>
              <option value="STAFF">STAFF</option>
              <option value="CUSTOMER">CUSTOMER</option>
            </select>
            <select className="" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} style={{ height: '42px', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--color-bg-base)', color: 'var(--color-text-base)', outline: 'none', padding: '0 1rem' }}>
              <option value="ALL">Tất cả trạng thái</option>
              <option value="ACTIVE">Đang hoạt động</option>
              <option value="LOCKED">Đã khóa</option>
            </select>
            <button className="btn btn-primary" style={{ height: '42px', padding: '0 1rem' }} onClick={() => setIsAddModalOpen(true)}>
              + Tạo nhân viên
            </button>
          </div>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', overflowX: 'auto', borderTop: '1px solid var(--color-border)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead style={{ position: 'sticky', top: 0, backgroundColor: 'var(--color-bg-surface)', zIndex: 10 }}>
              <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                <th className="p-4 font-semibold text-muted text-sm">HỌ VÀ TÊN</th>
                <th className="p-4 font-semibold text-muted text-sm">LIÊN HỆ</th>
                <th className="p-4 font-semibold text-muted text-sm">VAI TRÒ</th>
                <th className="p-4 font-semibold text-muted text-sm">TRẠNG THÁI</th>
                <th className="p-4 font-semibold text-muted text-sm text-right">THAO TÁC</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td className="p-4">
                    <div className="font-semibold">[ Họ và tên ]</div>
                    <div className="text-xs text-muted">[ Mã ID ]</div>
                  </td>
                  <td className="p-4">
                    <div>[ Email ]</div>
                    <div className="text-sm text-muted">[ SĐT ]</div>
                  </td>
                  <td className="p-4">
                    <span className="badge">[ Vai trò ]</span>
                  </td>
                  <td className="p-4">
                    <span className="font-semibold">[ Trạng thái ]</span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex gap-2 justify-end">
                      {user.status === 'ACTIVE' && (user.role === 'CUSTOMER' || user.role === 'STAFF') ? (
                        <button className="btn btn-secondary text-danger" style={{ padding: '0.5rem' }} title="Khóa tài khoản" onClick={() => setLockUser(user)}>
                          <UserX size={16} />
                        </button>
                      ) : user.status === 'LOCKED' && (user.role === 'CUSTOMER' || user.role === 'STAFF') ? (
                        <button className="btn btn-secondary text-success" style={{ padding: '0.5rem' }} title="Mở khóa tài khoản">
                          <UserCheck size={16} />
                        </button>
                      ) : null}
                      <button className="btn btn-secondary" style={{ padding: '0.5rem' }} onClick={() => setViewUser(user)}>
                        <MoreVertical size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add User Modal */}
      {isAddModalOpen && (
        <ModalOverlay onClose={() => setIsAddModalOpen(false)}>
          <div className="flex justify-between items-center mb-6" style={{ flexShrink: 0 }}>
            <h2 className="text-xl font-bold">Thêm Nhân Viên Mới</h2>
            <button onClick={() => setIsAddModalOpen(false)} className="text-muted hover:text-[var(--color-text-base)]"><X size={24} /></button>
          </div>
          <div className="grid gap-4 mb-6" style={{ overflowY: 'auto', paddingRight: '0.5rem' }}>
            <div>
              <label className="block text-sm font-semibold mb-2">Họ và Tên</label>
              <input type="text" className="w-full" placeholder="Nhập họ và tên..." style={{ padding: '0.6rem 1rem', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', background: 'var(--color-bg-base)' }} />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Số điện thoại</label>
              <input type="text" className="w-full" placeholder="Nhập SĐT..." style={{ padding: '0.6rem 1rem', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', background: 'var(--color-bg-base)' }} />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Email</label>
              <input type="email" className="w-full" placeholder="Nhập email..." style={{ padding: '0.6rem 1rem', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', background: 'var(--color-bg-base)' }} />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Vai trò</label>
              <input type="text" className="w-full" value="Nhân viên (STAFF)" readOnly style={{ padding: '0.6rem 1rem', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', background: 'var(--color-bg-surface)', color: 'var(--color-text-muted)', cursor: 'not-allowed' }} />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Mật khẩu</label>
              <input type="password" className="w-full" placeholder="Nhập mật khẩu..." style={{ padding: '0.6rem 1rem', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', background: 'var(--color-bg-base)' }} />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Xác nhận mật khẩu</label>
              <input type="password" className="w-full" placeholder="Nhập lại mật khẩu..." style={{ padding: '0.6rem 1rem', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', background: 'var(--color-bg-base)' }} />
            </div>
          </div>
          <div style={{ flexShrink: 0, paddingTop: '1rem', marginTop: 'auto', borderTop: '1px solid var(--color-border)' }}>
            <button className="btn btn-primary w-full" onClick={() => setIsAddModalOpen(false)}>Tạo Tài Khoản</button>
          </div>
        </ModalOverlay>
      )}

      {/* View/Edit User Modal */}
      {viewUser && (
        <ModalOverlay onClose={() => setViewUser(null)}>
          <div className="flex justify-between items-center mb-6" style={{ flexShrink: 0 }}>
            <h2 className="text-xl font-bold">Thông Tin Người Dùng</h2>
            <button onClick={() => setViewUser(null)} className="text-muted hover:text-[var(--color-text-base)]"><X size={24} /></button>
          </div>
          <div className="grid gap-4 mb-6" style={{ overflowY: 'auto', paddingRight: '0.5rem' }}>
            <div>
              <label className="block text-sm font-semibold mb-2">ID: {viewUser.id}</label>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Họ và Tên</label>
              <input type="text" className="w-full" defaultValue={viewUser.name} style={{ padding: '0.6rem 1rem', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', background: 'var(--color-bg-base)' }} />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Số điện thoại</label>
              <input type="text" className="w-full" defaultValue={viewUser.phone} style={{ padding: '0.6rem 1rem', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', background: 'var(--color-bg-base)' }} />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Email</label>
              <input type="email" className="w-full" defaultValue={viewUser.email} style={{ padding: '0.6rem 1rem', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', background: 'var(--color-bg-base)' }} />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Vai trò</label>
              <select className="w-full" defaultValue={viewUser.role} style={{ padding: '0.6rem 1rem', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', background: 'var(--color-bg-base)' }}>
                <option value="CUSTOMER">Khách hàng (CUSTOMER)</option>
                <option value="STAFF">Nhân viên (STAFF)</option>
              </select>
            </div>
          </div>
          <div style={{ flexShrink: 0, paddingTop: '1rem', marginTop: 'auto', borderTop: '1px solid var(--color-border)', display: 'flex', gap: '1rem' }}>
            <button className="btn btn-secondary w-1/2" onClick={() => setViewUser(null)}>Đóng</button>
            <button className="btn btn-primary w-1/2" onClick={() => setViewUser(null)}>Lưu Thay Đổi</button>
          </div>
        </ModalOverlay>
      )}

      {/* Lock User Modal */}
      {lockUser && (
        <ModalOverlay onClose={() => setLockUser(null)}>
          <div className="flex justify-between items-center mb-6" style={{ flexShrink: 0 }}>
            <h2 className="text-xl font-bold">Xác Nhận Thay Đổi Trạng Thái</h2>
            <button onClick={() => setLockUser(null)} className="text-muted hover:text-[var(--color-text-base)]"><X size={24} /></button>
          </div>
          <div className="mb-6">
            <p>Bạn có chắc chắn muốn thay đổi trạng thái của <strong>[ Tên người dùng ]</strong> không?</p>
            <p className="text-muted text-sm mt-2">Hành động này sẽ thay đổi quyền truy cập của người dùng này vào hệ thống.</p>
          </div>
          <div style={{ flexShrink: 0, paddingTop: '1rem', marginTop: 'auto', borderTop: '1px solid var(--color-border)', display: 'flex', gap: '1rem' }}>
            <button className="btn btn-secondary w-1/2" onClick={() => setLockUser(null)}>Hủy bỏ</button>
            <button className="btn btn-primary w-1/2" onClick={() => setLockUser(null)}>Xác nhận</button>
          </div>
        </ModalOverlay>
      )}

    </div>
  );
};

export default AdminUsers;

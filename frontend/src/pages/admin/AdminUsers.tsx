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
  const [unlockUser, setUnlockUser] = useState<any>(null);
  const users = [
    { id: 'U001', name: 'Nguyễn Văn A', email: 'nguyenvana@gmail.com', phone: '0987654321', role: 'CUSTOMER', status: 'ACTIVE' },
    { id: 'U002', name: 'Trần Thị B', email: 'tranthib@gmail.com', phone: '0912345678', role: 'CUSTOMER', status: 'LOCKED' },
    { id: 'U003', name: 'Nguyễn Thu Ngân', email: 'ngan.staff@fpms.com', phone: '0909090909', role: 'STAFF', status: 'ACTIVE' },
    { id: 'U004', name: 'Phạm Minh Admin', email: 'admin@fpms.com', phone: '0888888888', role: 'ADMIN', status: 'ACTIVE' },
    { id: 'U005', name: 'Lê Hoàng C', email: 'lehoangc@gmail.com', phone: '0933333333', role: 'CUSTOMER', status: 'ACTIVE' },
    { id: 'U006', name: 'Vũ Thị D', email: 'vuthid@gmail.com', phone: '0944444444', role: 'CUSTOMER', status: 'ACTIVE' },
    { id: 'U007', name: 'Hoàng Văn E', email: 'hoangvane@gmail.com', phone: '0955555555', role: 'CUSTOMER', status: 'LOCKED' },
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
                <th className="p-4 font-semibold text-muted text-sm text-left">THAO TÁC</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td className="p-4">
                    <div className="font-semibold">{user.name}</div>
                    <div className="text-xs text-muted">ID: {user.id}</div>
                  </td>
                  <td className="p-4">
                    <div>{user.email}</div>
                    <div className="text-sm text-muted">{user.phone}</div>
                  </td>
                  <td className="p-4">
                    {user.role === 'ADMIN' && <span className="badge" style={{ backgroundColor: 'rgba(239, 68, 68, 0.15)', color: 'var(--color-danger)' }}><ShieldAlert size={14} className="mr-1" /> ADMIN</span>}
                    {user.role === 'STAFF' && <span className="badge" style={{ backgroundColor: 'rgba(59, 130, 246, 0.15)', color: 'var(--color-secondary)' }}><Shield size={14} className="mr-1" /> STAFF</span>}
                    {user.role === 'CUSTOMER' && <span className="badge" style={{ backgroundColor: 'var(--color-bg-base)', border: '1px solid var(--color-border)' }}>CUSTOMER</span>}
                  </td>
                  <td className="p-4">
                    {user.status === 'ACTIVE' 
                      ? <span className="badge badge-success">Đang hoạt động</span>
                      : <span className="badge badge-danger">Đã khóa</span>
                    }
                  </td>
                  <td className="p-4 text-left">
                    <div className="flex gap-2 justify-start">
                      {user.status === 'ACTIVE' && (user.role === 'CUSTOMER' || user.role === 'STAFF') ? (
                        <button className="btn btn-secondary text-danger" style={{ padding: '0.5rem' }} title="Khóa tài khoản" onClick={() => setLockUser(user)}>
                          <UserX size={16} />
                        </button>
                      ) : user.status === 'LOCKED' && (user.role === 'CUSTOMER' || user.role === 'STAFF') ? (
                        <button className="btn btn-secondary text-success" style={{ padding: '0.5rem' }} title="Mở khóa tài khoản" onClick={() => setUnlockUser(user)}>
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
              <input type="text" className="w-full" value={viewUser.role === 'CUSTOMER' ? 'Khách hàng (CUSTOMER)' : viewUser.role === 'STAFF' ? 'Nhân viên (STAFF)' : 'Quản trị viên (ADMIN)'} readOnly style={{ padding: '0.6rem 1rem', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', background: 'var(--color-bg-surface)', color: 'var(--color-text-muted)', cursor: 'not-allowed' }} />
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
            <h2 className="text-xl font-bold text-danger">Xác Nhận Khóa Tài Khoản</h2>
            <button onClick={() => setLockUser(null)} className="text-muted hover:text-[var(--color-text-base)]"><X size={24} /></button>
          </div>
          <div className="mb-6">
            <p>Bạn có chắc chắn muốn khóa tài khoản của <strong>{lockUser.name}</strong> không?</p>
            <p className="text-muted text-sm mt-2">Người dùng này sẽ không thể đăng nhập hoặc đặt sân mới cho đến khi được mở khóa lại.</p>
          </div>
          <div style={{ flexShrink: 0, paddingTop: '1rem', marginTop: 'auto', borderTop: '1px solid var(--color-border)', display: 'flex', gap: '1rem' }}>
            <button className="btn btn-secondary w-1/2" onClick={() => setLockUser(null)}>Hủy bỏ</button>
            <button className="btn btn-primary w-1/2" style={{ backgroundColor: 'var(--color-danger)' }} onClick={() => setLockUser(null)}>Khóa Tài Khoản</button>
          </div>
        </ModalOverlay>
      )}

      {/* Unlock User Modal */}
      {unlockUser && (
        <ModalOverlay onClose={() => setUnlockUser(null)}>
          <div className="flex justify-between items-center mb-6" style={{ flexShrink: 0 }}>
            <h2 className="text-xl font-bold text-success">Xác Nhận Mở Khóa</h2>
            <button onClick={() => setUnlockUser(null)} className="text-muted hover:text-[var(--color-text-base)]"><X size={24} /></button>
          </div>
          <div className="mb-6">
            <p>Bạn có chắc chắn muốn mở khóa tài khoản của <strong>{unlockUser.name}</strong> không?</p>
            <p className="text-muted text-sm mt-2">Người dùng này sẽ có thể đăng nhập và tiếp tục sử dụng hệ thống.</p>
          </div>
          <div style={{ flexShrink: 0, paddingTop: '1rem', marginTop: 'auto', borderTop: '1px solid var(--color-border)', display: 'flex', gap: '1rem' }}>
            <button className="btn btn-secondary w-1/2" onClick={() => setUnlockUser(null)}>Hủy bỏ</button>
            <button className="btn btn-primary w-1/2" style={{ backgroundColor: 'var(--color-success)' }} onClick={() => setUnlockUser(null)}>Mở Khóa</button>
          </div>
        </ModalOverlay>
      )}

    </div>
  );
};

export default AdminUsers;

import React, { useState } from 'react';
import { Search, MoreVertical, Shield, ShieldAlert, UserX, UserCheck } from 'lucide-react';

const AdminUsers: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const users = [
    { id: 'U001', name: 'Nguyễn Văn A', email: 'nguyenvana@gmail.com', phone: '0987654321', role: 'CUSTOMER', status: 'ACTIVE' },
    { id: 'U002', name: 'Trần Thị B', email: 'tranthib@gmail.com', phone: '0912345678', role: 'CUSTOMER', status: 'LOCKED' },
    { id: 'U003', name: 'Nguyễn Thu Ngân', email: 'ngan.staff@fpms.com', phone: '0909090909', role: 'STAFF', status: 'ACTIVE' },
    { id: 'U004', name: 'Phạm Minh Admin', email: 'admin@fpms.com', phone: '0888888888', role: 'ADMIN', status: 'ACTIVE' },
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
    <div>


      <div className="card">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2" style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--color-bg-base)', width: '300px', padding: '0.6rem 1rem' }}>
            <Search size={16} className="text-muted" />
            <input type="text" placeholder="Tìm theo tên, email, sđt..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{ background: 'transparent', border: 'none', outline: 'none', color: 'var(--color-text-base)', fontFamily: 'inherit', width: '100%' }} />
          </div>
          
          <div className="flex gap-4 items-center">
            <select className="" value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)} style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--color-bg-base)', color: 'var(--color-text-base)', outline: 'none', padding: '0.6rem 1rem' }}>
              <option value="ALL">Tất cả vai trò</option>
              <option value="ADMIN">ADMIN</option>
              <option value="STAFF">STAFF</option>
              <option value="CUSTOMER">CUSTOMER</option>
            </select>
            <select className="" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--color-bg-base)', color: 'var(--color-text-base)', outline: 'none', padding: '0.6rem 1rem' }}>
              <option value="ALL">Tất cả trạng thái</option>
              <option value="ACTIVE">Đang hoạt động</option>
              <option value="LOCKED">Đã khóa</option>
            </select>
            <button className="btn btn-primary">Thêm nhân viên</button>
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
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
                  <td className="p-4 text-right">
                    <div className="flex gap-2 justify-end">
                      {user.status === 'ACTIVE' && user.role === 'CUSTOMER' ? (
                        <button className="btn btn-secondary text-danger" style={{ padding: '0.5rem' }} title="Khóa tài khoản">
                          <UserX size={16} />
                        </button>
                      ) : user.status === 'LOCKED' ? (
                        <button className="btn btn-secondary text-success" style={{ padding: '0.5rem' }} title="Mở khóa tài khoản">
                          <UserCheck size={16} />
                        </button>
                      ) : null}
                      <button className="btn btn-secondary" style={{ padding: '0.5rem' }}>
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
    </div>
  );
};

export default AdminUsers;

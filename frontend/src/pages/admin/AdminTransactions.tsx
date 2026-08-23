import React, { useState } from 'react';
import { Search, Filter, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const AdminTransactions: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const mockTransactions = [
    { id: 'TX_001', time: '16:30 - Hôm nay', desc: 'Thanh toán nốt đơn #B3', method: 'Tiền mặt', amount: 250000, type: 'IN', status: 'SUCCESS' },
    { id: 'TX_002', time: '15:15 - Hôm nay', desc: 'Khách cọc đơn #B1', method: 'VNPAY', amount: 105000, type: 'IN', status: 'SUCCESS' },
    { id: 'TX_003', time: '14:00 - Hôm nay', desc: 'Hoàn tiền đơn hủy #B2', method: 'Chuyển khoản tay', amount: 105000, type: 'OUT', status: 'SUCCESS' },
    { id: 'TX_004', time: '10:00 - Hôm nay', desc: 'Khách cọc đơn #B4', method: 'VNPAY', amount: 200000, type: 'IN', status: 'FAILED' },
  ];

  const filteredTransactions = mockTransactions.filter(tx => {
    if (searchTerm && !tx.id.toLowerCase().includes(searchTerm.toLowerCase()) && !tx.desc.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    if (typeFilter !== 'ALL' && tx.type !== typeFilter) return false;
    if (statusFilter !== 'ALL' && tx.status !== statusFilter) return false;
    return true;
  });
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  return (
    <div>
      
      {/* Summary Cards */}
      <div className="grid gap-6 mb-6" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
        <div className="card border-l-4" style={{ borderLeft: '4px solid var(--color-primary)' }}>
          <div className="text-muted text-sm font-semibold mb-1">TỔNG THU (TIỀN MẶT)</div>
          <div className="text-2xl font-bold text-primary">{formatPrice(1250000)}</div>
          <div className="text-xs text-muted mt-2">Dùng để giao ca / nộp két</div>
        </div>
        
        <div className="card border-l-4" style={{ borderLeft: '4px solid var(--color-secondary)' }}>
          <div className="text-muted text-sm font-semibold mb-1">TỔNG THU (VNPAY)</div>
          <div className="text-2xl font-bold">{formatPrice(2500000)}</div>
          <div className="text-xs text-muted mt-2">Đã cộng vào tài khoản ngân hàng</div>
        </div>
        
        <div className="card border-l-4" style={{ borderLeft: '4px solid var(--color-danger)' }}>
          <div className="text-muted text-sm font-semibold mb-1">TỔNG HOÀN TRẢ (REFUND)</div>
          <div className="text-2xl font-bold text-danger">{formatPrice(105000)}</div>
          <div className="text-xs text-muted mt-2">Các đơn khách hủy hợp lệ</div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="card">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Lịch sử giao dịch hôm nay</h2>
          <div className="flex gap-4">
            <div className="flex items-center gap-2" style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--color-bg-base)', padding: '0.6rem 1rem' }}>
              <Search size={16} className="text-muted" />
              <input 
                type="text" 
                placeholder="Tìm mã, nội dung..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ background: 'transparent', border: 'none', outline: 'none', color: 'var(--color-text-base)', fontFamily: 'inherit', width: '150px' }} 
              />
            </div>
            
            <select 
              className="btn btn-secondary" 
              style={{ fontWeight: 'normal', fontFamily: 'inherit', outline: 'none', border: '1px solid var(--color-border)' }}
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option value="ALL">Loại: Tất cả</option>
              <option value="IN">Tiền thu (IN)</option>
              <option value="OUT">Tiền hoàn (OUT)</option>
            </select>
            
            <select 
              className="btn btn-secondary" 
              style={{ fontWeight: 'normal', fontFamily: 'inherit', outline: 'none', border: '1px solid var(--color-border)' }}
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="ALL">Trạng thái: Tất cả</option>
              <option value="SUCCESS">Thành công</option>
              <option value="FAILED">Thất bại</option>
            </select>
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                <th className="p-4 font-semibold text-muted text-sm">MÃ GIAO DỊCH</th>
                <th className="p-4 font-semibold text-muted text-sm">THỜI GIAN</th>
                <th className="p-4 font-semibold text-muted text-sm">LOẠI GIAO DỊCH</th>
                <th className="p-4 font-semibold text-muted text-sm">PHƯƠNG THỨC</th>
                <th className="p-4 font-semibold text-muted text-sm text-right">SỐ TIỀN</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map(tx => (
                <tr key={tx.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td className="p-4 font-semibold">{tx.id}</td>
                  <td className="p-4">
                    {tx.time}
                    {tx.status === 'FAILED' && <span className="badge badge-danger ml-2" style={{ marginLeft: '8px' }}>Thất bại</span>}
                  </td>
                  <td className="p-4">{tx.desc}</td>
                  <td className="p-4">
                    <span className={`badge ${tx.method === 'VNPAY' ? 'badge-secondary' : ''}`} style={tx.method === 'VNPAY' ? { backgroundColor: 'rgba(59, 130, 246, 0.1)', color: 'var(--color-secondary)' } : { backgroundColor: 'var(--color-bg-base)', border: '1px solid var(--color-border)' }}>
                      {tx.method}
                    </span>
                  </td>
                  <td className={`p-4 font-bold text-right flex items-center justify-end gap-1 ${tx.type === 'IN' ? 'text-success' : 'text-danger'} ${tx.status === 'FAILED' ? 'opacity-50' : ''}`} style={tx.status === 'FAILED' ? { opacity: 0.5 } : {}}>
                    {tx.type === 'IN' ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />} 
                    {tx.type === 'IN' ? '+' : '-'}{formatPrice(tx.amount)}
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

export default AdminTransactions;

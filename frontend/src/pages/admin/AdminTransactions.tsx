import React from 'react';
import { Search, Filter, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const AdminTransactions: React.FC = () => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Theo dõi giao dịch</h1>
      
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
            <div className="flex items-center gap-2 px-3 py-2" style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--color-bg-base)' }}>
              <Search size={16} className="text-muted" />
              <input type="text" placeholder="Tìm theo mã giao dịch..." style={{ background: 'transparent', border: 'none', outline: 'none', color: 'var(--color-text-base)', fontFamily: 'inherit' }} />
            </div>
            <button className="btn btn-secondary"><Filter size={18} /> Lọc Tiền mặt</button>
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
              <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                <td className="p-4 font-semibold">TX_001</td>
                <td className="p-4">16:30 - Hôm nay</td>
                <td className="p-4">Thanh toán nốt đơn #B3</td>
                <td className="p-4"><span className="badge" style={{ backgroundColor: 'var(--color-bg-base)', border: '1px solid var(--color-border)' }}>Tiền mặt</span></td>
                <td className="p-4 font-bold text-success text-right flex items-center justify-end gap-1">
                  <ArrowUpRight size={16} /> +{formatPrice(250000)}
                </td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                <td className="p-4 font-semibold">TX_002</td>
                <td className="p-4">15:15 - Hôm nay</td>
                <td className="p-4">Khách cọc đơn #B1</td>
                <td className="p-4"><span className="badge badge-secondary" style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)', color: 'var(--color-secondary)' }}>VNPAY</span></td>
                <td className="p-4 font-bold text-success text-right flex items-center justify-end gap-1">
                  <ArrowUpRight size={16} /> +{formatPrice(105000)}
                </td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                <td className="p-4 font-semibold">TX_003</td>
                <td className="p-4">14:00 - Hôm nay</td>
                <td className="p-4">Hoàn tiền đơn hủy #B2</td>
                <td className="p-4"><span className="badge" style={{ backgroundColor: 'var(--color-bg-base)', border: '1px solid var(--color-border)' }}>Chuyển khoản tay</span></td>
                <td className="p-4 font-bold text-danger text-right flex items-center justify-end gap-1">
                  <ArrowDownRight size={16} /> -{formatPrice(105000)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminTransactions;

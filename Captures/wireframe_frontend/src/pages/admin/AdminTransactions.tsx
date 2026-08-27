import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { Search, Download, Calendar, ArrowUpRight, ArrowDownRight, X } from 'lucide-react';
import { mockTransactions } from '../../mocks/mockData';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

const AdminTransactions: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [startDate, setStartDate] = useState('2026-08-17');
  const [endDate, setEndDate] = useState('2026-08-23');
  const [showConfirmExport, setShowConfirmExport] = useState(false);

  const ModalOverlay = ({ children, onClose }: { children: React.ReactNode, onClose: () => void }) => {
    return createPortal(
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: '1rem' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} onClick={onClose} />
        <div
          className="card"
          style={{ position: 'relative', zIndex: 10000, width: '100%', maxWidth: '500px', maxHeight: '90vh', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}
        >
          {children}
        </div>
      </div>,
      document.body
    );
  };

  const filteredTransactions = mockTransactions.filter(tx => {
    // Check Date Range
    if (tx.date < startDate || tx.date > endDate) return false;

    // Check Search
    if (searchTerm && !tx.id.toLowerCase().includes(searchTerm.toLowerCase()) && !tx.desc.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    // Check Filters
    if (typeFilter !== 'ALL' && tx.type !== typeFilter) return false;
    if (statusFilter !== 'ALL' && tx.status !== statusFilter) return false;
    return true;
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const handleExportExcelClick = () => {
    setShowConfirmExport(true);
  };

  const executeExportExcel = async () => {
    setShowConfirmExport(false);

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Giao Dịch');

    worksheet.columns = [
      { header: 'Mã Giao Dịch', key: 'id', width: 15 },
      { header: 'Ngày', key: 'date', width: 15 },
      { header: 'Giờ', key: 'time', width: 10 },
      { header: 'Nội Dung', key: 'desc', width: 30 },
      { header: 'Phương Thức', key: 'method', width: 18 },
      { header: 'Loại', key: 'type', width: 10 },
      { header: 'Số Tiền', key: 'amount', width: 15 },
      { header: 'Trạng Thái', key: 'status', width: 15 },
    ];

    worksheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFFFF' } };
    worksheet.getRow(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF16A34A' } };
    worksheet.getRow(1).alignment = { vertical: 'middle', horizontal: 'center' };

    filteredTransactions.forEach(tx => {
      const row = worksheet.addRow({
        id: tx.id,
        date: tx.date,
        time: tx.time,
        desc: tx.desc,
        method: tx.method,
        type: tx.type === 'IN' ? 'Thu' : 'Chi',
        amount: tx.type === 'IN' ? tx.amount : -tx.amount,
        status: tx.status === 'SUCCESS' ? 'Thành công' : 'Thất bại'
      });

      row.getCell('amount').numFmt = '#,##0" đ"';
      row.alignment = { vertical: 'middle' };
    });

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(blob, `BaoCao_GiaoDich_${startDate}_den_${endDate}.xlsx`);
  };

  return (
    <div style={{ height: 'calc(100vh - 140px)', display: 'flex', flexDirection: 'column' }}>

      {/* Summary Cards */}
      <div className="grid gap-6 mb-6" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
        <div className="card border-l-4" style={{ borderLeft: '4px solid var(--color-primary)' }}>
          <div className="text-muted text-sm font-semibold mb-1">TỔNG THU (TIỀN MẶT)</div>
          <div className="text-2xl font-bold text-primary">{formatPrice(1250000)}</div>
          <div className="text-xs text-muted mt-2">Dùng để giao ca / nộp két</div>
        </div>

        <div className="card border-l-4" style={{ borderLeft: '4px solid var(--color-secondary)' }}>
          <div className="text-muted text-sm font-semibold mb-1">TỔNG THU (CHUYỂN KHOẢN)</div>
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
      <div className="card" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div className="flex flex-col gap-4 mb-6">
          {/* Row 1: Title and Primary Action */}
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Lịch sử giao dịch</h2>
            <button className="btn btn-primary flex items-center" style={{ gap: '0.5rem', padding: '0.6rem 1.2rem' }} onClick={handleExportExcelClick}>
              <Download size={16} /> Xuất báo cáo
            </button>
          </div>

          {/* Row 2: Filters */}
          <div className="flex flex-wrap items-center" style={{ gap: '1rem' }}>

            {/* Search */}
            <div className="flex items-center gap-2" style={{ height: '42px', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--color-bg-base)', padding: '0 0.8rem', flex: '1 1 200px', minWidth: '200px' }}>
              <Search size={16} className="text-muted" />
              <input
                type="text"
                placeholder="Tìm mã, nội dung..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ background: 'transparent', border: 'none', outline: 'none', color: 'var(--color-text-base)', fontFamily: 'inherit', width: '100%' }}
              />
            </div>

            {/* Date Picker */}
            <div className="flex items-center gap-2 flex-wrap" style={{ height: '42px', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--color-bg-base)', padding: '0 0.8rem' }}>
              <span className="text-sm font-semibold whitespace-nowrap text-muted">Ngày:</span>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                onClick={(e) => { try { (e.target as HTMLInputElement).showPicker(); } catch (err) { } }}
                style={{ background: 'transparent', border: 'none', outline: 'none', color: 'var(--color-text-base)', fontFamily: 'inherit', cursor: 'pointer' }}
              />
              <span className="text-muted">-</span>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                onClick={(e) => { try { (e.target as HTMLInputElement).showPicker(); } catch (err) { } }}
                style={{ background: 'transparent', border: 'none', outline: 'none', color: 'var(--color-text-base)', fontFamily: 'inherit', cursor: 'pointer' }}
              />
            </div>

            {/* Type */}
            <select
              className="btn btn-secondary"
              style={{ height: '42px', fontWeight: 'normal', fontFamily: 'inherit', outline: 'none', border: '1px solid var(--color-border)', padding: '0 0.8rem' }}
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option value="ALL">Loại: Tất cả</option>
              <option value="IN">Tiền thu (IN)</option>
              <option value="OUT">Tiền hoàn (OUT)</option>
            </select>

            {/* Status */}
            <select
              className="btn btn-secondary"
              style={{ height: '42px', fontWeight: 'normal', fontFamily: 'inherit', outline: 'none', border: '1px solid var(--color-border)', padding: '0 0.8rem' }}
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="ALL">Trạng thái: Tất cả</option>
              <option value="SUCCESS">Thành công</option>
              <option value="FAILED">Thất bại</option>
            </select>

            <button className="btn btn-secondary font-semibold" style={{ height: '42px', padding: '0 1.2rem' }}>
              Lọc
            </button>
          </div>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', overflowX: 'auto', borderTop: '1px solid var(--color-border)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead style={{ position: 'sticky', top: 0, backgroundColor: 'var(--color-bg-surface)', zIndex: 10 }}>
              <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                <th className="p-4 font-semibold text-muted text-sm">MÃ GIAO DỊCH</th>
                <th className="p-4 font-semibold text-muted text-sm">THỜI GIAN</th>
                <th className="p-4 font-semibold text-muted text-sm">LOẠI GIAO DỊCH</th>
                <th className="p-4 font-semibold text-muted text-sm">PHƯƠNG THỨC</th>
                <th className="p-4 font-semibold text-muted text-sm text-right">SỐ TIỀN</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.slice(0, 3).map(tx => (
                <tr key={tx.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td className="p-4 font-semibold">{tx.id}</td>
                  <td className="p-4">
                    {tx.time} - {tx.date}
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

      {/* Confirm Export Modal */}
      {showConfirmExport && (
        <ModalOverlay onClose={() => setShowConfirmExport(false)}>
          <div className="flex justify-between items-center mb-6" style={{ flexShrink: 0 }}>
            <h2 className="text-xl font-bold">Xác Nhận Xuất File</h2>
            <button onClick={() => setShowConfirmExport(false)} className="text-muted hover:text-[var(--color-text-base)]"><X size={24} /></button>
          </div>
          <div className="mb-6">
            <p>
              Bạn có chắc chắn muốn xuất sổ giao dịch từ ngày <strong>{startDate}</strong> đến ngày <strong>{endDate}</strong> không?
            </p>
            <p className="text-muted text-sm mt-2">File báo cáo (định dạng .xlsx) sẽ tự động được tải xuống sau vài giây.</p>
          </div>
          <div style={{ flexShrink: 0, paddingTop: '1rem', marginTop: 'auto', borderTop: '1px solid var(--color-border)', display: 'flex', gap: '1rem' }}>
            <button className="btn btn-secondary w-1/2" onClick={() => setShowConfirmExport(false)}>Hủy Bỏ</button>
            <button className="btn btn-primary w-1/2" onClick={executeExportExcel}>Xác nhận</button>
          </div>
        </ModalOverlay>
      )}
    </div>
  );
};

export default AdminTransactions;

import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import { Download, Calendar, X } from 'lucide-react';
import { mockBookings, mockPitches, mockTimeSlots } from '../../mocks/mockData';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

const AdminDashboard: React.FC = () => {
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

  const chartData = [
    { name: 'Thứ 2', revenue: 2400000, bookings: 8 },
    { name: 'Thứ 3', revenue: 1398000, bookings: 5 },
    { name: 'Thứ 4', revenue: 4800000, bookings: 15 },
    { name: 'Thứ 5', revenue: 3908000, bookings: 12 },
    { name: 'Thứ 6', revenue: 4800000, bookings: 15 },
    { name: 'Thứ 7', revenue: 6800000, bookings: 22 },
    { name: 'Chủ Nhật', revenue: 8300000, bookings: 28 },
  ];

  const pieData = [
    { name: 'Sân 5 người', value: 65 },
    { name: 'Sân 7 người', value: 35 },
  ];
  const COLORS = ['var(--color-primary)', 'var(--color-secondary)'];

  const handleExportExcelClick = () => {
    setShowConfirmExport(true);
  };

  const executeExportExcel = async () => {
    setShowConfirmExport(false);

    // 1. Filter bookings by date range
    const filteredBookings = mockBookings.filter(b => b.date >= startDate && b.date <= endDate);

    // 2. Initialize workbook and worksheet
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Báo Cáo Doanh Thu');

    // 3. Define columns
    worksheet.columns = [
      { header: 'Mã đơn', key: 'id', width: 12 },
      { header: 'Tên khách hàng', key: 'customer', width: 25 },
      { header: 'Số điện thoại', key: 'phone', width: 15 },
      { header: 'Ngày đặt', key: 'date', width: 15 },
      { header: 'Tên sân', key: 'pitch', width: 15 },
      { header: 'Khung giờ', key: 'time', width: 20 },
      { header: 'Tổng tiền', key: 'total', width: 15 },
      { header: 'Tiền cọc', key: 'deposit', width: 15 },
      { header: 'Tiền mặt thu thêm', key: 'cash', width: 20 },
      { header: 'Tiền hoàn trả', key: 'refund', width: 15 },
      { header: 'Trạng thái', key: 'status', width: 20 },
      { header: 'Nhân viên', key: 'staff', width: 20 },
    ];

    // Style the header row
    worksheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFFFF' } };
    worksheet.getRow(1).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FF16A34A' } // Green color
    };
    worksheet.getRow(1).alignment = { vertical: 'middle', horizontal: 'center' };

    // 4. Add data rows
    filteredBookings.forEach(b => {
      const pitch = mockPitches.find(p => p.id === b.pitchId);
      const slot = mockTimeSlots.find(t => t.id === b.timeSlotId);
      const price = slot?.basePrice || 0;
      const deposit = price * 0.3;
      const remaining = price - deposit;
      let cashCollected = 0;
      let refund = 0;
      
      if (b.status === 'COMPLETED') cashCollected = remaining;
      if (b.status === 'CANCELLED') refund = deposit;

      const row = worksheet.addRow({
        id: b.id,
        customer: b.customerName,
        phone: '0987654321',
        date: b.date,
        pitch: pitch?.name || '',
        time: `${slot?.startTime} - ${slot?.endTime}`,
        total: price,
        deposit: deposit,
        cash: cashCollected,
        refund: refund,
        status: b.status,
        staff: 'Nguyễn Thu Ngân'
      });

      // Format currency cells
      row.getCell('total').numFmt = '#,##0" đ"';
      row.getCell('deposit').numFmt = '#,##0" đ"';
      row.getCell('cash').numFmt = '#,##0" đ"';
      row.getCell('refund').numFmt = '#,##0" đ"';
      
      row.alignment = { vertical: 'middle' };
    });

    // 5. Generate and download
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(blob, `BaoCao_DoanhThu_${startDate}_den_${endDate}.xlsx`);
  };

  const formatYAxis = (tickItem: number) => {
    if (tickItem >= 1000000) {
      return (tickItem / 1000000).toFixed(1) + ' Tr';
    }
    if (tickItem >= 1000) {
      return (tickItem / 1000).toFixed(0) + ' K';
    }
    return tickItem.toString();
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div style={{ backgroundColor: 'var(--color-bg-elevated)', padding: '1rem', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-md)' }}>
          <p className="font-bold mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color, fontSize: '0.875rem', fontWeight: 600 }}>
              {entry.name}: {entry.name === 'Doanh thu' 
                ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(entry.value)
                : (entry.name === 'Sân 5 người' || entry.name === 'Sân 7 người' ? `${entry.value}%` : `${entry.value} đơn`)
              }
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      
      {/* Filters & Export */}
      <div className="card mb-6 p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2 flex-wrap" style={{ height: '42px', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--color-bg-base)', padding: '0 0.8rem' }}>
            <span className="text-sm font-semibold whitespace-nowrap text-muted">Ngày:</span>
            <input 
              type="date" 
              value={startDate} 
              onChange={(e) => setStartDate(e.target.value)}
              onClick={(e) => { try { (e.target as HTMLInputElement).showPicker(); } catch (err) {} }}
              style={{ background: 'transparent', border: 'none', outline: 'none', color: 'var(--color-text-base)', fontFamily: 'inherit', cursor: 'pointer' }} 
            />
            <span className="text-muted">-</span>
            <input 
              type="date" 
              value={endDate} 
              onChange={(e) => setEndDate(e.target.value)}
              onClick={(e) => { try { (e.target as HTMLInputElement).showPicker(); } catch (err) {} }}
              style={{ background: 'transparent', border: 'none', outline: 'none', color: 'var(--color-text-base)', fontFamily: 'inherit', cursor: 'pointer' }} 
            />
          </div>
          
          <button className="btn btn-secondary font-semibold" style={{ height: '42px', padding: '0 1.2rem' }}>
            Lọc
          </button>
        </div>
        
        <button className="btn btn-primary" style={{ height: '42px', padding: '0 1.2rem', gap: '0.5rem' }} onClick={handleExportExcelClick}>
          <Download size={18} />
          Xuất Excel
        </button>
      </div>

      {/* Metric Cards */}
      <div className="grid gap-6 mb-8" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
        <div className="card" style={{ borderLeft: '4px solid var(--color-primary)' }}>
          <div className="text-muted text-sm font-semibold mb-1">DOANH THU KỲ NÀY</div>
          <div className="text-3xl font-bold text-primary">32,450,000 đ</div>
          <div className="text-xs mt-2" style={{ color: 'var(--color-success)' }}>↑ 15% so với kỳ trước</div>
        </div>
        <div className="card" style={{ borderLeft: '4px solid var(--color-secondary)' }}>
          <div className="text-muted text-sm font-semibold mb-1">TỔNG SỐ ĐƠN</div>
          <div className="text-3xl font-bold">105 đơn</div>
          <div className="text-xs mt-2 text-muted">98 đơn hoàn thành, 7 đơn đang đá</div>
        </div>
        <div className="card" style={{ borderLeft: '4px solid var(--color-danger)' }}>
          <div className="text-muted text-sm font-semibold mb-1">TỈ LỆ HỦY ĐƠN</div>
          <div className="text-3xl font-bold text-danger">4.5%</div>
          <div className="text-xs mt-2 text-muted">Giảm 1.2% so với kỳ trước</div>
        </div>
        <div className="card" style={{ borderLeft: '4px solid var(--color-warning)' }}>
          <div className="text-muted text-sm font-semibold mb-1">LƯỢT KHÁCH MỚI</div>
          <div className="text-3xl font-bold">28 người</div>
          <div className="text-xs mt-2 text-muted">Tỉ lệ quay lại: 68%</div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="flex flex-col gap-6 mb-6">
        
        {/* Doanh thu Chart */}
        <div className="card w-full">
          <h2 className="text-lg font-bold mb-6">Biểu đồ Doanh thu</h2>
          <div style={{ width: '100%', height: 350 }}>
            <ResponsiveContainer>
              <LineChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                <XAxis dataKey="name" stroke="var(--color-text-muted)" fontSize={12} tickMargin={10} />
                <YAxis stroke="var(--color-text-muted)" fontSize={12} tickFormatter={formatYAxis} width={60} />
                <Tooltip content={<CustomTooltip />} />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  name="Doanh thu" 
                  stroke="var(--color-primary)" 
                  strokeWidth={3}
                  activeDot={{ r: 8, strokeWidth: 0 }}
                  dot={{ r: 4, strokeWidth: 2, fill: 'var(--color-bg-surface)' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
          {/* Số đơn đặt Chart */}
          <div className="card" style={{ flex: '1 1 400px' }}>
            <h2 className="text-lg font-bold mb-6">Tần suất Đặt sân</h2>
            <div style={{ width: '100%', height: 350 }}>
              <ResponsiveContainer>
                <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                  <XAxis dataKey="name" stroke="var(--color-text-muted)" fontSize={12} tickMargin={10} />
                  <YAxis stroke="var(--color-text-muted)" fontSize={12} />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0,0,0,0.05)' }} />
                  <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                  <Bar 
                    dataKey="bookings" 
                    name="Số đơn đặt" 
                    fill="var(--color-secondary)" 
                    radius={[4, 4, 0, 0]} 
                    barSize={40}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Tỉ trọng loại sân Chart */}
          <div className="card" style={{ flex: '1 1 400px' }}>
            <h2 className="text-lg font-bold mb-6">Doanh thu theo Loại sân</h2>
            <div style={{ width: '100%', height: 350 }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend iconType="circle" layout="vertical" verticalAlign="bottom" align="center" wrapperStyle={{ paddingTop: '20px' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
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
              Bạn có chắc chắn muốn xuất báo cáo doanh thu từ ngày <strong>{startDate}</strong> đến ngày <strong>{endDate}</strong> không?
            </p>
            <p className="text-muted text-sm mt-2">File báo cáo (định dạng .xlsx) sẽ tự động được tải xuống sau vài giây.</p>
          </div>
          <div style={{ flexShrink: 0, paddingTop: '1rem', marginTop: 'auto', borderTop: '1px solid var(--color-border)', display: 'flex', gap: '1rem' }}>
            <button className="btn btn-secondary w-1/2" onClick={() => setShowConfirmExport(false)}>Hủy Bỏ</button>
            <button className="btn btn-primary w-1/2" onClick={executeExportExcel}>Xuất Excel</button>
          </div>
        </ModalOverlay>
      )}
    </div>
  );
};

export default AdminDashboard;

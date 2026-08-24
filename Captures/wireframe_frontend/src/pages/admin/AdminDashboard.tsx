import React, { useState } from 'react';
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import { Download, Calendar } from 'lucide-react';
import { mockBookings, mockPitches, mockTimeSlots } from '../../mocks/mockData';

const AdminDashboard: React.FC = () => {

  const chartData = [
    { name: 'Thứ 2', revenue: 2400000, bookings: 8 },
    { name: 'Thứ 3', revenue: 1398000, bookings: 5 },
    { name: 'Thứ 4', revenue: 4800000, bookings: 15 },
  ];

  const pieData = [
    { name: 'Sân 5 người', value: 65 },
    { name: 'Sân 7 người', value: 35 },
  ];
  const COLORS = ['var(--color-primary)', 'var(--color-secondary)'];

  const handleExportExcel = () => {
    const headers = [
      "Mã đơn", "Tên khách hàng", "Số điện thoại", "Ngày sử dụng sân", 
      "Tên sân", "Khung giờ", "Tổng tiền sân", "Tiền cọc", 
      "Tiền mặt thu tại sân", "Tiền hoàn trả", "Trạng thái đơn", "Nhân viên xử lý"
    ];

    const rows = mockBookings.map(b => {
      const pitch = mockPitches.find(p => p.id === b.pitchId);
      const slot = mockTimeSlots.find(t => t.id === b.timeSlotId);
      const price = slot?.basePrice || 0;
      const deposit = price * 0.3;
      const remaining = price - deposit;
      let cashCollected = 0;
      let refund = 0;
      
      if (b.status === 'COMPLETED') cashCollected = remaining;
      if (b.status === 'CANCELLED') refund = deposit;

      return [
        b.id,
        b.customerName,
        "0987654321",
        b.date,
        pitch?.name || '',
        `${slot?.startTime} - ${slot?.endTime}`,
        price,
        deposit,
        cashCollected,
        refund,
        b.status,
        "Nguyễn Thu Ngân"
      ];
    });

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob(["\uFEFF" + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `BaoCao_DoanhThu_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
          <div className="flex items-center gap-2" style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--color-bg-base)', padding: '0.6rem 1rem' }}>
            <Calendar size={16} className="text-muted" />
            <input type="date" style={{ background: 'transparent', border: 'none', outline: 'none', color: 'var(--color-text-base)', fontFamily: 'inherit' }} />
            <span className="text-muted">-</span>
            <input type="date" style={{ background: 'transparent', border: 'none', outline: 'none', color: 'var(--color-text-base)', fontFamily: 'inherit' }} />
          </div>
          
          <button className="btn btn-secondary" style={{ padding: '0.6rem 1rem', fontWeight: '500' }}>
            Lọc
          </button>
        </div>
        
        <button className="btn btn-primary" style={{ padding: '0.6rem 1.2rem', gap: '0.5rem' }} onClick={handleExportExcel}>
          <Download size={18} />
          Xuất Excel
        </button>
      </div>

      {/* Metric Cards */}
      <div className="grid gap-6 mb-8" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
        <div className="card" style={{ borderLeft: '4px solid var(--color-primary)' }}>
          <div className="text-muted text-sm font-semibold mb-1">DOANH THU KỲ NÀY</div>
          <div className="text-3xl font-bold text-primary">[ Số tiền ]</div>
          <div className="text-xs mt-2" style={{ color: 'var(--color-success)' }}>[ Thay đổi ]</div>
        </div>
        <div className="card" style={{ borderLeft: '4px solid var(--color-secondary)' }}>
          <div className="text-muted text-sm font-semibold mb-1">TỔNG SỐ ĐƠN</div>
          <div className="text-3xl font-bold">[ Số lượng ]</div>
          <div className="text-xs mt-2 text-muted">[ Chi tiết đơn ]</div>
        </div>
        <div className="card" style={{ borderLeft: '4px solid var(--color-danger)' }}>
          <div className="text-muted text-sm font-semibold mb-1">TỈ LỆ HỦY ĐƠN</div>
          <div className="text-3xl font-bold text-danger">[ Tỉ lệ ]</div>
          <div className="text-xs mt-2 text-muted">[ Thay đổi ]</div>
        </div>
        <div className="card" style={{ borderLeft: '4px solid var(--color-warning)' }}>
          <div className="text-muted text-sm font-semibold mb-1">LƯỢT KHÁCH MỚI</div>
          <div className="text-3xl font-bold">[ Số lượng ]</div>
          <div className="text-xs mt-2 text-muted">[ Chi tiết khách ]</div>
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
    </div>
  );
};

export default AdminDashboard;

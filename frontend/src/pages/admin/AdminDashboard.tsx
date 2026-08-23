import React from 'react';
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';

const AdminDashboard: React.FC = () => {
  const chartData = [
    { name: 'Thứ 2', revenue: 2400000, bookings: 8 },
    { name: 'Thứ 3', revenue: 1398000, bookings: 5 },
    { name: 'Thứ 4', revenue: 4800000, bookings: 15 },
    { name: 'Thứ 5', revenue: 3908000, bookings: 12 },
    { name: 'Thứ 6', revenue: 4800000, bookings: 15 },
    { name: 'Thứ 7', revenue: 6800000, bookings: 22 },
    { name: 'Chủ Nhật', revenue: 8300000, bookings: 28 },
  ];

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
            <p key={index} style={{ color: entry.color, fontSize: '0.875rem' }}>
              {entry.name}: {entry.name === 'Doanh thu' 
                ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(entry.value)
                : `${entry.value} đơn`
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
      
      {/* Metric Cards */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '2rem' }}>
        <div className="card" style={{ flex: '1 1 250px', borderLeft: '4px solid var(--color-primary)' }}>
          <div className="text-muted text-sm font-semibold mb-1">DOANH THU HÔM NAY</div>
          <div className="text-3xl font-bold text-primary">3,450,000 đ</div>
          <div className="text-xs mt-2" style={{ color: 'var(--color-success)' }}>↑ 15% so với hôm qua</div>
        </div>
        <div className="card" style={{ flex: '1 1 250px', borderLeft: '4px solid var(--color-secondary)' }}>
          <div className="text-muted text-sm font-semibold mb-1">TỔNG SỐ ĐƠN</div>
          <div className="text-3xl font-bold">12 đơn</div>
          <div className="text-xs mt-2 text-muted">3 đơn đang đá, 9 đơn đã đặt cọc</div>
        </div>
        <div className="card" style={{ flex: '1 1 250px', borderLeft: '4px solid var(--color-warning)' }}>
          <div className="text-muted text-sm font-semibold mb-1">LƯỢT KHÁCH MỚI</div>
          <div className="text-3xl font-bold">5 người</div>
          <div className="text-xs mt-2 text-muted">Tỉ lệ quay lại: 68%</div>
        </div>
      </div>

      {/* Charts Section */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem' }}>
        
        {/* Doanh thu Chart */}
        <div className="card" style={{ flex: '2 1 600px' }}>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold">Biểu đồ Doanh thu (7 ngày)</h2>
            <select style={{ padding: '0.25rem 0.5rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg-base)', outline: 'none' }}>
              <option>Tuần này</option>
              <option>Tháng này</option>
            </select>
          </div>
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

        {/* Số đơn đặt Chart */}
        <div className="card" style={{ flex: '1 1 400px' }}>
          <h2 className="text-lg font-bold mb-6">Tần suất Đặt sân</h2>
          <div style={{ width: '100%', height: 350 }}>
            <ResponsiveContainer>
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                <XAxis dataKey="name" stroke="var(--color-text-muted)" fontSize={12} tickMargin={10} />
                <YAxis stroke="var(--color-text-muted)" fontSize={12} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'var(--color-bg-base)' }} />
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
        
      </div>
    </div>
  );
};

export default AdminDashboard;

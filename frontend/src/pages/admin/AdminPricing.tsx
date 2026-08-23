import React, { useState } from 'react';
import { Plus, Trash2, Save, CalendarDays, SunDim, Gift, Clock, Zap, MapPin } from 'lucide-react';

const AdminPricing: React.FC = () => {
  const [pitchType, setPitchType] = useState('5');

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Bảng giá & Ngày lễ</h1>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem' }}>
        
        {/* LÊN BẢNG GIÁ MA TRẬN */}
        <div className="card" style={{ flex: '1 1 600px' }}>
          
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-bold">Ma trận Bảng giá</h2>
              <p className="text-sm text-muted mt-2">Hệ thống tự động áp dụng giá theo thời điểm đặt sân.</p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2" style={{ border: '1px solid var(--color-primary)', borderRadius: 'var(--radius-full)', padding: '0.35rem 1rem', backgroundColor: 'rgba(16, 185, 129, 0.05)', color: 'var(--color-primary)' }}>
                <MapPin size={16} />
                <select 
                  value={pitchType}
                  onChange={(e) => setPitchType(e.target.value)}
                  style={{ background: 'transparent', border: 'none', outline: 'none', color: 'inherit', fontWeight: 'bold', cursor: 'pointer', fontFamily: 'inherit' }}
                >
                  <option value="5">Sân 5 người</option>
                  <option value="7">Sân 7 người</option>
                </select>
              </div>
            </div>
          </div>

          <div style={{ borderRadius: 'var(--radius-md)', overflowX: 'auto', border: '1px solid var(--color-border)' }}>
            <table style={{ width: '100%', minWidth: '600px', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr>
                  <th className="font-bold text-sm" style={{ padding: '1rem', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg-base)' }}>
                    PHÂN LOẠI NGÀY
                  </th>
                  <th className="font-bold text-sm" style={{ padding: '1rem', border: '1px solid var(--color-border)', backgroundColor: 'rgba(16, 185, 129, 0.05)', color: 'var(--color-primary)' }}>
                    <div className="flex items-center gap-2"><Clock size={18} /> GIỜ THƯỜNG</div>
                  </th>
                  <th className="font-bold text-sm" style={{ padding: '1rem', border: '1px solid var(--color-border)', backgroundColor: 'rgba(245, 158, 11, 0.05)', color: 'var(--color-warning)' }}>
                    <div className="flex items-center gap-2"><Zap size={18} /> GIỜ VÀNG (CAO ĐIỂM)</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* Ngày trong tuần */}
                <tr>
                  <td style={{ padding: '1.25rem 1rem', border: '1px solid var(--color-border)' }}>
                    <div className="flex items-center gap-4">
                      <div style={{ padding: '0.5rem', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--color-bg-base)', border: '1px solid var(--color-border)' }}>
                        <CalendarDays size={20} className="text-muted" />
                      </div>
                      <div>
                        <div className="font-bold">Trong tuần</div>
                        <div className="text-sm text-muted mt-1" style={{ whiteSpace: 'nowrap' }}>Thứ 2 - Thứ 6</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '1.25rem 1rem', border: '1px solid var(--color-border)' }}>
                    <div className="flex items-center gap-2" style={{ backgroundColor: 'var(--color-bg-base)', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                      <input type="text" defaultValue={pitchType === '5' ? "200,000" : "300,000"} style={{ width: '100%', textAlign: 'right', fontSize: '1.125rem', fontWeight: 'bold', background: 'transparent', border: 'none', outline: 'none', color: 'var(--color-text-base)', fontFamily: 'inherit' }} />
                      <span className="font-bold text-muted">đ</span>
                    </div>
                  </td>
                  <td style={{ padding: '1.25rem 1rem', border: '1px solid var(--color-border)' }}>
                    <div className="flex items-center gap-2" style={{ backgroundColor: 'var(--color-bg-base)', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                      <input type="text" defaultValue={pitchType === '5' ? "350,000" : "450,000"} style={{ width: '100%', textAlign: 'right', fontSize: '1.125rem', fontWeight: 'bold', background: 'transparent', border: 'none', outline: 'none', color: 'var(--color-warning)', fontFamily: 'inherit' }} />
                      <span className="font-bold text-muted">đ</span>
                    </div>
                  </td>
                </tr>
                {/* Cuối tuần */}
                <tr>
                  <td style={{ padding: '1.25rem 1rem', border: '1px solid var(--color-border)' }}>
                    <div className="flex items-center gap-4">
                      <div style={{ padding: '0.5rem', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--color-bg-base)', border: '1px solid var(--color-border)' }}>
                        <SunDim size={20} className="text-muted" style={{ color: 'var(--color-secondary)' }} />
                      </div>
                      <div>
                        <div className="font-bold" style={{ color: 'var(--color-secondary)' }}>Cuối tuần</div>
                        <div className="text-sm text-muted mt-1" style={{ whiteSpace: 'nowrap' }}>Thứ 7, Chủ Nhật</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '1.25rem 1rem', border: '1px solid var(--color-border)' }}>
                    <div className="flex items-center gap-2" style={{ backgroundColor: 'var(--color-bg-base)', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                      <input type="text" defaultValue={pitchType === '5' ? "250,000" : "350,000"} style={{ width: '100%', textAlign: 'right', fontSize: '1.125rem', fontWeight: 'bold', background: 'transparent', border: 'none', outline: 'none', color: 'var(--color-secondary)', fontFamily: 'inherit' }} />
                      <span className="font-bold text-muted">đ</span>
                    </div>
                  </td>
                  <td style={{ padding: '1.25rem 1rem', border: '1px solid var(--color-border)' }}>
                    <div className="flex items-center gap-2" style={{ backgroundColor: 'var(--color-bg-base)', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                      <input type="text" defaultValue={pitchType === '5' ? "400,000" : "500,000"} style={{ width: '100%', textAlign: 'right', fontSize: '1.125rem', fontWeight: 'bold', background: 'transparent', border: 'none', outline: 'none', color: 'var(--color-warning)', fontFamily: 'inherit' }} />
                      <span className="font-bold text-muted">đ</span>
                    </div>
                  </td>
                </tr>
                {/* Ngày Lễ */}
                <tr style={{ backgroundColor: 'rgba(239, 68, 68, 0.02)' }}>
                  <td style={{ padding: '1.25rem 1rem', border: '1px solid var(--color-border)' }}>
                    <div className="flex items-center gap-4">
                      <div style={{ padding: '0.5rem', borderRadius: 'var(--radius-md)', backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                        <Gift size={20} style={{ color: 'var(--color-danger)' }} />
                      </div>
                      <div>
                        <div className="font-bold" style={{ color: 'var(--color-danger)' }}>Ngày Lễ</div>
                        <div className="text-sm text-muted mt-1" style={{ whiteSpace: 'nowrap' }}>Áp dụng phụ thu</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '1.25rem 1rem', border: '1px solid var(--color-border)' }}>
                    <div className="flex items-center gap-2" style={{ backgroundColor: 'var(--color-bg-base)', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                      <input type="text" defaultValue={pitchType === '5' ? "300,000" : "400,000"} style={{ width: '100%', textAlign: 'right', fontSize: '1.125rem', fontWeight: 'bold', background: 'transparent', border: 'none', outline: 'none', color: 'var(--color-danger)', fontFamily: 'inherit' }} />
                      <span className="font-bold text-muted">đ</span>
                    </div>
                  </td>
                  <td style={{ padding: '1.25rem 1rem', border: '1px solid var(--color-border)' }}>
                    <div className="flex items-center gap-2" style={{ backgroundColor: 'var(--color-bg-base)', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                      <input type="text" defaultValue={pitchType === '5' ? "450,000" : "600,000"} style={{ width: '100%', textAlign: 'right', fontSize: '1.125rem', fontWeight: 'bold', background: 'transparent', border: 'none', outline: 'none', color: 'var(--color-danger)', fontFamily: 'inherit' }} />
                      <span className="font-bold text-muted">đ</span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end' }}>
            <button className="btn btn-primary" style={{ padding: '0.75rem 2rem', fontSize: '1rem', borderRadius: 'var(--radius-md)' }}>
              <Save size={18} /> Lưu Bảng giá
            </button>
          </div>
        </div>

        {/* CẤU HÌNH NGÀY LỄ */}
        <div style={{ flex: '1 1 350px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="card" style={{ height: '530px', display: 'flex', flexDirection: 'column' }}>
            <div className="flex items-center gap-4 mb-6" style={{ flexShrink: 0 }}>
              <div style={{ padding: '0.5rem', borderRadius: 'var(--radius-md)', backgroundColor: 'rgba(239, 68, 68, 0.1)' }}>
                <Gift size={24} style={{ color: 'var(--color-danger)' }} />
              </div>
              <h2 className="text-xl font-bold">Ngày Lễ</h2>
            </div>
            
            <div style={{ flex: 1, overflowY: 'auto', paddingRight: '0.5rem' }}>
              <div style={{ marginBottom: '1.5rem', padding: '1rem', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--color-bg-base)', border: '1px dashed var(--color-border)' }}>
              <div className="mb-4">
                <label className="font-semibold text-sm" style={{ display: 'block', marginBottom: '0.5rem' }}>Chọn ngày</label>
                <input type="date" style={{ width: '100%', boxSizing: 'border-box', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg-surface)', color: 'var(--color-text-base)', outline: 'none', fontFamily: 'inherit' }} />
              </div>
              <div className="mb-4">
                <label className="font-semibold text-sm" style={{ display: 'block', marginBottom: '0.5rem' }}>Tên sự kiện</label>
                <input type="text" placeholder="VD: Lễ Quốc khánh 2/9" style={{ width: '100%', boxSizing: 'border-box', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg-surface)', color: 'var(--color-text-base)', outline: 'none', fontFamily: 'inherit' }} />
              </div>
              <button className="btn btn-secondary" style={{ width: '100%', justifyContent: 'center', color: 'var(--color-primary)', border: '1px solid rgba(16, 185, 129, 0.5)' }}>
                <Plus size={18} /> Thêm vào danh sách
              </button>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <h3 className="font-semibold text-sm text-muted mb-2">DANH SÁCH ĐÃ THÊM</h3>
              
              <div className="flex justify-between items-center" style={{ padding: '1rem', backgroundColor: 'var(--color-bg-base)', borderRadius: 'var(--radius-md)', borderLeft: '4px solid var(--color-danger)' }}>
                <div>
                  <div className="font-bold text-lg" style={{ color: 'var(--color-danger)' }}>02/09/2026</div>
                  <div className="text-sm font-semibold mt-1">Quốc khánh</div>
                </div>
                <button style={{ padding: '0.5rem', color: 'var(--color-text-muted)' }}>
                  <Trash2 size={18} />
                </button>
              </div>
              
              <div className="flex justify-between items-center" style={{ padding: '1rem', backgroundColor: 'var(--color-bg-base)', borderRadius: 'var(--radius-md)', borderLeft: '4px solid var(--color-danger)' }}>
                <div>
                  <div className="font-bold text-lg" style={{ color: 'var(--color-danger)' }}>30/04/2026</div>
                  <div className="text-sm font-semibold mt-1">Giải phóng Miền Nam</div>
                </div>
                <button style={{ padding: '0.5rem', color: 'var(--color-text-muted)' }}>
                  <Trash2 size={18} />
                </button>
              </div>
              
              {/* Thêm một số item mockup để test thanh cuộn */}
              <div className="flex justify-between items-center" style={{ padding: '1rem', backgroundColor: 'var(--color-bg-base)', borderRadius: 'var(--radius-md)', borderLeft: '4px solid var(--color-danger)' }}>
                <div>
                  <div className="font-bold text-lg" style={{ color: 'var(--color-danger)' }}>01/05/2026</div>
                  <div className="text-sm font-semibold mt-1">Quốc tế Lao động</div>
                </div>
                <button style={{ padding: '0.5rem', color: 'var(--color-text-muted)' }}>
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPricing;

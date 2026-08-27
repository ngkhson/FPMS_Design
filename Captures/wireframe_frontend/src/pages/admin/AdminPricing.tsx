import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { Plus, Trash2, Save, CalendarDays, SunDim, Gift, Clock, Zap, MapPin, X } from 'lucide-react';

const ModalOverlay = ({ children, onClose }: { children: React.ReactNode, onClose: () => void }) => {
  return createPortal(
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: '1rem' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} onClick={onClose} />
      <div className="card" style={{ position: 'relative', zIndex: 10000, width: '100%', maxWidth: '450px', maxHeight: '90vh', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
        {children}
      </div>
    </div>,
    document.body
  );
};

const AdminPricing: React.FC = () => {
  const [pitchType, setPitchType] = useState('5');
  const [deleteHoliday, setDeleteHoliday] = useState<any>(null);

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem' }}>

        {/* LÊN BẢNG GIÁ MA TRẬN */}
        <div className="card" style={{ flex: '1 1 600px' }}>

          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-bold">Bảng giá sân</h2>
              <p className="text-sm text-muted mt-2">Hệ thống tự động áp dụng giá theo thời điểm đặt sân.</p>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2" style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-full)', padding: '0.35rem 1rem', backgroundColor: 'var(--color-bg-base)', color: 'var(--color-text-base)' }}>
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
                  <th className="font-bold text-sm" style={{ padding: '1rem', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg-base)', color: 'var(--color-text-base)' }}>
                    <div className="flex items-center gap-2"><Clock size={18} /> GIỜ THƯỜNG</div>
                  </th>
                  <th className="font-bold text-sm" style={{ padding: '1rem', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg-base)', color: 'var(--color-text-base)' }}>
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
                      <input type="text" placeholder="[ Số tiền ]" style={{ width: '100%', textAlign: 'right', fontSize: '1.125rem', fontWeight: 'bold', background: 'transparent', border: 'none', outline: 'none', color: 'var(--color-text-base)', fontFamily: 'inherit' }} />
                      <span className="font-bold text-muted">đ</span>
                    </div>
                  </td>
                  <td style={{ padding: '1.25rem 1rem', border: '1px solid var(--color-border)' }}>
                    <div className="flex items-center gap-2" style={{ backgroundColor: 'var(--color-bg-base)', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                      <input type="text" placeholder="[ Số tiền ]" style={{ width: '100%', textAlign: 'right', fontSize: '1.125rem', fontWeight: 'bold', background: 'transparent', border: 'none', outline: 'none', color: 'var(--color-text-base)', fontFamily: 'inherit' }} />
                      <span className="font-bold text-muted">đ</span>
                    </div>
                  </td>
                </tr>
                {/* Cuối tuần */}
                <tr>
                  <td style={{ padding: '1.25rem 1rem', border: '1px solid var(--color-border)' }}>
                    <div className="flex items-center gap-4">
                      <div style={{ padding: '0.5rem', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--color-bg-base)', border: '1px solid var(--color-border)' }}>
                        <SunDim size={20} className="text-muted" />
                      </div>
                      <div>
                        <div className="font-bold">Cuối tuần</div>
                        <div className="text-sm text-muted mt-1" style={{ whiteSpace: 'nowrap' }}>Thứ 7, Chủ Nhật</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '1.25rem 1rem', border: '1px solid var(--color-border)' }}>
                    <div className="flex items-center gap-2" style={{ backgroundColor: 'var(--color-bg-base)', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                      <input type="text" placeholder="[ Số tiền ]" style={{ width: '100%', textAlign: 'right', fontSize: '1.125rem', fontWeight: 'bold', background: 'transparent', border: 'none', outline: 'none', color: 'var(--color-text-base)', fontFamily: 'inherit' }} />
                      <span className="font-bold text-muted">đ</span>
                    </div>
                  </td>
                  <td style={{ padding: '1.25rem 1rem', border: '1px solid var(--color-border)' }}>
                    <div className="flex items-center gap-2" style={{ backgroundColor: 'var(--color-bg-base)', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                      <input type="text" placeholder="[ Số tiền ]" style={{ width: '100%', textAlign: 'right', fontSize: '1.125rem', fontWeight: 'bold', background: 'transparent', border: 'none', outline: 'none', color: 'var(--color-text-base)', fontFamily: 'inherit' }} />
                      <span className="font-bold text-muted">đ</span>
                    </div>
                  </td>
                </tr>
                {/* Ngày Lễ */}
                <tr style={{ backgroundColor: 'var(--color-bg-base)' }}>
                  <td style={{ padding: '1.25rem 1rem', border: '1px solid var(--color-border)' }}>
                    <div className="flex items-center gap-4">
                      <div style={{ padding: '0.5rem', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--color-bg-base)', border: '1px solid var(--color-border)' }}>
                        <Gift size={20} />
                      </div>
                      <div>
                        <div className="font-bold">Ngày Lễ</div>
                        <div className="text-sm text-muted mt-1" style={{ whiteSpace: 'nowrap' }}>Áp dụng phụ thu</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '1.25rem 1rem', border: '1px solid var(--color-border)' }}>
                    <div className="flex items-center gap-2" style={{ backgroundColor: 'var(--color-bg-base)', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                      <input type="text" placeholder="[ Số tiền ]" style={{ width: '100%', textAlign: 'right', fontSize: '1.125rem', fontWeight: 'bold', background: 'transparent', border: 'none', outline: 'none', color: 'var(--color-text-base)', fontFamily: 'inherit' }} />
                      <span className="font-bold text-muted">đ</span>
                    </div>
                  </td>
                  <td style={{ padding: '1.25rem 1rem', border: '1px solid var(--color-border)' }}>
                    <div className="flex items-center gap-2" style={{ backgroundColor: 'var(--color-bg-base)', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                      <input type="text" placeholder="[ Số tiền ]" style={{ width: '100%', textAlign: 'right', fontSize: '1.125rem', fontWeight: 'bold', background: 'transparent', border: 'none', outline: 'none', color: 'var(--color-text-base)', fontFamily: 'inherit' }} />
                      <span className="font-bold text-muted">đ</span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
            <button className="btn btn-secondary" style={{ padding: '0.75rem 2rem', fontSize: '1rem', borderRadius: 'var(--radius-md)' }}>
              Hủy
            </button>
            <button className="btn btn-primary" style={{ padding: '0.75rem 2rem', fontSize: '1rem', borderRadius: 'var(--radius-md)' }}>
              <Save size={18} /> Lưu Bảng giá
            </button>
          </div>
        </div>

        {/* CẤU HÌNH NGÀY LỄ */}
        <div style={{ flex: '1 1 350px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="card" style={{ height: '530px', display: 'flex', flexDirection: 'column' }}>
            <div className="flex items-center gap-4 mb-6" style={{ flexShrink: 0 }}>
              <div style={{ padding: '0.5rem', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--color-bg-base)', border: '1px solid var(--color-border)' }}>
                <Gift size={24} />
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
                <button className="btn btn-secondary" style={{ width: '100%', justifyContent: 'center', color: 'var(--color-text-base)', border: '1px solid var(--color-border)' }}>
                  <Plus size={18} /> Thêm vào danh sách
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <h3 className="font-semibold text-sm text-muted mb-2">DANH SÁCH ĐÃ THÊM</h3>

                <div className="flex justify-between items-center" style={{ padding: '1rem', backgroundColor: 'var(--color-bg-base)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                  <div>
                    <div className="font-bold text-lg">[ Ngày ]</div>
                    <div className="text-sm font-semibold mt-1">[ Tên sự kiện ]</div>
                  </div>
                  <button 
                    style={{ padding: '0.5rem', color: 'var(--color-text-muted)' }}
                    onClick={() => setDeleteHoliday({ date: '02/09/2026', name: 'Quốc khánh' })}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                <div className="flex justify-between items-center" style={{ padding: '1rem', backgroundColor: 'var(--color-bg-base)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                  <div>
                    <div className="font-bold text-lg">[ Ngày ]</div>
                    <div className="text-sm font-semibold mt-1">[ Tên sự kiện ]</div>
                  </div>
                  <button 
                    style={{ padding: '0.5rem', color: 'var(--color-text-muted)' }}
                    onClick={() => setDeleteHoliday({ date: '30/04/2026', name: 'Giải phóng Miền Nam' })}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                {/* Thêm một số item mockup để test thanh cuộn */}
                <div className="flex justify-between items-center" style={{ padding: '1rem', backgroundColor: 'var(--color-bg-base)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                  <div>
                    <div className="font-bold text-lg">[ Ngày ]</div>
                    <div className="text-sm font-semibold mt-1">[ Tên sự kiện ]</div>
                  </div>
                  <button 
                    style={{ padding: '0.5rem', color: 'var(--color-text-muted)' }}
                    onClick={() => setDeleteHoliday({ date: '01/05/2026', name: 'Quốc tế Lao động' })}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Modal Xóa Ngày Lễ */}
      {deleteHoliday && (
        <ModalOverlay onClose={() => setDeleteHoliday(null)}>
          <div className="flex justify-between items-center mb-6" style={{ flexShrink: 0 }}>
            <h2 className="text-xl font-bold">Xóa Ngày Lễ</h2>
            <button onClick={() => setDeleteHoliday(null)} className="text-muted hover:text-[var(--color-text-base)]"><X size={24} /></button>
          </div>
          <div className="mb-6">
            <p>Bạn có chắc chắn muốn xóa ngày <strong>[ Tên sự kiện ]</strong> ([ Ngày ]) khỏi danh sách ngày lễ không?</p>
            <p className="text-muted text-sm mt-2">Hành động này sẽ hủy áp dụng phụ thu lễ cho các đơn đặt sân trong ngày này.</p>
          </div>
          <div style={{ flexShrink: 0, paddingTop: '1rem', marginTop: 'auto', borderTop: '1px solid var(--color-border)', display: 'flex', gap: '1rem' }}>
            <button className="btn btn-secondary w-1/2" onClick={() => setDeleteHoliday(null)}>Hủy bỏ</button>
            <button className="btn btn-primary w-1/2" style={{ backgroundColor: 'var(--color-danger)' }} onClick={() => setDeleteHoliday(null)}>Xác nhận Xóa</button>
          </div>
        </ModalOverlay>
      )}
    </div>
  );
};

export default AdminPricing;

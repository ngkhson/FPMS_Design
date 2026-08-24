import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { Plus, Edit, Trash2, X } from 'lucide-react';
import { mockTimeSlots } from '../../mocks/mockData';

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

const AdminTimeSlots: React.FC = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editSlot, setEditSlot] = useState<any>(null);
  const [deleteSlot, setDeleteSlot] = useState<any>(null);

  return (
    <div style={{ height: 'calc(100vh - 140px)', display: 'flex', flexDirection: 'column' }}>
      <div className="card" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div style={{ flexShrink: 0 }}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Danh sách Khung giờ</h2>
            <button className="btn btn-primary" style={{ height: '42px' }} onClick={() => setIsAddModalOpen(true)}><Plus size={18} /> Thêm khung giờ mới</button>
          </div>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', overflowX: 'auto', borderTop: '1px solid var(--color-border)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead style={{ position: 'sticky', top: 0, backgroundColor: 'var(--color-bg-surface)', zIndex: 10 }}>
              <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                <th className="p-4 font-semibold text-muted text-sm">KHUNG GIỜ</th>
                <th className="p-4 font-semibold text-muted text-sm">PHÂN LOẠI</th>
                <th className="p-4 font-semibold text-muted text-sm">GIÁ SÂN 5 (VNĐ)</th>
                <th className="p-4 font-semibold text-muted text-sm">GIÁ SÂN 7 (VNĐ)</th>
                <th className="p-4 font-semibold text-muted text-sm text-right">THAO TÁC</th>
              </tr>
            </thead>
            <tbody>
              {mockTimeSlots.map((slot) => (
                <tr key={slot.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td className="p-4 font-semibold text-lg">{slot.startTime} - {slot.endTime}</td>
                  <td className="p-4">
                    {slot.isPeak
                      ? <span className="badge badge-warning">⚡ Giờ vàng</span>
                      : <span className="badge badge-success" style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', color: 'var(--color-primary)' }}>Giờ thường</span>
                    }
                  </td>
                  <td className="p-4 font-semibold text-muted">
                    {new Intl.NumberFormat('vi-VN').format(slot.basePrice)} đ
                  </td>
                  <td className="p-4 font-semibold text-muted">
                    {new Intl.NumberFormat('vi-VN').format(slot.basePrice + 100000)} đ
                  </td>
                  <td className="p-4 text-right flex gap-2 justify-end">
                    <button className="btn btn-secondary" style={{ padding: '0.5rem' }} title="Chỉnh sửa" onClick={() => setEditSlot(slot)}><Edit size={16} /></button>
                    <button className="btn btn-secondary text-danger" style={{ padding: '0.5rem' }} title="Xóa ca" onClick={() => setDeleteSlot(slot)}><Trash2 size={16} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Slot Modal */}
      {isAddModalOpen && (
        <ModalOverlay onClose={() => setIsAddModalOpen(false)}>
          <div className="flex justify-between items-center mb-6" style={{ flexShrink: 0 }}>
            <h2 className="text-xl font-bold">Thêm Khung Giờ Mới</h2>
            <button onClick={() => setIsAddModalOpen(false)} className="text-muted hover:text-[var(--color-text-base)]"><X size={24} /></button>
          </div>
          <div className="grid gap-4 mb-6" style={{ overflowY: 'auto', paddingRight: '0.5rem' }}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Giờ bắt đầu</label>
                <input type="time" className="w-full" style={{ padding: '0.6rem 1rem', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', background: 'var(--color-bg-base)', cursor: 'pointer' }} onClick={(e) => { try { (e.target as HTMLInputElement).showPicker(); } catch (err) { } }} />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Giờ kết thúc</label>
                <input type="time" className="w-full" style={{ padding: '0.6rem 1rem', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', background: 'var(--color-bg-base)', cursor: 'pointer' }} onClick={(e) => { try { (e.target as HTMLInputElement).showPicker(); } catch (err) { } }} />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Phân loại</label>
              <select className="w-full" style={{ padding: '0.6rem 1rem', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', background: 'var(--color-bg-base)' }}>
                <option value="NORMAL">Giờ thường</option>
                <option value="PEAK">Giờ vàng</option>
              </select>
            </div>
          </div>
          <div style={{ flexShrink: 0, paddingTop: '1rem', marginTop: 'auto', borderTop: '1px solid var(--color-border)' }}>
            <button className="btn btn-primary w-full" onClick={() => setIsAddModalOpen(false)}>Thêm</button>
          </div>
        </ModalOverlay>
      )}

      {/* Edit Slot Modal */}
      {editSlot && (
        <ModalOverlay onClose={() => setEditSlot(null)}>
          <div className="flex justify-between items-center mb-6" style={{ flexShrink: 0 }}>
            <h2 className="text-xl font-bold">Chỉnh Sửa Khung Giờ</h2>
            <button onClick={() => setEditSlot(null)} className="text-muted hover:text-[var(--color-text-base)]"><X size={24} /></button>
          </div>
          <div className="grid gap-4 mb-6" style={{ overflowY: 'auto', paddingRight: '0.5rem' }}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Giờ bắt đầu</label>
                <input type="time" className="w-full" defaultValue={editSlot.startTime} style={{ padding: '0.6rem 1rem', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', background: 'var(--color-bg-base)', cursor: 'pointer' }} onClick={(e) => { try { (e.target as HTMLInputElement).showPicker(); } catch (err) { } }} />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Giờ kết thúc</label>
                <input type="time" className="w-full" defaultValue={editSlot.endTime} style={{ padding: '0.6rem 1rem', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', background: 'var(--color-bg-base)', cursor: 'pointer' }} onClick={(e) => { try { (e.target as HTMLInputElement).showPicker(); } catch (err) { } }} />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Phân loại</label>
              <select className="w-full" defaultValue={editSlot.isPeak ? "PEAK" : "NORMAL"} style={{ padding: '0.6rem 1rem', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', background: 'var(--color-bg-base)' }}>
                <option value="NORMAL">Giờ thường</option>
                <option value="PEAK">Giờ vàng</option>
              </select>
            </div>
          </div>
          <div style={{ flexShrink: 0, paddingTop: '1rem', marginTop: 'auto', borderTop: '1px solid var(--color-border)', display: 'flex', gap: '1rem' }}>
            <button className="btn btn-secondary w-1/2" onClick={() => setEditSlot(null)}>Hủy bỏ</button>
            <button className="btn btn-primary w-1/2" onClick={() => setEditSlot(null)}>Lưu Thay Đổi</button>
          </div>
        </ModalOverlay>
      )}

      {/* Delete Slot Modal */}
      {deleteSlot && (
        <ModalOverlay onClose={() => setDeleteSlot(null)}>
          <div className="flex justify-between items-center mb-6" style={{ flexShrink: 0 }}>
            <h2 className="text-xl font-bold text-danger">Xóa Khung Giờ</h2>
            <button onClick={() => setDeleteSlot(null)} className="text-muted hover:text-[var(--color-text-base)]"><X size={24} /></button>
          </div>
          <div className="mb-6">
            <p>Bạn có chắc chắn muốn xóa ca <strong>{deleteSlot.startTime} - {deleteSlot.endTime}</strong> không?</p>
            <p className="text-muted text-sm mt-2">Lưu ý: Bạn không thể xóa ca nếu đang có khách hàng đặt lịch trong khung giờ này vào những ngày sắp tới.</p>
          </div>
          <div style={{ flexShrink: 0, paddingTop: '1rem', marginTop: 'auto', borderTop: '1px solid var(--color-border)', display: 'flex', gap: '1rem' }}>
            <button className="btn btn-secondary w-1/2" onClick={() => setDeleteSlot(null)}>Hủy bỏ</button>
            <button className="btn btn-primary w-1/2" style={{ backgroundColor: 'var(--color-danger)' }} onClick={() => setDeleteSlot(null)}>Xác nhận Xóa</button>
          </div>
        </ModalOverlay>
      )}

    </div>
  );
};

export default AdminTimeSlots;

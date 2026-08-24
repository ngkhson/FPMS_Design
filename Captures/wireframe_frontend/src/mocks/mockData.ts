export interface Pitch {
  id: string;
  name: string;
  type: '5' | '7';
  status: 'AVAILABLE' | 'MAINTENANCE';
}

export interface TimeSlot {
  id: string;
  startTime: string;
  endTime: string;
  isPeak: boolean;
  basePrice: number;
}

export interface Booking {
  id: string;
  pitchId: string;
  timeSlotId: string;
  date: string;
  status: 'PENDING' | 'CONFIRMED' | 'IN_PROGRESS' | 'COMPLETED' | 'PENDING_CANCEL' | 'CANCELLED';
  customerName: string;
}

export const mockPitches: Pitch[] = [
  { id: 'p1', name: 'Sân 1', type: '5', status: 'AVAILABLE' },
  { id: 'p2', name: 'Sân 2', type: '5', status: 'AVAILABLE' },
  { id: 'p3', name: 'Sân 3', type: '5', status: 'MAINTENANCE' },
  { id: 'p4', name: 'Sân 4', type: '7', status: 'AVAILABLE' },
  { id: 'p5', name: 'Sân VIP', type: '7', status: 'AVAILABLE' },
  { id: 'p6', name: 'Sân 6', type: '5', status: 'AVAILABLE' },
  { id: 'p7', name: 'Sân 7', type: '5', status: 'AVAILABLE' },
  { id: 'p8', name: 'Sân 8', type: '5', status: 'AVAILABLE' },
  { id: 'p9', name: 'Sân 9', type: '7', status: 'AVAILABLE' },
  { id: 'p10', name: 'Sân 10', type: '7', status: 'AVAILABLE' },
];

export const mockTimeSlots: TimeSlot[] = [
  { id: 't01', startTime: '05:30', endTime: '07:00', isPeak: false, basePrice: 150000 },
  { id: 't02', startTime: '07:15', endTime: '08:45', isPeak: false, basePrice: 150000 },
  { id: 't03', startTime: '09:00', endTime: '10:30', isPeak: false, basePrice: 150000 },
  { id: 't04', startTime: '10:45', endTime: '12:15', isPeak: false, basePrice: 150000 },
  { id: 't05', startTime: '12:30', endTime: '14:00', isPeak: false, basePrice: 200000 },
  { id: 't06', startTime: '14:15', endTime: '15:45', isPeak: false, basePrice: 200000 },
  { id: 't07', startTime: '16:00', endTime: '17:30', isPeak: false, basePrice: 200000 },
  { id: 't08', startTime: '17:45', endTime: '19:15', isPeak: true, basePrice: 350000 },
  { id: 't09', startTime: '19:30', endTime: '21:00', isPeak: true, basePrice: 350000 },
  { id: 't10', startTime: '21:15', endTime: '22:45', isPeak: false, basePrice: 250000 },
];

const today = new Date().toISOString().split('T')[0];

export const mockBookings: Booking[] = [
  { id: 'b1', pitchId: 'p1', timeSlotId: 't08', date: today, status: 'CONFIRMED', customerName: 'Nguyễn Văn A' },
  { id: 'b2', pitchId: 'p4', timeSlotId: 't09', date: today, status: 'CONFIRMED', customerName: 'Trần Thị B' },
  { id: 'b3', pitchId: 'p2', timeSlotId: 't07', date: today, status: 'IN_PROGRESS', customerName: 'Khách vãng lai' },
  { id: 'b4', pitchId: 'p5', timeSlotId: 't08', date: today, status: 'PENDING_CANCEL', customerName: 'Lê Văn C' },
  { id: 'b5', pitchId: 'p1', timeSlotId: 't05', date: today, status: 'COMPLETED', customerName: 'Phạm Thị D' },
  { id: 'b6', pitchId: 'p2', timeSlotId: 't04', date: today, status: 'CANCELLED', customerName: 'Hoàng Văn E' },
  { id: 'b7', pitchId: 'p4', timeSlotId: 't10', date: today, status: 'PENDING', customerName: 'Vũ Thị F' },
  { id: 'b8', pitchId: 'p1', timeSlotId: 't02', date: today, status: 'COMPLETED', customerName: 'Đặng Văn G' },
  // Past dates for Excel Export testing
  { id: 'b9', pitchId: 'p2', timeSlotId: 't08', date: '2026-08-18', status: 'COMPLETED', customerName: 'Bùi Văn H' },
  { id: 'b10', pitchId: 'p5', timeSlotId: 't09', date: '2026-08-18', status: 'COMPLETED', customerName: 'Đinh Thị I' },
  { id: 'b11', pitchId: 'p1', timeSlotId: 't05', date: '2026-08-20', status: 'COMPLETED', customerName: 'Ngô Văn K' },
  { id: 'b12', pitchId: 'p4', timeSlotId: 't10', date: '2026-08-21', status: 'CANCELLED', customerName: 'Phan Thị L' },
  { id: 'b13', pitchId: 'p2', timeSlotId: 't07', date: '2026-08-22', status: 'COMPLETED', customerName: 'Đỗ Văn M' },
];

export const mockTransactions = [
  { id: 'TX_001', date: '2026-08-18', time: '16:30', desc: 'Thanh toán nốt đơn #B9', method: 'Tiền mặt', amount: 250000, type: 'IN', status: 'SUCCESS' },
  { id: 'TX_002', date: '2026-08-18', time: '15:15', desc: 'Khách cọc đơn #B10', method: 'VNPAY', amount: 105000, type: 'IN', status: 'SUCCESS' },
  // TX_003 removed for wireframe variety
  { id: 'TX_004', date: '2026-08-21', time: '09:00', desc: 'Hoàn tiền đơn hủy #B12', method: 'Chuyển khoản tay', amount: 105000, type: 'OUT', status: 'SUCCESS' },
  { id: 'TX_005', date: '2026-08-22', time: '18:30', desc: 'Thanh toán nốt đơn #B13', method: 'Tiền mặt', amount: 200000, type: 'IN', status: 'SUCCESS' },
  { id: 'TX_006', date: today, time: '16:30', desc: 'Thanh toán nốt đơn #B3', method: 'Tiền mặt', amount: 250000, type: 'IN', status: 'SUCCESS' },
  { id: 'TX_007', date: today, time: '15:15', desc: 'Khách cọc đơn #B1', method: 'VNPAY', amount: 105000, type: 'IN', status: 'SUCCESS' },
  { id: 'TX_008', date: today, time: '14:00', desc: 'Hoàn tiền đơn hủy #B2', method: 'Chuyển khoản tay', amount: 105000, type: 'OUT', status: 'FAILED' },
];

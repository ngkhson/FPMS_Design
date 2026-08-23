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
];

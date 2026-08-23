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
  { id: 'p1', name: 'Sân 1 (5 người)', type: '5', status: 'AVAILABLE' },
  { id: 'p2', name: 'Sân 2 (5 người)', type: '5', status: 'AVAILABLE' },
  { id: 'p3', name: 'Sân 3 (5 người)', type: '5', status: 'MAINTENANCE' },
  { id: 'p4', name: 'Sân 4 (7 người)', type: '7', status: 'AVAILABLE' },
  { id: 'p5', name: 'Sân VIP (7 người)', type: '7', status: 'AVAILABLE' },
];

export const mockTimeSlots: TimeSlot[] = [
  { id: 't1', startTime: '16:00', endTime: '17:30', isPeak: false, basePrice: 200000 },
  { id: 't2', startTime: '17:30', endTime: '19:00', isPeak: true, basePrice: 350000 },
  { id: 't3', startTime: '19:00', endTime: '20:30', isPeak: true, basePrice: 350000 },
  { id: 't4', startTime: '20:30', endTime: '22:00', isPeak: false, basePrice: 250000 },
];

const today = new Date().toISOString().split('T')[0];

export const mockBookings: Booking[] = [
  { id: 'b1', pitchId: 'p1', timeSlotId: 't2', date: today, status: 'CONFIRMED', customerName: 'Nguyễn Văn A' },
  { id: 'b2', pitchId: 'p4', timeSlotId: 't3', date: today, status: 'CONFIRMED', customerName: 'Trần Thị B' },
  { id: 'b3', pitchId: 'p2', timeSlotId: 't1', date: today, status: 'IN_PROGRESS', customerName: 'Khách vãng lai' },
];

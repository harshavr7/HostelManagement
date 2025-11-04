
export type FeeStatus = 'Paid' | 'Due';
export type RoomStatus = 'Occupied' | 'Vacant' | 'Maintenance';
export type Page = 'dashboard' | 'students' | 'rooms' | 'fees';

export interface Student {
  id: string;
  name: string;
  studentId: string;
  roomNumber: number;
  phone: string;
  checkInDate: string;
  feeStatus: FeeStatus;
}

export interface Room {
  roomNumber: number;
  capacity: number;
  occupants: number;
  status: RoomStatus;
}

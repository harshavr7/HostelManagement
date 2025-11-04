
import { Student, Room } from './types';

export const INITIAL_STUDENTS: Student[] = [
  { id: '1', name: 'Arjun Kumar', studentId: 'S2024001', roomNumber: 101, phone: '9876543210', checkInDate: '2024-07-01', feeStatus: 'Paid' },
  { id: '2', name: 'Priya Sharma', studentId: 'S2024002', roomNumber: 102, phone: '9876543211', checkInDate: '2024-07-03', feeStatus: 'Paid' },
  { id: '3', name: 'Rohan Gupta', studentId: 'S2024003', roomNumber: 101, phone: '9876543212', checkInDate: '2024-07-05', feeStatus: 'Due' },
  { id: '4', name: 'Sneha Patel', studentId: 'S2024004', roomNumber: 103, phone: '9876543213', checkInDate: '2024-07-10', feeStatus: 'Paid' },
  { id: '5', name: 'Vikram Singh', studentId: 'S2024005', roomNumber: 104, phone: '9876543214', checkInDate: '2024-07-12', feeStatus: 'Paid' },
  { id: '6', name: 'Anjali Verma', studentId: 'S2024006', roomNumber: 102, phone: '9876543215', checkInDate: '2024-07-15', feeStatus: 'Due' },
  { id: '7', name: 'Karan Malhotra', studentId: 'S2024007', roomNumber: 201, phone: '9876543216', checkInDate: '2024-08-01', feeStatus: 'Paid' },
  { id: '8', name: 'Meera Desai', studentId: 'S2024008', roomNumber: 202, phone: '9876543217', checkInDate: '2024-08-02', feeStatus: 'Paid' },
];

export const INITIAL_ROOMS: Room[] = [
  { roomNumber: 101, capacity: 2, occupants: 2, status: 'Occupied' },
  { roomNumber: 102, capacity: 2, occupants: 2, status: 'Occupied' },
  { roomNumber: 103, capacity: 2, occupants: 1, status: 'Occupied' },
  { roomNumber: 104, capacity: 2, occupants: 1, status: 'Occupied' },
  { roomNumber: 201, capacity: 3, occupants: 1, status: 'Occupied' },
  { roomNumber: 202, capacity: 3, occupants: 1, status: 'Occupied' },
  { roomNumber: 203, capacity: 3, occupants: 0, status: 'Vacant' },
  { roomNumber: 204, capacity: 3, occupants: 0, status: 'Maintenance' },
  { roomNumber: 301, capacity: 1, occupants: 0, status: 'Vacant' },
  { roomNumber: 302, capacity: 1, occupants: 0, status: 'Vacant' },
];

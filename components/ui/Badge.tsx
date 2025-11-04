
import React from 'react';
import { FeeStatus, RoomStatus } from '../../types';

interface BadgeProps {
  status: FeeStatus | RoomStatus;
}

const statusStyles: Record<FeeStatus | RoomStatus, string> = {
  Paid: 'bg-emerald-100 text-emerald-800',
  Due: 'bg-amber-100 text-amber-800',
  Occupied: 'bg-blue-100 text-blue-800',
  Vacant: 'bg-green-100 text-green-800',
  Maintenance: 'bg-orange-100 text-orange-800',
};

export const Badge: React.FC<BadgeProps> = ({ status }) => {
  return (
    <span
      className={`px-2 py-1 text-xs font-medium rounded-full ${statusStyles[status]}`}
    >
      {status}
    </span>
  );
};

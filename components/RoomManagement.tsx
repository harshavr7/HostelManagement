
import React from 'react';
import { Room } from '../types';
import { Card } from './ui/Card';
import { Badge } from './ui/Badge';
import { StudentsIcon } from './Icons';

interface RoomManagementProps {
  rooms: Room[];
}

export const RoomManagement: React.FC<RoomManagementProps> = ({ rooms }) => {

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Occupied':
        return 'border-blue-500';
      case 'Vacant':
        return 'border-green-500';
      case 'Maintenance':
        return 'border-orange-500';
      default:
        return 'border-gray-300';
    }
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Room Management</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {rooms.map((room) => (
          <Card key={room.roomNumber} className={`border-l-4 ${getStatusColor(room.status)}`}>
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-bold text-gray-800">Room {room.roomNumber}</h3>
              <Badge status={room.status} />
            </div>
            <div className="flex items-center text-gray-600">
              <StudentsIcon className="w-5 h-5 mr-2" />
              <span className="text-sm">Occupancy: {room.occupants} / {room.capacity}</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

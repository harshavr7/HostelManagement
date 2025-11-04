
import React from 'react';
import { Student, Room } from '../types';
import { StatCard } from './ui/Card';
import { Badge } from './ui/Badge';
import { StudentsIcon, RoomsIcon, FeesIcon, DashboardIcon } from './Icons';

interface DashboardProps {
  students: Student[];
  rooms: Room[];
}

export const Dashboard: React.FC<DashboardProps> = ({ students, rooms }) => {
  const totalStudents = students.length;
  const occupiedRooms = rooms.filter(r => r.status === 'Occupied').length;
  const totalRooms = rooms.length;
  const feesDue = students.filter(s => s.feeStatus === 'Due').length;
  const occupancyRate = totalRooms > 0 ? ((occupiedRooms / totalRooms) * 100).toFixed(1) : 0;
  
  const recentCheckIns = [...students]
    .sort((a, b) => new Date(b.checkInDate).getTime() - new Date(a.checkInDate).getTime())
    .slice(0, 5);

  return (
    <div className="p-4 md:p-6 space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
            title="Total Students" 
            value={totalStudents} 
            icon={<StudentsIcon className="w-6 h-6 text-blue-500"/>}
            color="bg-blue-100"
        />
        <StatCard 
            title="Occupancy Rate" 
            value={`${occupancyRate}%`}
            icon={<RoomsIcon className="w-6 h-6 text-green-500"/>}
            color="bg-green-100"
        />
        <StatCard 
            title="Rooms Occupied" 
            value={`${occupiedRooms} / ${totalRooms}`} 
            icon={<DashboardIcon className="w-6 h-6 text-purple-500"/>}
            color="bg-purple-100"
        />
        <StatCard 
            title="Fees Due" 
            value={feesDue}
            icon={<FeesIcon className="w-6 h-6 text-amber-500"/>}
            color="bg-amber-100"
        />
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Recent Check-ins</h2>
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Room No.</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check-in Date</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {recentCheckIns.map((student) => (
                    <tr key={student.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{student.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.roomNumber}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.checkInDate}</td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </div>
    </div>
  );
};

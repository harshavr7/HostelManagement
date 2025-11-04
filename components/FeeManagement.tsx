
import React, { useState, useMemo } from 'react';
import { Student, FeeStatus } from '../types';
import { Badge } from './ui/Badge';
import { Button } from './ui/Button';

interface FeeManagementProps {
  students: Student[];
  updateStudentFeeStatus: (studentId: string, status: FeeStatus) => void;
}

export const FeeManagement: React.FC<FeeManagementProps> = ({ students, updateStudentFeeStatus }) => {
  const [filter, setFilter] = useState<'all' | 'Paid' | 'Due'>('all');

  const filteredStudents = useMemo(() => {
    if (filter === 'all') {
      return students;
    }
    return students.filter(s => s.feeStatus === filter);
  }, [students, filter]);
  
  const toggleFeeStatus = (student: Student) => {
      const newStatus = student.feeStatus === 'Paid' ? 'Due' : 'Paid';
      if (window.confirm(`Mark ${student.name}'s fee status as ${newStatus}?`)) {
          updateStudentFeeStatus(student.id, newStatus);
      }
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold text-gray-800">Fee Management</h1>
        <div className="flex space-x-2 bg-gray-200 p-1 rounded-lg">
          <Button variant={filter === 'all' ? 'primary' : 'ghost'} onClick={() => setFilter('all')}>All</Button>
          <Button variant={filter === 'Paid' ? 'primary' : 'ghost'} onClick={() => setFilter('Paid')}>Paid</Button>
          <Button variant={filter === 'Due' ? 'primary' : 'ghost'} onClick={() => setFilter('Due')}>Due</Button>
        </div>
      </div>

      <div className="bg-white p-2 sm:p-4 rounded-lg shadow-md overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Student ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Room</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredStudents.map((student) => (
              <tr key={student.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{student.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.studentId}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.roomNumber}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <Badge status={student.feeStatus} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <button 
                    onClick={() => toggleFeeStatus(student)}
                    className="text-sm font-medium text-primary hover:text-primary-focus"
                  >
                    Toggle Status
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

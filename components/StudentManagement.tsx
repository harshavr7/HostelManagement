
import React, { useState } from 'react';
import { Student, FeeStatus, Room } from '../types';
import { Button } from './ui/Button';
import { Modal } from './ui/Modal';
import { PlusIcon, EditIcon, DeleteIcon } from './Icons';
import { Badge } from './ui/Badge';

interface StudentManagementProps {
  students: Student[];
  rooms: Room[];
  addStudent: (student: Omit<Student, 'id'>) => void;
  updateStudent: (student: Student) => void;
  deleteStudent: (studentId: string) => void;
}

const StudentForm: React.FC<{
    student: Partial<Student> | null;
    rooms: Room[];
    onSubmit: (student: Omit<Student, 'id'> | Student) => void;
    onClose: () => void;
}> = ({ student, rooms, onSubmit, onClose }) => {
    const [formData, setFormData] = useState({
        name: student?.name || '',
        studentId: student?.studentId || '',
        roomNumber: student?.roomNumber || '',
        phone: student?.phone || '',
        checkInDate: student?.checkInDate || new Date().toISOString().split('T')[0],
        feeStatus: student?.feeStatus || 'Due',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const roomNumber = parseInt(formData.roomNumber as string, 10);
        if (isNaN(roomNumber)) {
            alert("Please select a valid room.");
            return;
        }

        const payload = {
            ...formData,
            roomNumber,
            feeStatus: formData.feeStatus as FeeStatus
        };

        if(student && 'id' in student) {
             onSubmit({ ...payload, id: student.id! });
        } else {
             onSubmit(payload);
        }
    };
    
    const availableRooms = rooms.filter(r => r.status === 'Vacant' || (r.status === 'Occupied' && r.occupants < r.capacity));

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"/>
            </div>
             <div>
                <label className="block text-sm font-medium text-gray-700">Student ID</label>
                <input type="text" name="studentId" value={formData.studentId} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"/>
            </div>
             <div>
                <label className="block text-sm font-medium text-gray-700">Room Number</label>
                <select name="roomNumber" value={formData.roomNumber} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm">
                    <option value="">Select a Room</option>
                    {student?.roomNumber && <option value={student.roomNumber}>{student.roomNumber}</option>}
                    {availableRooms.map(r => (
                        <option key={r.roomNumber} value={r.roomNumber}>Room {r.roomNumber} ({r.occupants}/{r.capacity})</option>
                    ))}
                </select>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"/>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Check-in Date</label>
                <input type="date" name="checkInDate" value={formData.checkInDate} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"/>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Fee Status</label>
                 <select name="feeStatus" value={formData.feeStatus} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm">
                    <option value="Paid">Paid</option>
                    <option value="Due">Due</option>
                </select>
            </div>
            <div className="flex justify-end space-x-2 pt-4">
                <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
                <Button type="submit">{student ? 'Update Student' : 'Add Student'}</Button>
            </div>
        </form>
    )
}

export const StudentManagement: React.FC<StudentManagementProps> = ({ students, rooms, addStudent, updateStudent, deleteStudent }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);

  const handleAddStudent = () => {
    setEditingStudent(null);
    setIsModalOpen(true);
  };
  
  const handleEditStudent = (student: Student) => {
    setEditingStudent(student);
    setIsModalOpen(true);
  }
  
  const handleDeleteStudent = (studentId: string) => {
    if(window.confirm("Are you sure you want to delete this student?")) {
        deleteStudent(studentId);
    }
  }

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingStudent(null);
  };
  
  const handleFormSubmit = (studentData: Omit<Student, 'id'> | Student) => {
    if ('id' in studentData) {
        updateStudent(studentData);
    } else {
        addStudent(studentData);
    }
    closeModal();
  };
  

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Student Management</h1>
        <Button onClick={handleAddStudent} leftIcon={<PlusIcon />}>
          Add Student
        </Button>
      </div>

      <div className="bg-white p-2 sm:p-4 rounded-lg shadow-md overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Student ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Room</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fee Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {students.map((student) => (
              <tr key={student.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{student.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.studentId}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.roomNumber}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm"><Badge status={student.feeStatus} /></td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  <button onClick={() => handleEditStudent(student)} className="text-primary hover:text-primary-focus"><EditIcon /></button>
                  <button onClick={() => handleDeleteStudent(student.id)} className="text-error hover:text-red-700"><DeleteIcon /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal} title={editingStudent ? 'Edit Student' : 'Add New Student'}>
        <StudentForm student={editingStudent} rooms={rooms} onSubmit={handleFormSubmit} onClose={closeModal}/>
      </Modal>
    </div>
  );
};

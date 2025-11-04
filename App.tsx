
import React, { useState, useCallback } from 'react';
import { Page, Student, Room, FeeStatus } from './types';
import { INITIAL_STUDENTS, INITIAL_ROOMS } from './constants';
import { Dashboard } from './components/Dashboard';
import { StudentManagement } from './components/StudentManagement';
import { RoomManagement } from './components/RoomManagement';
import { FeeManagement } from './components/FeeManagement';
import { DashboardIcon, StudentsIcon, RoomsIcon, FeesIcon, MenuIcon, CloseIcon } from './components/Icons';

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 ${
      isActive
        ? 'bg-primary text-white shadow-lg'
        : 'text-gray-600 hover:bg-gray-200 hover:text-gray-800'
    }`}
  >
    {icon}
    <span className="ml-3">{label}</span>
  </button>
);


export default function App() {
  const [page, setPage] = useState<Page>('dashboard');
  const [students, setStudents] = useState<Student[]>(INITIAL_STUDENTS);
  const [rooms, setRooms] = useState<Room[]>(INITIAL_ROOMS);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const updateRoomOccupancy = useCallback((updatedStudents: Student[]) => {
      const occupancyMap = new Map<number, number>();
      updatedStudents.forEach(s => {
          occupancyMap.set(s.roomNumber, (occupancyMap.get(s.roomNumber) || 0) + 1);
      });
      
      setRooms(prevRooms => prevRooms.map(room => {
          const newOccupants = occupancyMap.get(room.roomNumber) || 0;
          let newStatus = room.status;
          if (room.status !== 'Maintenance') {
              newStatus = newOccupants >= room.capacity ? 'Occupied' : (newOccupants > 0 ? 'Occupied' : 'Vacant');
          }
          return { ...room, occupants: newOccupants, status: newStatus };
      }));
  }, []);

  const addStudent = useCallback((studentData: Omit<Student, 'id'>) => {
    setStudents(prev => {
        const newStudent = { ...studentData, id: Date.now().toString() };
        const updatedStudents = [...prev, newStudent];
        updateRoomOccupancy(updatedStudents);
        return updatedStudents;
    });
  }, [updateRoomOccupancy]);

  const updateStudent = useCallback((updatedStudent: Student) => {
      setStudents(prev => {
          const updatedStudents = prev.map(s => s.id === updatedStudent.id ? updatedStudent : s);
          updateRoomOccupancy(updatedStudents);
          return updatedStudents;
      });
  }, [updateRoomOccupancy]);
  
  const deleteStudent = useCallback((studentId: string) => {
      setStudents(prev => {
          const updatedStudents = prev.filter(s => s.id !== studentId);
          updateRoomOccupancy(updatedStudents);
          return updatedStudents;
      });
  }, [updateRoomOccupancy]);
  
  const updateStudentFeeStatus = useCallback((studentId: string, status: FeeStatus) => {
      setStudents(prev => prev.map(s => s.id === studentId ? {...s, feeStatus: status} : s));
  }, []);


  const renderPage = () => {
    switch (page) {
      case 'dashboard':
        return <Dashboard students={students} rooms={rooms} />;
      case 'students':
        return <StudentManagement students={students} rooms={rooms} addStudent={addStudent} updateStudent={updateStudent} deleteStudent={deleteStudent} />;
      case 'rooms':
        return <RoomManagement rooms={rooms} />;
      case 'fees':
        return <FeeManagement students={students} updateStudentFeeStatus={updateStudentFeeStatus}/>;
      default:
        return <Dashboard students={students} rooms={rooms} />;
    }
  };
  
  const handleNavClick = (selectedPage: Page) => {
    setPage(selectedPage);
    if(isSidebarOpen){
        setIsSidebarOpen(false);
    }
  }

  const navItems = [
    { id: 'dashboard', icon: <DashboardIcon className="w-5 h-5"/>, label: 'Dashboard' },
    { id: 'students', icon: <StudentsIcon className="w-5 h-5"/>, label: 'Students' },
    { id: 'rooms', icon: <RoomsIcon className="w-5 h-5"/>, label: 'Rooms' },
    { id: 'fees', icon: <FeesIcon className="w-5 h-5"/>, label: 'Fees' },
  ];

  return (
    <div className="flex h-screen bg-base-200">
      {/* Sidebar */}
      <aside className={`absolute md:relative z-20 md:z-auto bg-white shadow-xl md:shadow-lg w-64 min-h-screen transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
        <div className="p-6">
          <h1 className="text-2xl font-bold text-primary">Hostel Hive</h1>
        </div>
        <nav className="p-4 space-y-2">
          {navItems.map(item => (
              <NavItem
                key={item.id}
                icon={item.icon}
                label={item.label}
                isActive={page === item.id}
                onClick={() => handleNavClick(item.id as Page)}
              />
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-md md:hidden flex justify-between items-center p-4">
            <h1 className="text-xl font-bold text-primary">Hostel Hive</h1>
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-gray-600">
                {isSidebarOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
        </header>

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-base-100">
            {renderPage()}
        </main>
      </div>
    </div>
  );
}

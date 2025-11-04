
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div
      className={`bg-white rounded-lg shadow-md p-6 ${className}`}
    >
      {children}
    </div>
  );
};

interface StatCardProps {
    title: string;
    value: string | number;
    icon: React.ReactNode;
    color: string;
}

export const StatCard: React.FC<StatCardProps> = ({ title, value, icon, color }) => {
    return (
        <Card className="flex items-center p-4">
            <div className={`p-3 rounded-full mr-4 ${color}`}>
                {icon}
            </div>
            <div>
                <p className="text-sm font-medium text-gray-500">{title}</p>
                <p className="text-2xl font-bold text-gray-800">{value}</p>
            </div>
        </Card>
    )
}

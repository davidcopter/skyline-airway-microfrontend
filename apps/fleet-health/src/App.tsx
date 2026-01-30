import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import AircraftRegistry from './pages/AircraftRegistry';
import ThresholdMonitor from './pages/ThresholdMonitor';
import { Plane, Activity, ClipboardCheck } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const FleetHealthSubsystem: React.FC = () => {
  const location = useLocation();

  const subNavItems = [
    { name: 'Aircraft Registry', path: '/fleet', icon: Plane },
    { name: 'Threshold Monitor', path: '/fleet/thresholds', icon: Activity },
    { name: 'Airworthiness', path: '/fleet/airworthiness', icon: ClipboardCheck },
  ];

  return (
    <div className="flex flex-col h-full">
      <div className="bg-white border-b border-gray-100 px-8 py-2 flex items-center space-x-6 overflow-x-auto">
        {subNavItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "flex items-center space-x-2 px-3 py-2 text-sm font-medium border-b-2 transition-colors whitespace-nowrap",
              location.pathname === item.path
                ? "border-skyline-blue text-skyline-blue"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-200"
            )}
          >
            <item.icon className="h-4 w-4" />
            <span>{item.name}</span>
          </Link>
        ))}
      </div>
      
      <div className="flex-1 bg-skyline-bg overflow-auto">
        <Routes>
          <Route index element={<AircraftRegistry />} />
          <Route path="thresholds" element={<ThresholdMonitor />} />
          <Route path="airworthiness" element={<div className="p-8">Airworthiness Status View (Coming Soon)</div>} />
        </Routes>
      </div>
    </div>
  );
};

export default FleetHealthSubsystem;

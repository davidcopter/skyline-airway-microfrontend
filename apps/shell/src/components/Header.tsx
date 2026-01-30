import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Plane, LayoutDashboard, AlertTriangle, ClipboardList, LogOut, Bell, User as UserIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Fleet Health', path: '/fleet', icon: Plane },
    { name: 'Defects', path: '/defects', icon: AlertTriangle },
    { name: 'Reporting', path: '/reporting', icon: ClipboardList },
  ];

  return (
    <header className="bg-skyline-blue text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link to="/" className="flex items-center space-x-2 text-xl font-bold">
            <Plane className="h-8 w-8 text-skyline-orange" />
            <span>SKYLINE AIRLINES</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "px-4 py-2 rounded-md transition-colors flex items-center space-x-2",
                  location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path))
                    ? "bg-white/10 text-white"
                    : "text-white/70 hover:text-white hover:bg-white/5"
                )}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          <button className="relative p-2 rounded-full hover:bg-white/10 transition-colors">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-skyline-red rounded-full border-2 border-skyline-blue"></span>
          </button>
          
          <div className="h-8 w-px bg-white/20"></div>

          <div className="flex items-center space-x-3">
            <div className="text-right hidden sm:block">
              <div className="text-sm font-medium">{user?.name}</div>
              <div className="text-xs text-white/60 capitalize">{user?.role}</div>
            </div>
            <div className="h-9 w-9 bg-white/10 rounded-full flex items-center justify-center border border-white/20">
              <UserIcon className="h-5 w-5" />
            </div>
            <button 
              onClick={handleLogout}
              className="p-2 rounded-md hover:bg-skyline-red/20 text-white/70 hover:text-white transition-colors"
              title="Logout"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

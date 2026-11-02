import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Plane, LayoutDashboard, AlertTriangle, ClipboardList, LogOut, Bell, User as UserIcon, Menu, X, BarChart3 } from 'lucide-react';
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Fleet Health', path: '/fleet', icon: Plane },
    { name: 'Defects', path: '/defects', icon: AlertTriangle },
    { name: 'Reporting', path: '/reporting', icon: ClipboardList },
    { name: 'Analytics', path: '/analytics', icon: BarChart3 },
  ];

  const isItemActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className="bg-skyline-blue text-white shadow-md sticky top-0 z-[100]">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link to="/" className="flex items-center space-x-2 text-xl font-bold shrink-0">
            <Plane className="h-8 w-8 text-skyline-orange" />
            <span className="hidden sm:inline">SKYLINE AIRLINES</span>
            <span className="sm:hidden">SKYLINE</span>
          </Link>

          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "px-4 py-2 rounded-md transition-colors flex items-center space-x-2",
                  isItemActive(item.path)
                    ? "bg-white/20 text-white"
                    : "text-white/70 hover:text-white hover:bg-white/10"
                )}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center space-x-2 md:space-x-4">
          <div className="flex items-center space-x-1 md:space-x-4">
            <button 
              className="relative p-2 rounded-full hover:bg-white/10 transition-colors"
              aria-label="View notifications"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-skyline-red rounded-full border-2 border-skyline-blue"></span>
            </button>
            
            <div className="h-8 w-px bg-white/20 hidden xs:block"></div>

            <div className="flex items-center space-x-2 md:space-x-3">
              <div className="text-right hidden md:block">
                <div className="text-sm font-medium">{user?.name}</div>
                <div className="text-xs text-white/60 capitalize">{user?.role}</div>
              </div>
              <div 
                className="h-8 w-8 md:h-9 md:w-9 bg-white/10 rounded-full flex items-center justify-center border border-white/20"
                aria-hidden="true"
              >
                <UserIcon className="h-5 w-5" />
              </div>
              <button 
                onClick={handleLogout}
                className="p-2 rounded-md hover:bg-skyline-red/20 text-white/70 hover:text-white transition-colors"
                title="Logout"
                aria-label="Logout"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden p-2 rounded-md hover:bg-white/10 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-skyline-blue border-t border-white/10 py-4 px-4 space-y-2 animate-in slide-in-from-top duration-200">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={cn(
                "w-full px-4 py-3 rounded-md transition-colors flex items-center space-x-3",
                isItemActive(item.path)
                  ? "bg-white/20 text-white"
                  : "text-white/70 hover:text-white hover:bg-white/10"
              )}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-lg">{item.name}</span>
            </Link>
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;

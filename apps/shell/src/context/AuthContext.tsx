import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, mockUsers } from '@skyline/shared';

interface AuthContextType {
  user: User | null;
  login: (username: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('skyline_user');
    return saved ? JSON.parse(saved) : null;
  });

  const login = async (username: string) => {
    // Mock login logic
    const foundUser = mockUsers.find(u => u.username === username);
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('skyline_user', JSON.stringify(foundUser));
    } else {
      throw new Error('User not found');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('skyline_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

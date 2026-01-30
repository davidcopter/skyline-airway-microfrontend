import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Plane, Lock, User } from 'lucide-react';

const Login: React.FC = () => {
  const [username, setUsername] = useState('jdoe');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(username);
      navigate('/');
    } catch (err) {
      setError('Invalid username. Try jdoe, asmith, or captain_sky');
    }
  };

  return (
    <div className="min-h-screen bg-skyline-blue flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-2xl overflow-hidden">
        <div className="p-8 text-center bg-skyline-bg border-b border-gray-100">
          <div className="flex justify-center mb-4">
            <Plane className="h-12 w-12 text-skyline-blue" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">SKYLINE AIRLINES</h1>
          <p className="text-gray-500 mt-2">Maintenance Department Portal</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 text-sm text-red-700">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">SSO Username</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-skyline-blue focus:border-skyline-blue transition-all"
                placeholder="Enter your company ID"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="password"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-skyline-blue focus:border-skyline-blue transition-all"
                placeholder="••••••••"
                defaultValue="password123"
                disabled
              />
            </div>
            <p className="text-xs text-gray-400 mt-1 italic">Mock authentication enabled (any password works)</p>
          </div>

          <button
            type="submit"
            className="w-full bg-skyline-blue hover:bg-blue-800 text-white font-bold py-3 px-4 rounded-lg shadow-lg transform active:scale-95 transition-all"
          >
            Sign In with SSO
          </button>

          <div className="text-center text-sm text-gray-500">
            <p>Hint: Use <b>jdoe</b> (Engineer), <b>asmith</b> (Technician), or <b>captain_sky</b> (Crew)</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';

// Remote Components
const FleetHealthApp = lazy(() => import('fleetHealth/App').catch(() => ({ default: () => <div className="p-8">Fleet Health Module Unavailable</div> })));
const DefectManagementApp = lazy(() => import('defectManagement/App').catch(() => ({ default: () => <div className="p-8">Defect Management Module Unavailable</div> })));
const CrewReportingApp = lazy(() => import('crewReporting/App').catch(() => ({ default: () => <div className="p-8">Crew Reporting Module Unavailable</div> })));

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <>{children}</>;
};

const AppContent: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      {isAuthenticated && <Header />}
      <main className="flex-1 overflow-auto">
        <Suspense fallback={<div className="flex items-center justify-center h-full">Loading...</div>}>
          <Routes>
            <Route path="/login" element={<Login />} />
            
            <Route path="/" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />

            <Route path="/fleet/*" element={
              <ProtectedRoute>
                <FleetHealthApp />
              </ProtectedRoute>
            } />

            <Route path="/defects/*" element={
              <ProtectedRoute>
                <DefectManagementApp />
              </ProtectedRoute>
            } />

            <Route path="/reporting/*" element={
              <ProtectedRoute>
                <CrewReportingApp />
              </ProtectedRoute>
            } />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;

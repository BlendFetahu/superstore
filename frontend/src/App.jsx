import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard'; 
import Landing from './pages/Landing';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import ProtectedRoute from './components/ProtectedRoute'; 

const AppContent = () => {
  const location = useLocation();

  const hideLayout = 
    location.pathname.startsWith('/admin-dashboard') || 
    location.pathname.startsWith('/user-dashboard');

  return (
    <>
      {!hideLayout && <Header />}

      <Routes>
        {/* Rrugët Publike */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />

        {/* Rrugët e Mbrojtura (Vetëm me Token) */}
        <Route 
          path="/admin-dashboard" 
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/user-dashboard" 
          element={
            <ProtectedRoute>
              <UserDashboard />
            </ProtectedRoute>
          } 
        />

        {/* Nëse dikush shkruan diçka gabim, e dërgojmë te Login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>

      {!hideLayout && <Footer />}
    </>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
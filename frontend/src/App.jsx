import React from 'react';
import { BrowserRouter as Router, Routes, Route, BrowserRouter , useLocation } from 'react-router-dom';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard'; 
import Landing from './pages/Landing';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

const AppContent = () => {
  const location = useLocation();

  const hideLayout = location.pathname.startsWith('/admin-dashboard');

  return (
    <>
      {!hideLayout && <Header />}

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
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
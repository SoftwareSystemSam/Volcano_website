import './App.css';
import React, { useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import VolcanoList from './Volcano-List';
import HomeContent from './components/HomeContent';
import Volcano from './Volcano';
import { Link } from 'react-router-dom';
import { AuthProvider } from './components/AuthContext';
import { useAuth } from './components/AuthContext';

function App() {

  return (
    <AuthProvider>
      <Router>
        <Navigation />
        <div>
          <Routes>
            <Route path="/" element={<HomeContent />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/volcano-list" element={<VolcanoList />} />
            <Route path="/volcano/:id" element={<Volcano />} />
            
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

function Navigation() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/volcano-list">Volcano List</Link>
      {!isAuthenticated ? (
        <>
          <Link to="/register">Register</Link>
          <Link to="/login">Login</Link>
        </>
      ) : (
        <button onClick={logout}>Logout</button>
      )}
    </nav>
  );
}


export default App;

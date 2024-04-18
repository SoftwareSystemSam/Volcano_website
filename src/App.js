import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import VolcanoList from './pages/Volcano-List';
import HomeContent from './components/HomeContent';
import Volcano from './pages/Volcano';
import { Link } from 'react-router-dom';
import { AuthProvider } from './components/AuthContext';
import { useAuth } from './components/AuthContext';
import Footer from './components/Footer';

function App() {

  return (
    <AuthProvider>
      <Router>
        <div className="AppContainer">
          <Navigation />
          <div className="Content">
            <Routes>
              <Route path="/" element={<HomeContent />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/volcano-list" element={<VolcanoList />} />
              <Route path="/volcano/:id" element={<Volcano />} />

            </Routes>
          </div>
          <Footer />
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

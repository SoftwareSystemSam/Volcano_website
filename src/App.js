import './App.css';
import React, { useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import VolcanoList from './Volcano-List';
import HomeContent from './components/HomeContent';
import { Link } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div>
      <nav>
          {/* Navigation links */}
          <Link to="/">Home</Link>
          <Link to="/volcano-list">Volcano List</Link>
          <Link to="/register">Register</Link>
          <Link to="/login">Login</Link>
        </nav>

        <Routes>
          <Route path="/" element={<HomeContent />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/volcano-list" element={<VolcanoList />} />
          {/* other routes as needed */}
        </Routes>
      </div>
    </Router>
  );
}


export default App;

import './App.css';
import { useState, useEffect } from "react";
// import SearchBar from './components/SearchBar';
import { login, getCountriesWithVolcanoes } from './api';

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-balham.css";
import React, { useRef } from 'react';

//import { Button, Badge } from "reactstrap";
// import { useNavigate } from "react-router-dom";
import VolcanoGrid from './VolcanoGrid';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  // Login function
  const handleLogin = () => {
    if (email && password) {
      // Call your login API function
      login(email, password)
        .then(response => {
          console.log('Login successful', response);
          // Handle successful login, e.g., redirect or show user dashboard
        })
        .catch(error => {
          // Handle login error, display message from API if available
          setError(error.message || 'Login failed, please try again.');
        });
    } else {
      // Simple front-end validation
      setError('Please enter both email and password.');
    }
  };

  //Volcano Grid stuff
  const [rowData, setRowData] = useState([]);
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    getCountriesWithVolcanoes()
      .then(countriesData => {
        console.log(countriesData); // Check the fetched data structure
        setCountries(countriesData);
      })
      .catch(error => {
        console.error('Error fetching countries:', error);
      });
  }, []);

  return (
    <div className="App">
      <h1> Volcanoes of the World</h1>
      <p>Hello! Website is still in development</p>
      <div>
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button onClick={handleLogin}>Login</button>
        {/* Other button here, e.g., for getting volcano details */}
        <h1>Volcano Catalogue</h1>
        <VolcanoGrid countries={countries} />
        {error && <p className="error">{error}</p>}
      </div>

    </div>
  );
}

export default App;

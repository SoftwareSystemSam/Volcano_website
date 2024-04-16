import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import { useAuth } from './components/AuthContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const {login} = useAuth();

    const handleLogin = () => {
        if (email && password) {
            
            login(email, password)
                .then(response => {
                    console.log('Login successful', response);
                    localStorage.setItem("token", response.token);
                    navigate('/');
                })
                .catch(error => {
                    
                    setError(error.message || 'Login failed, please try again.');
                });
        } else {
          
            setError('Please enter both email and password.');
        }
    };
    return (
        <div>
            <h1>Login</h1>
            <label>
                Email:
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </label>
            <label>
                Password:
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>
            <button onClick={handleLogin}>Login</button>
            {error && <div className="error">{error}</div>}
        </div>
    );
}

export default Login;
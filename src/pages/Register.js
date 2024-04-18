import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../api';


const Register = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();


  /* https://regex101.com/ */
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
  const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/; // Passwords will contain at least 1 upper case letter, 1 lower case letter, 1 number or special character, and be at least 8 characters long
  


  const handleRegister = () => {

    if (!emailPattern.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (!passwordPattern.test(password)) {
      setError('Password must be at least 8 characters long and include a number, an uppercase letter, and a lowercase letter.');
      return;
    }
    if (email && password) {
      register(email, password)
        .then(response => {
          alert('Registration successful. You can now log in with your credentials.');
          navigate('/login');
        })
        .catch(error => {
          setError(error.message || 'Registration failed, please try again.');
        });
    } else {
      setError('Please enter a valid email and password');
    }
  }

  return (
    <div>
      <h1>Register</h1>
      <label>
        Email:
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <button onClick={handleRegister}>Register</button>
      {error && <p className="error">{error}</p>}
      <div className="password-rules">
        <p>Password must contain:</p>
        <ul>
          <li>At least 8 characters</li>
          <li>At least one digit (0-9)</li>
          <li>At least one lowercase letter (a-z)</li>
          <li>At least one uppercase letter (A-Z)</li>
        </ul>
      </div>
    </div>
  );
}

export default Register;
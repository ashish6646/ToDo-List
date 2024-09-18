import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import '../styles/Register.css';

const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { email: initialEmail, password: initialPassword } = location.state || {};
  const [email, setEmail] = useState(initialEmail || '');
  const [password, setPassword] = useState(initialPassword || '');
  const [error, setError] = useState('');

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('http://localhost:5000/api/users/register', { email, password });
      localStorage.setItem('token', data.token);
      navigate('/todos');
    } catch (error) {
      setError(error.response.status === 409 ? 'User exists, please login' : 'Error registering');
    }
  };

  return (
    <div className="register-container">
      <h1 className="register-title">Register</h1>
      <div className="form-container">
        <form onSubmit={submitHandler}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="input-field"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="input-field"
          />
          <button type="submit" className="submit-button">Register</button>
        </form>
        {error && <p className="error-message">{error}</p>}
        <a href="/login" className="login-link">Already have an account? Login</a>
      </div>
    </div>
  );
};

export default Register;

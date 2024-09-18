import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import '../styles/Login.css';

const Login = ({ setToken }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { email: initialEmail, password: initialPassword } = location.state || {};
  const [email, setEmail] = useState(initialEmail || '');
  const [password, setPassword] = useState(initialPassword || '');
  const [error, setError] = useState('');

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('http://localhost:5000/api/users/login', { email, password });
      setToken(data.token);
      localStorage.setItem('token', data.token);
      navigate('/todos');
    } catch (error) {
      setError(error.response.status === 404 ? 'Not registered, please register' : 'Invalid credentials');
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Login</h1>
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
          <button type="submit" className="submit-button">Login</button>
        </form>
        {error && <p className="error-message">{error}</p>}
        <a href="/register" className="register-link">Don't have an account? Register here</a>
      </div>
    </div>
  );
};

export default Login;

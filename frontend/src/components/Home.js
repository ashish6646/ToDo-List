import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    navigate('/login', { state: { email, password } });
  };

  const handleRegister = () => {
    navigate('/register', { state: { email, password } });
  };

  return (
    <div className="home-container">
      <h1 className="home-title">Welcome to the ToDo App</h1>
      <div className="button-container">
        <button className="login-button" onClick={handleLogin}>
          Login
        </button>
        <button className="register-button" onClick={handleRegister}>
          Register
        </button>
      </div>
    </div>
  );
};

export default Home;

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import TodoList from './components/TodoList';
import Home from './components/Home'; // Import Home component

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token') || null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> {/* Default landing page */}
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/todos" element={<TodoList token={token} />} />
      </Routes>
    </Router>
  );
};

export default App;

// src/components/AdminLogin.jsx
import React, { useState } from 'react';
import axios from 'axios';
import './LoginScreen.css';
import { useNavigate } from 'react-router-dom';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('https://sairambackend.onrender.com/api/auth/login', {
        username,
        password,
      });

      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      alert('Invalid username or password');
    }
  };

  return (
    <div className="login-container">
      <img src="src\assets\welcome.png" className="login-img" alt="Welcome" />

      <h2 className="login-title">Let’s you in</h2>

      <form onSubmit={handleLogin} className="login-form">
        <input
          type="text"
          placeholder="Username"
          className="login-input"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="login-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit" className="login-button">
          Login
        </button>
      </form>

      
    </div>
  );
}

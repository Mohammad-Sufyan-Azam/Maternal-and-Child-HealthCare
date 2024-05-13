import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

import appleIcon from './assets/apple.svg'; 
import googleIcon from './assets/google.svg';
import facebookIcon from './assets/facebook.svg';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:4000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      if (response.ok) {
        const { token } = await response.json();
        localStorage.setItem('jwt', token);
        navigateBasedOnRole(token);
      } else {
        alert('Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('An error occurred during login. Please try again later.');
    }
  };

  const navigateBasedOnRole = (token) => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const decodedToken = JSON.parse(window.atob(base64));

    switch (decodedToken.role) {
      case 'moderator':
        navigate('/HomePage');
        break;
      case 'controller':
        navigate('/ControllerHomePage');
        break;
      case 'systemAdmin':
        navigate('/SAHomePage');
        break;
      default:
        console.error('Unexpected role:', decodedToken.role);
        alert('Login failed: Unexpected user role');
        break;
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email or Mobile Number"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit" className="login-button">LOGIN</button>
        <div className="or">-OR-</div>
        <div className="social-logins">
          <button type="button" className="social-button google">
            <img src={googleIcon} alt="Google" className="logo" />Continue with Google
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;

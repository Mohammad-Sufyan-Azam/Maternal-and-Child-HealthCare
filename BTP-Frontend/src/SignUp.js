import React, { useState } from 'react';
import './SignUp.css'; 

import appleIcon from './assets/apple.svg'; 
import googleIcon from './assets/google.svg';
import facebookIcon from './assets/facebook.svg';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Moderator'); 

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({ email, password, role });
  };

  return (
    <div className="SignUp-container">
      
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
       
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="Moderator">Moderator</option>
          <option value="Controller">Controller</option>
          <option value="SystemAdmin">System Admin</option>
        </select>
        <button type="submit" className="signUp-button">SIGNUP</button>
        <div className="or">-OR-</div>
        <div className="social-logins">
          <button type="button" className="social-button google">
            <img src={googleIcon} alt="Google" className="logo" />Continue with Google
          </button>
          <button type="button" className="social-button facebook">
            <img src={facebookIcon} alt="Facebook" className="logo" />Sign in with Facebook
          </button>
          </div>
      </form>
    </div>
  );
};

export default SignUp;

// LoginSignup.jsx
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import '../LoginSignup.css';
import { useNavigate } from 'react-router-dom';
import user_icon from '../Assets/images/Assets/person.png';
import email_icon from '../Assets/images/Assets/email.png';
import password_icon from '../Assets/images/Assets/password.png';

const LoginSignup = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleClick = () => {
    // Navigate to the desired location
    navigate('/home');
  };
  const handleClick2 = () => {
    // Navigate to the desired location
    navigate('/signup');
    localStorage.clear();
  };

  return (
    <div className='container'>
      <div className='header'>
        <div className='text'>Login</div>
        <div className='underline'></div>
      </div>
      <div className='inputs'>
        <div className='input'>
          <img src={user_icon} alt='' />
          <input type='text' placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className='input'>
          <img src={password_icon} alt='' />
          <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        
      </div>
      <div className='d-flex justify-content-center align-items-center mt-3'>
      <button  className='btn btn-primary' onClick={handleClick}>Login</button>
      <button className='btn ms-2 btn-outline-info' onClick={handleClick2}>Sign Up</button>
      
      </div>
     
    </div>
  );
};

export default LoginSignup;
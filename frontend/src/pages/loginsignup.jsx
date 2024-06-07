import React, { useState } from 'react';
import './login.css';
import email_icon from '../components/assets/images/Assets/email.png';
import password_icon from '../components/assets/images/Assets/password.png';
import Layout from './Mainlayout';
import axios from "axios";
import { useNavigate , Link} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { setAuthToken } from "../services/auth";


const LoginSignup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      if (!email || !password) {
        toast.error("Please fill in all fields to sign in.");
        return;
      }

      const response = await axios.post('http://localhost:5059/api/user/login', {
        email: email,
        password: password
      });
      setAuthToken(response.data.token);
      localStorage.setItem('role', response.data.userRole);


      if (response.data.userType.toLowerCase() === 'developer') {
        localStorage.setItem('email', response.data.email);
        localStorage.setItem('userId', response.data.userId);
        localStorage.setItem('developerId', response.data.developerId);
        navigate("/home");
      } else if (response.data.userType.toLowerCase() === 'admin') {
        localStorage.setItem('email', response.data.email);
        localStorage.setItem('userId', response.data.userId);
        navigate("/dashboard");
      }
    } catch (error) {
      toast.error("Invalid Email or Password");
      console.log(error)
    }
  };

  return (
    <Layout>
      <ToastContainer/>
      <div className='container'>
        <div className='header'>
          <div className='text-log'>Login</div>
          <div className='underline'></div>
        </div>
        <div className='inputs'>
          <div className='input'>
            <img src={email_icon} alt='' />
            <input type='email' placeholder='Email Id' value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className='input'>
            <img src={password_icon} alt='' />
            <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
        </div>
        <div className='sumbit-container'>
          <button className="submit" onClick={handleLogin}>
            Login
          </button>
          <Link to="/signup" className="submit">
            Sign Up
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default LoginSignup;

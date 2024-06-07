import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './login.css';
import user_icon from '../components/assets/images/Assets/person.png';
import email_icon from '../components/assets/images/Assets/email.png';
import password_icon from '../components/assets/images/Assets/password.png';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from './Mainlayout';

export const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSave = async () => {
    // Reset error messages
    setNameError("");
    setEmailError("");
    setPasswordError("");

    try {
      // Validate input fields
      if (!name) {
        setNameError("Name is required");
        return;
      }
      if (!email) {
        setEmailError("Email is required");
        return;
      }
      if (!password) {
        setPasswordError("Password is required");
        return;
      }

      // Send signup request
      await axios.post("http://localhost:5059/api/user/signup", {
        email: email,
        password: password,
        name: name
      });

      toast.success("Account added successfully!");
      Clear();
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const responseData = error.response.data;
        
        // Check if the error data contains information about the password field
        if (responseData.errors && responseData.errors.Password) {
          const passwordErrorMessage = responseData.errors.Password[0];
          toast.error(passwordErrorMessage);
        } else {
          // Handle other types of errors
          toast.error("Error saving data");
          console.error('Error saving data:', error);
        }
      } else {
        // Handle other types of errors
        toast.error("Error saving data");
        console.error('Error saving data:', error);
      }
    }
  };

  const Clear = () => {
    setName("");
    setEmail("");
    setPassword("");
  };

  return (
    <Layout>
    <div className='container'>
      <ToastContainer />
      <div className='header'>
        <div className='text-log'>Sign Up</div>
        <div className='underline'></div>
      </div>
      <div className='inputs'>
        <div className='input'>
          <img src={user_icon} alt='' />
          <input type='text' placeholder='User Name' value={name} onChange={(e) => setName(e.target.value)} style={nameError ? {borderColor: 'red'} : null} />
          {nameError && <span className="error">{nameError}</span>}
        </div>
        <div className='input'>
          <img src={email_icon} alt='' />
          <input type='email' placeholder='Email Id' value={email} onChange={(e) => setEmail(e.target.value)} style={emailError ? {borderColor: 'red'} : null} />
          {emailError && <span className="error">{emailError}</span>}
        </div>
        <div className='input'>
          <img src={password_icon} alt='' />
          <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} style={passwordError ? {borderColor: 'red'} : null} />
          {passwordError && <span className="error">{passwordError}</span>}
        </div>
      </div>
      <div className='sumbit-container'>
        <Link to="/login" className="submit">
          Login
        </Link>
        <button className="submit" onClick={handleSave}>Create My Account</button>
      </div>
    </div>
    </Layout>
  );
};

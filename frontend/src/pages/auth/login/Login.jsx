import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = ({ setIsLoggedIn, setUserEmail, setUserRole, isLoggedIn }) => {
  const [formsData, setFormData] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formsData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formsData.email,
          password: formsData.password
        }),
      });

      const data = await response.json();

      if (response.ok && data.token) {
        // Set the user as logged in
        setIsLoggedIn(true);

        // Store the token, user email, and user role in localStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('userEmail', formsData.email);
        localStorage.setItem('userRole', data.role); // Ensure backend sends role

        // Update the state for user email and role
        setUserEmail(formsData.email);
        setUserRole(data.role); // Set the user role in state

        // Redirect to dashboard
        navigate('/dashboard');
      } else {
        alert('Invalid credentials');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  // Check if the user is already logged in based on localStorage
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      setUserEmail(localStorage.getItem('userEmail'));
      setUserRole(localStorage.getItem('userRole')); // Retrieve role from localStorage
    }
  }, [setIsLoggedIn, setUserEmail, setUserRole]);

  // If the user is logged in, redirect them to the dashboard
  if (isLoggedIn) {
    return <div>You are already logged in. Redirecting to dashboard...</div>; // Or you can redirect to dashboard automatically
  }

  return (
    <div className="login">
      <div className="login_form">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formsData.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={formsData.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
      </div>
    </div>
  );
};

export default Login;

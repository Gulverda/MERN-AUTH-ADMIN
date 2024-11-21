import './App.css';
import Header from './pages/header/Header';
import Login from './pages/auth/login/Login';
import Signup from './pages/auth/signup/Signup';
import AdminPanel from './components/admin/AdminPanel'; // Admin Panel component
import { Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [userRole, setUserRole] = useState(''); // Store the role of the logged-in user
  const [userInfo, setUserInfo] = useState(null); // For storing user information if needed

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      const email = localStorage.getItem('userEmail');
      const role = localStorage.getItem('userRole');
      if (email) setUserEmail(email);
      if (role) setUserRole(role);
      console.log('User Role:', role); // Check the role here

      // Fetch additional user data if the user is an admin
      if (role === 'admin') {
        fetchAdminData(); // Simulate fetching admin data from DB
      }
    }
  }, []);

  const fetchAdminData = async () => {
    try {
      const response = await fetch('https://mern-auth-admin.onrender.com/admin/users', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      // Check if the response is OK
      if (response.ok) {
        const data = await response.json();
        setUserInfo(data); // Set the data for admin
      } else {
        const errorMessage = await response.text(); // Get the error text
        console.error('Failed to fetch admin data:', errorMessage);
      }
    } catch (error) {
      console.error('Error fetching admin data:', error);
    }
  };

  return (
    <>
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} userEmail={userEmail} />
      <Routes>
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} setUserEmail={setUserEmail} setUserRole={setUserRole} isLoggedIn={isLoggedIn} />} />
        <Route path="/register" element={<Signup />} />

        {/* Admin route */}
        <Route
          path="/admin"
          element={
            isLoggedIn && userRole === 'admin' ? (
              userInfo ? (
                <AdminPanel userInfo={userInfo} /> // Admin panel for admin
              ) : (
                <AdminPanel userInfo={userInfo}/> // Show loading if admin data is not yet available
              )
            ) : (
              <Navigate to="/login" /> // Redirect to login if not logged in or not admin
            )
          }
        />

        {/* User Profile route */}
        <Route
          path="/profile"
          element={
            isLoggedIn ? (
              userRole === 'admin' ? (
                <Navigate to="/admin" /> // Redirect to admin panel if admin
              ) : (
                <div>Hello User! Welcome to your profile.</div> // Show user profile for regular users
              )
            ) : (
              <Navigate to="/login" /> // Redirect to login if not logged in
            )
          }
        />
      </Routes>
    </>
  );
}

export default App;

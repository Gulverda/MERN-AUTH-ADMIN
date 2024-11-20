import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Header = ({ isLoggedIn, setIsLoggedIn, userEmail, userRole }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear token
    setIsLoggedIn(false); // Update logged-in status
    navigate('/login'); // Redirect
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header>
      <div className="container">
        <nav className={`navbar ${isMenuOpen ? 'navbar-open' : ''}`}>
          <div className="navbar-brand" onClick={() => navigate('/')}>
            <a href="/">MERN Stack</a>
          </div>

          <button className="burger-menu" onClick={toggleMenu}>
            <span className="burger-bar"></span>
            <span className="burger-bar"></span>
            <span className="burger-bar"></span>
          </button>

          <ul className={`navbar-nav ${isMenuOpen ? 'nav-active' : ''}`}>
            {!isLoggedIn ? (
              <>
                <li className="nav-item">
                  <a className="nav-link" href="/login">Login</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/register">Signup</a>
                </li>
              </>
            ) : (
              <>
                {userRole === 'admin' && ( // Show "Dashboard" only for admin
                  <li className="nav-item">
                    <a className="nav-link" href="/dashboard">Dashboard</a>
                  </li>
                )}
                <li className="nav-item">
                  <span className="nav-link user-email">{userEmail}</span>
                </li>
                <li className="nav-item">
                  <button onClick={handleLogout} className="btn btn-logout">
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;

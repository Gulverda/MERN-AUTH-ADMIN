import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = ({ isLoggedIn, setIsLoggedIn, userEmail }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove the token from localStorage
    setIsLoggedIn(false); // Update the logged-in status
    navigate('/login'); // Redirect to the login page
  };

  return (
    <header>
      <div className="container">
        <h1>Welcome to MERN Stack</h1>
        <hr />
        <strong>{isLoggedIn ? 'Logged in' : 'Not-Logged in'}</strong>

        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <a className="navbar-brand" href="/">MERN Stack</a>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
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
                  <li className="nav-item">
                    <a className="nav-link" href="/dashboard">Dashboard</a>
                  </li>
                )}
              </ul>
            </div>
          </div>
          {isLoggedIn && (
            <>
                <span className="ms-3 text-primary">
  <strong>{userEmail}</strong>
</span>

            <button onClick={handleLogout} className="btn btn-danger ms-3">
              Logout
            </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;

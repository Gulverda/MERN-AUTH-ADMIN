import React, { useEffect, useState } from 'react';
import './AdminPanel.css';

function AdminPanel({ userInfo }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/login`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch users: ${response.statusText}`);
        }

        const data = await response.json();
        setUsers(data);
      } catch (error) {
        setError(error.message);
        console.error('Error fetching users data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsersData();
  }, []);

  if (loading) {
    return <div className="loading admin-panel">Loading user data...</div>;
  }

  if (error) {
    return <div className="error admin-panel">Error: {error}</div>;
  }

  return (
    <div className="admin-panel">
      <h2>Admin Panel</h2>
      <h3>User List</h3>
      <ul className="user-list">
        {users.length === 0 ? (
          <li>No users found.</li>
        ) : (
          users.map((user, index) => (
            <li key={`${user.id}-${index}`}>
              <span>{user.name}</span> - {user.email}
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default AdminPanel;
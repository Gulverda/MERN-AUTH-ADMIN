import React, { useEffect, useState } from 'react';

function AdminPanel({ userInfo }) {  // Make sure userInfo is destructured from props
  const [users, setUsers] = useState([]); // State to store the fetched users
  const [loading, setLoading] = useState(true); // State for loading state
  const [error, setError] = useState(null); // State for error handling

  // Fetch users data when the AdminPanel component is mounted
  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        const response = await fetch('http://localhost:5000/admin/users', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`, // Ensure token is passed
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch users: ${response.statusText}`);
        }

        const data = await response.json();
        setUsers(data); // Set the fetched users data
      } catch (error) {
        setError(error.message); // Set error state
        console.error('Error fetching users data:', error);
      } finally {
        setLoading(false); // Set loading to false once the request is complete
      }
    };

    fetchUsersData();
  }, []); // Empty dependency array to run once when the component is mounted

  if (loading) {
    return <div>Loading user data...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Admin Panel</h2>
      <h3>User List</h3>
      <ul>
  {users.length === 0 ? (
    <li>No users found.</li>
  ) : (
    users.map((user, index) => (
      <li key={`${user.id}-${index}`}> {/* Unique key using both user.id and index */}
        {user.name} - {user.email}
      </li>
    ))
  )}
</ul>


    </div>
  );
}

export default AdminPanel;

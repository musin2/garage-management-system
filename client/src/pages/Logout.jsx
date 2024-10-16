import React from 'react';
import axios from 'axios';

const Logout = ({ setRole }) => {
  const handleLogout = () => {
    axios
      .post('/logout')
      .then(response => {
        alert(response.data.message);
        setRole(null);  // Reset the role to indicate the user is logged out
      })
      .catch(error => {
        alert(error.response.data.error || 'Logout failed');
      });
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;
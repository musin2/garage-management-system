import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Logout = ({ setRole, handleLogout }) => {
    const navigate = useNavigate();

    const handleLogoutClick = async () => {
        try {
            // Send the logout request
            await axios.post('http://127.0.0.1:5555/logout', {}, { withCredentials: true });

            // Call handleLogout if it's a function
            if (typeof handleLogout === 'function') {
                handleLogout();
            }
            // Clear the role in state
            // if (typeof setRole === 'function') {
            //     setRole(null); // Set the role to null after logout
            // }
            navigate('/');
        } catch (error) {
            console.error("Error in logout:", error);
            alert("Logout failed. Please try again.");
        }
    };

    return (
        <button className="btn btn-outline-danger" onClick={handleLogoutClick}>
            Logout
        </button>
    );
};

export default Logout;

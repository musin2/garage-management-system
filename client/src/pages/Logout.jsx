import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Logout = ({ setRole, handleLogout }) => {
    const navigate = useNavigate();

    const handleLogoutClick = async () => {
        try {
            await axios.post('http://127.0.0.1:5555/logout', {}, { withCredentials: true });

            if (typeof setRole === 'function') {
                setRole(null); // Set the role to null after logout
              }

            if (typeof handleLogout === 'function') {
                handleLogout();
            }
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

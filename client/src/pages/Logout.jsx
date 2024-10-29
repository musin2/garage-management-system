import React from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";

const Logout = ({ setRole, handleLogout }) => {
    const navigate = useNavigate();

    const handleLogoutClick = async () => {
        try {
            // Call the logout API
            await axios.post('https://garage-backend-59fg.onrender.com/logout', {}, { withCredentials: true });

            // Remove all user-related cookies
            Cookies.remove("user_id");
            Cookies.remove("user_name");
            Cookies.remove("user_email");
            Cookies.remove("user_phone");
            Cookies.remove("user_role");

            // Optionally clear localStorage or sessionStorage if needed
            localStorage.removeItem('userRole');

            // Reset the user role in state after logout
            if (typeof setRole === 'function') {
                setRole(null); // Clear the role state
            }

            // Invoke any additional logout handlers
            if (typeof handleLogout === 'function') {
                handleLogout();
            }

            // Redirect to the login page or home page after successful logout
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

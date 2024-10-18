import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Logout from "./pages/Logout";

const App = () => {
  const [role, setRole] = useState(
    () => localStorage.getItem("userRole") || null
  ); // Retrieve role from local storage
  const [showLogin, setShowLogin] = useState(true); // Toggle between Login and Register
  // const [role, setRole] = useState(localStorage.getItem('userRole') || null);

  const handleLogout = () => {
    setRole(null); // Clear the user role
    localStorage.removeItem("userRole"); // Clear from local storage
  };

  useEffect(() => {
    // Check the role when the component mounts or updates
    const storedRole = localStorage.getItem("userRole");
    if (storedRole) {
      setRole(storedRole);
    } else {
      setRole(null);
    }
  }, [role]);

  return (
    <div>
      {!role ? (
        <>
          {showLogin ? (
            <Register setRole={setRole} />
          ) : (
            <Login setRole={setRole} />
          )}
          <div className="d-flex justify-content-center mt-10">
            <button
              onClick={() => setShowLogin(!showLogin)}
              className="btn btn-primary mb-2"
            >
              {showLogin ? "Sign in" : "Sign up"}
            </button>
          </div>
        </>
      ) : (
        <>
          <Home setRole={setRole} role={role} handleLogout={handleLogout} />
        </>
      )}
    </div>
  );
};

export default App;
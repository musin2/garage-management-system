import React, { useState } from "react";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import NavBar from "./components/Navbar";
import Home from "./pages/Home";

const App = () => {
  const [role, setRole] = useState(null);

  return (
    <div>
      {!role && (
        <>
          <Register />
          <Login setRole={setRole} />
        </>
      )}

      {role === "customer" && (
        <>
          <NavBar />
          <Home/>
          <Logout setRole={setRole} />
        </>
      )}

      {role === "admin" && (
        <>
          <NavBar />
          <Home/>
          <Logout setRole={setRole} />
        </>
      )}
    </div>
  );
};

export default App;

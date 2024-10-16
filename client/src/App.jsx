import React, { useState } from "react";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import NavBar from "./components/Navbar";

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
          <h1>Home Page</h1>
          <Logout setRole={setRole} />
        </>
      )}

      {role === "admin" && (
        <>
          <NavBar />
          <h1>Home Page</h1>
          <Logout setRole={setRole} />
        </>
      )}
    </div>
  );
};

export default App;

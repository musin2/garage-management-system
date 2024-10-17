import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Logout from "./pages/Logout";


const App = () => {
  const [role, setRole] = useState(() => localStorage.getItem("userRole") || null); // Retrieve role from local storage
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
}, []);


  return (
    <div>
      {!role ? (
        <>
          {showLogin ? (
            <Register setRole={setRole} />
          ) : (
            <Login setRole={setRole} />
          )}
          <button onClick={() => setShowLogin(!showLogin)}>
            {showLogin ? "Sign in" : "Sign up"}
          </button>
        </>
      ) : (
        <>
          <Home setRole={setRole} role={role} handleLogout={handleLogout}/>
          {/* <Logout setRole={setRole} handleLogout={handleLogout} /> */}
        </>
      )}
    </div>
  );
};

export default App;

// import React, { useState, useEffect } from "react";
// import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
// import Register from "./pages/Register";
// import Login from "./pages/Login";
// import Home from "./pages/Home";
// import Logout from "./pages/Logout";

// const App = () => {
//   const [role, setRole] = useState(() => localStorage.getItem('userRole') || null); // Retrieve role from local storage
//   const [showLogin, setShowLogin] = useState(true); // Toggle between Login and Register

//   const handleLogout = () => {
//     setRole(null);  // Clear the user role
//     localStorage.removeItem('userRole'); // Clear from local storage
//   };

//   useEffect(() => {
//     // This can be used for additional side effects when role changes
//   }, [role]);

//   return (
//     <Router>
//       <div>
//         {!role ? (
//           <>
//             {showLogin ? (
//               <Register setRole={setRole} />
//             ) : (
//               <Login setRole={setRole} />
//             )}
//             <button onClick={() => setShowLogin(!showLogin)}>
//               {showLogin ? "Sign in" : "Sign up"}
//             </button>
//           </>
//         ) : (
//           <>
//             <Home setRole={setRole} role={role} />
//             <Logout setRole={setRole} handleLogout={handleLogout} />
//           </>
//         )}
//       </div>
//     </Router>
//   );
// };

// export default App;

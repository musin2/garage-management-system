import { Link } from "react-router-dom";
import Logout from "../pages/Logout";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

function NavBar({ setRole, role, handleLogout}) {

  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const roleFromCookies = Cookies.get("user_role");
    setUserRole(roleFromCookies);
  }, []);
  

  return (
    <>
      <nav className="navbar navbar-expand-md navbar-light bg-light">
        <div className="container-sm">
          <Link to={"/home"} className="navbar-brand nav-link">
            Garage 66
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mainNavBar"
            aria-controls="mainNavBar"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse offset-1" id="mainNavBar">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {userRole === "customer" && (
                <>
                  <li className="nav-item">
                    <Link
                      to={"/home"}
                      className="nav-link active"
                      aria-current="page"
                    >
                      Home
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link to={"/profile"} className="nav-link active">
                      Profile
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to={"/about"} className="nav-link active">
                      About
                    </Link>
                  </li>
                </>
              )}

              {userRole === "admin" && (
                <>
                  <li className="nav-item">
                    <Link
                      to={"/home"}
                      className="nav-link active"
                      aria-current="page"
                    >
                      Home
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to={"/services"} className="nav-link active">
                      Manage Services
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to={"/appointments"}
                      className="nav-link active"
                    >
                      Manage Appointments
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to={"/manage-mechanics"}
                      className="nav-link active"
                    >
                      Manage Mechanics
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to={"/about"} className="nav-link active">
                      About
                    </Link>
                  </li>
                </>
              )}
            </ul>
            
              <Logout setRole={setRole} role={role} handleLogout={handleLogout} />
          
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;

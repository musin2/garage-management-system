import { useEffect, useState } from "react";
import NavBar from "../components/Navbar";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import "../css/home.css"; // Update the path to the correct location



function Home({ setRole, role, handleLogout }) {
  const [services, setServices] = useState([]);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const roleFromCookies = Cookies.get("user_role");
    setUserRole(roleFromCookies);
  }, []);

  // CHECK IF LOGGED IN => NAVIGATE TO LOG IN PAGE
  useEffect(() => {
    fetch("http://127.0.0.1:5555/services")
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Could not retreive Services data!: ${response.status}`
          );
        }
        return response.json();
      })
      .then((data) => setServices(data))
      .catch((error) => console.error(error));
  }, []);
  return (
    <>
      <NavBar
        setRole={setRole}
        role={role}
        handleLogout={handleLogout}
        userRole={userRole}
      />
      <div className="container-md p-2">
        <div className="row justify-content-between">
          <div className="col-3">
            <h4>Our Services</h4>
          </div>
          {userRole === "customer" && (
            <div className="col-3">
              <Link to="/appointmentsForm">
                <button className="btn bg-info m-2">Book an Appointment</button>
              </Link>
            </div>
          )}
        </div>
        <table className="table ">
          <thead>
            <tr>
              <th>Service</th>
              <th>Description</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => {
              return (
                <tr key={service.id}>
                  <td>{service.service_name}</td>
                  <td>{service.description}</td>
                  <td>{service.price}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Home;

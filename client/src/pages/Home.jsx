import { useEffect, useState } from "react";
import NavBar from "../components/Navbar";
import { Link } from "react-router-dom";

function Home() {
const [services, setServices] = useState([])

// CHECK IF LOGGED IN => NAVIGATE TO LOG IN PAGE
useEffect(() => {
  fetch('http://127.0.0.1:5555/services')
  .then((response) => {
    if (!response.ok){
      throw new Error(`Could not retreive Services data!: ${response.status}`);
    }
    return response.json()
    })
  .then((data) => setServices(data))
  .catch(error => console.error(error)
  );
},[])
  return (
    <>
      <NavBar />
      <h1 className="text-center m-3">Home</h1>
      <div className="container-lg p-2">
        <div className="row justify-content-between">
          <div className="col-3">
            <h4>Our Services</h4>
          </div>
          <div className="col-3">
            <Link to="/appointmentsForm">
              <button className="btn bg-info m-2">Book an Appointment</button>
            </Link>
          </div>
        </div>
        <table className="table ">
          <thead>
            <tr>
              <th>Service</th>
              <th>Description</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>{
            services.map((service) => {
              return (<tr>
                <td>{service.service_name}</td>
                <td>{service.description}</td>
                <td>{service.price}</td>
              </tr>)
            })
            }</tbody>
        </table>
      </div>
    </>
  );
}

export default Home;

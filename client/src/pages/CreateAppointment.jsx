import { useState, useEffect } from "react";
import NavBar from "../components/Navbar";
import Cookies from "js-cookie"; // For getting user information
import { useNavigate } from "react-router-dom";
import {Link} from "react-router-dom"

function CreateAppointment() {

  const navigate = useNavigate()

  // State variables for appointment
  //   const [user_id, setUserId] = useState(''); // User ID input
  const [vehicles, setVehicles] = useState([]);
  const [vehicle_plate, setVehiclePlate] = useState(''); // Vehicle plate input
  const [service_date, setServiceDate] = useState('');
  const [services, setServices] = useState([]);
  const [service_id, setServiceId] = useState('');
  const [mechanic_id, setMechanicId] = useState('');
  const [mechanics, setMechanics] = useState([]);

  // Fetch mechanics/vehicles when the component mounts
  useEffect(() => {
    fetch('http://127.0.0.1:5555/mechanics') 
      .then(response => {
        if (!response.ok) {
          throw new Error(`Could not fetch mechanics: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setMechanics(data); // Store the fetched mechanics in state
      })
      .catch((error) => {
        console.error(error);
        alert('Failed to load mechanics');
      });

      fetch(`http://127.0.0.1:5555/users/${Cookies.get("user_id")}/vehicles`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Could not fetch vehicles: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setVehicles(data); // Store the fetched vehicles in state
      })
      .catch((error) => {
        console.error(error);
        alert('Failed to load vehicles');
      });

      fetch('http://127.0.0.1:5555/services')
      .then((response)=> {
        if (!response.ok) {
          throw new Error("Failed to fetch services");
        }
        return response.json();
      })
      .then((data) => setServices(data))
      .catch((error)=>console.error(error));
  }, []);
  

  // Function to handle appointment submission
  function handleAppointmentSubmit(event) {
    event.preventDefault();
    let user_id=Cookies.get("user_id")

    // Validate user_id and vehicle_plate
    if (!user_id || !vehicle_plate || !service_id) {
      alert('Missing userID / vehilce license plate / Service.');
      return;
    }

    const newAppointment = {
      service_date: `${service_date} 09:00:00`, // Default time
      mechanic_id,
      user_id,
      vehicle_plate,
      status: 'scheduled',
      service_id
    };

    fetch('http://127.0.0.1:5555/appointments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newAppointment),
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to create appointment');
        }
        return response.json();
      })
      .then((data) => {
        alert('Appointment created successfully!');
        navigate("/profile")
      })
      .catch((error) => {
        console.error(error);
        alert('Failed to create appointment: ' + error.message);
      });
  }

  return (
    <>
      <NavBar />
      <div className="container-md m-4">
        <h3 className="text-center">Book an Appointment</h3>
        
        {/* Appointment Booking Form */}
        <form className="form" onSubmit={handleAppointmentSubmit}>
          <h5>Book Appointment</h5>
          <div className="row m-2">
            <div className="col m-1">
              <label htmlFor="user_id">User ID</label>
              <input
                type="text"
                name="user_id"
                id="user_id"
                value={Cookies.get("user_id")}
                required
                disabled
              />
            </div>
            <div className="col m-1">
              <label htmlFor="select_plate">Vehicle License</label>
              <select
                id="select_plate"
                value={vehicle_plate}
                onChange={(e) => setVehiclePlate(e.target.value)}
                required
              >
                <option value="">Select Vehicle</option>
                {vehicles.map((v) => (
                  <option key={v.id} value={v.license_plate}>
                    {v.license_plate}
                  </option>
                ))}
              </select>
              {/* <input
                type="text"
                name="vehicle_plate"
                id="vehicle_plate"
                value={vehicle_plate}
                onChange={(e) => setVehiclePlate(e.target.value)}
                required
              /> */}
            </div>
          </div>
          <div className="row m-2">
            <div className="col m-1">
              <label htmlFor="service_date">Service Date</label>
              <input
                type="date"
                name="service_date"
                id="service_date"
                value={service_date}
                onChange={(e) => setServiceDate(e.target.value)}
                required
              />
            </div>
            <div className="col m-1">
              <label htmlFor="select_mechanic">Mechanic</label>
              <select
                id="select_mechanic"
                value={mechanic_id}
                onChange={(e) => setMechanicId(e.target.value)}
                required
              >
                <option value="">Select A Mechanic</option>
                {mechanics.map((mechanic) => (
                  <option key={mechanic.id} value={mechanic.id}>
                    {mechanic.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="col m-1">
              <label htmlFor="service">Service</label>
              <select name="service" id="service" onChange={(e)=> setServiceId(e.target.value)}>
                <option value="">Select A Service</option>
                {services.map((s)=> {
                  return( 
                    <option key={s.id} value={s.id}>{s.service_name}</option>
                  )
                })}
              </select>
            </div>
          </div>
          <div className="row text-center">
            <div className="col">
              <button type="submit" className="btn btn-info m-1">
                Make Appointment
              </button>
              <Link to="/profile">
                <button className="btn btn-info m-1">
                  Back
                </button>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default CreateAppointment;

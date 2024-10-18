import { useState, useEffect } from "react";
import NavBar from "../components/Navbar";
import Cookies from "js-cookie"; // For getting user information

function CreateAppointment() {
    console.log(Cookies.get())
  // State variables for appointment
//   const [user_id, setUserId] = useState(''); // User ID input
  const [vehicle_id, setVehicleId] = useState(''); // Vehicle ID input
  const [service_date, setServiceDate] = useState('');
  const [mechanic_id, setMechanicId] = useState('');
  const [mechanics, setMechanics] = useState([]);

  // Fetch mechanics when the component mounts
  useEffect(() => {
    fetch('http://127.0.0.1:5555/mechanics') // Adjust the URL based on your backend
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
  }, []);

  // Function to handle appointment submission
  function handleAppointmentSubmit(event) {
    event.preventDefault();
    let user_id=Cookies.get("user_id")

    // Validate user_id and vehicle_id
    if (!user_id || !vehicle_id) {
      alert('Please provide both user ID and vehicle ID.');
      return;
    }

    const newAppointment = {
      service_date: `${service_date} 09:00:00`, // Default time
      mechanic_id,
      user_id,
      vehicle_id,
      status: 'scheduled',
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
        // Redirect or reset form, if necessary
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
                
                
                // onChange={(e) => setUserId(e.target.value)}
                required
                disabled
              />
            </div>
            <div className="col m-1">
              <label htmlFor="vehicle_id">Vehicle ID</label>
              <input
                type="text"
                name="vehicle_id"
                id="vehicle_id"
                value={vehicle_id}
                onChange={(e) => setVehicleId(e.target.value)}
                required
              />
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
          </div>
          <button type="submit" className="btn btn-info m-1">
            Make Appointment
          </button>
        </form>
      </div>
    </>
  );
}

export default CreateAppointment;

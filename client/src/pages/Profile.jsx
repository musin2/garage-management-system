import { useState, useEffect } from "react";
import NavBar from "../components/Navbar";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import "../css/profile.css"; // Update the path to the correct location


function Profile() {
  const [appointments, setAppointments] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [userDetails, setUserDetails] = useState({
    name: Cookies.get('user_name') || '',
    email: Cookies.get('user_email') || '',
    phone_number: Cookies.get('user_phone') || ''
  });

  // Fetch appointments
  useEffect(() => {
    fetch('http://127.0.0.1:5555/appointments')
      .then(response => {
        if (!response.ok) {
          throw new Error(`Could not GET Appointments data!: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        const uID = Cookies.get('user_id');
        const filt = data.filter((app) => app.user.id == uID);
        setAppointments(filt);
      })
      .catch(error => console.error(error));
  }, []);

  // Handle edit mode toggle
  const handleEditClick = () => {
    setIsEditing(true);
  };
  function handleCancel() {
    setIsEditing(false);
  }

  // Handle form field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  // Submit updated profile details
  const handleSubmit = (e) => {
    e.preventDefault();
    const userId = Cookies.get('user_id');

    fetch(`http://127.0.0.1:5555/users/${userId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userDetails),
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to update user details');
      }
      return response.json();
    })
    .then((updatedUser) => {
      // Update cookies with new user details
      Cookies.set('user_name', updatedUser.user.name);
      Cookies.set('user_email', updatedUser.user.email);
      Cookies.set('user_phone', updatedUser.user.phone_number); // Use consistent key

      // Confirm update success and toggle edit mode
      alert('Profile updated successfully');
      setIsEditing(false);
    })
    .catch((error) => {
      console.error(error);
      alert('An error occurred while updating profile');
    });
  };

  return (
    <>
      <NavBar />

      <div className="container-md mt-5">
        <div className="row m-3">
          <div className="col-4">
            <div className="row">
              <h4 className="offset-1">Profile</h4>

              {isEditing ? (
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label>Name</label>
                    <input
                      type="text"
                      name="name"
                      value={userDetails.name}
                      onChange={handleInputChange}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      name="email"
                      value={userDetails.email}
                      onChange={handleInputChange}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone</label>
                    <input
                      type="text"
                      name="phone_number" // Consistent with backend
                      value={userDetails.phone_number}
                      onChange={handleInputChange}
                      className="form-control"
                    />
                  </div>
                  <button type="submit" className="btn btn-info m-2">
                    Save Changes
                  </button>
                  <button onClick={handleCancel} className="btn btn-info m-2">
                    Cancel
                  </button>
                </form>
              ) : (
                <div>
                  <span><i className="bi bi-person-fill m-1"></i> {Cookies.get('user_name')} </span><br/>
                  <span><i className="bi bi-envelope-fill m-1"></i> {Cookies.get('user_email')}</span><br/>
                  <span><i className="bi bi-telephone-fill m-1"></i> {Cookies.get('user_phone')}</span><br/>
                  <button className="btn btn-outline-info m-2" onClick={handleEditClick}>
                    Edit Details
                  </button>
                  <Link to={'/register-vehicle'}><button className="btn btn-outline-info m-2">
                    Register Vehicle
                  </button></Link>
                </div>
              )}
            </div>
          </div>
          <div className="col m-1">
            <div className='row justify-content-between'>
              <div className='col-4'>
                <h4>Appointments</h4>
              </div>
              <div className='col-5'>
                <Link to="/appointmentsForm"><button className='btn bg-info m-2'>Book an Appointment</button></Link>
              </div>
            </div>

            {appointments.length > 0 ? (
              <table className="table bg-light">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Service Date</th>
                    <th>Status</th>
                    <th>License Plate</th>
                    <th>Mechanic</th>
                    <th>Service</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map((app) => {
                    return (
                      <tr key={app.id}>
                        <td>{app.id}</td>
                        <td>{app.service_date}</td>
                        <td>{app.status}</td>
                        <td>{app.vehicle.license_plate}</td>
                        <td>{app.mechanic.name}</td>
                        <td>{app.service.name}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              <p>No Appointments made.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;

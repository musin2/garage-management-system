import {useState, useEffect} from "react";
import NavBar from "../components/Navbar";
import { Link } from "react-router-dom";

function Profile() {
const [appointments, setAppointments] = useState([]);
let uID = document.cookie;
console.warn(uID);


useEffect(() => {
    fetch('http://127.0.0.1:5555/appointments')
    .then(response => {
        if(!response.ok){
            throw new Error(`Could not GET Appointments data!: ${response.status}`)
        }
        return response.json()
    })
    .then((data) => {
        const filt = data.filter((app) =>{
             app.user_id == uID;
        })
        setAppointments(filt)
    })
    .catch(error=>console.error(error));
    },[])

    return(
    <>
    <NavBar/>

    <div className="container-md mt-5">
        <div className="row m-3">
            <div className="col-4">
                <div className="row">
                <h4 className="offset-1">Profile</h4>
                    <span><i class="bi bi-person-fill"></i> </span>
                    <span><i class="bi bi-envelope-fill"></i> </span>
                    <span><i class="bi bi-telephone-fill"></i> </span>
                    <span><i class="bi bi-car-front-fill"></i> </span>
                    <button className="btn btn-outline-info">Edit Details</button>
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
                    {/* If appointments exists display table, else, display "No Appointments made" */}
                    <table className="table bg-light">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Service Date</th>
                                <th>Status</th>
                                <th>License Plate</th>
                            </tr>
                        </thead>
                        <tbody>
                            {appointments.map((app)=> {
                                return(<tr key={app.id}>
                                        <td>{app.id}</td>
                                        <td>{app.service_date}</td>
                                        <td>{app.status}</td>
                                        <td>{app.vehicle.license_plate}</td>
                                    </tr> )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </>
    )
}

export default Profile;
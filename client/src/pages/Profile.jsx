import NavBar from "../components/Navbar";
import { Link } from "react-router-dom";

function Profile() {
    return(
    <>
    <NavBar/>

    <div className="container mt-5">
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
                            </tr>
                        </thead>
                    </table>
                </div>
            </div>
        </div>
    </>
    )
}

export default Profile;
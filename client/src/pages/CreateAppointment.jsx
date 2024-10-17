import { useState } from "react";
import NavBar from "../components/Navbar";

function CreateAppointment() {
    const [service_date, setServiceDate] = useState();
    const [mechanic_id, setMechanicId] = useState();

    function handleSubmit(event) {
        event.preventDefault();
        // set created at to 'NOW'     
        // set status to scheduled
        // set user_id to current user ID
        //set vehicle_id to current user's vehicle ID
        console.warn(service_date);
        
        
    }
    function handleDateChange(e) {
        setServiceDate(e.target.value)
    }
    function handleMechanicChange(e) {
        setMechanicId(e.target.value)
    }
    return (
        <>
        <NavBar/>
        <div className="container-md m-4">
            <h3 className="text-center">Make an Appointment</h3>
        <form className="form">
            <div className="row m-2">
                <div className="col m-1">
            <label htmlFor="service_date">Service Date</label>
            <input type="date" name="service_date" id="service_date" onChange={handleDateChange}/>
            </div>
            <div className="col m-1">
            <label htmlFor="select_mechanic">Mechaninc</label>
            <select id="select_mechanic" onChange={handleMechanicChange}>
                <option value="">Select A mechanic</option>
            </select>
            </div>
            </div>
            <div className="row">
                <div className="col text-center">
            <button onClick={ handleSubmit} className="btn btn-info m-1">Make Appointment</button>
            </div>
            </div>
        </form>
        </div>
        </>
    )
}
export default CreateAppointment;
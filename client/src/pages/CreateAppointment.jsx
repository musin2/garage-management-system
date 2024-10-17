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
        <form className="form">

            <label htmlFor="service_date">Service Date</label>
            <input type="date" name="service_date" id="service_date" onChange={handleDateChange}/>

            <label htmlFor="select_mechanic">Mechaninc</label>
            <select id="select_mechanic" onChange={handleMechanicChange}>
                <option value="">Select A mechanic</option>
            </select>


            <button onClick={ handleSubmit}>Make Appointment</button>
        </form>
        </>
    )
}
export default CreateAppointment;
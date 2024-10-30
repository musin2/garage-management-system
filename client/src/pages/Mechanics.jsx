import { useEffect, useState } from "react";
import NavBar from "../components/Navbar";
import MechanicForm from "../components/MechanicForm";
import "../css/mechanics.css"; // Update the path to the correct location


function Mechanics() {
    const [mechanicData, setMechanics] = useState([])    //potential naming issue****
    const [creating, setCreating] = useState(false)

    useEffect(() => {
        fetch('https://garage-backend-59fg.onrender.com/mechanics')
        .then((response) =>{
            if (!response.ok) {
                throw new Error("Failed to GET mechanics data");
            }
            return response.json();
        })
        .then(data=> setMechanics(data))
        .catch(error=>console.error(error))
    },[])

    function handleCreate() {
        setCreating((x) => !x)
    }

    return(
        <>
        <NavBar/>
        <div className="container-sm m-4">
            <table className="table bg-light">
                <thead className="bg-dark text-light">
                    <tr>
                        <th>Name</th>
                        <th>Phone Number</th>
                    </tr>
                </thead>
                <tbody>
                    {mechanicData.map((mech)=>{
                        return <tr key={mech.id}>
                            <td>{mech.name}</td>
                            <td>{mech.phone_number}</td>
                        </tr>
                    })}
                </tbody>
            </table>
            <div className="row text-center">
                <div className="col">
                    <button className="btn btn-info" onClick={handleCreate}>{creating? "Cancel": "Add Mechanic"}</button>
                </div>
            </div>
            {creating? <MechanicForm/> : null}
        </div>

        </>
    )
}
export default Mechanics;
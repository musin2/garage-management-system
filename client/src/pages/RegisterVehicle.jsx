import { useState } from "react";
import NavBar from "../components/Navbar";
import Cookies from "js-cookie";
import { Navigate, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


function RegisterVehicle(params) {
  const [make, setMake] = useState();
  const [model, setModel] = useState();
  const [year, setYear] = useState();
  const [vehicle_plate, setPlate] = useState();
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();

    // Input Validation
    if (!make || !model || !year || !vehicle_plate) {
      alert("Please fill all fields");
      return;
    }
    const newVehicle = {
      make,
      model,
      year,
      vehicle_plate,
    };

    fetch(`http://127.0.0.1:5555/users/${Cookies.get("user_id")}/vehicles`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newVehicle),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to Register Vehicle");
        }
        return response.json();
      })
      .then((data) => {
        alert(data.message);
        document.getElementById("vForm").reset();
        navigate("/profile");
      })
      .catch((error) => alert(`Failed to Register Vehicle: ${error.message}`));
  }
  return (
    <>
      <NavBar />
      <div className="container-sm m-4">
        <h3 className="text-center m-2">Register User Vehicle</h3>
        <form id="vForm" className="form" onSubmit={handleSubmit}>
          <div className="row m-1">
            <div className="col-2">
              <label htmlFor="make" className="col-form-label">
                Car Make
              </label>
            </div>
            <div className="col-3">
              <input
                type="text"
                name="make"
                id="make"
                className="form-control"
                onChange={(e) => {
                  setMake(e.target.value);
                }}
                required
              />
            </div>
            <div className="col-2">
              <label htmlFor="model" className="col-form-label">
                Model
              </label>
            </div>
            <div className="col-3">
              <input
                type="text"
                name="model"
                id="model"
                className="form-control"
                onChange={(e) => {
                  setModel(e.target.value);
                }}
                required
              />
            </div>
          </div>
          <div className="row m-1">
            <div className="col-2">
              <label htmlFor="year" className="col-form-label">
                Year
              </label>
            </div>
            <div className="col-3">
              <input
                type="text"
                name="year"
                id="year"
                className="form-control"
                onChange={(e) => {
                  setYear(e.target.value);
                }}
                required
              />
            </div>
            <div className="col-2">
              <label htmlFor="vehicle_plate" className="col-form-label">
                License Plate
              </label>
            </div>
            <div className="col-3">
              <input
                type="text"
                name="vehicle_plate"
                id="vehicle_plate"
                className="form-control"
                onChange={(e) => {
                  setPlate(e.target.value);
                }}
                required
              />
            </div>
          </div>
          <div className=" text-center ">
            <button type="submit" className="btn btn-info m-2">
              Add Vehicle
            </button>
            <Link to="/profile">
              <button className="btn btn-info m-1">Back</button>
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}
export default RegisterVehicle;

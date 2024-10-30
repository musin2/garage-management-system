import { useState } from "react";
import "../css/mechanic_form.css"; // Update the path to the correct location
import { useNavigate } from "react-router-dom";


function MechanicForm() {
  const [name, setMName] = useState("");
  const [phone_number, setMNumber] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    let newMechanic = {
      name,
      phone_number,
    };

    fetch("https://garage-backend-59fg.onrender.com/mechanics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newMechanic),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to Add A New Mechanic");
        }
        return response.json();
      })
      .then((data) =>{
         alert(`Mechanic added ${data.name}`)
         console.log(data)
        document.getElementById("mForm").reset();
          // Delay navigation to ensure alert fully displays
        setTimeout(() => navigate("/home", { replace: true }), 400);
        })
      .catch((error) => console.error(error.message));
  }
  return (
    <>
      <form className="form" id="mForm" onSubmit={handleSubmit}>
        <div className="row m-3">
          <div className="col-2">
            <label htmlFor="name">Name</label>
          </div>
          <div className="col">
            <input
              type="text"
              name="name"
              id="name"
              value={name}
              className="form-control"
              onChange={(e) => setMName(e.target.value)}
              required
            />
          </div>
          <div className="col-2">
            <label htmlFor="phone_number">Phone Number</label>
          </div>
          <div className="col">
            <input
              type="text"
              name="phone_number"
              id="phone_number"
              value={phone_number}
              className="form-control"
              onChange={(e) => setMNumber(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="row">
          <div className="col text-center">
            <button type="submit" className="btn btn-info ">
              Add
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
export default MechanicForm;

import React, { useState, useEffect } from "react";
import NavBar from "../components/Navbar";

function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAppointments();
  }, []);

  // Fetch existing appointments
  const fetchAppointments = async () => {
    try {
      const response = await fetch("https://garage-backend-59fg.onrender.com/appointments");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setAppointments(data);
    } catch (error) {
      setError(error.message);
      console.error("Error fetching appointments:", error);
    }
  };

  // Update appointment status
  const updateAppointmentStatus = async (id, newStatus) => {
    try {
      const response = await fetch(`https://garage-backend-59fg.onrender.com/appointments/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!response.ok) {
        throw new Error(
          `Failed to update appointment status. Status: ${response.status}`
        );
      }
      await fetchAppointments(); // Refresh appointments after status update
    } catch (error) {
      setError(error.message);
      console.error("Error updating appointment status:", error);
    }
  };

  return (
    <>
      <NavBar />
      <div className="container-md p-4">
        <h3 className="text-center">Appointments</h3>
        {error && <p>Error: {error}</p>}

        {/* Display appointments */}
        {appointments.length > 0 ? (
          <table className="table bg-light">
            <thead>
              <tr>
                <th>ID</th>
                <th>Vehicle</th>
                <th>Date</th>
                <th>Status</th>
                <th>Mechanic</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment) => (
                <tr key={appointment.id}>
                  <td>{appointment.id}</td>
                  <td>
                    {appointment.vehicle ? appointment.vehicle.make : "N/A"}
                  </td>
                  <td>{appointment.service_date}</td>
                  <td>{appointment.status}</td>
                  <td>{appointment.mechanic.name}</td>
                  <td>
                    <button
                      onClick={() =>
                        updateAppointmentStatus(appointment.id, "scheduled")
                      }
                      disabled={appointment.status === "scheduled"}
                      className={
                        appointment.status === "scheduled"
                          ? "btn-sm bg-secondary m-1"
                          : "btn-sm btn-outline text-info m-1"
                      }
                    >
                      Scheduled
                    </button>
                    <button
                      onClick={() =>
                        updateAppointmentStatus(appointment.id, "ongoing")
                      }
                      disabled={appointment.status === "ongoing"}
                      className={
                        appointment.status === "ongoing"
                          ? "btn-sm bg-secondary m-1"
                          : "btn-sm btn-outline text-info m-1"
                      }
                    >
                      Ongoing
                    </button>
                    <button
                      onClick={() =>
                        updateAppointmentStatus(appointment.id, "complete")
                      }
                      disabled={appointment.status === "complete"}
                      className={
                        appointment.status === "complete"
                          ? "btn-sm bg-secondary m-1"
                          : "btn-sm btn-outline text-info m-1"
                      }
                    >
                      Complete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No appointments found.</p>
        )}
      </div>
    </>
  );
}

export default Appointments;
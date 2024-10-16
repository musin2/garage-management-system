import React, { useState, useEffect } from 'react';
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
            const response = await fetch('http://127.0.0.1:5555/appointments');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setAppointments(data);
        } catch (error) {
            setError(error.message);
            console.error('Error fetching appointments:', error);
        }
    };

    // Update appointment status
    const updateAppointmentStatus = async (id, newStatus) => {
        try {
            const response = await fetch(`http://127.0.0.1:5555/appointments/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: newStatus }),
            });
            if (!response.ok) {
                throw new Error(`Failed to update appointment status. Status: ${response.status}`);
            }
            await fetchAppointments();  // Refresh appointments after status update
        } catch (error) {
            setError(error.message);
            console.error('Error updating appointment status:', error);
        }
    };

    return (
        <div>
            <NavBar />
            <h1>Appointments</h1>
            {error && <p>Error: {error}</p>}

            {/* Display appointments */}
            {appointments.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Vehicle</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointments.map((appointment) => (
                            <tr key={appointment.id}>
                                <td>{appointment.id}</td>
                                <td>{appointment.vehicle ? appointment.vehicle.make : "N/A"}</td>
                                <td>{appointment.service_date}</td>
                                <td>{appointment.status}</td>
                                <td>
                                    <button
                                        onClick={() => updateAppointmentStatus(appointment.id, 'scheduled')}
                                        disabled={appointment.status === 'scheduled'}
                                    >
                                        Scheduled
                                    </button>
                                    <button
                                        onClick={() => updateAppointmentStatus(appointment.id, 'ongoing')}
                                        disabled={appointment.status === 'ongoing'}
                                    >
                                        Ongoing
                                    </button>
                                    <button
                                        onClick={() => updateAppointmentStatus(appointment.id, 'complete')}
                                        disabled={appointment.status === 'complete'}
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
    );
}

export default Appointments;

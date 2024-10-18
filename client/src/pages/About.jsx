import React, { useEffect, useState } from 'react';
import NavBar from '../components/Navbar';
import "../App.css"

const About = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch services from the API endpoint
        const fetchServices = async () => {
            try {
                const response = await fetch('http://127.0.0.1:5555/services'); // Adjust the endpoint as needed
                if (!response.ok) {
                    throw new Error(`Could not retrieve Services data! Status: ${response.status}`);
                }
                const data = await response.json();
                setServices(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchServices();
    }, []);

    if (loading) return <p className="text-center">Loading services...</p>;
    if (error) return <p className="text-danger text-center">Error: {error}</p>;

    return (
        <>
            <NavBar />
            <div className="container">
            <h1>About Us</h1>
    <header>
        <p>Welcome to Garage 66! We are dedicated to providing high-quality automotive services to our valued customers.</p>
    </header>

    <section className="mission">
        <h2>Our Mission</h2>
        <p>Our mission is to ensure your vehicle runs smoothly and safely, so you can enjoy peace of mind on the road.</p>
    </section>

    <section className="services">
        <h2>Our Services</h2>
        <div className="service-grid">
            {services.map((service) => (
                <div key={service.id} className="service-card">
                    <h3>{service.service_name}</h3>
                    <p>{service.description}</p>
                    <span className="service-price">Price: ${service.price}</span>
                </div>
            ))}
        </div>
    </section>

    <section className="team">
        <h2>Our Team</h2>
        <p>Our team consists of experienced and certified technicians who are passionate about automobiles...</p>
    </section>

    <section className="contact">
        <h2>Contact Us</h2>
        <p>If you have any questions or would like to schedule an appointment, reach us at <strong>info@garage66.com</strong>...</p>
        <h3>Visit Us</h3>
        <p><strong>123 Garage Lane, Nairobi City</strong></p>
    </section>
</div>

        </>
    );
};

export default About;

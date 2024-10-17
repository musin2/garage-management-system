import React, { useEffect, useState } from 'react';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import NavBar from '../components/Navbar';

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
        <NavBar/>

        <Container className="mt-5">
            <header className="text-center mb-4">
                <h1 className="display-4 font-weight-bold">About Us</h1>
                <p className="lead text-muted">
                    Welcome to Garage 66! We are dedicated to providing high-quality automotive services to our valued customers.
                </p>
            </header>

            <section className="mb-5">
                <h2 className="text-center">Our Mission</h2>
                <p className="text-center">
                    Our mission is to ensure your vehicle runs smoothly and safely, so you can enjoy peace of mind on the road.
                </p>
            </section>

            <section className="mb-5">
                <h2 className="text-center">Our Services</h2>
                <Row>
                    {services.map((service) => (
                        <Col md={4} key={service.id} className="mb-4">
                            <Card className="shadow-sm">
                                <Card.Body>
                                    <Card.Title className="font-weight-bold">{service.service_name}</Card.Title>
                                    <Card.Text>{service.description}</Card.Text>
                                    <Card.Footer className="bg-light border-top-0">
                                        <strong>Price: ${service.price}</strong>
                                        {/* <Button variant="info" className="float-end">Learn More</Button> */}
                                    </Card.Footer>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </section>

            <section className="mb-5">
                <h2 className="text-center">Our Team</h2>
                <p className="text-center">
                    Our team consists of experienced and certified technicians who are passionate about automobiles. We are committed to providing excellent customer service and ensuring your satisfaction with every visit.
                </p>
            </section>

            <section className="mb-5">
                <h2 className="text-center">Contact Us</h2>
                <p className="text-center">
                    If you have any questions or would like to schedule an appointment, feel free to reach out to us at <strong>info@garage66.com</strong> or call us at <strong>+254 703222333</strong>.
                </p>
                <h3 className="text-center">Visit Us</h3>
                <p className="text-center">
                    <strong>123 Garage Lane, Nairobi City</strong>
                </p>
            </section>
        </Container>
        </>
    );
};

export default About;

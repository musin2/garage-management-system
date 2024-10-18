import React, { useState, useEffect } from "react";
import NavBar from "../components/Navbar";
import "../css/service.css"; // Update the path to the correct location



function Services() {
  const [services, setServices] = useState([]);
  const [error, setError] = useState(null);
  const [newService, setNewService] = useState({
    service_name: "",
    description: "",
    price: "",
  });
  const [serviceToUpdate, setServiceToUpdate] = useState(null);
  const [updateService, setUpdateService] = useState({
    service_name: "",
    description: "",
    price: "",
  });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5555/services");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setServices(data);
    } catch (error) {
      setError(error.message);
      console.error("Error fetching services:", error);
    }
  };

  const handleAddService = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:5555/services", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newService),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      await fetchServices(); // Refresh the service list
      setNewService({ service_name: "", description: "", price: "" }); // Reset the form
    } catch (error) {
      console.error("Error adding service:", error);
    }
  };

  const handleDeleteService = async (id) => {
    try {
      const response = await fetch(`http://127.0.0.1:5555/services/${id}`, {
        method: "DELETE",
        credentials: "include", // This is crucial for sending cookies
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      await fetchServices(); // Refresh the service list
    } catch (error) {
      console.error("Error deleting service:", error);
    }
  };

  const handleUpdateService = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://127.0.0.1:5555/services/${serviceToUpdate}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateService),
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setServiceToUpdate(null);
      setUpdateService({ service_name: "", description: "", price: "" });
      await fetchServices(); // Refresh the service list
    } catch (error) {
      console.error("Error updating service:", error);
    }
  };

  return (
    <>
      <NavBar />
      <div className="container-lg pt-4">
        <h3 className="text-center">Services Offered</h3>
        {error && <p>Error: {error}</p>}
        <form onSubmit={handleAddService} className="form m-2">
          <div className="row">
            <div className="col-auto m-1">
              <input
                type="text"
                placeholder="Service Name"
                value={newService.service_name}
                onChange={(e) =>
                  setNewService({ ...newService, service_name: e.target.value })
                }
                required
                className="form-control"
              />
            </div>
            <div className="col-auto m-1">
              <input
                type="text"
                placeholder="Description"
                value={newService.description}
                onChange={(e) =>
                  setNewService({ ...newService, description: e.target.value })
                }
                required
                className="form-control"
              />
            </div>
            <div className="col-auto m-1">
              <input
                type="number"
                placeholder="Price"
                value={newService.price}
                onChange={(e) =>
                  setNewService({ ...newService, price: e.target.value })
                }
                required
                className="form-control"
              />
            </div>
            <div className="col-auto m-1">
              <button type="submit" className="btn-sm btn-outline-dark">
                Add Service
              </button>
            </div>
          </div>
        </form>

        {services.length > 0 ? (
          <table className="table bg-light">
            <thead>
              <tr>
                <th>ID</th>
                <th>Service Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {services.map((service) => (
                <tr key={service.id}>
                  <td>{service.id}</td>
                  <td>{service.service_name}</td>
                  <td>{service.description}</td>
                  <td>{service.price}</td>
                  <td className="p-1">
                    <button
                      onClick={() => {
                        setServiceToUpdate(service.id);
                        setUpdateService({
                          service_name: service.service_name,
                          description: service.description,
                          price: service.price,
                        });
                      }}
                      className="btn-sm text-info m-1"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDeleteService(service.id)}
                      className="btn-sm text-danger m-1"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No services found.</p>
        )}

        {serviceToUpdate && (
          <form onSubmit={handleUpdateService} className="form">
            <div className="row">
              <div className="col-auto m-1">
                <input
                  type="text"
                  placeholder="Service Name"
                  value={updateService.service_name}
                  onChange={(e) =>
                    setUpdateService({
                      ...updateService,
                      service_name: e.target.value,
                    })
                  }
                  required
                  className="form-control"
                />
              </div>
              <div className="col-auto m-1">
                <input
                  type="text"
                  placeholder="Description"
                  value={updateService.description}
                  onChange={(e) =>
                    setUpdateService({
                      ...updateService,
                      description: e.target.value,
                    })
                  }
                  required
                  className="form-control"
                />
              </div>
              <div className="col-auto m-1">
                <input
                  type="number"
                  placeholder="Price"
                  value={updateService.price}
                  onChange={(e) =>
                    setUpdateService({
                      ...updateService,
                      price: e.target.value,
                    })
                  }
                  required
                  className="form-control"
                />
              </div>
              <div className="col-auto m-1">
                <button type="submit" className="btn btn-outline-dark">
                  Update Service
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </>
  );
}

export default Services;

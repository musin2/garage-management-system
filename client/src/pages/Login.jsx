import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import "../css/register.css"; // Update the path to the correct location
import axios from "axios";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Login = ({ setRole }) => {
  const navigate = useNavigate();

  // Validation schema using Yup
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = (values, { setSubmitting, setStatus }) => {
    axios
      .post("http://127.0.0.1:5555/login", values, { withCredentials: true })
      .then((response) => {
        console.log(response.data);

        setRole(response.data.role);
        localStorage.setItem("userRole", response.data.role);
        Cookies.set("user_id", response.data.id, { expires: 7 });
        Cookies.set("user_name", response.data.name, { expires: 7 });
        Cookies.set("user_email", response.data.email, { expires: 7 });
        Cookies.set("user_phone", response.data.phone_number, { expires: 7 });
        Cookies.set("user_role", response.data.role, { expires: 7 });
        alert(response.data.message);
        navigate("/home");
      })
      .catch((error) => {
        const errorMessage = error.response?.data?.error || "Login failed";
        setStatus({ error: errorMessage });
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-90">
      <div className="col-md-4 shadow p-4 rounded bg-light">
        <h2 className="text-center mb-4 text-info">Login</h2>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, status }) => (
            <Form className="form">
              {status?.error && <div className="alert alert-danger">{status.error}</div>}
              
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <Field 
                  type="email" 
                  name="email" 
                  className="form-control" 
                  id="email" 
                  placeholder="email" 
                />
                <ErrorMessage name="email" component="div" className="text-danger" />
              </div>
              
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <Field 
                  type="password" 
                  name="password" 
                  className="form-control" 
                  id="password" 
                  placeholder="password" 
                />
                <ErrorMessage name="password" component="div" className="text-danger" />
              </div>
              
              {/* Center the button */}
              <div className="d-flex justify-content-center">
                <button 
                  type="submit" 
                  className="btn btn-info" 
                  disabled={isSubmitting}
                >
                  Login
                </button>
              </div>
            </Form>
          )}
        </Formik>
        <div className="text-center mt-3">
          <p>Don't have an account?</p>
        </div>
      </div>
    </div>
  );
};

export default Login;

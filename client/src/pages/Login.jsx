import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
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
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <div className="col-md-4">
        <h2 className="text-center">Login</h2>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, status }) => (
            <Form className="form-inline">
              {status?.error && <div className="alert alert-danger">{status.error}</div>}
              
              <div className="form-group mb-2">
                <label htmlFor="email" className="sr-only">Email</label>
                <Field 
                  type="email" 
                  name="email" 
                  className="form-control mr-sm-2" 
                  id="email" 
                  placeholder="Email" 
                />
                <ErrorMessage name="email" component="div" className="text-danger" />
              </div>
              
              <div className="form-group mx-sm-3 mb-2">
                <label htmlFor="password" className="sr-only">Password</label>
                <Field 
                  type="password" 
                  name="password" 
                  className="form-control" 
                  id="password" 
                  placeholder="Password" 
                />
                <ErrorMessage name="password" component="div" className="text-danger" />
              </div>
              
              {/* Center the button */}
              <div className="d-flex justify-content-center">
                <button 
                  type="submit" 
                  className="btn btn-primary mb-2" 
                  disabled={isSubmitting}
                >
                  Login
                </button>
              </div>
            </Form>
          )}
        </Formik>
        <div className="text-center mt-3">Sign up instead?</div>
      </div>
    </div>
  );
  
};

export default Login;

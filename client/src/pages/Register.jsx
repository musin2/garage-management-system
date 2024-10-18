import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";


const Register = ({ setRole }) => {
  const navigate = useNavigate();

  // Validation schema using Yup
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone_number: Yup.string()
      .matches(/^\d+$/, "Phone number must only contain digits")
      .min(10, "Phone number must be at least 10 digits")
      .max(15, "Phone number cannot exceed 15 digits")
      .required("Phone number is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    role: Yup.string()
      .oneOf(["customer", "admin"], "Invalid role")
      .required("Role is required"),
  });

  const handleSubmit = (values, { setSubmitting, setStatus }) => {
    axios
      .post("http://127.0.0.1:5555/register", values)
      .then((response) => {
        alert(response.data.message);
        setStatus({ success: true });
        setRole(response.data.role);
        localStorage.setItem('userRole', response.data.role); // Store role in local storage
        Cookies.set("user_id", response.data.id, { expires: 7 });
        Cookies.set("user_name", response.data.name, { expires: 7 });
        Cookies.set("user_email", response.data.email, { expires: 7 });
        Cookies.set("user_phone", response.data.phone_number, { expires: 7 });
        Cookies.set("user_role", response.data.role, { expires: 7 });
        navigate("/home");
      })
      .catch((error) => {
        const errorMessage = error.response?.data?.error || "Registration failed"; // Updated error handling
        setStatus({
          error: errorMessage,
        });
      })
      .finally(() => {
        setSubmitting(false);
      });
};

  return (
    <div className="container-md d-flex justify-content-center">
      <div className="col-md-8">
        <h2 className="text-center mb-4">Register</h2>
        <Formik
          initialValues={{
            name: "",
            email: "",
            phone_number: "",
            password: "",
            role: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, status }) => (
            <Form className="form">
              {status?.error && <div className="alert alert-danger">{status.error}</div>}
              {status?.success && (
                <div className="alert alert-success">Registration successful!</div>
              )}

              <div className="row mb-3">
                <div className="col-md-2">
                  <label htmlFor="name">Name</label>
                </div>
                <div className="col-md-10">
                  <Field
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Enter Your Name"
                  />
                  <ErrorMessage name="name" component="div" className="text-danger" />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-2">
                  <label htmlFor="email">Email</label>
                </div>
                <div className="col-md-10">
                  <Field
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="name@provider.com"
                  />
                  <ErrorMessage name="email" component="div" className="text-danger" />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-2">
                  <label htmlFor="phone_number">Phone Number</label>
                </div>
                <div className="col-md-10">
                  <Field
                    type="text"
                    name="phone_number"
                    className="form-control"
                    placeholder="Enter Your Mobile Number"
                  />
                  <ErrorMessage name="phone_number" component="div" className="text-danger" />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-2">
                  <label htmlFor="password">Password</label>
                </div>
                <div className="col-md-10">
                  <Field
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="Enter Your Password"
                  />
                  <ErrorMessage name="password" component="div" className="text-danger" />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-2">
                  <label htmlFor="role">Role</label>
                </div>
                <div className="col-md-4">
                  <Field as="select" name="role" className="form-control form-select">
                    <option value="">Select role</option>
                    <option value="customer">Customer</option>
                    <option value="admin">Admin</option>
                  </Field>
                  <ErrorMessage name="role" component="div" className="text-danger" />
                </div>
              </div>

              <div className="d-flex justify-content-center">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isSubmitting}
                >
                  Register
                </button>
              </div>
            </Form>
          )}
        </Formik>
        <div className="text-center mt-3">
          <p>
            Already have an account? <span>Sign in</span>.
          </p>
        </div>
      </div>
    </div>
  );

};

export default Register;

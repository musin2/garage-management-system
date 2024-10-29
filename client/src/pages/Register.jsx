import React from "react";
import "../css/register.css"; // Update the path to the correct location
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Register = ({ setRole }) => {
  const navigate = useNavigate();

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
      .post("https://garage-backend-59fg.onrender.com/register", values)
      .then((response) => {
        alert(response.data.message);
        setStatus({ success: true });
        setRole(response.data.role);
        localStorage.setItem('userRole', response.data.role);
        Cookies.set("user_id", response.data.id, { expires: 7 });
        Cookies.set("user_name", response.data.name, { expires: 7 });
        Cookies.set("user_email", response.data.email, { expires: 7 });
        Cookies.set("user_phone", response.data.phone_number, { expires: 7 });
        Cookies.set("user_role", response.data.role, { expires: 7 });
        navigate("/home");
      })
      .catch((error) => {
        const errorMessage = error.response?.data?.error || "Registration failed";
        setStatus({
          error: errorMessage,
        });
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-90">
      <div className="col-md-6 shadow p-4 rounded bg-light">
        <h1 className="text-center mb-6 text-info">WELCOME TO GARAGE 66</h1>
        <h2 className="text-center mb-4 text-info">Register</h2>
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

              {/* Repeated fields styled uniformly */}
              {["name", "email", "phone_number", "password"].map((field, index) => (
                <div className="mb-3" key={index}>
                  <label htmlFor={field} className="form-label">{field.replace('_', ' ').toUpperCase()}</label>
                  <Field
                    type={field === "password" ? "password" : "text"}
                    name={field}
                    className="form-control"
                    placeholder={`Enter Your ${field.replace('_', ' ')}`}
                  />
                  <ErrorMessage name={field} component="div" className="text-danger" />
                </div>
              ))}

              <div className="mb-3">
                <label htmlFor="role" className="form-label">Role</label>
                <Field as="select" name="role" className="form-select">
                  <option value="">Select role</option>
                  <option value="customer">Customer</option>
                  <option value="admin">Admin</option>
                </Field>
                <ErrorMessage name="role" component="div" className="text-danger" />
              </div>

              <div className="d-flex justify-content-center">
                <button
                  type="submit"
                  className="btn btn-info"
                  disabled={isSubmitting}
                >
                  Register
                </button>
              </div>
            </Form>
          )}
        </Formik>
        <div className="text-center mt-3">
          <p>Already have an account?</p>
        </div>
      </div>
    </div>
  );
};

export default Register;

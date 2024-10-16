import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';

const Register = ({setRole}) => {
  // Validation schema using Yup
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    phone_number: Yup.string()
    .matches(/^\d+$/, 'Phone number must only contain digits')
    .min(10, 'Phone number must be at least 10 digits')
    .max(15, 'Phone number cannot exceed 15 digits')
    .required('Phone number is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    role: Yup.string().oneOf(['customer', 'admin'], 'Invalid role').required('Role is required'),
  });

  const handleSubmit = (values, { setSubmitting, setStatus }) => {
    axios
      .post('http://127.0.0.1:5555/register', values)
      .then(response => {
        alert(response.data.message);
        setStatus({ success: true });
        setRole(response.data.role);
        navigate('/appointments')
      })
      .catch(error => {
        setStatus({ error: error.response.data.error || 'Registration failed' });
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <div>
      <h2>Register</h2>
      <Formik
        initialValues={{ name: '', email: '', phone_number: '', password: '', role: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, status }) => (
          <Form>
            {status?.error && <div className="error">{status.error}</div>}
            {status?.success && <div className="success">Registration successful!</div>}

            <div>
              <label htmlFor="name">name</label>
              <Field type="text" name="name" />
              <ErrorMessage name="name" component="div" />
            </div>

            <div>
              <label htmlFor="email">Email</label>
              <Field type="email" name="email" />
              <ErrorMessage name="email" component="div" />
            </div>

            <div>
              <label htmlFor="phone_number">Phone Number</label>
              <Field type="text" name="phone_number" />
              <ErrorMessage name="phone_number" component="div" />
            </div>

            <div>
              <label htmlFor="password">Password</label>
              <Field type="password" name="password" />
              <ErrorMessage name="password" component="div" />
            </div>

            <div>
              <label htmlFor="role">Role (customer/admin)</label>
              <Field as="select" name="role">
                <option value="">Select role</option>
                <option value="customer">Customer</option>
                <option value="admin">Admin</option>
              </Field>
              <ErrorMessage name="role" component="div" />
            </div>

            <button type="submit" disabled={isSubmitting}>Register</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Register;

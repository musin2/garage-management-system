import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Login = ({ setRole }) => {
    const navigate = useNavigate();

    // Validation schema using Yup
    const validationSchema = Yup.object().shape({
      email: Yup.string().email('Invalid email').required('Email is required'),
      password: Yup.string().required('Password is required'),
    });

    const handleSubmit = (values, { setSubmitting, setStatus }) => {
      axios
        .post('http://127.0.0.1:5555/login', values, { withCredentials: true })
        .then(response => {
          console.log(response.data)
          
          setRole(response.data.role);
          localStorage.setItem('userRole', response.data.role); 
          Cookies.set('user_id', response.data.id,{expires: 7});
          Cookies.set('user_name', response.data.name,{expires: 7});
          Cookies.set('user_email', response.data.email,{expires: 7});
          Cookies.set('user_phone', response.data.phone_number,{expires: 7});
          alert(response.data.message);
          navigate('/home'); 
        })
        .catch(error => {
          const errorMessage = error.response?.data?.error || 'Login failed';
          setStatus({ error: errorMessage });
        })
        .finally(() => {
          setSubmitting(false);
        });
    };

    return (
      <div>
        <h2>Login</h2>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, status }) => (
            <Form>
              {status?.error && <div className="error">{status.error}</div>}
              <div>
                <label htmlFor="email">Email</label>
                <Field type="email" name="email" />
                <ErrorMessage name="email" component="div" />
              </div>
              <div>
                <label htmlFor="password">Password</label>
                <Field type="password" name="password" />
                <ErrorMessage name="password" component="div" />
              </div>
              <button type="submit" disabled={isSubmitting}>Login</button>
            </Form>
          )}
        </Formik>
        <div>Sign up instead?</div>
      </div>
    );
};

export default Login;

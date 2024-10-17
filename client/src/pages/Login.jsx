import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import { useNavigate } from "react-router-dom";

const Login = ({setRole}) => {

    const navigate = useNavigate();
  // Validation schema using Yup
  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const handleSubmit = (values, { setSubmitting, setStatus }) => {
    axios
      .post('http://127.0.0.1:5555/login', values)
      .then(response => {
        setRole(response.data.role);
        alert(response.data.message);
        navigate('/home')
      })
      .catch(error => {
        console.error('Login error:', error); // Log the entire error object
        const errorMessage = error.response?.data?.error || 'Login failed';
        setStatus({ error: errorMessage });

    })    
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <div>
      <h2 className='text-center'>Login</h2>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, status }) => (
          <div className="container-md">
          <Form className='form'>
            {status?.error && <div className="error">{status.error}</div>}

            <div className='row m-2'>
              <div className="col-2">
              <label htmlFor="email">Email</label>
              </div>
              <div className="col-7">
              <Field type="email" name="email" className='form-control' placeholder='Enter Email Address'/>
              </div>
              <ErrorMessage name="email" component="div" />
            </div>

            <div className='row m-2'>
              <div className="col-2">
              <label htmlFor="password" >Password</label>
              </div>
              <div className="col-7">
              <Field type="password" name="password" placeholder='Enter Password' className='form-control'/>
              </div>
              <ErrorMessage name="password" component="div" />
            </div>

            <button type="submit" disabled={isSubmitting} className='btn-lg btn-info m-2 text-center'>Login</button>
          </Form>
          </div>
        )}
      </Formik>
    </div>
  );
};

export default Login;

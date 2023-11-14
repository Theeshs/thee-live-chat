import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../services/firebase';
import '../styles/login.css';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  /** user sign in component for handling the logins */
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const loginUser = (email: string, password: string) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((loginResult) => {
        debugger;
        const user = loginResult.user;
        console.log(user);
        navigate('/home');
      })
      .catch((err) => {
        debugger;
        console.log(err);
      });
  };

  const handleInputChange = (name: string, value: any) => {
    // handling the user inputs in the login form field
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: any) => {
    // handling the user login form submit
    e.preventDefault();
    loginUser(formData.email, formData.password);
  };
  return (
    <div className='Auth-form-container'>
      <form className='Auth-form'>
        <div className='Auth-form-content'>
          <h3 className='Auth-form-title'>Sign In</h3>
          <div className='form-group mt-3'>
            <label>Email address</label>
            <input
              type='email'
              className='form-control mt-1'
              placeholder='Enter email'
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
            />
          </div>
          <div className='form-group mt-3'>
            <label>Password</label>
            <input
              type='password'
              className='form-control mt-1'
              placeholder='Enter password'
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
            />
          </div>
          <div className='d-grid gap-2 mt-3'>
            <button
              type='submit'
              className='btn btn-primary'
              onClick={(e) => handleSubmit(e)}
            >
              Login
            </button>
          </div>
          <a href='/signup'>Sign Up</a>
        </div>
      </form>
    </div>
  );
};

export default Login;

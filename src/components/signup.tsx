import React, { useState } from 'react';
import { auth, db } from '../services/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore';

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const handleInputChange = (name: string, value: any) => {
    // handling the input of the registration filed and store those in the state variable
    setFormData({ ...formData, [name]: value });
  };

  const saveUserToFirestore = (user: { email: string; userId: string }) => {
    // saving the user in to firebase firstore
    setDoc(doc(db, 'user', user.email), user);
  };

  const signupUser = (email: string, password: string): void => {
    /** signup functio for the user. user will be creating in the firebase authentication */
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // User signed up successfully
        const user = userCredential.user;
        const saveData = {
          email: user.email ? user.email : '',
          userId: user.uid ? user.uid : '',
        };
        saveUserToFirestore(saveData);
        console.log('User created:', user);
        navigate('/login');

        // You can do something after the user is signed up
      })
      .catch((error: { code: string; message: string }) => {
        // Handle errors during sign-up
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error('Error:', errorCode, errorMessage);
      });
  };

  const handleSubmit = (e: any) => {
    // signup submit handler. will invoke the user signup function the the form subimit
    e.preventDefault();
    signupUser(formData.email, formData.password);
  };
  return (
    <div className='Auth-form-container'>
      <form className='Auth-form'>
        <div className='Auth-form-content'>
          <h3 className='Auth-form-title'>Sign Up</h3>
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
              Sign Up
            </button>
          </div>
          <a href='/login'>Sign In</a>
        </div>
      </form>
    </div>
  );
};

export default Signup;

import React from "react";
import {auth} from "../services/firebase"
import {createUserWithEmailAndPassword } from "firebase/auth";



const signupUser = (email: string, password: string): void => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // User signed up successfully
      debugger
      const user = userCredential.user;
      debugger
      console.log('User created:', user);
      debugger
      // You can do something after the user is signed up
    })
    .catch((error: { code: string, message: string }) => {
      // Handle errors during sign-up
      debugger
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error('Error:', errorCode, errorMessage);
    });
}

const Signup: React.FC = () => {
    signupUser("sajaniwijesekara+123213@gmail.com", "19951122V@n")

    return (
        <h1>Signup</h1>

    )
}

export default Signup
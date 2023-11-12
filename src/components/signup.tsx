import React from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";




createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });
const Signup: React.FC = () => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, "sajaniwijesekara@gmail.com", "19951122V@n")
    return (
        <h1>Signup</h1>
    )
}

export default Signup
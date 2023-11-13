import React from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import {auth} from "../services/firebase"



const loginUser = (email: string, password: string) => {
    signInWithEmailAndPassword(auth, email, password)
    .then((loginResult) => {
        debugger
        const user = loginResult.user;
        console.log(user)
    }).catch((err) => {
        debugger
        console.log(err)
    })
}
const Login: React.FC = () => {
    loginUser("sajaniwijesekara+123213@gmail.com", "19951122V@n")
    return (
        <h2>
            Login
        </h2>
    )
}

export  default  Login
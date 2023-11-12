import React from "react";
import Login from "../components/login";
import {Routes as Router, Route} from "react-router-dom";
import Home from "../components/home";
import Signup from "../components/signup";

type Props = {}

const Routes = (props: Props) => {
    return (
        <Router>
            <Route index path="/login" element={<Login />}/>
            <Route index path="/signup" element={<Signup />}/>
            <Route path="/home" element={<Home />} />
        </Router>
    )
}

export  default  Routes
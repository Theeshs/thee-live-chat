import React from 'react';
import {realtimeDb} from "../services/firebase";
import { ref, set } from "firebase/database";


const sendMessage = () => {
    debugger
    set(ref(realtimeDb, "chats"), {
        "message": "Test",
        "recievedBy": "Thee",
        "sentBy": "Janiee",
        "sentTime": "November 13, 2023 at 12:00:00 AM UTC+8"
    })
}

const Home = () => {
    sendMessage()
    return (
        <h2>
            Regist
        </h2>
        )
}

export  default  Home
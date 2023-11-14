import React, { useEffect, useState } from 'react';

import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import ChatBox from './chatbox';
import Navbar from './navbar';
import { auth } from '../services/firebase';

type MsgObject = {
  message: string;
  recievedBy: string;
  sentBy: string;
  sentTime: string;
};

const Home = () => {
  /** the home componet, will be work as the main UI for the chat users and the chat boxes */
  const navigate = useNavigate();
  const [userData, setUserData] = useState({ email: '', userId: '' });
  const [messages, setMessages] = useState<MsgObject[]>([]);

  useEffect(() => {
    // we are using the useEffect hook inorder to manage the auth state of the login user here
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const email = user.email ? user.email : '';
        const userId = user.uid ? user.uid : '';
        setUserData({
          email: email,
          userId: userId,
        });
      } else {
        navigate('/login');
      }
    });
  }, [navigate]);

  return (
    <div>
      <Navbar />
      <div className='row'></div>
      <div className='container mt-10'>
        <div className='row mt-10'>
          <ChatBox user={userData} messages={messages} />
        </div>
      </div>
    </div>
  );
};

export default Home;

import React, { useEffect, useState } from 'react';
import { ref, set, onValue } from 'firebase/database';
import { realtimeDb, db } from '../services/firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import RecievedMsg from './recievedMsg';
import SentMsg from './sentMessage';
import avater from '../images/avatar.png';

type MsgObject = {
  message: string;
  recievedBy: string;
  sentBy: string;
  sentTime: string;
};

type propObject = {
  user: {
    email: string;
    userId: string;
  };
  messages?: MsgObject[];
};

const ChatBox: React.FC<propObject> = (props) => {
  // chat box component for sending the chats. will now show until user click on the another user.
  // once clieck on the user, it will load along with the older messages
  type userObject = {
    email: string;
    userId: string;
  };
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<MsgObject[]>([]);
  const [allUsers, setAllUsers] = useState<userObject[]>([]);
  const userObjectsData: userObject[] = [];
  const [who, setWho] = useState('');
  const [msgToShow, UpdateMessageToShow] = useState<MsgObject[]>([]);

  const handleMessage = (msg: string) => {
    setMessage(msg);
  };

  useEffect(() => {
    // in order to fetch the registred users in a realtime manner we are using the following onSnapshot listner and fetch the users
    onSnapshot(
      collection(db, 'user'),
      (snapshot) => {
        snapshot.docs.forEach((doc) => {
          const udata = doc.data();
          const isObjectInArray = userObjectsData.some(
            (obj) => obj.email === udata.email
          );
          if (!isObjectInArray) {
            userObjectsData.push({ email: udata.email, userId: udata.userId });
          }
        });
        setAllUsers(userObjectsData);
      },
      (error) => {
        debugger;
      }
    );

    const chatRef = ref(realtimeDb, `chats`);

    // onValue will fetch the data from realtime database when there's a change happens to the realtime database data
    onValue(chatRef, (snapshot) => {
      let data: MsgObject[] = snapshot.val();
      data = data ? data : [];
      setMessages(data);
      if (who) {
        if (data.length > 0) {
          const updateData: MsgObject[] = [];
          data.forEach((item) => {
            if (item.sentBy === props.user.email && item.recievedBy === who) {
              updateData.push(item);
            } else if (
              item.sentBy === who &&
              item.recievedBy === props.user.email
            ) {
              updateData.push(item);
            }
          });
          UpdateMessageToShow(updateData);
        }
      }
    });
  }, [who, props, userObjectsData]);

  const sendMessage = (e: any) => {
    // msg sending funciton, will send the message to firebase realtime database
    e.preventDefault();
    messages.push({
      message: message,
      recievedBy: who,
      sentBy: props.user.email,
      sentTime: new Date().toLocaleString(),
    });
    set(ref(realtimeDb, `chats`), messages);
    setMessage('');
  };

  const updateWho = (who: string) => {
    setWho(who);
  };

  const searchUser = (e: any) => {
    // user serch function here
    e.preventDefault();
    if (allUsers && allUsers.length > 0) {
      let allU = allUsers.filter((user) =>
        user.email.startsWith(e.target.value)
      );
      setAllUsers(allU);
    }
  };

  return (
    <div className='row'>
      <div className='col-md-6 col-lg-5 col-xl-4 mb-4 mb-md-0 m-15'>
        <h5 className='font-weight-bold mb-3 text-center text-lg-start'>
          Member
          <br />
          <input
            onChange={(e) => searchUser(e)}
            type='text'
            placeholder='search user by email'
          />
        </h5>
        <div className='card'>
          <div className='card-body'>
            <ul className='list-unstyled mb-0'>
              {allUsers.map((userItem, userIndex) =>
                userItem.email !== props.user.email &&
                userItem.userId !== props.user.userId ? (
                  <li
                    key={userIndex}
                    onClick={() => {
                      updateWho(userItem.email);
                    }}
                    className='p-2 border-bottom'
                  >
                    <a className='d-flex justify-content-between'>
                      <div className='d-flex flex-row'>
                        <img
                          src={avater}
                          alt='avatar'
                          className='rounded-circle d-flex align-self-center me-3 shadow-1-strong'
                          width='60'
                        />
                        <div className='pt-1'>
                          <p className='fw-bold mb-0'>{userItem.email}</p>
                        </div>
                      </div>
                    </a>
                  </li>
                ) : (
                  <></>
                )
              )}
            </ul>
          </div>
        </div>
      </div>
      {who ? (
        <div className='col-md-6 col-lg-7 col-xl-8 mt-15'>
          <ul className='list-unstyled'>
            {msgToShow.map((item, index) =>
              item.sentBy === props.user.email ? (
                <RecievedMsg key={index} msgObject={item} />
              ) : (
                <SentMsg key={index} msgObject={item} />
              )
            )}
            <li className='bg-white mb-3'>
              <div className='form-outline'>
                <textarea
                  value={message}
                  className='form-control'
                  id='textAreaExample2'
                  rows={4}
                  onChange={(e) => handleMessage(e.target.value)}
                ></textarea>
                <label className='form-label'>Message</label>
              </div>
            </li>
            <button
              type='button'
              className='btn btn-info btn-rounded float-end'
              onClick={(e) => sendMessage(e)}
            >
              Send
            </button>
          </ul>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default ChatBox;

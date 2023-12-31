import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

/** all the firebase configs have added here. should confiig data and the secrets from the .env file.
 * but with the time being hard corded the values here for make it easy. will be revoke the data in a while.
 * in case if the project is not working, please make sure to create a firebase app and provide the relavent details here 
 */

const firebaseConfig = {
    apiKey: "AIzaSyBdWYw4mnZUaBdUZMIjSoFKURDdfFu6c2E",
    authDomain: "thee-chat-fe605.firebaseapp.com",
    databaseURL: "https://thee-chat-fe605-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "thee-chat-fe605",
    storageBucket: "thee-chat-fe605.appspot.com",
    messagingSenderId: "686731211031",
    appId: "1:686731211031:web:568329987508c0666a0752",
    measurementId: "G-Z800GB38XJ"
};

// initializing the firbase app, auth module, realtimedb and firestore
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app);

export const realtimeDb = getDatabase(app)
// export {auth}


// export const signupUser = (email: string, password: string): void => {
//     createUserWithEmailAndPassword(auth, email, password)
//       .then((userCredential) => {
//         // User signed up successfully
//         const user = userCredential.user;
//         console.log('User created:', user);
//         // You can do something after the user is signed up
//       })
//       .catch((error: { code: string, message: string }) => {
//         // Handle errors during sign-up
//         const errorCode = error.code;
//         const errorMessage = error.message;
//         console.error('Error:', errorCode, errorMessage);
//       });
//   }


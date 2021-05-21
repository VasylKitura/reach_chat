import React, {createContext} from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import firebase from "firebase";
import 'firebase/firestore';
import 'firebase/auth';

  firebase.initializeApp({
    apiKey: "AIzaSyBYj24TuH3rHEDg4_NjcTehOw4HUF6iLWg",
    authDomain: "chat-react-9967d.firebaseapp.com",
    projectId: "chat-react-9967d",
    storageBucket: "chat-react-9967d.appspot.com",
    messagingSenderId: "858280817092",
    appId: "1:858280817092:web:263cf98afa454e776ab491",
    measurementId: "G-W6T4Y2RCNQ"
  });

export const Context = createContext(null)

const auth = firebase.auth()
const firestore = firebase.firestore()


ReactDOM.render(
    <Context.Provider value={{
        firebase,
        auth,
        firestore
    }}>
        <App />
    </Context.Provider>,
  document.getElementById('root')
);


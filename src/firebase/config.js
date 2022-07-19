import * as firebase from 'firebase';
import '@firebase/auth';
import "firebase/firestore"
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyBnd34cACcJExD6ffPv9qWRGM4M6hD0eNM",
  authDomain: "vet-med.firebaseapp.com",
  projectId: "vet-med",
  storageBucket: "vet-med.appspot.com",
  messagingSenderId: "300099450571",
  appId: "1:300099450571:web:a919f4d3c1aa3c8b018d4e"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();
export {
  firebase,
  db,
  getAuth
};

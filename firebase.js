// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDjx_wM8ixw1X9Zm92ROnc0rO5fxhtRDGQ",
  authDomain: "auth-firebase-c4d7e.firebaseapp.com",
  projectId: "auth-firebase-c4d7e",
  storageBucket: "auth-firebase-c4d7e.appspot.com",
  messagingSenderId: "1056337579961",
  appId: "1:1056337579961:web:ce4bb55214fe09f2897068"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore();


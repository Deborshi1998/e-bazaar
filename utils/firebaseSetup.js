// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, initializeAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_AP_APIKEY,
  authDomain: "e-com-5bd83.firebaseapp.com",
  projectId: "e-com-5bd83",
  storageBucket: "e-com-5bd83.appspot.com",
  messagingSenderId: process.env.NEXT_PUBLIC_AP_MESSAGESENDERID,
  appId: process.env.NEXT_PUBLIC_AP_APPID,
  measurementId: "G-PBV6YEMF4J",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

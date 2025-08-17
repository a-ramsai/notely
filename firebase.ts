// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAuhWgdlJXNWRqw9JpDeHi6OfvbGGRLcns",
  authDomain: "notely-608b0.firebaseapp.com",
  projectId: "notely-608b0",
  storageBucket: "notely-608b0.firebasestorage.app",
  messagingSenderId: "958367213264",
  appId: "1:958367213264:web:f571285cf6752a226a20d5"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

const db = getFirestore(app);

export {db};

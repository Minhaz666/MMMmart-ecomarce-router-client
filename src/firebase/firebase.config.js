// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAaNYIOzeDdvK2RPUxNsR9926REPl9nv1Q",
  authDomain: "mmm-mart.firebaseapp.com",
  projectId: "mmm-mart",
  storageBucket: "mmm-mart.appspot.com",
  messagingSenderId: "543096635459",
  appId: "1:543096635459:web:f0eba47e7203becb1a14f6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Directly put your Firebase config here
const firebaseConfig = {
  apiKey: "AIzaSyBkSpUbz81L3BwfzYzl0-u1RnkablcNNyM",
  authDomain: "pro-fast-87db5.firebaseapp.com",
  projectId: "pro-fast-87db5",
  storageBucket: "pro-fast-87db5.appspot.com",
  messagingSenderId: "229907374792",
  appId: "1:229907374792:web:6e4c1edecd63a2fd7b7bfd",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export auth
export const auth = getAuth(app);
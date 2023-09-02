// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCFqrGy2ppjzJ8iMKO8Ju4mPwwkui0spBA",
  authDomain: "chat-app-15cab.firebaseapp.com",
  projectId: "chat-app-15cab",
  storageBucket: "chat-app-15cab.appspot.com",
  messagingSenderId: "930603532974",
  appId: "1:930603532974:web:8d4de9aa31a23098d4233f",
  measurementId: "G-91Y5JVGKDJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth()
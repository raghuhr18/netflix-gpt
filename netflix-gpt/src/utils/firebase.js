// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
import { getAuth } from "firebase/auth";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC6kqM5CO7hwXWVYFObXQ2LMQWlQqq_H0E",
  authDomain: "netflix-gpt-53c7b.firebaseapp.com",
  projectId: "netflix-gpt-53c7b",
  storageBucket: "netflix-gpt-53c7b.appspot.com",
  messagingSenderId: "857814224806",
  appId: "1:857814224806:web:438d711bf45ceb81fb0967",
  measurementId: "G-MTCXV76F04"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
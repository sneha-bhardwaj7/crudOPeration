// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBpdgIgOOEwqk_FEeaO_dRl09uvjlqAGdk",
  authDomain: "crud-operation-88732.firebaseapp.com",
  projectId: "crud-operation-88732",
  storageBucket: "crud-operation-88732.firebasestorage.app",
  messagingSenderId: "121137599943",
  appId: "1:121137599943:web:46fd685b1e2327f82d75e2",
  measurementId: "G-8GEH1J87WQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getFirestore(app);
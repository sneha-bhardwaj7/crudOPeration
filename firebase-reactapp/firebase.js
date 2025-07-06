import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDo7Q8ym92lIPz3qAPKSPpjqDn8PZ1hF1A",
  authDomain: "app-447aa.firebaseapp.com",
  projectId: "app-447aa",
  storageBucket: "app-447aa.appspot.com",
  messagingSenderId: "270160459393",
  appId: "1:270160459393:web:8f8458928ed70387e4ff80",
  measurementId: "G-7GCG0DK577",
  databaseURL: "https://app-447aa-default-rtdb.firebaseio.com"
};

export const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
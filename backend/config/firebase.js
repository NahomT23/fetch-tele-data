// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAmxGJvyLrQu9GkRG33qdipso2183_KcLI",
  authDomain: "fetch-tele-data.firebaseapp.com",
  projectId: "fetch-tele-data",
  storageBucket: "fetch-tele-data.firebasestorage.app",
  messagingSenderId: "706382227394",
  appId: "1:706382227394:web:9dd87fc75d0628b468d85b",
  measurementId: "G-P23B7KZY6K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app)
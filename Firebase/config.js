// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth, initializeAuth } from "firebase/auth";

// Solución async storage
import { getReactNativePersistence } from 'firebase/auth/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDZ2NjicyVAj6g4PW2XO-Da7plBtXC9_Xw",
  authDomain: "react-coder-ib.firebaseapp.com",
  projectId: "react-coder-ib",
  storageBucket: "react-coder-ib.appspot.com",
  messagingSenderId: "417717260288",
  appId: "1:417717260288:web:ecf5a27bd28a75361388e5",
  measurementId: "G-SH52G962G2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);


export const auth = initializeAuth(app, {

  persistence: getReactNativePersistence(AsyncStorage),

});

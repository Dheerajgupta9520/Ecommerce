// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import {getAuth} from 'firebase/auth'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyADcBTpRG6I_V1SN7anz-kDHxaZgIK6_ow",
  authDomain: "ecommerce-f113a.firebaseapp.com",
  projectId: "ecommerce-f113a",
  storageBucket: "ecommerce-f113a.firebasestorage.app",
  messagingSenderId: "8877854998",
  appId: "1:8877854998:web:bb4a9516eedafdbecc4037"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const fireDB = getFirestore(app);
const auth = getAuth(app);

export {fireDB,auth}
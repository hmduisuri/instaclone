// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";

import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCCPQRmQkMNIlcfSjfH30s6w82GYQ-5_No",
  authDomain: "my-instar.firebaseapp.com",
  projectId: "my-instar",
  storageBucket: "my-instar.appspot.com",
  messagingSenderId: "717586091493",
  appId: "1:717586091493:web:cd077a187f6dc4f1c7730c"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export { app, db, storage };
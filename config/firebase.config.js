// Import the functions you need from the SDKs you need
import { initializeApp,getApp,getApps} from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "unipeers-1be26.firebaseapp.com",
  projectId: "unipeers-1be26",
  storageBucket: "unipeers-1be26.firebasestorage.app",
  messagingSenderId: "1056065614871",
  appId: "1:1056065614871:web:1d06a0ad61c35373dc9852"
};

// Initialize Firebase
const app = getApps.length == 0?  initializeApp(firebaseConfig): getApp();
const db = getFirestore(app)

export { db}
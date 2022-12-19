// Import the functions you need from the SDKs you need
 
import { initializeApp } from "firebase/app" ;
 
import { getFirestore } from "firebase/firestore";
import {getAuth} from 'firebase/auth';
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDneLORy7eSQELT5mVNTSWoHdN8WH4V71M",
    authDomain: "miniecommerce-f64a8.firebaseapp.com",
    projectId: "miniecommerce-f64a8",
    storageBucket: "miniecommerce-f64a8.appspot.com",
    messagingSenderId: "154151691397",
    appId: "1:154151691397:web:f674509f71ec89987df5ec",
    databaseURL: "https://miniecommerce-f64a8-default-rtdb.firebaseio.com"
   
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);
const database = getDatabase(app);
 export default db;
export {app,auth,database};
// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import 'firebase/auth';
import { getAuth } from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDYrSjJ91a_tzKm2LSzGKM3FxJct_n2EC8",
    authDomain: "netflix-c8828.firebaseapp.com",
    projectId: "netflix-c8828",
    storageBucket: "netflix-c8828.appspot.com",
    messagingSenderId: "267856684164",
    appId: "1:267856684164:web:a6e648212e628d5576ced1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth()
export { auth }



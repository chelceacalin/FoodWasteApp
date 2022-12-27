// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCEm7rpgr4ZaVgH-birpohZzbnQB7mrsIE",
    authDomain: "proiecttw-84ef3.firebaseapp.com",
    projectId: "proiecttw-84ef3",
    storageBucket: "proiecttw-84ef3.appspot.com",
    messagingSenderId: "1071357979811",
    appId: "1:1071357979811:web:ebf723fcb2d9cf57342316",
    measurementId: "G-6Z66T13PV1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;
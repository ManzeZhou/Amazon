// For Firebase JS SDK v7.20.0 and later, measurementId is optional


import firebase from "firebase/compat/app";
import 'firebase/compat/firestore';
import 'firebase/compat/auth';





const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: "app-88a2a.firebaseapp.com",
    projectId: "app-88a2a",
    storageBucket: "app-88a2a.appspot.com",
    messagingSenderId: "497131790159",
    appId: "1:497131790159:web:f8e85875f96fc89e462f3a",
    measurementId: "G-C00WKGGL5E"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
export const db = firebaseApp.firestore();
export const auth = firebase.auth();



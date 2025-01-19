import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Paste your firebaseConfig from Firebase Console here
const firebaseConfig = {
    apiKey: "AIzaSyA8pduH66CMwlrAan5LcwM-oqi7yVH7e2k",
    authDomain: "summative-a066f.firebaseapp.com",
    projectId: "summative-a066f",
    storageBucket: "summative-a066f.firebasestorage.app",
    messagingSenderId: "982758322680",
    appId: "1:982758322680:web:33075ad3a250ec680ca60d"
};


const config = initializeApp(firebaseConfig)
const auth = getAuth(config);
const firestore = getFirestore(config);

export { auth, firestore };
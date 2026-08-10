import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyBdS8IWKwBVhGlx4OBse3Zd3d4ZUh1ZMXQ",
    authDomain: "projetofirebase-40cfd.firebaseapp.com",
    projectId: "projetofirebase-40cfd",
    storageBucket: "projetofirebase-40cfd.firebasestorage.app",
    messagingSenderId: "712586661792",
    appId: "1:712586661792:web:41a4c2613423c3c5a6dec5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
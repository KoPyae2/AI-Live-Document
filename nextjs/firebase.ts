import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyB4TjluZxG4N6a0udXkzEt-uudM6kGI5ds",
    authDomain: "notion-clone-edc0c.firebaseapp.com",
    projectId: "notion-clone-edc0c",
    storageBucket: "notion-clone-edc0c.appspot.com",
    messagingSenderId: "8853760338",
    appId: "1:8853760338:web:bb1d3d0fc81d08ffa4b28b",
    measurementId: "G-2NRZS8FSSY"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { db}
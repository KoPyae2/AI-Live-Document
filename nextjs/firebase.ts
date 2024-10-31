import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAIHHcfXjfh-75NoBfDlZgfEagzl7Yh2-8",
    authDomain: "ai-live-doc.firebaseapp.com",
    projectId: "ai-live-doc",
    storageBucket: "ai-live-doc.appspot.com",
    messagingSenderId: "33777423295",
    appId: "1:33777423295:web:fc4cab4ad50e2f1686870a"
  };

const app = initializeApp(firebaseConfig)
const db = getFirestore(app);

export { db }
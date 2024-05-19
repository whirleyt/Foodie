import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDo99EOnN10gHfMk7zlJkOAPUoH4-Xfq-0",
  authDomain: "foodie-8789a.firebaseapp.com",
  projectId: "foodie-8789a",
  storageBucket: "foodie-8789a.appspot.com",
  messagingSenderId: "292219347452",
  appId: "1:292219347452:web:ddeda1c874e818a2a41279"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };

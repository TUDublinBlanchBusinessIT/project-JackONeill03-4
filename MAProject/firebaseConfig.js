import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  "projectId": "mapro090",
  "appId": "1:531294576640:web:7c9d5b143c8ca6ce1ff8e5",
  "storageBucket": "mapro090.firebasestorage.app",
  "apiKey": "AIzaSyCrISXvTV4WhJPKhvZlE_F5XwrCBz-JoVA",
  "authDomain": "mapro090.firebaseapp.com",
  "messagingSenderId": "531294576640",
  "projectNumber": "531294576640",
  "version": "2"
}

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
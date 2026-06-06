import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC-zBM2l529UxH5WXFj0yAAh1DL-ZWXYkc",
  authDomain: "garde-ispv.firebaseapp.com",
  projectId: "garde-ispv",
  storageBucket: "garde-ispv.firebasestorage.app",
  messagingSenderId: "875913505584",
  appId: "1:875913505584:web:af8b465c67d9138d2bf6f5"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

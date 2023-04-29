// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAVr4HoL0w97dx_AEM9y-lkuXkfgo_-xrM",
  authDomain: "native-project-566fe.firebaseapp.com",
  projectId: "native-project-566fe",
  storageBucket: "native-project-566fe.appspot.com",
  messagingSenderId: "476726453405",
  appId: "1:476726453405:web:3a574f35f57ed9d7b06074",
  measurementId: "G-YKB40VWY2M",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
const db = getFirestore(app);

export default app;

import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA9dDoal98uPUH6jfbNp43q-swHbSJW_OU",
  authDomain: "rxpress-ed65a.firebaseapp.com",
  projectId: "rxpress-ed65a",
  storageBucket: "rxpress-ed65a.appspot.com",
  messagingSenderId: "943774530351",
  appId: "1:943774530351:web:28abea656687f4b637ffda",
  measurementId: "G-PPNBS20YSR"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

/*createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  }); */

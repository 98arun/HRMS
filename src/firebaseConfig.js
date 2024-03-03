// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyByttyY7-pSTsblCkhzlDC15uqGZzBrqDQ",
  authDomain: "hrms-de004.firebaseapp.com",
  projectId: "hrms-de004",
  storageBucket: "hrms-de004.appspot.com",
  messagingSenderId: "683713613507",
  appId: "1:683713613507:web:55d539feb093be78c95c76"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export default auth;
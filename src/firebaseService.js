import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getDatabase, ref, set, onValue, off } from "firebase/database";
import { auth } from "./firebaseConfig";
import { signOut } from "firebase/auth";

// Firebase Realtime Database
const db = getDatabase();

export const createUser = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

export const signInUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    await signOut(auth);
    console.log("User signed out successfully.");
    return true;
  } catch (error) {
    console.error("Error signing out:", error.message);
    return false;
  }
};

export const storeUserData = async (userId, userData) => {
  try {
    await set(ref(db, `users/${userId}`), userData);
    console.log("User data stored successfully");
  } catch (error) {
    console.error("Error storing user data:", error);
    throw error;
  }
};

export const fetchUserData = () => {
  return new Promise((resolve, reject) => {
    const dbRef = ref(db, "users");
    onValue(
      dbRef,
      (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const dataArray = Object.values(data);
          resolve(dataArray);
        } else {
          resolve([]);
        }
      },
      (error) => {
        console.error("Error fetching data:", error);
        reject(error);
      }
    );
  });
};

export const fetchEmployeeData = () => {
  return new Promise((resolve, reject) => {
    const dbRef = ref(db, "employeeData");
    onValue(
      dbRef,
      (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const dataArray = Object.values(data);
          resolve(dataArray);
        } else {
          resolve([]);
        }
      },
      (error) => {
        console.error("Error fetching data:", error);
        reject(error);
      }
    );
  });
};

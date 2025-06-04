// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";
import { getStorage, type FirebaseStorage } from "firebase/storage";
import { getAnalytics, type Analytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCgS9iRPMpwhCqTzI6JkrW9AIeJ_RzIpFU",
  authDomain: "hudra-d80ee.firebaseapp.com",
  projectId: "hudra-d80ee",
  storageBucket: "hudra-d80ee.firebasestorage.app",
  messagingSenderId: "52181458787",
  appId: "1:52181458787:web:273d7156c6951578e37d56",
  measurementId: "G-3H9YRKGHQH",
};

// Initialize Firebase only if it hasn't been initialized already
const app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Initialize Firebase services
export const auth: Auth = getAuth(app);
export const db: Firestore = getFirestore(app);
export const storage: FirebaseStorage = getStorage(app);

// Initialize Analytics (only on client side and after checking if it's supported)
export const analytics: Analytics | null =
  typeof window !== "undefined" ? getAnalytics(app) : null;

export default app;

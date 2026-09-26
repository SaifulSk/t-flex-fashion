// Firebase client configuration for T-Flex Fashion
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBo4Zmwwr3APMfeEDFQNwJ8oydHtTW9XRk",
  authDomain: "t-flex-fashion.firebaseapp.com",
  projectId: "t-flex-fashion",
  storageBucket: "t-flex-fashion.firebasestorage.app",
  messagingSenderId: "140454999227",
  appId: "1:140454999227:web:7ac4d36ab94fe9bb89e59e",
  measurementId: "G-TYCYGLG4WW"
};

// Initialize Firebase safely for SSR/Client
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Analytics runs only on client
export const getClientAnalytics = async () => {
  if (typeof window !== "undefined") {
    const { getAnalytics, isSupported } = await import("firebase/analytics");
    const supported = await isSupported();
    if (supported) {
      return getAnalytics(app);
    }
  }
  return null;
};

export default app;

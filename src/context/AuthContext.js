"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  auth,
  db
} from "@/lib/firebase";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
  sendPasswordResetEmail
} from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";

const AuthContext = createContext({
  user: null,
  userProfile: null,
  loading: true,
  signInWithEmail: async () => {},
  signUpWithEmail: async () => {},
  signInWithGoogle: async () => {},
  logout: async () => {},
  resetPassword: async () => {}
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // Sync profile data from Firestore
  const syncUserProfile = async (authUser) => {
    if (!authUser) {
      setUserProfile(null);
      return;
    }
    try {
      const userRef = doc(db, "users", authUser.uid);
      const snap = await getDoc(userRef);
      if (snap.exists()) {
        setUserProfile(snap.data());
      } else {
        const initialProfile = {
          uid: authUser.uid,
          email: authUser.email,
          displayName: authUser.displayName || authUser.email?.split("@")[0] || "Customer",
          photoURL: authUser.photoURL || null,
          role: "customer",
          createdAt: serverTimestamp()
        };
        await setDoc(userRef, initialProfile);
        setUserProfile(initialProfile);
      }
    } catch (err) {
      console.warn("Could not sync Firestore profile (might be offline or rule restrictions):", err.message);
      // Fallback to basic auth info
      setUserProfile({
        uid: authUser.uid,
        email: authUser.email,
        displayName: authUser.displayName || authUser.email?.split("@")[0] || "Customer",
        photoURL: authUser.photoURL || null
      });
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        await syncUserProfile(currentUser);
      } else {
        setUserProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signInWithEmail = async (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signUpWithEmail = async (email, password, displayName) => {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    if (displayName) {
      await updateProfile(cred.user, { displayName });
    }
    await syncUserProfile({ ...cred.user, displayName });
    return cred;
  };

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    const result = await signInWithPopup(auth, provider);
    await syncUserProfile(result.user);
    return result;
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
    setUserProfile(null);
  };

  const resetPassword = async (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        userProfile,
        loading,
        signInWithEmail,
        signUpWithEmail,
        signInWithGoogle,
        logout,
        resetPassword
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

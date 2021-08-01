import React, { useContext, useState, useEffect } from 'react'
import { auth } from '../firebase'
import firebase from "firebase/app";
import { BasicChildProp } from "../common/types"

type ContextProps = {
  signup: (email: string, password: string) => Promise<firebase.auth.UserCredential>
  login: (email: string, password: string) => Promise<firebase.auth.UserCredential>
  logout: () => Promise<void>
  resetPassword: (email: string) => Promise<void>
  currentUser: firebase.User | null
}

const AuthContext = React.createContext<ContextProps | null>(null)

export function useAuth() {
  const authContext = useContext(AuthContext);
  if (authContext === null) {
    throw new Error("useAuth() called outside of context?")
  }
  return authContext
}

export function AuthProvider({ children }: BasicChildProp) {
  const [currentUser, setCurrentUser] = useState<firebase.User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  function signup(email: string, password: string) {
    return auth.createUserWithEmailAndPassword(email, password)
  }

  function login(email:string, password:string) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function logout() {
    return auth.signOut()
  }

  function resetPassword(email: string) {
    return auth.sendPasswordResetEmail(email)
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
      setLoading(false);
    })

    return () => {
      // Unmounting
      unsubscribe();
    };
  }, [])
  

  const value = {
    currentUser,
    signup,
    login,
    logout,
    resetPassword
  }

  return (
    <AuthContext.Provider value={value}>
      { !loading && children }
    </AuthContext.Provider>
  )
}

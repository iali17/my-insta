import React, { useContext, useState, useEffect } from 'react'
import { auth } from '../firebase'
import firebase from "firebase/app";

type ContextProps = {
  signup: (email: string, password: string) => void
  currentUser: firebase.User | null
}

type ChildrenProps = {
  children: React.ReactNode;
}

const AuthContext = React.createContext<ContextProps | null>(null)

export function useAuth() {
  const authContext = useContext(AuthContext);
  if (authContext === null) {
    throw new Error("useAuth() called outside of context?")
  }
  return authContext
}

export function AuthProvider({ children }: ChildrenProps) {
  const [currentUser, setCurrentUser] = useState<firebase.User | null>(null);

  function signup(email: string, password: string) {
    auth.createUserWithEmailAndPassword(email, password)
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
    })

    return unsubscribe;
  }, [])
  

  const value = {
    currentUser,
    signup
  }

  return (
    <AuthContext.Provider value={value}>
      {children }
    </AuthContext.Provider>
  )
}

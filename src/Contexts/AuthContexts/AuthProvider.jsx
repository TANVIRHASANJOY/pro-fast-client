import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { 
  createUserWithEmailAndPassword, 
  GoogleAuthProvider, 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  signOut 
} from 'firebase/auth';
import { auth } from '../../firebase/firebase.init';

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUser = (email, password) => {
        setLoading(true); // Always set loading to true when starting a process
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const signInWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(false); // This stops the loading state once Firebase responds
            console.log("Current User:", currentUser?.email);
        });
        return () => unSubscribe();
    }, []);

    const authInfo = {
        createUser,
        signIn,
        logOut,
        signInWithGoogle,
        loading,
        user,
    };

    return (
        // 🟢 FIX: Must use .Provider
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
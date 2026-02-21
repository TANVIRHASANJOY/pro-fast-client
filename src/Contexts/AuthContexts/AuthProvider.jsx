import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { auth } from '../../firebase/firebase.init';


const googleProvider= new GoogleAuthProvider()
const AuthProvider = ({children}) => {
    const [user,setUser]=useState(null)
    const [loading,setLoading]=useState(true)
const createUser=(email,password)=>{
return createUserWithEmailAndPassword(auth,email,password)
}
const signIn=(email,password)=>{
return signInWithEmailAndPassword(auth,email,password)
}
const signInWithGoogle=()=>{
    setLoading(true)
    return signInWithPopup(auth,googleProvider)
}
const logOut=()=>{
    return signOut(auth)
}
useEffect(()=>{
const unSubscribe=onAuthStateChanged(auth,currentUser=>{
    setLoading(false)
    setUser(currentUser)
})
return ()=>{
    unSubscribe();
}


},[])


    const authInfo={
createUser,
signIn,
logOut,
signInWithGoogle,
loading,
user,

    }
    return (
   <AuthContext value={authInfo}>

{children}
   </AuthContext>
    );
};

export default AuthProvider;

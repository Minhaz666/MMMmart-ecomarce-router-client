import React, { createContext, useEffect, useState} from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import app from '../firebase/firebase.config';

export const Authcontext = createContext()
const auth = getAuth(app)

const Authprovider =  ({ children })  => {

    const [user,setUser]=useState(null)
    const [loader,setLoader]=useState(true)

    const createUser=(email,password)=>
    {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signin=(email,password)=>
    {
        return signInWithEmailAndPassword(auth, email, password)
    }

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth,(currentUser=>{
             console.log('currentUser=',currentUser)
             setUser(currentUser);
             setLoader(false)
         }))
         return()=>{
             return unsubscribe()
         }
     },[])

    const authinfo={
        createUser,
        signin,
    }

    return (
       <Authcontext.Provider value={authinfo}>
            {children}
       </Authcontext.Provider>
    );
};

export default Authprovider;
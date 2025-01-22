"use client"

import React, { useState } from 'react'
import { GoogleAuthProvider, signInWithPopup, setPersistence, browserSessionPersistence } from "firebase/auth";

const useUserLogged = ({ children }) => {


    const [userData, setUserData] = useState(null) as any;
    const provider = new GoogleAuthProvider();
    const handleGoogleLogin = () => {
        setPersistence(auth, browserSessionPersistence).then(() => {
            signInWithPopup(auth, provider)
                .then((result) => {
                    setUserData(result.user);
                    console.log(result);
                    const name = result.user.displayName;
                    console.log(name);
                })
                .catch((error) => {
                    console.log(error);
                });
        });
    };
    return (
        <>
            asdasd
        </>
    )
}

export default useUserLogged
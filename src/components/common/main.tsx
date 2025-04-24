"use client"

import React, { useEffect } from 'react'
import { useLoad } from '@/src/hooks/use-userLoad';
import { auth } from '@/src/data/firebaseClient'
import { onAuthStateChanged, signInWithEmailAndPassword, signInWithCustomToken } from "firebase/auth";

const Main = ({ children }) => {

   // const { userInfo } = useLoad();

   // useEffect(() => {

   //    userInfo() && console.log('userInfo', userInfo)

   // }, [])

   useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
         if (user) {
            console.log("🔥 로그인 되어 있음", auth.currentUser);
         } else {
            console.log("🙅 로그인 안 되어 있음");
         }
      });

      return () => unsubscribe();
   }, [])

   return (
      <main>
         {children}
      </main>
   )
}

export default Main
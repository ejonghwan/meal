"use client"

import React, { useEffect } from 'react'
import { useLoad } from '@/src/hooks/use-userLoad';
import { auth } from '@/src/data/firebaseClient'
import { onAuthStateChanged, signInWithEmailAndPassword, signInWithCustomToken } from "firebase/auth";

const Main = ({ children }) => {

   return (
      <main>
         {children}
      </main>
   )
}

export default Main
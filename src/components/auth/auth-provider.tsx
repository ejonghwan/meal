'use client'

import { useEffect, useState } from "react"
import { onAuthStateChanged, getIdToken } from "firebase/auth"
import { auth } from "@/src/data/firebaseClient"
import { useUserLoad } from '@/src/store/queryies/user/userQueries'
import { useUserStore } from "@/src/store/front/user";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
   const [token, setToken] = useState<string | null>(null)

   const { setUserLogin, setUserInfo } = useUserStore();

   useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
         if (user) {
            const idToken = await getIdToken(user)
            setToken(idToken)
            localStorage.setItem('x-acc-token', idToken) // 옵션: 저장
         } else {
            setToken(null)
            localStorage.removeItem('x-acc-token')
            setUserInfo(null)
         }
      })

      return () => unsubscribe()
   }, [])

   const { data, isSuccess } = useUserLoad(token || "")

   useEffect(() => {
      if (isSuccess && data) {
         setUserInfo(data) // Zustand에 백엔드 유저 저장
      }
   }, [isSuccess, data])

   return <>{children}</>
}




// // components/AuthProvider.tsx
// 'use client'

// import { useEffect } from "react";
// import { onAuthStateChanged, getIdToken } from "firebase/auth";
// import { auth } from "@/src/data/firebaseClient";
// import { useUserStore } from "@/src/store/front/user";
// import { useUserLoad, useUsers, useUser, useUserLogin } from '@/src/store/queryies/user/userQueries'

// export const AuthProvider = ({ children }: { children: React.ReactNode }) => {

//    const { setUserLogin } = useUserStore();
//    const { data: userLoadData, isError: userLoadError, isSuccess: userLoadSuccess } = useUserLoad(token)

//    useEffect(() => {
//       const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
//          if (firebaseUser) {
//             const token = await getIdToken(firebaseUser);
//             const userData = await onUserLoadAPI(token);
//             setUserLogin(userData); // Zustand에 저장
//          } else {
//             setUserLogin(null);
//          }
//       });

//       return () => unsubscribe();
//    }, []);

//    return <>{children}</>;
// };
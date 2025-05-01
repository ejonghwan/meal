'use client'

import { useEffect, useState } from "react"
import { onAuthStateChanged, getIdToken } from "firebase/auth"
import { auth } from "@/src/data/firebaseClient"
import { useUserLoad } from '@/src/store/queryies/user/userQueries'
import { useUserStore } from "@/src/store/front/user";
// import { useRouter } from "next/navigation";



export const AuthProvider = ({ children }: { children: React.ReactNode }) => {

   // const router = useRouter();
   // const [token, setToken] = useState<string | null>(null)
   const { userInfo, setUserInfo, setLoading, loading } = useUserStore();



   useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
         if (user && !userInfo?.uid) {

            console.log('로그인 된 유저', loading)
            setUserInfo({
               uid: user.uid,
               email: user.email,
               metadata: user.metadata,
               providerData: user.providerData
            })
            console.log('auth provider ?', user, userInfo)

            // getIdToken true는 강제로 얻게하는거
            // onAuthStateChanged함수만 실행해도 토큰이 만료되기 전에 갱신됨 
         } else {
            console.log('로그인 안 된 유저')
            setUserInfo(null); // 없으면 null로 설정
            setLoading(false); // 로딩 false로 바꾸기
         }
      })

      return () => unsubscribe()
   }, [])




   // const { data, isSuccess } = useUserLoad(token || "")

   // useEffect(() => {
   //    if (isSuccess && data) {
   //       setUserInfo(data) // Zustand에 백엔드 유저 저장
   //    }
   // }, [isSuccess, data])

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
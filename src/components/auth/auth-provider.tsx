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


            user.getIdToken().then(token => {
               console.log('token??', token, auth)
            })

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


   // onAuthStateChanged(user => {
   //    if (user) {
   //      // 2. ID 토큰 가져옴
   //      user.getIdToken().then(token => {
   //        // 3. 백엔드에 토큰 검증 요청
   //        verifyToken(token)
   //          .then(validUser => {
   //            // 4. 성공 → 스토어에 로그인 처리
   //            setUser(validUser)
   //          })
   //          .catch(() => {
   //            // 5. 실패 → 로그아웃 처리
   //            logoutUser()
   //          })
   //      })
   //    } else {
   //      logoutUser()
   //    }
   //  })




   // const { data, isSuccess } = useUserLoad(token || "")

   // useEffect(() => {
   //    if (isSuccess && data) {
   //       setUserInfo(data) // Zustand에 백엔드 유저 저장
   //    }
   // }, [isSuccess, data])

   return <>{children}</>
}




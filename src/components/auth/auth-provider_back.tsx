'use client'

import { useEffect, useState } from "react"
import { onAuthStateChanged, getIdToken } from "firebase/auth"
import { auth } from "@/src/data/firebaseClient"
// import { useUserLoad } from '@/src/store/queryies/user/userQueries'
import { useUserStore } from "@/src/store/front/user";
import { verifyToken } from "@/src/components/auth/auth-verifyToken-api"
import { useRouter } from "next/navigation";




export const AuthProvider = ({ children }: { children: React.ReactNode }) => {

   const router = useRouter();
   // const [token, setToken] = useState<string | null>(null)
   const { userInfo, setUserInfo, setLoading, setUserLogout, setIsAccToken } = useUserStore();

   useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
         if (user) {

            // const token = await user.getIdToken();
            try {

               const savedToken = localStorage.getItem('x-acc-token');
               console.log('???', savedToken)
               if (savedToken) {
                  setLoading(true)
                  setIsAccToken(true)
                  const verifiedUser = await verifyToken(savedToken);
                  setUserInfo({
                     uid: verifiedUser.data.uid,
                     email: verifiedUser.data.email,
                     metadata: verifiedUser.data.metadata,
                     providerData: verifiedUser.data.providerData
                  })
                  setLoading(false)
               } else {
                  console.log('savedToken 없음')
                  setIsAccToken(false)
               }


            } catch (err) {
               console.log('유효하지 않은 토큰. 로구ㅡ아웃 시킴');
               alert('장시간 사용하지 않아 로그아웃 되었습니다.');
               setUserLogout();
               router.replace('/home');
            }
         } else {
            setUserInfo(null);
            setIsAccToken(false)
         }
      });


      // 며칠 후에도 로컬저장소에 있으면 로그인 성공 시킬건지 (이건 onAuthStateChanged가 indexDB 값으로 계속 로그인 시켜서 token 갱신하는듯) 
      // 아니면 로컬저장소 토큰으로 검사를 할건지 

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


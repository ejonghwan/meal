'use client'

import { useEffect, useState } from "react"
import { onAuthStateChanged, onIdTokenChanged, getIdToken } from "firebase/auth"
import { auth } from "@/src/data/firebaseClient"
// import { useUserLoad } from '@/src/store/queryies/user/userQueries'
import { useUserStore } from "@/src/store/front/user";
import { verifyToken } from "@/src/components/auth/auth-verifyToken-api"
import { useRouter, usePathname } from "next/navigation";




export const AuthProvider = ({ children }: { children: React.ReactNode }) => {

   const router = useRouter();
   const pathName = usePathname();
   // const [token, setToken] = useState<string | null>(null)
   const { userInfo, setUserInfo, setLoading, setUserLogout, setIsAccToken } = useUserStore();

   const test = ['/home', '/login']

   useEffect(() => {

      // console.log('router? ', pathName)
      // const isPathName = test.filter(item => item === pathName) 
      // console.log('?', isPathName)
      // if(isPathName) return;

      // onAuthStateChanged
      const unsubscribe = onIdTokenChanged(auth, async (user) => {
         if (user) {
            try {
               console.log('auth 유저 있음 토큰은?')

               const token = await user.getIdToken(); // ← 갱신 시 자동으로 최신 토큰 제공됨
               localStorage.setItem('x-acc-token', token);
               setIsAccToken(true);
               setLoading(true);

               // 비로그인 페이지에서도 유저가 있으면 load api로 검증 후 유저를 가져옴. 이건 나중에 손보기
               const verifiedUser = await verifyToken(token);
               setUserInfo({
                  uid: verifiedUser.data.uid,
                  email: verifiedUser.data.email,
                  metadata: verifiedUser.data.metadata,
                  providerData: verifiedUser.data.providerData
               });
            } catch (err) {

               console.log('유효하지 않은 토큰. 로그아웃');
               setUserLogout();
               router.replace('/home');

            } finally {

               setLoading(false);

            }
         } else {
            setUserInfo(null);
            setIsAccToken(false);
         }
      });

      return () => unsubscribe();
   }, []);


   // const { data, isSuccess } = useUserLoad(token || "")

   // useEffect(() => {
   //    if (isSuccess && data) {
   //       setUserInfo(data) // Zustand에 백엔드 유저 저장
   //    }
   // }, [isSuccess, data])

   return <>{children}</>
}


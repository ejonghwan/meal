'use client'

import { useEffect, useState } from "react"
import { onAuthStateChanged, onIdTokenChanged, getIdToken } from "firebase/auth"
import { auth } from "@/src/data/firebaseClient"
// import { useUserLoad } from '@/src/store/queryies/user/userQueries'
import { useUserStore } from "@/src/store/front/user";
import { verifyToken } from "@/src/components/auth/auth-verifyToken-api"
import { useRouter, usePathname } from "next/navigation";


function parseJwt(token: string) {
   const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
   const decodedPayload = JSON.parse(atob(base64));
   return decodedPayload;
}

async function checkTokenExpired(token: string) {

   const decoded = parseJwt(token);
   const exp = decoded.exp; // 초 단위
   const now = Math.floor(Date.now() / 1000);
   const diffHours = (now - exp) / 3600;

   console.log('diffHours?', diffHours)

   // exp 지난지 3시간 넘었으면 로그아웃
   if (diffHours >= 1) {
      console.log("토큰 만료 후 3시간 경과 → 강제 로그아웃");
      return true
   } else {
      return false
   }
}



// 로그인, 비로그인 유저 모두 
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {

   const router = useRouter();
   const pathName = usePathname();
   // const [token, setToken] = useState<string | null>(null)
   const { userInfo, setUserInfo, setLoading, setUserLogout, setIsAccToken } = useUserStore();

   // const test = ['/home', '/login']

   useEffect(() => {

      // console.log('router? ', pathName)
      // const isPathName = test.filter(item => item === pathName) 
      // console.log('?', isPathName)
      // if(isPathName) return;

      // onAuthStateChanged
      const unsubscribe = onIdTokenChanged(auth, async (user) => {

         /*
            로그인 이후 3시간이 지나면 로그아웃 기능은 처음 시간 저장 후 그로부터 3시간 후 로직으로 짜야됨 
            나는 그냥 유저가 로그인하면 쭉 자동 로그인 되게 하고 로그아웃 안하고 껐을 때 저장소에 토큰이 있다면 
            그 토큰으로는 로그인 안되게 막는 로직만 추가 
         */
         const isAccToken = localStorage.getItem('x-acc-token');
         try {
            if (isAccToken) {

               const isTokenExp = await checkTokenExpired(isAccToken)
               console.log('isAccToken?', isAccToken, isTokenExp)

               if (isTokenExp) {
                  // token이 만료된 경우
                  const isTokenExp = await checkTokenExpired(isAccToken)
                  console.log('지난 token?', isTokenExp)

               } else if (!isTokenExp && user) {
                  console.log('토큰 만료되어서 실행되면 안됨 ')
                  // token이 존재하고 유저가 존재할 경우
                  console.log('auth 유저 있음 토큰은?')
                  const token = await user.getIdToken(); // 갱신 시 자동으로 최신 토큰 제공됨

                  localStorage.setItem('x-acc-token', token);
                  setIsAccToken(true);
                  setLoading(true);

                  // 비로그인 페이지에서도 유저가 있으면 load api로 검증 후 유저를 가져옴. 이건 나중에 손보기
                  const verifiedUser = await verifyToken(token);

                  // console.log('??????????????????, ', verifiedUser)

                  setUserInfo({
                     ...verifiedUser.data
                  });

               } else {
                  // token도 없고 유저도 없는 경우
                  setUserInfo(null);
                  setIsAccToken(false);
               }

            }
         } catch (err) {

            console.log('유효하지 않은 토큰. 로그아웃');
            setUserLogout();
            router.replace('/home');

         } finally {

            setLoading(false);

         }



         // if (user) {
         //    try {
         //       console.log('auth 유저 있음 토큰은?')
         //       const token = await user.getIdToken(); // 갱신 시 자동으로 최신 토큰 제공됨

         //       localStorage.setItem('x-acc-token', token);
         //       setIsAccToken(true);
         //       setLoading(true);

         //       // 비로그인 페이지에서도 유저가 있으면 load api로 검증 후 유저를 가져옴. 이건 나중에 손보기
         //       const verifiedUser = await verifyToken(token);

         //       // console.log('??????????????????, ', verifiedUser)

         //       setUserInfo({
         //          ...verifiedUser.data
         //       });
         //    } catch (err) {

         //       console.log('유효하지 않은 토큰. 로그아웃');
         //       setUserLogout();
         //       router.replace('/home');

         //    } finally {

         //       setLoading(false);

         //    }
         // } else {
         //    setUserInfo(null);
         //    setIsAccToken(false);
         // }
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


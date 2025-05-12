'use client'

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/src/data/firebaseClient";
import { onAuthStateChanged, getIdToken } from "firebase/auth";
import { useUserLoad } from '@/src/store/queryies/user/userQueries'
import { useUserStore } from '@/src/store/front/user'



export const AuthProviderAdmin = ({ children }: { children: React.ReactNode }) => {

   const router = useRouter();
   const token = useRef(null);
   if (typeof window !== 'undefined') {
      // console.log(localStorage)
      token.current = localStorage.getItem('x-acc-token')
   }

   const { data: userLoadData, isError: userLoadError, isSuccess: userLoadSuccess, isLoading: userLoadLoading } = useUserLoad(token.current)
   const { userInfo, setUserInfo } = useUserStore();


   // 이슈 : Unauthorized 떴을 때 인증되지 않아 유저 로드는 못했는데 페이지를 팅겨내지 않음

   useEffect(() => {

      if (userLoadLoading) return; // 로딩 중이면 판단 보류

      // 상태에 유저가 없는 경우
      if (!userInfo || userLoadError) {
         alert('로그인이 필요한 페이지입니다.')
         router.replace('/login');
      }
   }, [userInfo])


   useEffect(() => {

      // 상태에 유저가 있고 acc token 으로 재 인증. 
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
         if (!user || userLoadError) {
            console.error('❌ 서버 검증 실패');
            router.replace('/login');
            return;
         }

         if (userLoadSuccess && userLoadData.data.uid) {
            console.log('✅ 서버 검증 통과');
            setUserInfo(userLoadData.data);
         }

      });

      return () => unsubscribe();
   }, [userLoadSuccess]);


   // if (userLoadLoading) {
   //    return <div>Loading...</div>; // 서버 검증 중 대기
   // }

   return <>{children}</>;
}

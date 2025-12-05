'use client'

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/src/data/firebaseClient";
import { onAuthStateChanged, getIdToken, onIdTokenChanged } from "firebase/auth";
import { useUserLoad } from '@/src/store/queryies/user/userQueries'
import { useUserStore } from '@/src/store/front/user'


/* 
   인증버그 잡기
   1. 로컬저장소에 저장한 토큰이 만료되면 어떻게 되는지 ? 
   => 어디선가 업데이트해서 1시간 연장된 새로운 토큰으로 재발급함.
   => auth-provider에서 load api로 보내버림

   2. 로드 시 백엔드에서 토큰만료되면 에러 뿜고 로그인 해제하는 로직이 없는거같음 

   3. onAuthStateChanged는 파이어베이스 프론트쪽 인증같은데 왜 주석처리했더라 ? 
*/



export const AuthProviderAdmin = ({ children }: { children: React.ReactNode }) => {

   const router = useRouter();
   const token = useRef(null);
   if (typeof window !== 'undefined') {
      // console.log(localStorage)
      token.current = localStorage.getItem('x-acc-token')
   }

   const { data: userLoadData, isError: userLoadError, isSuccess: userLoadSuccess, isLoading: userLoadLoading } = useUserLoad(token.current)
   const { userInfo, setUserInfo, setUserLogout, setIsAccToken } = useUserStore();
   // const [checked, setChecked] = useState(false);




   useEffect(() => {
      if (userLoadLoading) return; // 로딩 중이면 판단 보류

      // 상태에 유저가 없는 경우
      if (!userInfo || userLoadError) {
         alert('로그인해주세요')
         // setUserInfo(null)
         setUserLogout()
         setIsAccToken(false)
         router.replace('/login');
      }
   }, [userInfo, userLoadError])


   useEffect(() => {
      // 상태에 유저가 있고 acc token 으로 재 인증. onAuthStateChanged
      if (userLoadError) {
         console.error('❌ 서버 검증 실패');
         // setUserInfo(null)
         setIsAccToken(false)
         router.replace('/login');
         return;
      }

      if (userLoadSuccess && userLoadData.data.uid) {
         console.log('✅ 서버 검증 통과');
         setUserInfo(userLoadData.data);
         setIsAccToken(true)
      }

   }, [userLoadSuccess]);

   return (
      <>
         {children}
      </>
   )

}



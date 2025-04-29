'use client'

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/src/data/firebaseClient";
import { onAuthStateChanged, getIdToken } from "firebase/auth";
import { useUserLoad } from '@/src/store/queryies/user/userQueries'
import { useUserStore } from '@/src/store/front/user'

console.log(123123)
export const AuthProviderAdmin = ({ children }: { children: React.ReactNode }) => {
   const router = useRouter();
   // const [loading, setLoading] = useState(true);

   let token = useRef(null);
   if (typeof window !== 'undefined') {
       // console.log(localStorage)
       token.current = localStorage.getItem('x-acc-token')
   }

   const { data: userLoadData, isError: userLoadError, isSuccess: userLoadSuccess, isLoading: userLoadLoading } = useUserLoad(token.current)
   const { userInfo, setUserInfo, setUserLogin } = useUserStore();
   useEffect(() => {
      console.log('auth HOC ??', userInfo)

      const unsubscribe = onAuthStateChanged(auth, async (user) => {
         if (!user) {
            router.replace('/login');
            return;
         }

         userLoadData && setUserInfo(userLoadData); 

         console.log('auth admin? ', userInfo)

         // const idToken = await user.getIdToken();

         // const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/verify-token`, {
         //    method: 'POST',
         //    headers: { 'Content-Type': 'application/json' },
         //    body: JSON.stringify({ token: idToken }),
         //    credentials: 'include',
         // });

         // if (res.ok) {
         //    console.log('✅ 서버 검증 통과');
         //    setLoading(false);
         // } else {
         //    console.error('❌ 서버 검증 실패');
         //    router.replace('/login');
         // }
      });

      return () => unsubscribe();
   }, [userLoadSuccess, userLoadLoading]);

   if (userLoadLoading) {
      return <div>Loading...</div>; // 서버 검증 중 대기
   }

   return <>{children}</>;
}
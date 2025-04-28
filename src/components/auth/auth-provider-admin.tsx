'use client'

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/src/data/firebaseClient";
import { onAuthStateChanged, getIdToken } from "firebase/auth";

export const AuthProviderAdmin = ({ children }: { children: React.ReactNode }) => {
   const router = useRouter();
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
         if (!user) {
            router.replace('/login');
            return;
         }

         const idToken = await user.getIdToken();

         const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/verify-token`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token: idToken }),
            credentials: 'include',
         });

         if (res.ok) {
            console.log('✅ 서버 검증 통과');
            setLoading(false);
         } else {
            console.error('❌ 서버 검증 실패');
            router.replace('/login');
         }
      });

      return () => unsubscribe();
   }, []);

   if (loading) {
      return <div>Loading...</div>; // 서버 검증 중 대기
   }

   return <>{children}</>;
}
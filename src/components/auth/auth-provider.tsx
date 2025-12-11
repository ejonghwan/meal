'use client'

import { useEffect, useState } from "react"
import { onAuthStateChanged, onIdTokenChanged, getIdToken } from "firebase/auth"
import { auth } from "@/src/data/firebaseClient"
// import { useUserLoad } from '@/src/store/queryies/user/userQueries'
import { useUserStore } from "@/src/store/front/user";
import { verifyToken } from "@/src/components/auth/auth-verifyToken-api"
import { useRouter, usePathname } from "next/navigation";



// 
// 범용 base64url -> utf8 디코더
function base64UrlDecodeToString(base64Url: string) {
   // base64url -> base64
   let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
   // 패딩 추가
   const pad = base64.length % 4;
   if (pad === 2) base64 += '==';
   else if (pad === 3) base64 += '=';
   else if (pad === 1) base64 += '===';
   // 브라우저 / Node 호환 처리
   if (typeof window !== 'undefined' && typeof window.atob === 'function') {
      return decodeURIComponent(escape(window.atob(base64))); // utf8 안전 디코딩
   } else {
      // Node 환경
      return Buffer.from(base64, 'base64').toString('utf8');
   }
}

function parseJwt(token: string) {
   try {
      const parts = token.split('.');
      if (parts.length < 2) return null;
      const payloadStr = base64UrlDecodeToString(parts[1]);
      return JSON.parse(payloadStr);
   } catch (e) {
      console.error('parseJwt error', e);
      return null;
   }
}

// thresholdHours 기본값 3 (원하면 바꾸면 됨)
function checkTokenExpired(token: string, thresholdHours = 0.1) {
   const decoded = parseJwt(token);
   if (!decoded || typeof decoded.exp !== 'number') {
      // 토큰이 없거나 형식이 이상하면 만료(또는 처리 방침에 따라 true/false)
      return true;
   }

   const exp = decoded.exp; // unix seconds
   const now = Math.floor(Date.now() / 1000);
   const diffHours = (now - exp) / 3600;

   console.log('diffHours?', diffHours, 'expDate:', new Date(exp * 1000).toISOString(), 'now:', new Date(now * 1000).toISOString());

   // exp 지난지 thresholdHours 이상이면 로그아웃
   return diffHours >= thresholdHours;
}
// 




interface Props {
   children: React.ReactNode;
   isLogin?: boolean;
}


// 로그인, 비로그인 유저 모두 
export const AuthProvider = ({ children, isLogin = false }: Props) => {

   const router = useRouter();
   const pathName = usePathname();
   // const [token, setToken] = useState<string | null>(null)
   const { userInfo, setUserInfo, setLoading, setUserLogout, setIsAccToken } = useUserStore();

   // const test = ['/home', '/login']


   useEffect(() => {

      const isAccToken = localStorage?.getItem('x-acc-token');
      if (!isAccToken) return;
      console.log('로그인 유저만 보여야됨')

      // console.log('router? ', pathName)
      // const isPathName = test.filter(item => item === pathName) 
      // console.log('?', isPathName)
      // if(isPathName) return;


      /*
         1. 로그인 처음 할 때 로딩에서 안풀리는 버그  => 간헐적
         2. 로딩 중 새로고침하면 로그인 풀리는 문제  => 간헐적
      */

      // onAuthStateChanged
      const unsubscribe = onIdTokenChanged(auth, async (user) => {
         console.log('unsubscribe? 1111')
         /*
            로그인 이후 3시간이 지나면 로그아웃 기능은 처음 시간 저장 후 그로부터 3시간 후 로직으로 짜야됨 
            나는 그냥 유저가 로그인하면 쭉 자동 로그인 되게 하고 로그아웃 안하고 껐을 때 저장소에 토큰이 있다면 
            그 토큰으로는 로그인 안되게 막는 로직만 추가 

            25/12/8 변경 =>

            새로고침이나 로드api를 보낼 때 
            => 로그인 기준 1시간 이전이면 통과 
            => 로그인 기준 1시간 이후 ~ 2시간 이전이면 통과
            => 로그인 기준 2시간 이후면 로그아웃, 로그인창으로 보내기
         */
         try {
            if (isAccToken) {
               console.log('in if? 2222', isAccToken)
               const isTokenExp = await checkTokenExpired(isAccToken, 0.1)
               // console.log('isAccToken?', isAccToken, isTokenExp)

               if (isTokenExp && isAccToken) {
                  // token이 만료된 경우
                  localStorage.removeItem('x-acc-token');
                  console.log('지난 token?', isTokenExp, 'isAccToken?', isAccToken)
                  // 재렌더링 계속 일어나는데 여기 문제인거같음. 간헐적으로 발생
                  // 얼럿 무한뜨는거 해결못함
                  alert('로그인 시간이 지났습니다. 다시 로그인 해주세요')
                  setUserInfo(null);
                  setIsAccToken(false);
                  setUserLogout();
                  router.replace('/home');

               } else if (!isTokenExp && user) {
                  // token이 존재하고 유저가 존재할 경우
                  console.log('auth 유저 있음 토큰은?... 토큰 만료되어서 실행되면 안됨')
                  const token = await user.getIdToken(); // 갱신 시 자동으로 최신 토큰 제공됨

                  localStorage.setItem('x-acc-token', token);
                  setIsAccToken(true);
                  setLoading(true);

                  // 비로그인 페이지에서도 유저가 있으면 load api로 검증 후 유저를 가져옴. 이건 나중에 손보기
                  const verifiedUser = await verifyToken(token);
                  setUserInfo({ ...verifiedUser.data });
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
            setLoading(null);
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


import { ExtendsRequestInit } from "@/src/types/request";

export const verifyToken = async (token: string) => {
   const options: ExtendsRequestInit = {
      method: "POST",
      headers: {
         'Content-Type': 'application/json',
         "x-acc-token": `Bearer ${token}`,
         // "Authorization": `Bearer ${token}`,
      },
      credentials: 'include', // 쿠키를 포함하려면 'include'로 설정
      next: { tags: ['user', 'load'] },
      cache: "no-store",
   }

   const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/load/`, options)

   if (!res.ok) { throw new Error('Network response was not ok'); }
   return res.json();
};



// → 불필요한 중복 방지 + 책임 분리
// → fetcher 함수는 성공/실패만 말하고, 처리 로직은 호출부에서 담당




// onAuthStateChanged(auth, async (user) => {
//    if (user) {
//      const token = await user.getIdToken();
//      try {
//        const verifiedUser = await verifyToken(token);
//        setUserInfo(verifiedUser); // 스토어에 백엔드 검증된 정보 저장
//      } catch (err) {
//        console.log('유효하지 않은 토큰');
//        signOut(auth);
//      }
//    } else {
//      setUserInfo(null);
//    }
//  });
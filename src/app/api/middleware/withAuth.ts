
import { NextRequest, NextResponse } from "next/server";
import { admin, adminDB } from '@/src/data/firebaseAdmin'


export const withAuth = (handler: (req: NextRequest, user: any, ctx: { params: any }) => Promise<NextResponse>) =>
   async (req: NextRequest, ctx: { params: any }): Promise<NextResponse> => {
      try {
         const authHeader = req.headers.get("x-acc-token") || "";
         const token = authHeader.replace("Bearer ", "");

         const decoded = await admin.auth().verifyIdToken(token);
         console.log('decoded token?', decoded)
         const user = await admin.auth().getUser(decoded.uid)

         // 콜렉션 유저 불러와서 합성
         const userDoc = await adminDB.collection('users').doc(user.uid).get();
         const userData = userDoc.data();

         // console.log('back mi?', user, userData)

         return handler(req, { ...user, ...userData }, ctx); // 인증된 유저와 함께 핸들러 호출

      } catch (error) {
         console.error('auth middle ware?', error)
         return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
      }
   }



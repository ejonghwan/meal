
import { NextRequest, NextResponse } from "next/server";
import { admin } from '@/src/data/firebaseAdmin'


export const withAuth = (handler: (req: NextRequest, user: any) => Promise<NextResponse>) =>
   async (req: NextRequest): Promise<NextResponse> => {
      try {
         const authHeader = req.headers.get("x-acc-token") || "";
         const token = authHeader.replace("Bearer ", "");

         const decoded = await admin.auth().verifyIdToken(token);
         return handler(req, decoded); // 인증된 유저와 함께 핸들러 호출

      } catch (error) {
         return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
      }
   }


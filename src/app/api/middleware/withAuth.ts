import { NextApiHandler } from "next";
import { admin } from '@/src/data/firebaseAdmin'


export const withAuth = (handler: NextApiHandler): NextApiHandler => {
   return async (req, res) => {
      const authHeader = req.headers.authorization || "";
      const token = authHeader.replace("Bearer ", "");

      try {
         const decoded = await admin.auth().verifyIdToken(token);
         (req as any).user = decoded; // 인증된 유저 정보 주입
         return handler(req, res);    // 원래 핸들러 실행

      } catch (err) {
         return res.status(401).json({ message: "Unauthorized" });
      }
   };
};
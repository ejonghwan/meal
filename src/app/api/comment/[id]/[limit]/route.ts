import { NextRequest, NextResponse } from "next/server";
import { adminDB, admin } from "@/src/data/firebaseAdmin";
import { withAuth } from "@/src/app/api/middleware/withAuth";
import { DocumentData, Query } from "firebase-admin/firestore";

/*
    @ path    GET /api/comment/:restaurantId/:page
    @ doc     댓글 로드
    @ access  public
*/
export const GET = async (req: NextRequest, { params }: { params: { id: string; limit: string } }) => {

   // console.log('params????????????????????????????????', params)

   const { id: restaurantId, limit: page } = params;
   const limit = Number(page) //client에서 page로 보냄
   const url = new URL(req.url);
   const cursor = url.searchParams.get('cursor');  // cursor는 ISO 문자열 형태의 날짜 (created_at)
   const cursorId = url.searchParams.get("cursorId"); // Firestore Document ID

   // user
   const uid = req.headers.get("x-user-uid");
   if (!uid) return NextResponse.json({ message: "유저 인증 정보가 없습니다." }, { status: 401 });


   // 🔐 로그인 유저 확인
   const token = req.headers.get("x-acc-token")?.replace("Bearer ", "");
   let userId: string | null = null;

   // console.log('token??', token)

   if (token) {
      try {
         const decoded = await admin.auth().verifyIdToken(token);
         userId = decoded.uid;
      } catch (err) {
         console.warn("Invalid or expired token");
      }
   }


   // 마지막 값 구분 위해 11개 가져와서 10개로 짜름
   let queryRef: Query<DocumentData> = adminDB.collection("comments")
      .where("restaurantId", "==", restaurantId)
      .orderBy("created_at", "desc")
      .limit(limit + 1);


   // ✅ 문서 ID 기반 커서 처리
   if (cursor && cursorId) {
      const cursorDocSnap = await adminDB.collection("comments").doc(cursorId).get(); //커서아이디로 특정 부분 스냅샷
      if (cursorDocSnap.exists) queryRef = queryRef.startAfter(cursorDocSnap);
   }

   const snapshot = await queryRef.get();

   // 데이터없음
   if (snapshot.empty) {
      return NextResponse.json({ state: "SUCCESS", message: "데이터 없음 1", data: [], nextCursor: null, nextCursorId: null, }, { status: 200 });
   }

   const docs = snapshot.docs;
   const hasNext = docs.length > limit;
   const slicedDocs = hasNext ? docs.slice(0, limit) : docs; // 마지막 값 구분 위해 11개 가져와서 10개로 짜름


   const fetchedComment = await Promise.all(
      // snapshot.docs.map(async (doc) => {
      slicedDocs.map(async (doc) => {
         const data = doc.data();
         let user = null;

         try {
            const userRecord = await admin.auth().getUser(data.userId);
            user = {
               uid: userRecord.uid,
               email: userRecord.email,
               displayName: userRecord.displayName,
               photoURL: userRecord.photoURL,
            };
         } catch (error) {
            console.error("유저 정보 조회 실패:", data.userId, error);
         }


         // ✅ 로그인한 경우에만 좋아요 정보 확인
         let hasMyLike = false;
         if (userId) {
            const likeDoc = await adminDB
               .collection("commentLikes")
               .doc(`${userId}_${doc.id}`)
               .get();
            hasMyLike = likeDoc.exists;

            // console.log('hohohohoho', hasMyLike, 'doc?', `${userId}_${doc.id}`)
         }


         return {
            id: doc.id,
            restaurantId: data.restaurantId,
            userId: data.userId,
            user,
            content: data.content,
            isEdit: data.isEdit,
            like: data.like,
            rating: data.rating,
            unlike: data.unlike,
            hasMyComment: data.userId === uid,
            hasMyLike: hasMyLike,
            created_at: data.created_at?.toDate() ?? null,
            updated_at: data.updated_at?.toDate() ?? null,
         };
      })
   );


   // 마지막 값 구분 추가
   // const lastDoc = slicedDocs[slicedDocs.length - 1];
   // const nextCursor = hasNext ? lastDoc?.data().created_at?.toDate().toISOString() : null;
   // const nextCursorId = hasNext ? lastDoc?.id : null;

   const lastDoc = hasNext ? docs[limit] : docs[docs.length - 1];
   const nextCursor = hasNext ? lastDoc?.data().created_at?.toDate().toISOString() : null;
   const nextCursorId = hasNext ? lastDoc?.id : null;

   return NextResponse.json({ state: "SUCCESS", message: "성공", data: fetchedComment, nextCursor, nextCursorId, }, { status: 200 });
};




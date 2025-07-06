import { NextRequest, NextResponse } from "next/server";
import { adminDB, admin } from "@/src/data/firebaseAdmin";
import { Query, DocumentData } from "firebase-admin/firestore";


/*
    @ path    GET /api/restaurant/:page
    @ doc     글 로드
    @ access  public
*/
export const GET = async (req: NextRequest, { params }: { params: { id: string, search: string } }) => {
   const { id: page, search } = params;
   const url = new URL(req.url);
   const cursor = url.searchParams.get('cursor');  // cursor는 ISO 문자열 형태의 날짜 (created_at)
   const limit = Number(page) //client에서 page로 보냄

   const decodeSearch = decodeURIComponent(search)


   // let queryRef = adminDB.collection("restaurant")
   //    .orderBy("created_at", "desc")  // 내림차순 (최신순)
   //    .limit(limit);


   let queryRef: Query<DocumentData> = adminDB.collection("restaurant");

   // ✅ 카테고리 필터링 추가
   if (decodeSearch !== "전체") queryRef = queryRef.where("category", "==", decodeSearch);
   queryRef = queryRef.orderBy("created_at", "desc").limit(limit);


   if (cursor) {
      // cursor를 Firestore Timestamp 객체로 변환
      const cursorTimestamp = new Date(cursor);
      queryRef = queryRef.startAfter(cursorTimestamp);
   }


   const snapshot = await queryRef.get();

   if (snapshot.empty) {
      return NextResponse.json({
         state: "SUCCESS",
         message: "데이터 없음",
         data: [],
      }, { status: 200 });
   }

   const fetchedRestaurant = await Promise.all(snapshot.docs.map(async doc => {
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

      return {
         id: doc.id,
         user,
         title: data.title,
         content: data.content,
         category: data.category,
         rating: data.rating,
         totalRating: data.totalRating,
         userId: data.userId,
         isEdit: data.isEdit,
         mapInfo: data.mapInfo,
         like: data.like,
         unlike: data.unlike,
         created_at: data.created_at?.toDate() ?? null,
         updated_at: data.updated_at?.toDate() ?? null,
      };
   }));

   // 마지막 문서의 created_at 값을 다음 페이지 커서로 넘겨줌
   const lastDoc = snapshot.docs[snapshot.docs.length - 1];
   const nextCursor = lastDoc?.data().created_at?.toDate().toISOString() || null;

   return NextResponse.json({
      state: "SUCCESS",
      message: "성공",
      data: fetchedRestaurant,
      nextCursor,
   }, { status: 200 });
};



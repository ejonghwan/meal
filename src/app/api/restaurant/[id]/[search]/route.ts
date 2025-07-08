

import { NextRequest, NextResponse } from "next/server";
import { adminDB, admin } from "@/src/data/firebaseAdmin";
import { Query, DocumentData, Timestamp } from "firebase-admin/firestore";


// 커서기반 
// 1. 프론트에서 처음에는 null로 커서와 커서아이디를 보냄 
// 2. 백엔드에서 처음부터 리밋까지 응답해주고 마지막 글의 정보를 내려줌  
// 3. 그다음 프론트에서는 유즈인피티니스크롤 메서드를 이용해서 그 응답받은걸 가지고 있다가 더보기를 누르면 그 커서값들을 다시 백엔드로 보내서 그 이후글을 가져옴 
// 프론트에서 새로고침or라우터 이동 시 저장된 값들은 리셋되지만 만약 저장하고 싶다면 로컬저장소나 스테일타임+쥐씨 타임을 길게 줘서 계속 저장하게 둘 수 있음


/*
    @ path    GET /api/restaurant/:limit/:search
    @ doc     글 로드 
    @ access  public
*/
export const GET = async (req: NextRequest, { params }: { params: { id: string; search: string } }) => {
   const { id: page, search } = params;
   const url = new URL(req.url);

   const limit = Number(page);
   const decodeSearch = decodeURIComponent(search);

   const cursor = url.searchParams.get("cursor"); // ISO String
   const cursorId = url.searchParams.get("cursorId"); // Firestore Document ID



   // 🔐 로그인 유저 확인
   const token = req.headers.get("x-acc-token")?.replace("Bearer ", "");
   let userId: string | null = null;

   console.log('token??', token)

   if (token) {
      try {
         const decoded = await admin.auth().verifyIdToken(token);
         userId = decoded.uid;

         console.log('??? userId', userId)

      } catch (err) {
         console.warn("Invalid or expired token");
      }
   }


   let queryRef: Query<DocumentData> = adminDB.collection("restaurant");

   // 카테고리 서치 유무 : 전체가 아니면 카테고리 검색. 전체라면 그대로 진행
   if (decodeSearch !== "전체") queryRef = queryRef.where("category", "==", decodeSearch);
   queryRef = queryRef.orderBy("created_at", "desc").limit(limit + 1); // 마지막 값 구분 위해 11개 가져와서 10개로 짜름


   // ✅ 문서 ID 기반 커서 처리
   if (cursor && cursorId) {
      const cursorDocSnap = await adminDB.collection("restaurant").doc(cursorId).get(); //커서아이디로 특정 부분 스냅샷
      if (cursorDocSnap.exists) queryRef = queryRef.startAfter(cursorDocSnap);
   }

   const snapshot = await queryRef.get();

   if (snapshot.empty) {
      return NextResponse.json(
         {
            state: "SUCCESS",
            message: "데이터 없음",
            data: [],
            nextCursor: null,
            nextCursorId: null,
         },
         { status: 200 }
      );
   }


   const docs = snapshot.docs;
   const hasNext = docs.length > limit;
   const slicedDocs = hasNext ? docs.slice(0, limit) : docs; // 마지막 값 구분 위해 11개 가져와서 10개로 짜름


   const fetchedRestaurant = await Promise.all(
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
               .collection("restaurantLikes")
               .doc(`${userId}_${doc.id}`)
               .get();
            hasMyLike = likeDoc.exists;

            // console.log('hohohohoho', hasMyLike, 'doc?', `${userId}_${doc.id}`)
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
            like: data.like, //count
            unlike: data.unlike,
            hasMyLike: hasMyLike,
            created_at: data.created_at?.toDate() ?? null,
            updated_at: data.updated_at?.toDate() ?? null,
         };
      })
   );

   // const lastDoc = snapshot.docs[snapshot.docs.length - 1];
   // const nextCursor = lastDoc?.data().created_at?.toDate().toISOString() || null;
   // const nextCursorId = lastDoc?.id || null;
   // 마지막 값 구분 추가
   const lastDoc = slicedDocs[slicedDocs.length - 1];
   const nextCursor = hasNext ? lastDoc?.data().created_at?.toDate().toISOString() : null;
   const nextCursorId = hasNext ? lastDoc?.id : null;


   // console.log('cursor:', cursor)
   // console.log('fetchedRestaurant:', fetchedRestaurant.length)
   // console.log('nextCursor:', nextCursor, 'nextCursorId:', nextCursorId)

   return NextResponse.json(
      {
         state: "SUCCESS",
         message: "성공",
         data: fetchedRestaurant,
         nextCursor,
         nextCursorId,
      },
      { status: 200 }
   );
};




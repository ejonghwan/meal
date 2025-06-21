import { NextRequest, NextResponse } from "next/server";
import { adminDB, admin } from "@/src/data/firebaseAdmin";
import { withAuth } from "@/src/app/api/middleware/withAuth";



export const GET = async (req: NextRequest, { params }: { params: { page: string } }) => {
    const url = new URL(req.url);
    const cursor = url.searchParams.get('cursor');  // cursor는 ISO 문자열 형태의 날짜 (created_at)
    const limit = 10;


    let queryRef = adminDB.collection("restaurant")
        .orderBy("created_at", "desc")  // 내림차순 (최신순)
        .limit(limit);

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
            address: data.address,
            category: data.category,
            rating: data.rating,
            userId: data.userId,
            isEdit: data.isEdit,
            created_at: data.created_at?.toDate() ?? null,
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



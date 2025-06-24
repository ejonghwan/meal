import { NextRequest, NextResponse } from "next/server";
import { adminDB, admin } from "@/src/data/firebaseAdmin";
import { withAuth } from "@/src/app/api/middleware/withAuth";


/*
    @ path    GET /api/restaurant
    @ doc     글 로드
    @ access  public
*/
export const GET = async (req: NextRequest, { params }: { params: { params: string } }) => {
    const { params: page } = params;
    const url = new URL(req.url);
    const cursor = url.searchParams.get('cursor');  // cursor는 ISO 문자열 형태의 날짜 (created_at)
    const limit = Number(page) //client에서 page로 보냄


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
            category: data.category,
            rating: data.rating,
            totalRating: data.rating,
            userId: data.userId,
            isEdit: data.isEdit,
            mapInfo: data.mapInfo,
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



/*
    @ path    PUT /api/restaurant
    @ doc     글 전체 수정
    @ access  public
*/
export const PUT = withAuth(async (req: NextRequest, { params }: { params: { restaurantId: string } }) => {
    const { restaurantId } = params;

    try {
        const body = await req.json(); // 수정할 데이터
        const {
            title,
            content,
            category,
            rating,
            isEdit,
            mapInfo,
        } = body;

        const docRef = adminDB.collection("restaurant").doc(restaurantId);
        const docSnapshot = await docRef.get();

        if (!docSnapshot.exists) {
            return NextResponse.json({
                state: "FAIL",
                message: "해당 레스토랑 글이 존재하지 않습니다.",
            }, { status: 404 });
        }

        await docRef.update({
            ...(title !== undefined && { title }),
            ...(content !== undefined && { content }),
            ...(category !== undefined && { category }),
            ...(rating !== undefined && { rating }),
            ...(isEdit !== undefined && { isEdit }),
            ...(mapInfo !== undefined && { mapInfo }),
            updated_at: new Date(), // 수정 시간
        });

        return NextResponse.json({
            state: "SUCCESS",
            message: "글이 성공적으로 수정되었습니다.",
        }, { status: 200 });

    } catch (error) {
        console.error("레스토랑 글 수정 실패:", error);
        return NextResponse.json({
            state: "ERROR",
            message: "서버 에러가 발생했습니다.",
        }, { status: 500 });
    }
});




/*
    @ path    PATCH  /api/restaurant
    @ doc     글 일부 수정
    @ access  public
*/


/*
    @ path    DELETE /api/restaurant
    @ doc     글 삭제
    @ access  public
*/
export const DELETE = withAuth(async (req: NextRequest, { params }: { params: { restaurantId: string } }) => {

    const { restaurantId } = params;
    try {
        // 문서 조회
        const docRef = adminDB.collection("restaurant").doc(restaurantId);
        const docSnap = await docRef.get();

        if (!docSnap.exists) {
            return NextResponse.json({
                state: "NOT_FOUND",
                message: "해당 글이 존재하지 않습니다.",
            }, { status: 404 });
        }

        await docRef.delete();

        return NextResponse.json({
            state: "SUCCESS",
            message: "글이 성공적으로 삭제되었습니다.",
        }, { status: 200 });

    } catch (error) {
        console.error("글 삭제 중 오류:", error);
        return NextResponse.json({
            state: "ERROR",
            message: "서버 오류가 발생했습니다.",
        }, { status: 500 });
    }
});



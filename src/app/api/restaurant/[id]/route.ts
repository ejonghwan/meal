import { NextRequest, NextResponse } from "next/server";
import { adminDB, admin } from "@/src/data/firebaseAdmin";
import { withAuth } from "@/src/app/api/middleware/withAuth";


/*
    @ path    PUT /api/restaurant/:restaurantId
    @ doc     글 전체 수정
    @ access  public
*/
export const PUT = withAuth(async (req: NextRequest, user, context: { params: { id: string } }) => {

    const { params: { id: restaurantId } } = context;


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
    @ path    PATCH  /api/restaurant/:restaurantId
    @ doc     좋아요 토글
    @ access  public
*/
export const PATCH = withAuth(async (req: NextRequest, user, context: { params: { id: string } }) => {
    const { params: { id: restaurantId } } = context;

    try {
        const { userId } = await req.json();
        if (!userId) return NextResponse.json({ state: "FAIL", message: "userId가 없습니다." }, { status: 400 });


        const restaurantRef = adminDB.collection("restaurant").doc(restaurantId);
        const likeRef = adminDB.collection("restaurantLikes").doc(`${userId}_${restaurantId}`);
        let restaurantSnap = null;

        let action: 'LIKE' | 'UNLIKE' = 'LIKE';



        await adminDB.runTransaction(async (transaction) => {
            restaurantSnap = await transaction.get(restaurantRef);
            const likeSnap = await transaction.get(likeRef);

            if (!restaurantSnap.exists) {
                throw new Error("해당 레스토랑 글이 존재하지 않습니다.");
            }

            const currentLike = restaurantSnap.data().like || 0;

            if (likeSnap.exists) {
                // 👎 이미 좋아요 했으면 취소
                transaction.delete(likeRef);
                transaction.update(restaurantRef, {
                    like: Math.max(currentLike - 1, 0), // 음수 방지
                });
                action = 'UNLIKE';
            } else {
                // 👍 좋아요 추가
                transaction.set(likeRef, {
                    userId,
                    restaurantId,
                    createdAt: new Date(),
                });
                transaction.update(restaurantRef, {
                    like: currentLike + 1,
                });
                action = 'LIKE';
            }
        });

        return NextResponse.json({ state: "SUCCESS", message: action === 'LIKE' ? "좋아요 추가됨" : "좋아요 취소됨", data: { action, hasMyLike: action === 'LIKE' ? true : false, ...restaurantSnap.data() }, }, { status: 200 });

    } catch (error) {
        console.error("좋아요 토글 실패:", error);
        return NextResponse.json({ state: "ERROR", message: error.message || "서버 에러가 발생했습니다." }, { status: 500 });
    }
});




/*
    @ path    DELETE /api/restaurant/:restaurantId
    @ doc     글 삭제
    @ access  public
*/
export const DELETE = withAuth(async (req: NextRequest, user, context: { params: { id: string } }) => {

    const { params: { id: restaurantId } } = context;

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



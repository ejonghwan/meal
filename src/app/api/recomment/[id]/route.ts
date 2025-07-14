import { NextRequest, NextResponse } from "next/server";
import { adminDB, admin } from "@/src/data/firebaseAdmin";
import { withAuth } from "@/src/app/api/middleware/withAuth";



/*
    @ path    PUT /api/comment/:commentId
    @ doc     댓글 전체 수정
    @ access  public
*/
export const PUT = withAuth(async (req: NextRequest, user, context: { params: { id: string } }) => {

    const { params: { id: commentId } } = context;

    try {
        const body = await req.json(); // 수정할 데이터
        const { content, rating, isEdit, restaurantId, prevRating } = body;

        const docRef = adminDB.collection("comments").doc(commentId);
        const docSnapshot = await docRef.get();


        // 글 검증
        if (!docSnapshot.exists) return NextResponse.json({ state: "FAIL", message: "해당 레스토랑 댓글이 존재하지 않습니다.", }, { status: 404 });

        let newRating = null;
        // 넘어온 rating과 이전 prevRating이 다를 경우 역산 후 재계산하고 db 업데이트
        if (rating !== prevRating) {
            const restaurantRef = adminDB.collection("restaurant").doc(restaurantId);
            const restaurantSnapshot = await restaurantRef.get();
            if (!restaurantSnapshot.exists) return NextResponse.json({ state: "FAILURE", message: "레스토랑이 존재하지 않습니다.", }, { status: 404 });

            const restaurantData = restaurantSnapshot.data();
            if (!restaurantData) return NextResponse.json({ state: "FAILURE", message: "레스토랑 데이터가 없습니다.", }, { status: 404 });


            const currentTotalRating = parseFloat(restaurantData.totalRating) || 0;
            const inversion = 2 * currentTotalRating - prevRating // 역산 a = 2 * 총평점 - 기존 별점

            newRating = (inversion + parseFloat(rating)) / 2;  // 역산 후 재계산
            await restaurantRef.update({ totalRating: newRating.toString() });
        }


        await docRef.update({
            ...(content !== undefined && { content }),
            ...(rating !== undefined && { rating }),
            ...(isEdit !== undefined && { isEdit }),
            // restaurantId: docSnapshot.restaurantId,
            updated_at: new Date(), // 수정 시간
        });

        const updatedDoc = await docRef.get();
        const updatedComment = updatedDoc.data();

        // 수정된 데이터 안내려줌
        return NextResponse.json({ state: "SUCCESS", message: "글이 성공적으로 수정되었습니다.", data: { ...updatedComment, id: commentId, newTotalRating: newRating } }, { status: 200 });

    } catch (error) {
        console.error("레스토랑 글 수정 실패:", error);
        return NextResponse.json({ state: "ERROR", message: "서버 에러가 발생했습니다.", }, { status: 500 });
    }
});



/*
    @ path    PATCH  /api/recomment/:recommentId
    @ doc     좋아요 토글
    @ access  public
*/
export const PATCH = withAuth(async (req: NextRequest, user, context: { params: { id: string } }) => {
    const { params: { id: recommentId } } = context;

    try {
        const { userId } = await req.json();
        if (!userId) return NextResponse.json({ state: "FAIL", message: "userId가 없습니다." }, { status: 400 });


        const recommentRef = adminDB.collection("recomments").doc(recommentId);
        const likeRef = adminDB.collection("recommentLikes").doc(`${userId}_${recommentId}`);
        let recommentSnap = null;

        let action: 'LIKE' | 'UNLIKE' = 'LIKE';



        await adminDB.runTransaction(async (transaction) => {
            recommentSnap = await transaction.get(recommentRef);
            const likeSnap = await transaction.get(likeRef);

            if (!recommentSnap.exists) throw new Error("해당 레스토랑 글이 존재하지 않습니다.");

            const currentLike = recommentSnap.data().like || 0;

            if (likeSnap.exists) {
                // 👎 이미 좋아요 했으면 취소
                transaction.delete(likeRef);
                transaction.update(recommentRef, {
                    like: Math.max(currentLike - 1, 0), // 음수 방지
                });
                action = 'UNLIKE';
            } else {
                // 👍 좋아요 추가
                transaction.set(likeRef, {
                    userId,
                    recommentId,
                    createdAt: new Date(),
                });
                transaction.update(recommentRef, {
                    like: currentLike + 1,
                });
                action = 'LIKE';
            }
        });

        return NextResponse.json({
            state: "SUCCESS",
            message: action === 'LIKE' ? "좋아요 추가됨" : "좋아요 취소됨",
            data: {
                action, hasMyLike: action === 'LIKE' ? true : false,
                ...recommentSnap.data(),
                like: action === 'LIKE' ? Number(recommentSnap.data().like) + 1 : Number(recommentSnap.data().like) - 1
            }
        }, { status: 200 });
        // 하 ..일단 이렇게 해결. commentSnap이 이전 데이터라 강제로 +1 -1 붙임

    } catch (error) {
        console.error("좋아요 토글 실패:", error);
        return NextResponse.json({ state: "ERROR", message: error.message || "서버 에러가 발생했습니다." }, { status: 500 });
    }
});



/*
    @ path    DELETE /api/recomment/:recommentId
    @ doc     대댓글 삭제
    @ access  public
*/
export const DELETE = withAuth(async (req: NextRequest, user, context: { params: { id: string } }) => {
    try {
        const { params: { id: recommentId } } = context;
        // console.log('back commentid ??', commentId)

        const body = await req.json(); // 수정할 데이터
        const { parentCommentId, restaurantId } = body;


        // 문서 조회
        const docRef = adminDB.collection("recomments").doc(recommentId);
        const docSnap = await docRef.get();

        // 댓글 체크 후 삭제
        if (!docSnap.exists) return NextResponse.json({ state: "NOT_FOUND", message: "해당 글이 존재하지 않습니다." }, { status: 404 });
        await docRef.delete();

        let recommentLen = null;
        if (docSnap.exists) {
            // 개수업데이트
            const commentRef = adminDB.collection("comments").doc(parentCommentId);
            const commentSnapshot = await commentRef.get();
            if (!commentSnapshot.exists) return NextResponse.json({ state: "FAILURE", message: "대댓글이 존재하지 않습니다." }, { status: 404 });

            const commentData = commentSnapshot.data();
            if (!commentData) return NextResponse.json({ state: "FAILURE", message: "대댓글 데이터가 없습니다." }, { status: 404 });

            recommentLen = Number(commentSnapshot.data().recommentLen) - 1
            await commentRef.update({ recommentLen: Number(commentSnapshot.data().recommentLen) === 0 ? 0 : recommentLen });
        }



        return NextResponse.json({ state: "SUCCESS", message: "글이 성공적으로 삭제되었습니다.", data: { recommentId, parentCommentId, restaurantId, recommentLen } }, { status: 200 });

    } catch (error) {
        console.error("글 삭제 중 오류:", error);
        return NextResponse.json({ state: "ERROR", message: "서버 오류가 발생했습니다." }, { status: 500 });
    }
});



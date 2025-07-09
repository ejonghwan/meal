import { NextRequest, NextResponse } from "next/server";
import { adminDB, admin } from "@/src/data/firebaseAdmin";
import { withAuth } from "@/src/app/api/middleware/withAuth";

/*
    @ path    POST /api/comment
    @ doc     댓글 생성
    @ access  public
*/
export const POST = withAuth(async (req: NextRequest) => {
    try {

        const { userId, restaurantId, content, rating, isEdit, parentCommentId = null } = await req.json();
        const commentRef = adminDB.collection("comments").doc(); // ✅ adminDB 사용

        const commentData = {
            userId,
            restaurantId,
            parentCommentId,
            content,
            rating,
            isEdit: false,
            like: "0",
            unlike: "0",
            created_at: admin.firestore.Timestamp.fromDate(new Date()),
            updated_at: null,
        };

        await commentRef.set(commentData); // ✅ admin SDK로 접근하면 권한 체크 안 함

        console.log('commentData?', commentData)

        // 추가. rating 받아서 글에 평점 추가해야함. 코드 검증완료
        const restaurantRef = adminDB.collection("restaurant").doc(restaurantId);
        const restaurantSnapshot = await restaurantRef.get();
        if (!restaurantSnapshot.exists) return NextResponse.json({ state: "FAILURE", message: "레스토랑이 존재하지 않습니다." }, { status: 404 });

        const restaurantData = restaurantSnapshot.data();
        if (!restaurantData) return NextResponse.json({ state: "FAILURE", message: "레스토랑 데이터가 없습니다." }, { status: 404 });

        const currentRating = parseFloat(restaurantData.totalRating) || 0;
        const newRating = (currentRating + parseFloat(rating)) / 2; // 평균 계산

        console.log('create back ? newRating?', newRating, currentRating, newRating.toString())

        await restaurantRef.update({ totalRating: newRating.toString() });



        return NextResponse.json({
            state: "SUCCESS",
            message: "추가",
            data: {
                commentId: commentRef.id,
                newTotalRating: newRating,
                ...commentRef,
            },
        }, { status: 201 });
    } catch (e) {
        // with auth에서 error 뿜어줌
        console.error('e', e)
    }
});





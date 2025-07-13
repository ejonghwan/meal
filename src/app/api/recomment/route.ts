import { NextRequest, NextResponse } from "next/server";
import { adminDB, admin } from "@/src/data/firebaseAdmin";
import { withAuth } from "@/src/app/api/middleware/withAuth";

/*
    @ path    POST /api/recomment
    @ doc     대댓글 생성
    @ access  public
*/
export const POST = withAuth(async (req: NextRequest) => {
    try {

        const { userId, restaurantId, content, parentCommentId } = await req.json();
        const recommentRef = adminDB.collection("recomments").doc(); // ✅ adminDB 사용

        const recommentData = {
            userId,
            restaurantId,
            parentCommentId,
            content,
            like: 0,
            unlike: 0,
            created_at: admin.firestore.Timestamp.fromDate(new Date()),
            updated_at: null,
        };

        await recommentRef.set(recommentData); // ✅ admin SDK로 접근하면 권한 체크 안 함
        const selectData = (await recommentRef.get()).data()

        if (selectData) {
            // 추가. rating 받아서 글에 평점 추가해야함. 코드 검증완료
            const commentRef = adminDB.collection("comments").doc(parentCommentId);
            const commentSnapshot = await commentRef.get();
            if (!commentSnapshot.exists) return NextResponse.json({ state: "FAILURE", message: "대댓글이 존재하지 않습니다." }, { status: 404 });

            const commentData = commentSnapshot.data();
            if (!commentData) return NextResponse.json({ state: "FAILURE", message: "대댓글 데이터가 없습니다." }, { status: 404 });

            await commentRef.update({ recommentLen: Number(commentSnapshot.data().recommentLen) + 1 });
        }

        return NextResponse.json({
            state: "SUCCESS",
            message: "추가",
            data: {
                recommentId: recommentRef.id,
                ...selectData
            },
        }, { status: 201 });
    } catch (e) {
        // with auth에서 error 뿜어줌
        console.error('e', e)
    }
});





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
        const { content, rating, isEdit } = body;

        const docRef = adminDB.collection("comments").doc(commentId);
        const docSnapshot = await docRef.get();

        if (!docSnapshot.exists) {
            return NextResponse.json({
                state: "FAIL",
                message: "해당 레스토랑 댓글이 존재하지 않습니다.",
            }, { status: 404 });
        }

        await docRef.update({
            ...(content !== undefined && { content }),
            ...(rating !== undefined && { rating }),
            ...(isEdit !== undefined && { isEdit }),
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
    @ path    PATCH  /api/comment/:commentId
    @ doc     글 일부 수정
    @ access  public
*/


/*
    @ path    DELETE /api/comment/:commentId
    @ doc     댓글 삭제
    @ access  public
*/
export const DELETE = withAuth(async (req: NextRequest, user, context: { params: { id: string } }) => {

    const { params: { id: commentId } } = context;

    try {
        // 문서 조회
        const docRef = adminDB.collection("comments").doc(commentId);
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



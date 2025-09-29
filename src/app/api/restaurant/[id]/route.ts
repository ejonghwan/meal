import { NextRequest, NextResponse } from "next/server";
import { adminDB, admin } from "@/src/data/firebaseAdmin";
import { withAuth } from "@/src/app/api/middleware/withAuth";
import { Query, DocumentData, Timestamp } from "firebase-admin/firestore";




/*
    @ path    GET /api/restaurant/:restaurantId
    @ doc     단일 글 로드 
    @ access  public
*/
export const GET = async (req: NextRequest, { params }: { params: { id: string } }) => {
    const { id } = params;


    console.log('restaurantId?', id)

    // 로그인 유저 확인
    const token = req.headers.get("x-acc-token")?.replace("Bearer ", "");
    let userId: string | null = null;

    // console.log('token??', token)

    if (token) {
        try {
            const decoded = await admin.auth().verifyIdToken(token);
            userId = decoded.uid;

            // console.log('??? userId', userId)

        } catch (err) {
            console.warn("Invalid or expired token");
        }
    }


    // 문서 조회
    const docRef = adminDB.collection("restaurant").doc(id);
    const docSnap = await docRef.get();

    if (!docSnap.exists) {
        return NextResponse.json({
            state: "NOT_FOUND",
            message: "해당 글이 존재하지 않습니다.",
        }, { status: 404 });
    }

    const data = docSnap.data();

    // 좋아요/댓글 여부 (현재 로그인한 유저 기준)
    const hasMyLike = !!(
        data?.likeUsers && Array.isArray(data.likeUsers) && userId && data.likeUsers.includes(userId)
    );
    const hasMyComment = !!(
        data?.commentUsers && Array.isArray(data.commentUsers) && userId && data.commentUsers.includes(userId)
    );

    const userDoc = await adminDB.collection('users').doc(data.userId).get();
    const userData = userDoc.data();

    // 최종 반환 데이터
    const restaurant = {
        ...data,
        id: docSnap.id,
        user: { ...userData },
        title: data?.title,
        content: data?.content,
        category: data?.category,
        rating: data?.rating,
        totalRating: data?.totalRating,
        commentCount: data?.commentCount,
        recommentCount: data?.recommentCount,
        userId: data?.userId,
        isEdit: data?.isEdit,
        mapInfo: data?.mapInfo,
        like: data?.like ?? 0,
        unlike: data?.unlike ?? 0,
        hasMyLike,
        hasMyComment,
        created_at: data?.created_at?.toDate() ?? null,
        updated_at: data?.updated_at?.toDate() ?? null,
    };

    // const fetchedRestaurant = await Promise.all(
    //     // snapshot.docs.map(async (doc) => {
    //     slicedDocs.map(async (doc) => {
    //         const data = doc.data();
    //         let user = null;

    //         try {
    //             // 어드민 유저 말고 콜렉션 유저 가져오기로 수정
    //             // const userRecord = await admin.auth().getUser(data.userId);
    //             // user = {
    //             //    uid: userRecord.uid,
    //             //    email: userRecord.email,
    //             //    displayName: userRecord.displayName,
    //             //    photoURL: userRecord.photoURL,
    //             // };

    //             const userDoc = await adminDB.collection('users').doc(data.userId).get();
    //             const userData = userDoc.data();
    //             user = { ...userData };

    //         } catch (error) {
    //             console.error("유저 정보 조회 실패:", data.userId, error);
    //         }




    //         return {
    //             ...data,
    //             id: doc.id,
    //             user,
    //             title: data.title,
    //             content: data.content,
    //             category: data.category,
    //             rating: data.rating,
    //             totalRating: data.totalRating,
    //             commentCount: data.commentCount,
    //             recommentCount: data.recommentCount,
    //             userId: data.userId,
    //             isEdit: data.isEdit,
    //             mapInfo: data.mapInfo,
    //             like: data.like, //count
    //             unlike: data.unlike,
    //             hasMyLike: hasMyLike,
    //             hasMyComment: hasMyComment,
    //             created_at: data.created_at?.toDate() ?? null,
    //             updated_at: data.updated_at?.toDate() ?? null,
    //         };
    //     })
    // );



    return NextResponse.json(
        {
            state: "SUCCESS",
            message: "성공",
            data: restaurant
        },
        { status: 200 }
    );
};






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

        return NextResponse.json({ state: "SUCCESS", message: action === 'LIKE' ? "좋아요 추가됨" : "좋아요 취소됨", data: { action, hasMyLike: action === 'LIKE' ? true : false, ...restaurantSnap.data(), like: action === 'LIKE' ? Number(restaurantSnap.data().like) + 1 : Number(restaurantSnap.data().like) - 1 }, }, { status: 200 });
        // 하 ..일단 이렇게 해결. restaurantSnap이 이전 데이터라 강제로 +1 -1 붙임

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



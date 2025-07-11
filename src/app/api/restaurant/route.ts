import { NextRequest, NextResponse } from "next/server";
import { adminDB, admin } from "@/src/data/firebaseAdmin";
import { withAuth } from "@/src/app/api/middleware/withAuth";

/*
    @ path    POST /api/restaurant
    @ doc     글 생성
    @ access  public
*/
export const POST = withAuth(async (req: NextRequest, user) => {
    try {


        // console.log('user?', user)
        const { userId, title, content, rating, category, isEdit, mapInfo } = await req.json();
        const restaurantRef = adminDB.collection("restaurant").doc(); // ✅ adminDB 사용

        const restaurantData = {
            userId: user.uid,
            // user: {
            //     info: user.providerData[0].UserInfo,
            //     metadata: user.metadata,
            // },
            title,
            content,
            rating,
            category,
            totalRating: rating, // 생성할땐 총 합이 작성자꺼만 
            isEdit,
            mapInfo,
            commentCount: 0,
            recommentCount: 0,
            like: 0,
            unlike: 0,
            created_at: admin.firestore.Timestamp.fromDate(new Date()),
            updated_at: null,
        };

        await restaurantRef.set(restaurantData); // ✅ admin SDK로 접근하면 권한 체크 안 함

        return NextResponse.json({
            state: "SUCCESS",
            message: "추가",
            data: {
                id: restaurantRef.id, ...restaurantData,
            },
        }, { status: 201 });
    } catch (e) {
        // with auth에서 error 뿜어줌
        console.error('e', e)
    }
});


















// // getTodo, deleteTodo, updateTodo
// /*
// @ path    GET /api/restaurant/:id
// @ doc     단일 글 가져오기
// @ access  public
// */
// export async function GET(req: NextRequest, { params }: { params: { slug: string } }) {
//     // const searchParams = req.nextUrl.searchParams;
//     // const query = searchParams.get('query')
//     // const todo = await getTodo(params.slug)

//     const todoDocRef = doc(db, "restaurant", params.slug)
//     const todoDocSnap = await getDoc(todoDocRef);

//     let todo = null;
//     if (!todoDocSnap.exists() || params.slug === null) return null;
//     if (todoDocSnap.exists()) {
//         todo = {
//             id: todoDocSnap.id,
//             title: todoDocSnap.data()["title"],
//             is_done: todoDocSnap.data()["is_done"],
//             created_at: todoDocSnap.data()["created_at"].toDate()
//         }
//     }


//     if (!todo) return NextResponse.json({ state: 'FAILUE', message: '없는 글입니다.' }, { status: 204 })
//     const res = { message: 'SUCCES', data: todo }

//     return NextResponse.json(res, { status: 200 })
// }





// /*
// @ path    PUT /api/restaurant/:id
// @ doc     단일 할일 수정
// @ access  public
// */
// export async function PUT(req: NextRequest, { params }: { params: { slug: string } }) {
//     // const searchParams = req.nextUrl.searchParams;
//     // const query = searchParams.get('query')

//     const { title, is_done } = await req.json();
//     // const todo = await updateTodo({ id: params.slug, title, is_done })

//     // 글 체크
//     const todoDocRef = doc(db, "restaurant", params.slug)
//     const isTodo = await getDoc(todoDocRef);
//     if (!isTodo) return null;

//     const todo = await updateDoc(doc(db, "restaurant", params.slug), { title, is_done });
//     console.log('단일 업데이트 ?', todo)

//     // if(!todo) return NextResponse.json({ state:'FAILUE', message: '없는 글입니다.' }, { status: 400 })

//     const res = { state: 'SUCCES', message: '성공', data: todo }
//     return NextResponse.json(res, { status: 200 })
// }





// /*
// @ path    DELETE /api/restaurant/:id
// @ doc     단일 할일 삭제
// @ access  public
// */
// export async function DELETE(req: NextRequest, { params }: { params: { slug: string } }) {
//     // const searchParams = req.nextUrl.searchParams;
//     // const query = searchParams.get('query')

//     // const todo = await deleteTodo(params.slug)
//     // 글 체크
//     const todoDocRef = doc(db, "restaurant", params.slug)
//     const isTodo = await getDoc(todoDocRef);
//     // if (!isTodo) return null;
//     if (!isTodo) return NextResponse.json({ state: 'FAILUE', message: '없는 글입니다.' }, { status: 400 })

//     await deleteDoc(doc(db, "restaurant", params.slug))

//     const res = { state: 'SUCCES', message: '성공', data: isTodo }
//     return NextResponse.json(res, { status: 200 })
// }


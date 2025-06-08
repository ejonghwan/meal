import { NextRequest, NextResponse } from "next/server";
import { adminDB } from "@/src/data/firebaseAdmin"; // ✅ admin SDK로 Firestore 접근

/*
@ path    GET /api/restaurant/[page]
@ doc     모든 글 가져오기
@ access  server only
*/
export const GET = async (req: NextRequest, { params }: { params: { page: string } }) => {
    const { page } = params;

    console.log('실행?', page);

    const snapshot = await adminDB.collection("restaurant").get(); // ✅ admin SDK 사용

    if (snapshot.empty) {
        return NextResponse.json({
            state: "SUCCESS",
            message: "데이터 없음",
            data: [],
        }, { status: 200 });
    }

    const fetchedRestaurant = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
            id: doc.id,
            title: data.title,
            content: data.content,
            address: data.address,
            category: data.category,
            rating: data.rating,
            userId: data.userId,
            isEdit: data.isEdit,
            created_at: data.created_at ? data.created_at.toDate() : null,
        };
    });

    const res = {
        state: "SUCCESS",
        message: "성공",
        data: fetchedRestaurant,
    };

    return NextResponse.json(res, { status: 200 });
};










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


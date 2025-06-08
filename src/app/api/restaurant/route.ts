import { NextRequest, NextResponse } from "next/server";
import { adminDB, admin } from "@/src/data/firebaseAdmin"; // ✅ admin SDK 사용

export const POST = async (req: NextRequest) => {
    const { userId, title, content, rating, address, category, isEdit } = await req.json();

    const restaurantRef = adminDB.collection("restaurant").doc(); // ✅ adminDB 사용

    const restaurantData = {
        userId,
        title,
        content,
        rating,
        address,
        category,
        isEdit,
        created_at: admin.firestore.Timestamp.fromDate(new Date()),
    };

    await restaurantRef.set(restaurantData); // ✅ admin SDK로 접근하면 권한 체크 안 함

    return NextResponse.json({
        state: "SUCCESS",
        message: "추가",
        data: { id: restaurantRef.id, ...restaurantData },
    }, { status: 201 });
};



// import { NextRequest, NextResponse } from "next/server"
// import { auth, db } from "@/src/data/firebaseClient";
// import { admin } from "@/src/data/firebaseAdmin";
// import { getFirestore, collection, query, getDocs, Timestamp, setDoc, doc, getDoc, deleteDoc, updateDoc } from "firebase/firestore";




// /*
// @ path    POST /api/restaurant
// @ doc     맛집 추가하기
// @ access  public
// */
// export const POST = async (req: NextRequest) => {
//     // 프론트에서 오는게 req
//     const { userId, title, content, rating, address, category, isEdit } = await req.json();
//     // if (!title) return NextResponse.json({ state: 'FAILUE', message: 'title을 넣어주세요', }, { status: 422 });

//     const restaurantRef = doc(collection(db, "restaurant"))

//     // db 추가 확인 완료
//     const createAtTimestemp = Timestamp.fromDate(new Date());
//     const restaurantData = {
//         // id: newTodoRef.id,
//         // title,
//         // is_done: false,
//         userId,
//         title,
//         content,
//         rating,
//         address,
//         category,
//         isEdit,
//         created_at: createAtTimestemp,
//     }

//     // 커미션 에러가 나는이유 ? backend에선 슈퍼권한을 얻음. client에서 사용하려면 파이어베이스에서 별도 설정해줘야됨
//     // console.log('userid?', userId, (await admin.auth().getUser(userId)).uid)

//     await setDoc(restaurantRef, restaurantData)

//     const res = {
//         state: 'SUCCES',
//         message: '추가',
//         data: { ...restaurantRef, created_at: createAtTimestemp.toDate() },
//     }

//     return NextResponse.json(res, { status: 201 })
// }
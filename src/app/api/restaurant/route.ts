import { NextRequest, NextResponse } from "next/server"
import { auth, db } from "@/src/data/firebaseClient";
import { getFirestore, collection, query, getDocs, Timestamp, setDoc, doc, getDoc, deleteDoc, updateDoc } from "firebase/firestore";



/*
@ path    GET /api/restaurant
@ doc     모든 글 가져오기
@ access  public
*/
export const GET = async (req: NextRequest) => {

    // const fetchedTodos = await getAllTodo();
    // 모든 문서 가져오기
    const q = query(collection(db, "restaurant"));
    const querySnapshot = await getDocs(q);
    const fetchedTodos = []

    if (querySnapshot.empty) return [];

    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());

        const aTodo = {
            id: doc.id,
            title: doc.data()["title"],
            is_done: doc.data()["is_done"],
            created_at: doc.data()["created_at"].toDate()
        }

        fetchedTodos.push(aTodo)
    });


    const res = {
        state: 'SUCCES',
        message: '성공',
        data: fetchedTodos,
    }
    return NextResponse.json(res, { status: 201 })
}



/*
@ path    POST /api/restaurant
@ doc     맛집 추가하기
@ access  public
*/
export const POST = async (req: NextRequest) => {
    // 프론트에서 오는게 req
    const { title } = await req.json();
    if (!title) return NextResponse.json({ state: 'FAILUE', message: 'title을 넣어주세요', }, { status: 422 });


    // const addedTodo = await addTodo({ title })
    const newTodoRef = doc(collection(db, "restaurant"))
    const createAtTimestemp = Timestamp.fromDate(new Date());
    const newTodoData = {
        id: newTodoRef.id,
        title,
        is_done: false,
        created_at: createAtTimestemp,
    }

    await setDoc(newTodoRef, newTodoData)
    // return { ...newTodoData, created_at: createAtTimestemp.toDate() };



    const res = {
        state: 'SUCCES',
        message: '추가',
        data: { ...newTodoData, created_at: createAtTimestemp.toDate() },
    }

    return NextResponse.json(res, { status: 201 })
}
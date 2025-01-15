import { NextRequest, NextResponse } from "next/server";
import { getTodo, deleteTodo, updateTodo } from "@/data/firestore";

/*
@ path    GET /api/todos/:id
@ doc     단일 할일 목록 가져오기
@ access  public
*/
export async function GET(req: NextRequest, { params }: { params: { slug: string } }) {
    // const searchParams = req.nextUrl.searchParams;
    // const query = searchParams.get('query')
    const todo = await getTodo(params.slug)

    if(!todo) return NextResponse.json({ state:'FAILUE', message: '없는 글입니다.' }, { status: 204 })
    const res = { message: 'SUCCES', data: todo }

    return NextResponse.json(res, { status: 200 })
}



/*
@ path    PUT /api/todos/:id
@ doc     단일 할일 수정
@ access  public
*/
export async function PUT(req: NextRequest, { params }: { params: { slug: string } }) {
    // const searchParams = req.nextUrl.searchParams;
    // const query = searchParams.get('query')
   
    const { title, is_done } = await req.json();
    const todo = await updateTodo({ id: params.slug, title, is_done })


    // if(!todo) return NextResponse.json({ state:'FAILUE', message: '없는 글입니다.' }, { status: 400 })

    const res = { state:'SUCCES', message: '성공', data: todo }
    return NextResponse.json(res, { status: 200 })
}





/*
@ path    DELETE /api/todos/:id
@ doc     단일 할일 삭제
@ access  public
*/
export async function DELETE(req: NextRequest, { params }: { params: { slug: string } }) {
    // const searchParams = req.nextUrl.searchParams;
    // const query = searchParams.get('query')
   
    const todo = await deleteTodo(params.slug)
    // console.log('todo?', todo)

    if(!todo) return NextResponse.json({ state:'FAILUE', message: '없는 글입니다.' }, { status: 400 })

    const res = { state:'SUCCES', message: '성공', data: todo }
    return NextResponse.json(res, { status: 200 })
}



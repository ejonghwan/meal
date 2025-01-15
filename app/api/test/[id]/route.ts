// import { useSearchParams } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

// 1. api request => 
// 2. express db 조회 후 res 해줌. => 
// 3. client await fn에 return 값으로 담김

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    // const searchParams = useSearchParams();
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('query')

    const res = {
        message: 'test list',
        data: {
            id: params.id,
            title: 'test title',
            isDone: false,
            query: query
        },
        status: 200,
    }

    // 이것도 이거 끝나고 보자!
    // https://www.youtube.com/watch?v=WlxcujsvcIY

    // http://localhost:3000/api/test/123?query=ghhh
    // res
    // {
    //     "message": "test list",
    //     "data": {
    //         "id": "123",
    //         "title": "test title",
    //         "isDone": false,
    //         "query": "ghhh"
    //     }
    // }

    return NextResponse.json(res, { status: 200 })
}

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {

    // const searchParams = request.nextUrl.searchParams;
    // const query = searchParams.get('query')
    const data = await request.json();
    
    
    // return Response.json({ title: data.title, param: params })
}
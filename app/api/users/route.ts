import { NextRequest, NextResponse } from "next/server"
import { signupEmail, loginEmail } from "@/data/firestore";

/*
@ path    GET /api/todos
@ doc     모든 할일 목록 가져오기
@ access  public
*/
export const POST = async (req: NextRequest) => {

    const signup = await signupEmail();
    const res = {
        state: 'SUCCES',
        message: '성공',
        data: signup,
    }
    return NextResponse.json(res, { status: 201 })
}





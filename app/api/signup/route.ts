import { NextRequest, NextResponse } from "next/server"
import { signupEmail, loginEmail } from "@/data/firestore";

/*
@ path    GET /api/signup
@ doc     회원가입
@ access  public
*/
export const POST = async (req: NextRequest) => {

    const { email, password } = await req.json();
    if (!email) return NextResponse.json({ state: 'FAILUE', message: 'email을 넣어주세요', }, { status: 422 });
    if (!password) return NextResponse.json({ state: 'FAILUE', message: 'password을 넣어주세요', }, { status: 422 });


    const signup = await signupEmail(email, password);
    const res = {
        state: 'SUCCES',
        message: '성공',
        data: signup,
    }
    return NextResponse.json(res, { status: 201 })
}





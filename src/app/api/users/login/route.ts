import { NextRequest, NextResponse } from "next/server"
import { signupEmail, loginEmail } from "@/src/data//users";

/*
@ path    GET /api/login
@ doc     회원가입
@ access  public
*/
export const POST = async (req: NextRequest) => {

    const { email, password } = await req.json();
    if (!email) return NextResponse.json({ state: 'FAILUE', message: 'email을 넣어주세요', }, { status: 422 });
    if (!password) return NextResponse.json({ state: 'FAILUE', message: 'password을 넣어주세요', }, { status: 422 });


    const userData = await loginEmail(email, password);
    console.log(userData.user.providerData)

    const res = {
        state: 'SUCCES',
        message: '성공',
        data: userData.user,
    }
    return NextResponse.json(res, { status: 201 })
}





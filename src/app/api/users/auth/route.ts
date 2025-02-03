import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers";
import { signupAuth } from "@/src/data//users";


/*
@ path    GET /api/auth
@ doc     회원가입 인증
@ access  public
*/
export const POST = async (req: NextRequest) => {

    const reqData = await req.json();
    console.log('req??', reqData.user)
    if (!reqData.user) return NextResponse.json({ state: 'FAILUE', message: '회원가입한 유저의 정보가 없습니다. 다시 확인해주세요', }, { status: 422 });

    // const userData = await loginEmail(email, password);
    // console.log('back - userDAta ????????', userData.user.refreshToken)

    // console.log(cookies().get("access-token"));
    // ref token httpOnly로 내려줌
    // cookies().set("x-ref-token", userData.user.refreshToken, { httpOnly: true });

    // 여기까지 함 
    // auth 정보 아래서 넘겨줘야됨
    const emailVerified = await signupAuth(reqData)
    console.log('back emailVerified ? ', emailVerified)

    const res = {
        state: 'SUCCES',
        message: '성공',
        data: emailVerified
    }
    return NextResponse.json(res, { status: 201 })
}





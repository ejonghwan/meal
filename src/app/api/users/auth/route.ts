import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers";
import { signupAuth } from "@/src/data//users";


/*
@ path    GET /api/auth
@ doc     회원가입 인증
@ access  public
*/
export const POST = async (req: NextRequest) => {

    const { email, uid } = await req.json();
    if (!email) return NextResponse.json({ state: 'FAILUE', message: 'email이 없습니다', }, { status: 422 });
    if (!uid) return NextResponse.json({ state: 'FAILUE', message: 'uid가 없습니다', }, { status: 422 });


    // const userData = await loginEmail(email, password);
    // console.log('back - userDAta ????????', userData.user.refreshToken)


    // console.log(cookies().get("access-token"));
    // ref token httpOnly로 내려줌
    // cookies().set("x-ref-token", userData.user.refreshToken, { httpOnly: true });


    // auth 정보 아래서 넘겨줘야됨
    const auth = await signupAuth()
    console.log('bakc auth ? ', auth)


    const res = {
        state: 'SUCCES',
        message: '성공',
        // data: userData.user,
        data: {
            // ...userData.user.providerData[0],
            // accToken: await userData.user.getIdToken()
        }
    }
    return NextResponse.json(res, { status: 201 })
}




